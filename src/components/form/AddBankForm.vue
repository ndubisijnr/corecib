<template>
    <modal-1 :show="showCreateBank && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
        <div>
          <div class="card-head">
            <div class="d-flex justify-content-between">
              <h4 style="font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Add Payout Bank</h4>
              <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Add Payout Bank"></button>
            </div>
          </div>
            <div class="card-body">
                <div class="form">
                    <b-form class="bform2 text-left" @submit.prevent="addBank()">
                        <b-form-group id="input-group-3" label="Bank Name" label-for="input-3">
                            <base-input>
                                <el-select class="select-danger" filterable placeholder="Bank Name" required v-model="createPayoutAccountModel.accountBankName">
                                    <el-option v-for="bank in banks" class="select-danger" :value="bank.value" :label="bank.label" :key="bank.value"></el-option>
                                </el-select>
                            </base-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Account Number" label-for="input-4">
                            <b-form-input id="input-4" type="number" placeholder="Account Number" v-model="createPayoutAccountModel.accountNumber" class="mr-2" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-5" label="Account Name" label-for="input-5">
                            <b-form-input id="input-5" type="text" placeholder="Account Name" v-model="createPayoutAccountModel.accountName" class="mr-2" required></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-5" label="Enter OTP" label-for="input-5">
                            <div class="d-flex">
                                <b-form-input id="input-5" type="text" placeholder="OTP" class="mr-2" required v-model="createPayoutAccountModel.otp"></b-form-input>
                                <span v-if="timerCount > 0" class="m-2 small w-100 text-dark">Resend OTP in {{ timerCount }}</span>
                                <b-button class="w-100" @click="sendOtp()" v-else>{{ loadingOtp ? "Sending" : "Send OTP" }} <span :class="{ 'spinner-border': loadingOtp }"></span></b-button>
                            </div>
                        </b-form-group>
                        <b-button class="w-100 text-white" :style="{backgroundColor:primaryColor}" type="submit">{{createloader ? "Adding" : "Add Bank" }}
                            <span :class="{ 'spinner-border': createloader }"></span>
                        </b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </modal-1>
</template>

<script>

import { mapState } from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest";
import AuthenticationRequest from "../../model/request/AuthRequest";
import Swal from "sweetalert2";


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
    name: "AddBank",
    props: {
        showCreateBank: Boolean,
    },

    data() {
        return {
            sendOtpModel: AuthenticationRequest.resendOtp,
            createPayoutAccountModel: AccountPayoutRequest.createAccountPayout,
            readPayoutAccountModel: AccountPayoutRequest.readAccountPayoutById,
            banks: [],
            showModal: true,
            timerCount: 0,
            primaryColor: window.__env.app.primaryColor

        };
    },
    computed: {

        ...mapState({
            userInfo: (state) => state.auth.userInfo,
            bankList: (state) => state.virtualAccount.bankList,
            payoutAccount: (state) => state.accountPayout.addedBanks,
            createloader: (state) => state.accountPayout.addbankloading,
            payoutloading: (state) => state.accountPayout.accloading,
            readonlybank: (state) => state.accountPayout.readOnlyAddedBanks,
            loading: (state) => state.virtualAccount.loading,
            loadingOtp: (state) => state.auth.loading,


            //documents:(state) => state.document.document
        }),

        checkInputfield: () => {
            let organization = StoreUtils.rootGetters(
                StoreUtils.getters.auth.getCurrentOrganization
            );
            return organization;
        },
        currentOrganisation() {
            return StoreUtils.rootGetters(
                StoreUtils.getters.auth.getCurrentOrganization
            );
        },
    },
    watch: {

      //watcher
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }
            },
            //immediate: true, // This ensures the watcher is triggered upon creation
        },
        bankList(newValue, oldValue) {
            // console.log(
            //   `Updating from Branch ${JSON.stringify(oldValue)} to ${JSON.stringify(
            //     newValue
            //   )}`
            // );
            // console.log("$$$$$$$%%%%%>>>>\n " + JSON.stringify(this.bankList));
            if (this.bankList.length !== 0) {
                //if(this.bankList.data.length!==0){
                let bank = [];
                bank = this.bankList;
                this.banks = bank.map((item) => {
                    return {
                        value: `${item.name} ${item.code}`,
                        label: `${item.name}`,
                    };
                });
                /* }
                    else{
                        this.option_bank=[{value:'',label:'No Record'}];
                     }*/
            }
        },
    },
    mounted() {
      StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateReadBankList).then();

    },
    methods: {
       closeModal() {
            //close modal form
            this.showModal = false;
            this.$emit("closeCreateBank", false);
            this.showModal = true;
            //   StoreUtils.commit(StoreUtils.mutations.accountPayout.updateStatus, 'false')
        },

       addBank() {
            let bankArray = this.createPayoutAccountModel.accountBankName.split(" ")
            let bankCode =bankArray[bankArray.length - 1];
            let bankName = this.createPayoutAccountModel.accountBankName.replace(bankCode,"").trim();
            this.createPayoutAccountModel.accountCountry = this.userInfo.customerCountry;
            this.createPayoutAccountModel.accountOrganisationId = this.userInfo.customerId;
            this.createPayoutAccountModel.username = this.userInfo.customerEmail;
            this.createPayoutAccountModel.accountBankCode = bankCode;
            this.createPayoutAccountModel.accountBankName = bankName;

            StoreUtils.dispatch(
                StoreUtils.actions.accountPayout.createAddedBanks,
                this.createPayoutAccountModel
            ).then(() => {
                this.closeModal()
                this.readPayoutAccountModel.accountOrganisationId =
                    localStorage.organisationId;
                StoreUtils.dispatch(
                    StoreUtils.actions.accountPayout.readAddedBanks,
                    this.readPayoutAccountModel
                )
            })
        },

       sendOtp() {
            this.sendOtpModel.customerEmail = this.userInfo.customerEmail;
            StoreUtils.dispatch(
                StoreUtils.actions.auth.resendOtp,
                this.sendOtpModel
            ).then(() => {
                Toast.fire({
                    text: `Otp Sent to ${this.userInfo.customerEmail}`,
                    icon: "success",
                });
                this.timerCount = 30;
                this.startTimer();
            });
        },

      //method
       startTimer(duration) {
            let timer = duration,
                minutes,
                seconds;
            setInterval(function () {
                minutes = parseInt((timer / 60).toString(), 10);
                seconds = parseInt((timer % 60).toString(), 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                this.timer = minutes + ":" + seconds;
                if (--timer < 0) {
                    timer = duration;
                }
            }, 1000);
        },
    }
};
</script>

<style scoped>
.card-head{
  color: #413d52;
}
.spinner-border {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    vertical-align: text-bottom;
    border: 0.25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border 0.75s linear infinite;
    animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
    to {
        transform: rotate(360deg);
    }
}
</style>