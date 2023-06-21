<template>
  <modal-1 :show="showAccountForm && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="card-head">
        <div class="d-flex justify-content-between">
          <h4 style="color:#413d52;font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Create Account</h4>
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Create Account"></button>
        </div>
      </div>
      <div class="modal-body">
        <b-form class="" @submit.prevent="createAccount">
          <div class="row">
            <div class="col w-100 mb-2">
              <label class="small">First Name</label>
              <input type="text" v-model="createAccountModel.customerFirstName" class="form-control" placeholder="First Name"  required>
            </div>
            <div class="col w-100 mb-2">
              <label class="small">Last Name</label>
              <input type="text" v-model="createAccountModel.customerLastName" class="form-control" placeholder="Last Name" aria-label="Server" required>
            </div>
          </div>
          <div class="row">
            <div class="col w-100 mb-2">
              <label class="small">Middle Name</label>
              <input type="text" v-model="createAccountModel.customerMiddleName" class="form-control" placeholder="Middle Name" aria-label="Server" required>
            </div>
            <div class="col w-100">
              <label class="small">Phone Number</label>
              <div class="d-flex">
                <vue-country-code v-model="createAccountModel.countryCode" @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px" class="" required></vue-country-code>
                <input type="tel" v-model="createAccountModel.customerPhoneNumber" class="form-control" placeholder="Phone Number" aria-label="Server" required>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col w-100 mb-2">
              <label class="small">Email</label>
              <input type="email" v-model="createAccountModel.customerEmail" class="form-control" placeholder="Email" required>
            </div>
            <div class="col w-100 mb-2">
              <label class="small">BVN(optional)</label>
              <input type="text" v-model="createAccountModel.customerBvn" class="form-control" placeholder="BVN">
            </div>
          </div>
<!--          <div class="row">-->
<!--            <div class="col w-100 mb-2">-->
<!--              <label class="small">Date Of Birth</label>-->
<!--              <input type="text" v-model="createAccountModel.customerMiddleName" class="form-control" placeholder="Middle Name" aria-label="Server" required>-->
<!--            </div>-->
<!--            <div class="col w-100">-->
<!--              <label class="small">Phone Number</label>-->
<!--              <div class="d-flex">-->
<!--                <vue-country-code v-model="createWalletModel.countryCode" @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px" class="" required></vue-country-code>-->
<!--                <input type="tel" v-model="createWalletModel.phoneNumber" class="form-control" placeholder="Phone Number" aria-label="Server" required>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div>
            <b-button type="submit" :style="{backgroundColor:primaryColor,color: 'white',width: '100%'}" :disabled="loading"><span :class="{'spinner-border':loading}"></span> {{loading ? 'Creating' : 'Create'}}</b-button>
          </div>
        </b-form>
      </div>
    </div>

  </modal-1>

</template>

<script>
import AccountRequest from "../../model/request/AccountRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import {mapState} from "vuex";

export default {
  name: "CreateAccountForm",
  props: {
    showAccountForm: Boolean,
  },
  data() {
    return {
      showModal: true,
      createAccountModel:AccountRequest.create,
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
      this.$emit("closeAccountForm", false);
      this.showModal = true;
      //   StoreUtils.commit(StoreUtils.mutations.accountPayout.updateStatus, 'false')
    },

    onSelect({ dialCode }) {
      this.createAccountModel.countryCode = dialCode;
    },

    d(obj){
      document.getElementById('minA').innerHTML=obj.toLocaleString()
    },

    selectChanged() {
      console.log(this.selectedCurrency)
    },

    createAccount(){
      this.createAccountModel.accountCurrency = 'NGN'
      this.createAccountModel.customerCountry = "Nigeria"
      this.createAccountModel.countryCode = this.createAccountModel.countryCode ? this.createAccountModel.countryCode : "+234"
      this.createAccountModel.source = "WEB"
          StoreUtils.dispatch(StoreUtils.actions.account.createAccount).then(() => {
            Object.keys(this.createAccountModel).forEach(key => {
              this.createAccountModel[key] = null
              StoreUtils.dispatch(StoreUtils.actions.account.readAccount);
            })
            this.closeModal()
          })
    }
  },

  computed:{
    ...mapState({
      loading:state => state.account.loading
    })
  }
}
</script>

<style scoped>

</style>