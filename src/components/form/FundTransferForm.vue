<template>
  <modal-1 :show="showFundTransfer && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="card-head">
        <div class="d-flex justify-content-between">
          <h4  style="padding:10px;color:#413d52;font-size:14px;font-weight:700;width: 100%;text-align: center">Fund Transfer To {{isSendingTo ? "CORESTEP MFB" :  "Other Banks"}}</h4>
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Add Payout Bank"></button>
        </div>
      </div>
      <div class="card-body">
        <div class="form">
          <b-form class="bform2 text-left" @submit.prevent="doFundTransfer()">
            <div v-if="stage == 'nameEnquiry'">
              <b-form-group id="input-group-3" label="Credit Bank Name" label-for="input-3" v-show="!isSendingTo">
                <base-input>
                  <el-select class="select-danger" filterable placeholder="Bank Name" required v-model="bankName">
                    <el-option v-for="bank in banks" class="select-danger" :value="bank.value" :label="bank.label" :key="bank.value"></el-option>
                  </el-select>
                </base-input>
              </b-form-group>

              <b-form-group id="input-group-4" label="Credit Account Number" label-for="input-group-4">
                <b-form-input @input="doNameEnquiry"  :disabled="loading" maxLength="10" :value="isSendingTo ? coreStepAccount?.accountNumber : nameEnquiryDetails?.accountNumber"  id="account-number" type="text" placeholder="Account Number"  class="mr-2" ></b-form-input>
                <h6>{{errorMessage}}</h6>
              </b-form-group>

              <span v-show="loading" class="small text-success">Fetching account details</span> <span v-show="loading" class="small spinner-border"></span>
              <b-form-group id="input-group-5" label="Credit Account Name" label-for="input-5">
                <b-form-input readonly id="input-5" :value="isSendingTo ? coreStepAccount?.accountName : nameEnquiryDetails?.accountName" type="text" placeholder="Account Name Will Appear Here"  class="mr-2" required></b-form-input>
              </b-form-group>

              <b-button class="w-100 text-black" :disabled="isSendingTo ? !coreStepAccount?.accountName : !nameEnquiryDetails?.accountName" @click="setStageForward" type="submit">Continue</b-button>

            </div>

            <div v-else>
              <b-form-group  id="input-group-4" label="Debit Wallet Account Number" label-for="input-4">
                <b-form-input @change="doNameEnquiryOnDebitAccount" :disabled="loading" @input="doNameEnquiryOnDebitAccount" id="debitAccountNumber" :value="debitAccountNameEnquiry?.accountNumber ? debitAccountNameEnquiry?.accountNumber :this.currentOrganisation?.organisationStage === 'DEV' ? this.currentOrganisation?.organisationAccountNumber?.split(',')[1] : this.currentOrganisation?.organisationAccountNumber?.split(',')[0]" maxLength="10" type="text" placeholder="Wallet Account Number"  class="mr-2"></b-form-input>
                <h6>{{errorMessage}}</h6>
              </b-form-group>

              <span v-show="loading" class="small text-success">Fetching account details</span> <span v-show="loading" class="small spinner-border"></span>
              <b-form-group id="input-group-9" label="Debit Wallet Account Name" label-for="input-4">
                <b-form-input  :value="debitAccountNameEnquiry?.accountName " id="text" readonly type="text" placeholder="Wallet Account Name will appear here"  class="mr-2" required></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-7" label="Amount" label-for="input-4">
                <b-form-input v-model="fundTransferModel.amount" id="amount" type="text" placeholder="Enter Amount"  class="mr-2" required></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-6" label="Narration" label-for="input-5" >
                <b-form-textarea v-model="fundTransferModel.narration"  type="text" placeholder="Narration"  class="mr-2" required></b-form-textarea>
              </b-form-group>

              <div class="d-flex">
                <b-button class="w-100 text-black" @click="setStageBack">Back</b-button>
                <b-button class="w-100 text-black" type="submit" :disabled="loading2">{{loading2 ? "Working" : "Proceed" }}
                  <span :class="{ 'spinner-border': loading2 }"></span>
                </b-button>

              </div>

            </div>
          </b-form>
        </div>
      </div>
    </div>
  </modal-1>
</template>

<script>
import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import FundTransferRequest from "../../model/request/FundTransferRequest";

