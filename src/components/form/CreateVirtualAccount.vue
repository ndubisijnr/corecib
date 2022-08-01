<template>
  <div>
    <modal-1 :show="showAccountForm && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
      <div class="card-head">
        <div class="d-flex justify-content-between">
          <div class="p-1" style="font-weight: bolder; font-size: 6px;">
            <span style="font-weight: bolder; font-size: 14px;" v-if="!sortType" class="d-flex"><span style="font-size: 20px;">💡</span> <span>The virtual account can be used to receive funds via bank transfer from any financial institution. All funds sent via the created virtual account will be settled in the wallet address provided.</span></span>
            <span style="font-weight: bolder; font-size: 14px;" v-if="sortType" class="d-flex"><span style="font-size: 20px;">💡</span>  Your intended virtual account will be tied to the wallet address of  the account number provided.</span>
          </div>
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Create Virtual Account"></button>
        </div>
      </div>

      <div class="card-body w-100" v-if="sortType">
        <form @submit.prevent="readSingleWallet">
          <b-tooltip target="tooltip-target-1" triggers="hover">Your intended virtual account will be tied to the wallet address of the account number provided.</b-tooltip>
          <label>Wallet Account Number</label>
          <input type="number" placeholder="Wallet Account Number" class="form-control" required v-model="readWallet.accountNumber"/>
          <div class="text-right p-2">
            <b-button type="submit" :disabled="loading" style="background-color:var(--primary);border:none;color:white">{{loading ? 'Checking' : 'Next'}} <span :class="{'spinner-border':loading}"></span> </b-button>
          </div>
        </form>
<!--        <base-input label="Select Wallet">-->
<!--          <el-select @change="sortBy()" id="selectOpt" name="sortBy" class="select-danger" filterable placeholder="Wallet Info" v-model="walletValue" required-->
<!--                     style="width: 100%">-->
<!--            <el-option  :value="wallet" v-for="wallet in wallets" class="select-danger" :label="wallet.accountName" :key="wallet.accountNumber"></el-option>-->
<!--          </el-select>-->
<!--        </base-input>-->
      </div>
      <div v-if="sortType == false">
        <div class="modal-body">
            <b-form class="" @submit.prevent="createAccount">
              <div class="input-group mb-3">
                <div class="w-50">
                  <label>Wallet Name</label>
                  <input type="text" class="form-control" placeholder="First Name"  :value="wallets.accountName" required disabled>
                </div>
                <div class="w-50">
                  <label>Account Number</label>
                  <input type="text" class="form-control" placeholder="First Name"  :value="wallets.accountNumber" required disabled>
                </div>
              </div>
              <div v-if="next==false">
              <div class="input-group mb-3">
                <div class="w-100 mb-3">
                  <label>First Name<span style="font-size: 20px;cursor:pointer" @click="showinfo()">💡</span> </label>
                  <input type="text" class="form-control w-100" placeholder="First Name" id="fname" v-model="CreateVirtualAccountModel.firstName" required>
                </div>
                <div class="w-100">
                  <label>Last Name <span style="font-size: 20px;cursor:pointer" @click="showinfo()">💡</span></label>
                  <input type="text" class="form-control w-100" placeholder="Last Name" id="lname"  v-model="CreateVirtualAccountModel.lastName" required>
                </div>
              </div>
              <div class="mb-3">
                <div class="">
                  <label>BVN</label>
                  <input type="text" class="form-control" placeholder="BVN" id="bvn" v-model="CreateVirtualAccountModel.bvn">
                </div>
              </div>
              </div>

              <div v-if="next==true">
              <div>
                <div class="input-group mb-3">
                  <div class="w-100 mb-2">
                    <label>Date Of Birth</label>
                    <input type="date"  class="form-control" v-model="CreateVirtualAccountModel.dob" placeholder="Date Of Birth" aria-label="Server">
                  </div>
                  <div class="w-100">
                    <label>Phone Number</label>
                    <div class="d-flex">
                      <vue-country-code  @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px" class=""></vue-country-code>
                      <input type="tel"  class="form-control" placeholder="Phone Number" aria-label="Server" required v-model="CreateVirtualAccountModel.phoneNumber">
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="w-100 mb-2">
                  <label>Address</label>
                  <input type="text" placeholder="Address" class="form-control"  v-model="CreateVirtualAccountModel.address"/>
                </div>
                <div class="w-100">
                  <label>Gender</label>
                  <select  class="form-select" v-model="CreateVirtualAccountModel.gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              </div>
              <div>
                <div class="d-flex">
                  <b-button :disabled="loadingACC" @click="prev()" v-if="next==true" style="background-color: var(--primary);color: white;width: 100%">Previous</b-button>
                  <b-button  v-if="next==true" type="submit"  :disabled="loadingACC" style="background-color: var(--primary);color: white;width: 100%"><span :class="{'spinner-border':loadingACC}"></span> {{loadingACC ? 'Creating': 'Create'}}</b-button>
                </div>
                <b-button  @click="nex()" v-if="next==false" style="background-color: var(--primary);color: white;width: 100%">Next</b-button>
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
      next: false

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
    },

    nex(){
      let fname = document.getElementById('fname')
      let lname = document.getElementById('lname')
      let bvn = document.getElementById('bvn')
      if(fname.value.length == 0 || lname.value.length == 0)
        return swal.fire({text:"please fill all required fields before proceeding", icon:"error"})
      return this.next = true
    },
    prev(){
      this.next = false
    },
    showinfo(){
      swal.fire({text:"Please provide the first name and Last name of the intended virtual account bearer.", icon:"info"})
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
      StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateWallet,this.readWallet).then(() => {
        console.log(this.wallets)
      })
      this.next = false
    },
    createAccount(){
      this.CreateVirtualAccountModel.channelBankCode= "090110"
      this.CreateVirtualAccountModel.accountParent = this.readWallet.accountNumber
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

    walletSta(oldValue, newValue) {
      if(newValue){
        this.sortType = false
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateWalletState, 'first')
      }else{
        this.sortType = true
        this.closeModal()
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
  background-color: #D7E6F3;
  color: white;
}

.p-1{
  color: #3F88C5;
}

</style>