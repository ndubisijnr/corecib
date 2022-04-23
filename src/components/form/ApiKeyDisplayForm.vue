<template>
  <div>
    <div class="form1">
      <span :class="{ 'spinner-border': loading }"></span>
    
      <div v-if="!loading">
        <label class="form-label mt-2 pr-4">{{testLive}} Secret Key </label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            :value="api[`apikey${testLive}PK`]"
            id="pwd1"
            disabled="true"
          />
        </div>

        <label class="form-label mt-2 pr-4">{{testLive}} Public Key </label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            :value="api[`apikey${testLive}SK`]"
            id="pwd1"
            disabled="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import ApikeyRequest from '../../model/request/ApiKeyRequest'
import StoreUtils from '../../util/baseUtils/StoreUtils';
export default {
  name: "Apikey-Form",
  data: ()=> {
      return{
          ApikeyModel:ApikeyRequest.readApiKey
      }
  },

  mounted(){
      this.ApikeyModel.apikeyOrganisationId = localStorage.organisationId
      StoreUtils.dispatch(StoreUtils.actions.apiKey.updateApikey,this.ApikeyModel)


  },
  computed:{
    ...mapState({
      api: state => state.apiKey.apiKey,
      loading: state => state.apiKey.loading
    }),
    testLive(){
        return this.currentOrganisation.organisationStage.replace("PROD", "Live").replace("DEV","Test")
    },
    currentOrganisation(){
        return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    }
  }
};
</script>
<style>
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