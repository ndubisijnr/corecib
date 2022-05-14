<template>
    <modal-1 :show="showCreatePayout && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
        <div>
            <div class="card-head">
                <div class="text-end">
                    <button type="button" class="btn-close p-2 m-2" @click="closeModal()"></button>
                </div>
                <div class=""></div>
            </div>
            <div class="card-body">
                <div class="container">
                    <!-- <dashboard-card :currency="'₦'" :showBtn="false" :showBtn1="false" :value="'100,000'" :title="'Wallet Balance'"></dashboard-card> -->
                    <b-form class="" @submit.prevent="requestPayout()">
                        <h4 class="text-left">Wallet Balance: ₦{{ balances.walletBalance.accountBalance | formatAmount
                        }}
                        </h4>
                        <b-input-group size="md" prepend="NGN" class="mb-3">
                            <b-form-input id='withdrawInput' step="0.01" type="number" autofocus
                                v-model="payoutModel.payoutAmount" style="font-size:16px;letter-spacing:.2rem;"
                                placeholder="Enter Amount" required @keypress="isNumber($event)"></b-form-input>
                        </b-input-group>
                        <h4 id="error" class="text-danger text-center"></h4>
                        <b-button v-if="currentOrganisation.organisationStage == 'PROD'"
                            class="w-100 text-white" type="submit" style="background-color:var(--primary)">{{ accLoading
                                    ? 'please wait..' : 'withdraw'
                            }} <span :class="{ 'spinner-border': accLoading }"></span>
                        </b-button>
                        <b-button v-else disabled style="background-color:var(--primary);width:100%;color:white">
                            You are in Test Mode</b-button>
                    </b-form>
                </div>
            </div>
        </div>

    </modal-1>

</template>
<script>
import { mapState } from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import Swal from "sweetalert2";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest"
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export default {
    name: "PayoutForm",
    props: {
        showCreatePayout: Boolean,
    },
    data() {
        return {
            showModal: true,
            payoutModel: AccountPayoutRequest.createPayout,
            amount:null


        }
    },
    methods: {
      isNumber: function (evt) {
        evt = evt ? evt : window.event;
        const charCode = evt.which ? evt.which : evt.keyCode;
        if (
            charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode !== 46
        ) {
          evt.preventDefault();
        } else {
          return true;
        }
      },
        closeModal() {
            //close modal form
            this.showModal = false;
            this.$emit("closeCreatePayout", false);
            this.showModal = true;
            //   StoreUtils.commit(StoreUtils.mutations.accountPayout.updateStatus, 'false')
        },
        requestPayout() {
            let amount = this.payoutModel.payoutAmount
            console.log(Number(amount), Number(this.balances.walletBalance.accountBalance))
            this.payoutModel.payoutReference = `BIZGEM-${this.reference(30)}`
            if(Number(amount) >  Number(this.balances.walletBalance.accountBalance)){
                Toast.fire({text:"Insufficent Funds", icon:"error"})
            }else{
            StoreUtils.dispatch(StoreUtils.actions.accountPayout.requestPayout, this.payoutModel).then(() => {
                StoreUtils.dispatch(StoreUtils.actions.accountPayout.readPayout, this.payoutTransactionsModel)
                this.payoutModel.payoutAmount = null
                this.closeModal()
            })
            }
        },
        reference(length) {
            let result = ""
            let characters = 'abcdefghijklmnopgrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789';
            let charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
    },
    computed: {
        ...mapState({
            accLoading: state => state.accountPayout.accloading,
            balances: state => state.auth.balances

        }),
        currentOrganisation() {
            return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
        },




    },
    mounted(){
        console.log(this.payoutModel.payoutAmount)
    }

}
</script>

<style scoped>
</style>