<template>
    <modal-1 :show="showCreatePayout && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
        <div>
          <div class="card-head">
            <div class="d-flex justify-content-between">
              <h4 style="font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Request Payout</h4>
              <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Request Payout"></button>
            </div>
          </div>

          <div class="card-body">
                <div class="container">
                    <b-form class="" @submit.prevent="requestPayout()">
                        <h4 class="text-left">Wallet Balance: ₦{{ balances.walletBalance.accountBalance | formatAmount
                        }}
                        </h4>
                        <b-input-group size="md" prepend="NGN" class="mb-3">
                            <b-form-input id='withdrawInput' type="text" autofocus
                                v-model="payoutModel.payoutAmount" style="font-size:16px;letter-spacing:.2rem;"
                                placeholder="Enter Amount" @input="formatInputValue"></b-form-input>
                        </b-input-group>
                        <h4 id="error" class="text-danger text-center"></h4>
                        <b-button v-if="currentOrganisation.organisationStage == 'PROD'" class="text-white" type="submit" :style="{backgroundColor:primaryColor,width:'100%'}">{{ accLoading ? 'please wait..' : 'withdraw' }} <span :class="{ 'spinner-border': accLoading }"></span>
                        </b-button>
                        <b-button v-else disabled :style="{backgroundColor:primaryColor,color:'white',width:'100%'}">You are in Test Mode</b-button>
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
    directives: {
      formatNumber: {
        bind(el) {
          const formatter = new Intl.NumberFormat('en-US',{ maximumFractionDigits: 3, minimumFractionDigits: 2 });
          const inputHandler = (event) => {
            let value = event.target.value.replace(/,/g, '');
            event.target.value = formatter.format(value);
          };
          el.addEventListener('input', inputHandler);
        }
      }
    },
    data() {
        return {
            showModal: true,
            payoutModel: AccountPayoutRequest.createPayout,
            amount:null,
            primaryColor:window.__env.app.primaryColor


        }
    },
    methods: {
      formatInputValue() {
        let value = this.payoutModel.payoutAmount
        const parsedValue = parseFloat(value.replace(/[^\d.-]/g, ""));
        if (!isNaN(parsedValue)) this.payoutModel.payoutAmount = parsedValue.toLocaleString();
      },
      formatAmount(value){
        if (value == null) return '0.00'
        value = parseFloat(value).toFixed(2);
        const parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      },

      // inputLimiter() {
      //   let input = document.getElementById('withdrawInput')
      //   let value = input.value
      //   if(value) {
      //     // value = parseFloat(value).toFixed(2)
      //     const parts = parseFloat(value.toString()).toFixed(2).split(",")
      //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      //     this.payoutModel.payoutAmount = parts.join(".")
      //     console.log(parts.join("."))
      //
      //   }
      //   console.log(this.payoutModel.payoutAmount)
      //
      //   // let AllowableCharacters = '';
      //   //
      //   // if (allow == 'custom'){AllowableCharacters=' 1234567890.';}
      //   //
      //   //
      //   // let k = document.all?parseInt(e.keyCode): parseInt(e.which);
      //   // if (k!=13 && k!=8 && k!=0){
      //   //   if ((e.ctrlKey==false) && (e.altKey==false)) {
      //   //     return (AllowableCharacters.indexOf(String.fromCharCode(k))!=-1);
      //   //   } else {
      //   //     return true;
      //   //   }
      //   // } else {
      //   //   return true;
      //   // }
      //
      // },

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
          this.payoutModel.payoutAmount = amount.replace(/[^\d.-]/g, "")
          this.payoutModel.payoutReference = `BIZGEM-${this.reference(30)}`
          if(Number(amount.replace(/[^\d.-]/g, "")) > Number(1000000)){
            this.payoutModel.payoutAmount = null
            Toast.fire({text:"maximum of 1,000,000", icon:"error"})
          }
          else if(Number(amount.replace(/[^\d.-]/g, "")) >  Number(this.balances.walletBalance.accountBalance)) {
            this.payoutModel.payoutAmount = null
            Toast.fire({text: "Insufficent Funds", icon: "error"})
          }
          else{
            StoreUtils.dispatch(StoreUtils.actions.accountPayout.requestPayout, this.payoutModel).then(() => {
              this.payoutModel.payoutAmount = null
              this.closeModal()
              StoreUtils.dispatch(StoreUtils.actions.accountPayout.readPayout, this.payoutTransactionsModel)
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
    mounted(){}

}
</script>

<style scoped>
.card-head{
  color: white;
}
</style>