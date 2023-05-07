<template>
  <div>
    <modal-1 :show="showAccountForm && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
      <div class="card-head">
        <div class="d-flex justify-content-between">
          <h4 style="color:#FFFFFF;font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Create Virtual Account</h4>
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Create Virtual Account"></button>
        </div>
      </div>
      <div class="card-body w-100" >
<!--        <div class="p-1" style="background:#FEE1E1;font-weight: lighter; font-size: 5px;margin-bottom:15px">-->
<!--&lt;!&ndash;        <span style="font-weight: bolder; font-size: 14px;" v-if="!sortType" class="d-flex">&ndash;&gt;-->
<!--&lt;!&ndash;          <span style="font-size: 20px;">💭</span>&ndash;&gt;-->
<!--&lt;!&ndash;          <span class="small">The virtual account can be used to receive funds via bank transfer from any financial institution. All funds sent via the created virtual account will be settled in the wallet address provided.</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </span>&ndash;&gt;-->
<!--&lt;!&ndash;          <span style="font-weight: bolder; font-size: 14px;" v-if="sortType" class="d-flex">&ndash;&gt;-->
<!--&lt;!&ndash;          <span style="font-size: 20px;">💭</span>&ndash;&gt;-->
<!--&lt;!&ndash;          <span class="small text-dark">Your intended virtual account will be tied to the wallet address of  the account number provided.</span>&ndash;&gt;-->
<!--&lt;!&ndash;          <b-icon-x-circle-fill  style="color: rgba(255,0,0,0.54);cursor: pointer"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </span>&ndash;&gt;-->
<!--        </div>-->
<!--        <form @submit.prevent="readSingleWallet">-->
<!--          <b-tooltip target="tooltip-target-1" triggers="hover">Your intended virtual account will be tied to the wallet address of the account number provided.</b-tooltip>-->
<!--&lt;!&ndash;          <label>Wallet Account Number</label>&ndash;&gt;-->
<!--          <input type="number" placeholder="Wallet account number" class="form-control mb-2" required v-model="readWallet.accountNumber"/>-->
<!--          <div class="text-right">-->
<!--            <b-button type="submit" :disabled="loading" :style="{backgroundColor:primaryColor,border:'none',color:'white'}">{{loading ? 'Checking' : 'Next'}} <span :class="{'spinner-border':loading}"></span> </b-button>-->
<!--          </div>-->
<!--        </form>-->
<!--        <base-input label="Select Wallet">-->
<!--          <el-select @change="sortBy()" id="selectOpt" name="sortBy" class="select-danger" filterable placeholder="Wallet Info" v-model="walletValue" required-->
<!--                     style="width: 100%">-->
<!--            <el-option  :value="wallet" v-for="wallet in wallets" class="select-danger" :label="wallet.accountName" :key="wallet.accountNumber"></el-option>-->
<!--          </el-select>-->
<!--        </base-input>-->
      </div>
      <div >
        <div class="modal-body">
            <b-form class="" @submit.prevent="createAccount">
              <div class="input-group mb-3 row">
                <div class="col">
                  <label class="small">VirtualAccountName</label>
                  <input type="text" class="form-control" placeholder="VirtualAccountName"  v-model="CreateVirtualAccountModel.virtualAccountName" required >
                </div>
                <div class="col">
                  <label class="small">VirtualAccountParent</label>
                  <input type="text" @focusin="isFocusedVirtualAccountParent = true " @focusout="isFocusedVirtualAccountParent = false" class="form-control" placeholder="virtualAccountParent"  v-model="CreateVirtualAccountModel.virtualAccountParent">
                  <span class="small text-warning">{{isFocusedVirtualAccountParent ? 'Optional(default is your business account)' : null}}</span>
                </div>
              </div>
              <div class="input-group mb-3 row">
                <div class="col">
                  <label class="small">VirtualAccountBankCode</label>
                  <input type="text" class="form-control" placeholder="virtualAccountBankCode" value="090365" readonly>
                </div>
                <div class="col">
                  <label class="small">VirtualAccountAmountControl</label>
                  <input type="text" @focusin="isFocusedVirtualAccountAmountControl = true " @focusout="isFocusedVirtualAccountAmountControl = false" class="form-control" placeholder="virtualAccountAmountControl"  v-model="CreateVirtualAccountModel.virtualAccountAmountControl">
                  <span class="small text-warning">{{isFocusedVirtualAccountAmountControl ? 'Optional(default is VARIABLE) values can be VARIABLE, GREATER, EXACT, LESSER' : null}}</span>
                </div>
              </div>
              <div class="input-group mb-3 row">
                <div class="col">
                  <label class="small">VirtualAccountExtraData</label>
                  <input type="text" class="form-control" placeholder="virtualAccountExtraData"  v-model="CreateVirtualAccountModel.virtualAccountExtraData">
                </div>
                <div class="col">
                  <label class="small">VirtualAccountValidTime</label>
                  <input @focusin="isFocusedVirtualAccountValidTime = true " @focusout="isFocusedVirtualAccountValidTime = false" type="text" class="form-control" placeholder="virtualAccountValidTime"  v-model="CreateVirtualAccountModel.virtualAccountValidTime">
                  <span class="small text-warning">{{isFocusedVirtualAccountValidTime ? 'Optional(default is 1443 minutes)' : null}}</span>

                </div>
              </div>
              <div>
