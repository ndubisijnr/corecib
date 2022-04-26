<template>
  <div>
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
    <div class="form1">
      <form class="container form-group form-login" role="form" @submit.prevent="handleSubmit(saveChanges)">
      <span :class="{ 'spinner-border': loading }"></span>

      <div v-if="!loading">
        <label class="form-label mt-2 pr-4">{{ testLive }} Secret Key </label>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            :value="api[`apikey${testLive}SK`]"
            id="pwd"
            disabled="true"
          />
          <i
            class="fas fa-eye"
            style="position: absolute; right: 20px; top: 5px; cursor: pointer"
            id="eye"
            @click="hide$show()"
          ></i>
        </div>

        <label class="form-label mt-2 pr-4">{{ testLive }} Public Key </label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            :value="api[`apikey${testLive}PK`]"
            disabled="true"
          />
        </div>
        <label class="form-label mt-2 pr-4">{{ testLive }} Callback URL </label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="callBackUrl"
            required

          />
        </div>
        <!--<label class="form-label mt-2 pr-4">{{ testLive }} Webhook </label>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="webHook"
            required
          />
        </div>-->
        <label class="form-label mt-2 pr-4">{{ testLive }} Authorization Header </label>
        <div class="row">
          <div class="col-5">
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  v-model="headerKey"
                  required
              />
              <label>Key</label>
            </div>
          </div>
          <div class="col-7">
            <div class="form-floating">
              <input
                  type="text"
                  class="form-control"
                  v-model="headerValue"
                  required
              />
              <label>Value</label>
            </div>
          </div>
        </div>
      <div class="text-center mt-3">
        <button id="submitBtn" class="btn-login mt-1" native-type="submit" :disabled="loading">
          Submit <span class="span-loader" :class="{ 'spinner-border': loading }"></span>
        </button>
      </div>
    </div>
      </form>
  </div>
      </validation-observer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ApikeyRequest from "../../model/request/ApiKeyRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
export default {
  name: "Apikey-Form",
  data: () => {
    return {
      headerKey:"",
      headerValue:"",
      //webHook:"",
      callBackUrl:"",
      model: ApikeyRequest.updateWebHook,
    };
  },

  methods: {
    hide$show() {
      let b = document.getElementById("pwd");
      let eye = document.getElementById("eye");
      if (b.type === "password") {
        b.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
      } else {
        b.type = "password";
        eye.classList.add("fa-eye");
        eye.classList.remove("fa-eye-slash");
      }
    },
    saveChanges(){
      console.log("Heoolooooo")
      this.model[`apikey${this.testLive}HeaderKey`] = this.headerKey
      this.model[`apikey${this.testLive}HeaderValue`] = this.headerValue
      this.model[`apikey${this.testLive}Callback`] = this.callBackUrl
      //this.model[`apikey${this.testLive}Webhook`] = this.webHook

      StoreUtils.dispatch(StoreUtils.actions.apiKey.updateWebhookCallback, this.model)

    }
  },

  mounted() {
    this.model.apikeyOrganisationId = localStorage.organisationId;
    this.model.apikeyId = localStorage.organisationId;
    StoreUtils.dispatch(
      StoreUtils.actions.apiKey.updateApikey,
      this.model
    );
  },
  computed: {
    ...mapState({
      api: (state) => state.apiKey.apiKey,
      loading: (state) => state.apiKey.loading,
    }),
    testLive() {
      return this.currentOrganisation.organisationStage
        .replace("PROD", "Live")
        .replace("DEV", "Test");
    },
    currentOrganisation() {
      return StoreUtils.rootGetters(
        StoreUtils.getters.auth.getCurrentOrganization
      );
    },
  },
};
</script>
<style>
.span-loader{
  width: 20px !important;
  height: 20px !important ;
}
.btn-login {
  width: 200px;
  height: 45px;
  left: 51px;
  top: 601px;

  background: #053c57;
  border-radius: 25px;
  border: none;
  color: white;
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