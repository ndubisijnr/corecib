<template>
  <modal-1 :show="showWalletForm && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="card-head">
        <div class="d-flex justify-content-between">
          <h4 style="color:#413d52;font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Create Wallet</h4>
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Create Account"></button>
        </div>
      </div>
      <div class="modal-body">
          <b-form class="" @submit.prevent="createWallet">
            <div class="row">
              <div class="col w-100 mb-2">
                <label class="small">First Name</label>
                <input type="text" v-model="createWalletModel.firstName" class="form-control" placeholder="First Name"  required>
              </div>
              <div class="col w-100 mb-2">
                <label class="small">Last Name</label>
                <input type="text" v-model="createWalletModel.lastName" class="form-control" placeholder="Last Name" aria-label="Server" required>
              </div>
            </div>
            <div class="row">
              <div class="col w-100 mb-2">
                <label class="small">Email</label>
                <input type="email" v-model="createWalletModel.email" class="form-control" placeholder="Email" required>
              </div>
              <div class="col w-100 mb-2">
                <label class="small">Bank Verification Number</label>
                <input type="text" v-model="createWalletModel.bvn" class="form-control" placeholder="BVN">
              </div>
            </div>
            <div class="row">
                <div class="col w-100 mb-2">
                  <label class="small">Date Of Birth</label>
                  <input type="date" v-model="createWalletModel.dob" class="form-control" placeholder="Date Of Birth" aria-label="Server" required>
                </div>
                <div class="col w-100">
                  <label class="small">Phone Number</label>
                  <div class="d-flex">
                    <vue-country-code v-model="createWalletModel.countryCode" @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px" class="" required></vue-country-code>
                    <input type="tel" v-model="createWalletModel.phoneNumber" class="form-control" placeholder="Phone Number" aria-label="Server" required>
                  </div>
                </div>
              </div>
            <div>
              <b-button type="submit" :style="{backgroundColor:primaryColor,color: 'white',width: '100%'}" :disabled="loading"><span :class="{'spinner-border':loading}"></span> {{loading ? 'Creating' : 'Create'}}</b-button>
            </div>
          </b-form>
      </div>
    </div>

  </modal-1>
</template>

<script>
import BaseButton from "@/components/button/BaseButton";
import StoreUtils from "@/util/baseUtils/StoreUtils";
import createWalletRequest from "@/model/request/CreateWallet";
import {mapState} from "vuex";
import WalletRequest from "../../model/request/WalletRequest";
// import vCurrencySelect from 'vue-currency-select';

export default {
  name: "CreateWalletForm",

  components:{
    // BaseButton,
    // vCurrencySelect
  },

  props: {
    showWalletForm: Boolean,
  },
  data() {
    return {
      showModal: true,
      createWalletModel:createWalletRequest.createWallet,
      readWallet: WalletRequest.readWallet,
      primaryColor:window.__env.app.primaryColor,
      customOptions:
        {
          currency: 'NGN',
          country: 'Nigeria'
        },


    }
  },
  methods:{
    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeWalletForm", false);
      this.showModal = true;
      //   StoreUtils.commit(StoreUtils.mutations.accountPayout.updateStatus, 'false')
    },

    onSelect({ dialCode }) {
      this.createWalletModel.countryCode = dialCode;
    },

    d(obj){
      document.getElementById('minA').innerHTML=obj.toLocaleString()
    },

    selectChanged() {
      console.log(this.selectedCurrency)
    },

    createWallet(){
      this.createWalletModel.currency = 'NGN',
      this.createWalletModel.minimumBalance = "0",
      this.createWalletModel.maximumBalance = "0",
      StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateCreatedWallet,this.createWalletModel).then(() => {
        Object.keys(this.createWalletModel).forEach(key => {
          this.createWalletModel[key] = null
          StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateReadAllWallets,this.readWallet);

        })
        this.closeModal()
      })
    }
  },

  computed:{
    ...mapState({
      loading:state => state.walletTransactions.loading
    })
  }

}
</script>

<style scoped>
.card-head{
  /*background-color: #D7E6F3;*/
  color: white;
}
.btn-close{
  background-color: #FFFFFF;
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