<!--              <div>-->
<!--                <div class="input-group mb-3">-->
<!--                  <div class="w-100 mb-2">-->
<!--                    <label>Date Of Birth</label>-->
<!--                    <input type="date"  class="form-control" v-model="CreateVirtualAccountModel.dob" placeholder="Date Of Birth" aria-label="Server">-->
<!--                  </div>-->
<!--                  <div class="w-100">-->
<!--                    <label>Phone Number</label>-->
<!--                    <div class="d-flex">-->
<!--                      <vue-country-code  @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px" class=""></vue-country-code>-->
<!--                      <input type="tel"  class="form-control" placeholder="Phone Number" aria-label="Server" required v-model="CreateVirtualAccountModel.phoneNumber">-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
              <div class="input-group mb-3">
                <div class="w-100">
                  <label class="small">Virtual AccountType</label>
                  <select  class="form-select" v-model="CreateVirtualAccountModel.virtualAccountType">
                    <option value="REUSABLE">REUSABLE</option>
                    <option value="DISPOSABLE">DISPOSABLE</option>
                  </select>
                </div>
              </div>
              </div>
              <div>
                <b-button type="submit"  :disabled="loadingACC" :style="{backgroundColor:primaryColor,color: 'white',width: '100%'}"><span :class="{'spinner-border':loadingACC}"></span> {{loadingACC ? 'Creating': 'Create'}}</b-button>
              </div>
            </b-form>
          </div>
        </div>
    </modal-1>
  </div>
</template>

<script>
import StoreUtils from "@/util/baseUtils/StoreUtils";
import WalletRequest from "../../model/request/WalletRequest"
import createWalletRequest from "@/model/request/CreateWallet";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest";
import swal from "sweetalert2";

import {mapState} from "vuex";

export default {
  name: "CreateVirtualAccount",
  data(){
    return{
      showModal: true,
      allWallet:WalletRequest.readWallet,
      sortType: true,
      walletValue:"",
      virtualAccountModel: VirtualAccountRequest.readVirtualAccount,
      banks: [],
      readBankListModel: VirtualAccountRequest.getBankList,
      CreateVirtualAccountModel:VirtualAccountRequest.createVirtualAccount,
      readWallet:WalletRequest.retrieveWallet,
      next: false,
      primaryColor:window.__env.app.primaryColor,
      isFocusedVirtualAccountParent:false,
      isFocusedVirtualAccountAmountControl:false,
      isFocusedVirtualAccountValidTime:false,


    }
  },
  props: {
    showAccountForm: Boolean,
    walletAccountNumber:WalletRequest.retrieveWallet.accountNumber
  },
  methods: {
    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeAccountForm", false);
      Object.keys(this.readWallet).forEach(key => {
        this.readWallet[key] = null
      })
      this.showModal = true;
      this.sortType = true;
      StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateWalletState, 'first')


    },

    nex(){
      let fname = document.getElementById('fname')
      let lname = document.getElementById('lname')
      let bvn = document.getElementById('bvn')
      if(fname.value.length == 0 || lname.value.length == 0)
        return swal.fire({
          text:"❌ Please fill all required fields before proceeding",
          // icon:"error",
          showConfirmButton: false,
          position: 'bottom-start',
          timer: 2000
        })
      return this.next = true
    },
    prev(){
      this.next = false
    },

    showinfo(){
      swal.fire(
      {text:"ℹ️ Please provide the first name and Last name of the intended virtual account bearer.",
              // icon:"info",
              position: 'bottom-start',
              showConfirmButton: false,
              timer: 2000
              })
    },


    sortBy() {
      this.sortType = false
    },

    // onSelect({dialCode}) {
    //   let dialCode;
    // },
    selectChanged() {
      console.log(this.selectedCurrency)
      document.getElementById('fhdfd').innerHTML
    },

    readSingleWallet(){
      StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateWallet,this.readWallet)
      this.next = false
    },

    createAccount(){
      this.CreateVirtualAccountModel.channelBankCode= "090365"
      StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateVirtualAccountCreate,this.CreateVirtualAccountModel).then(() => {
        Object.keys(this.CreateVirtualAccountModel).forEach(key => {
          this.CreateVirtualAccountModel[key] = null
          StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateReadAllWallets,this.readWallet);
        })
        StoreUtils.dispatch(
            StoreUtils.actions.virtualAccount.updateVirtualAccount,
            this.virtualAccountModel
        );
    }).then(() => {
      this.closeModal()
      })
  }
},

  computed:{
    ...mapState({
      wallets: state => state.walletTransactions.wallet,
      bankList: (state) => state.virtualAccount.bankList,
      loadingACC: state => state.virtualAccount.loading,
      loading: state => state.walletTransactions.retrieveLoading,
      walletSta: state => state.walletTransactions.walletState

    })
  },
  mounted() {
  },

  watch:{
    bankList() {
      if (this.bankList.length !== 0) {
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

    walletSta() {
      if(this.walletSta == 'second'){
        this.sortType = false
      }else{
        this.sortType = true
        this.closeModal()
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateWalletState, 'first')
      }
    }
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

.card-head{
  color: white;
  background-color: #413d52;
}

.p-1{
  color: #3F88C5;
}

.btn-close{
  background-color: #FFFFFF;
}

</style>