export default {
  name: "FundTransferForm",
  props: {
    showFundTransfer: Boolean,
  },
  data() {
      return {
        showModal: true,
        banks: [],
        nameEnquiryModel:FundTransferRequest.nameEnquiry,
        fundTransferModel:FundTransferRequest.fundTransfer,
        errorMessage:null,
        bankName:null,
        parentName:null
      }
    },
  methods: {

    setStageForward(){
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateStage,'transfer')
      this.doNameEnquiryOnParentDebitAccount()
    },

    setStageBack(){
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateStage,'nameEnquiry')

    },

    doFundTransfer(){
      let SplitBankName;

      if(this.bankName){
        let bankArray = this.bankName?.split(" ")
        let bankCode =bankArray[bankArray?.length-1];
        SplitBankName= this.bankName?.replace(bankCode,"").trim();
      }else{}


      this.fundTransferModel.creditAccountName = this.isSendingTo ? this.coreStepAccount?.accountName : this.nameEnquiryDetails?.accountName
      this.fundTransferModel.creditAccountNumber = this.isSendingTo ? this.coreStepAccount?.accountNumber : this.nameEnquiryDetails?.accountNumber
      this.fundTransferModel.debitAccountName = this.debitAccountNameEnquiry?.accountName
      this.fundTransferModel.debitAccountNumber = this.debitAccountNameEnquiry?.accountNumber
      this.fundTransferModel.bankName = this.isSendingTo ? "CORESTEP MICROFINANCE BANK" : SplitBankName
      this.fundTransferModel.bankCode = this.isSendingTo ? "000000" : this.nameEnquiryDetails?.bankCode
      this.fundTransferModel.sessionId = this.isSendingTo ? this.coreStepAccount?.sessionId :this.nameEnquiryDetails?.sessionId
      this.fundTransferModel.sourceType  =  "WEB"
      this.fundTransferModel.reference = `CORE-STEP-${this.reference(30)}`
      StoreUtils.dispatch(StoreUtils.actions.fundTransfer.fundTransfer).then(() => {
        this.closeModal()
      })
    },

    doNameEnquiryOnDebitAccount(){
      const input = document.getElementById('debitAccountNumber')
      this.nameEnquiryModel.accountBankCode = '000000'
      if(input.value.length == 10) {
        this.nameEnquiryModel.accountNumber = input.value
        StoreUtils.dispatch(StoreUtils.actions.fundTransfer.callNameEnquiry)
      }
      else if(isNaN(input.value)){
        input.style.border = "solid crimson"
        this.errorMessage= 'please input numbers'
      } else{
        this.errorMessage = null
      }
    },

    doNameEnquiryOnParentDebitAccount(){
      this.nameEnquiryModel.accountBankCode = '000000'
      this.nameEnquiryModel.accountNumber = this.currentOrganisation?.organisationStage === 'DEV' ? this.currentOrganisation?.organisationAccountNumber?.split(',')[1] : this.currentOrganisation?.organisationAccountNumber?.split(',')[0]
      StoreUtils.dispatch(StoreUtils.actions.fundTransfer.callNameEnquiry)
    },

    doNameEnquiry(){
      const input = document.getElementById('account-number')

      if(this.isSendingTo){
        // let CoreStep = this.bankList.filter(it => it.name === 'CORESTEP MICROFINANCE BANK')
        // let bankCode = CoreStep.map(item => item.code).toLocaleString()
        // console.log(bankCode)
        this.nameEnquiryModel.accountBankCode = '000000'
        if(input.value.length == 10) {
          console.log(input.value)
          this.nameEnquiryModel.accountNumber = input.value
          StoreUtils.dispatch(StoreUtils.actions.fundTransfer.callNameEnquiry)
        }console.log(input.value)
      }else if(!this.isSendingTo){
        let bankArray = this.bankName.split(" ")
        let bankCode = bankArray[bankArray.length - 1];
        this.nameEnquiryModel.accountBankCode = bankCode
        if(input.value.length == 10) {
          this.nameEnquiryModel.accountNumber = input.value
          StoreUtils.dispatch(StoreUtils.actions.fundTransfer.callNameEnquiry)
        }
      }
      else{
        if(isNaN(input.value)){
          this.errorMessage= 'please input numbers'
        }else{
          this.errorMessage= null
        }
      }



    },

    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeFundTransferForm", false);
      this.showModal = true;
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateCloseModal, false)
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateDebitAccountNameEnquiry, null)
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateCoreStepCreditAccount, null)
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateNameEnquiry, null)
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateSendingTo, null)
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateStage,'nameEnquiry')
      Object.keys(this.fundTransferModel).forEach((key) => {
        this.fundTransferModel[key] = null
      })
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
  watch: {

    bankList(newValue, oldValue) {
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
      }
    },
  },


  computed:{
    ...mapState({
      bankList: (state) => state.virtualAccount.bankList,
      nameEnquiryDetails:(state) => state.fundTransfer.nameEnquiry,
      debitAccountNameEnquiry:(state) => state.fundTransfer.debitAccountNameEnquiry,
      loading:(state) => state.fundTransfer.loading,
      loading2:(state) => state.fundTransfer.loading2,
      isSendingTo:state => state.fundTransfer.sendingTo,
      showModal:state => state.fundTransfer.closeModal,
      stage:state =>state.fundTransfer.stage,
      coreStepAccount:state => state.fundTransfer.coreStepCreditAccount



    }),
    currentOrganisation() {
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },
  },

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateReadBankList).then();
  }

}
</script>

<style scoped>
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