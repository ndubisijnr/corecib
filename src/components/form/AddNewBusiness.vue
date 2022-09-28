<template>
  <modal-1 :show="showBusinessForm && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="modal-header">
        <h3>Add New Business 🤩 </h3>
        <button type="button" class="btn-close p-2 m-2" @click="closeModal()"></button>
      </div>
      <div class="modal-body">
        <b-form class="" @submit.prevent="addBusiness">
          <div class="row">
            <div class="col w-100 mb-2">
              <label class="small">Business Name</label>
              <input type="text" @blur="validation" v-model="newBusinessModal.customerBusinessName" class="form-control" placeholder="Business Name"  required>
              <span class="text-danger small" v-if="errors.businessName">{{errors.businessName}}</span>
            </div>
            <div class="col w-100 mb-2">
              <label class="small">Business Email</label>
              <input type="email" v-model="newBusinessModal.customerEmail" class="form-control" placeholder="Business Email" aria-label="Server" required>
            </div>
          </div>
          <div class="row mb-3">
            <div class="form-floating col">
              <base-input label="Country">
                <el-select class="select-danger w-100" filterable placeholder="Country" v-model="newBusinessModal.customerCountry"
                           required>
                  <el-option v-for="option in option_country" class="select-danger" :value="option.value"
                             :label="option.label" :key="option.value">
                  </el-option>
                </el-select>
                <p v-show="countryCtrl" class="form-error-message">
                  The Country is required
                </p>
              </base-input>
            </div>
            <div class="col">
              <label class="small">Phone Number</label>
              <div class="d-flex">
                <vue-country-code v-model="newBusinessModal.customerCountryCode" @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px" class="" required></vue-country-code>
                <input type="text" v-model="newBusinessModal.customerPhone" class="form-control" placeholder="Phone Number" aria-label="Server" required>
              </div>
            </div>
          </div>
          <div>
            <b-button type="submit" :style="{backgroundColor:primaryColor,color: 'white',width: '100%'}" :disabled="loading"><span :class="{'spinner-border':loading}"></span> {{loading ? 'Please Wait...' : 'Proceed'}}</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </modal-1>
</template>

<script>
import OrganisationRequest from "../../model/request/OrganisationRequest";
import country from "@/components/country";
import BaseInput from "../../components/inputs/BaseInput";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import {mapState} from "vuex";


export default {
  name: "AddNewBusiness",
  components: {
    BaseInput,
  },
  data(){
    return{
      showModal: true,
      option_country: [],
      countryCtrl: false,
      newBusinessModal:OrganisationRequest.addOrganisation,
      primaryColor:window.__env.app.primaryColor,
      errors:{
        businessName:null,
      }

    }
  },
  props: {
    showBusinessForm: Boolean,
  },

  methods:{
    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeBusinessForm", false);
      this.showModal = true;
      //   StoreUtils.commit(StoreUtils.mutations.accountPayout.updateStatus, 'false')
    },

    validation(){
      if(!this.newBusinessModal.customerBusinessName.includes(" ")){
        this.errors.businessName = '"business name should be at least two words separated with space"'
      }else{
        this.errors.businessName = null
      }
    },

    addBusiness(){
      this.newBusinessModal.customerId = StoreUtils.rootGetters(StoreUtils.getters.auth.getCustomerId)
      StoreUtils.dispatch(StoreUtils.actions.auth.addOrganisation, this.newBusinessModal).then(() => {
        this.readOrganisation.customerId = StoreUtils.rootGetters(StoreUtils.getters.auth.getCustomerId)
        StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationByUserId)
        StoreUtils.dispatch(StoreUtils.actions.auth.readDashboardStats)
      })
    },

    onSelect({ dialCode }) {
      this.newBusinessModal.customerCountryCode = dialCode;
    },
  },

  computed:{
    ...mapState({
      loading:state => state.auth.loading
    }),


  },

  watch:{

  },
  mounted() {
    let countries = country;
    this.option_country = countries.map((item) => {
      return {
        value: `${item.name}`,
        label: `${item.name}`,
      };
    });
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

label{
  color: #000;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>