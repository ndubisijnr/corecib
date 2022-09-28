<template>
  <div>
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <div class="">
        <form class="container form-group form-login" role="form" @submit.prevent="handleSubmit(saveChanges)">
<!--          <span :class="{ 'spinner-border': loading }"></span>-->
          <div>
            <label class="form-label mt-2 pr-4">{{ testLive }} Secret Key </label>
            <div class="form-floating">
              <input type="password" class="form-control" :value="api[`apikey${testLive}SK`]" id="content" disabled="true" style="cursor:pointer" />
              <i class="fas fa-copy" style="position: absolute; right: 20px; top: 8px; cursor: pointer;z-index:99999" @click="copyToClipboard()"></i>
            </div>


            <label class="form-label mt-2 pr-4">{{ testLive }} Public Key </label>
            <div class="form-floating">
              <input type="text" class="form-control" :value="api[`apikey${testLive}PK`]" disabled="true" id="content2"
                style="cursor:pointer" />
              <i class="fas fa-copy" style="position: absolute; right: 20px; top: 8px; cursor: pointer;z-index:99999"
                 @click="copyToClipboard2()"></i>
            </div>

            <div v-if="api.apikeyTestCallback == null && api.apikeyLiveCallback == null">
            <label class="form-label mt-2 pr-4">{{ testLive }} Callback URL </label>
            <div class="form-floating">
              <input type="text" class="form-control" v-model="callBackUrl" required  />
            </div>

            <label class="form-label pr-4">{{ testLive }} Authorization Header </label>
            <div class="row mb-3">
              <div class="col-5">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="headerKey" required />
                  <label>Key</label>

                </div>

              </div>
              <div class="col-7">
                <div class="form-floating">
                  <input type="text" class="form-control" v-model="headerValue" required />
                  <label>Value</label>
                </div>
              </div>

            </div>
              <div class="text-start">
                <base-button title="Save" :loading="loading"></base-button>
              </div>
            </div>
            <div v-else>
              <label class="form-label mt-2 pr-4">{{ testLive }} Callback URL </label>
              <div class="form-floating">
                <input type="text" v-if="currentOrganisation.organisationStage === 'DEV'" class="form-control" v-model="api.apikeyTestCallback"  :id="`${testLive}_callback`" required/>
                <input v-else type="text" class="form-control" v-model="api.apikeyLiveCallback"  :id="`${testLive}_callback`" required/>
              </div>

              <label class="form-label pr-4">{{ testLive }} Authorization Header </label>
              <div class="row mb-3">
                <div class="col-5">
                  <div class="form-floating">
                    <input type="text" v-if="currentOrganisation.organisationStage === 'DEV'" class="form-control" v-model="api.apikeyTestHeaderKey" :id="`${testLive}_headerKey`"  required/>
                    <input type="text" v-else class="form-control" v-model="api.apikeyLiveHeaderKey" :id="`${testLive}_headerKey`" required/>
                    <label>Key</label>
                  </div>
                </div>
                <div class="col-7">
                  <div class="form-floating">
                    <input v-if="currentOrganisation.organisationStage === 'DEV'" type="text" class="form-control" v-model="api.apikeyTestHeaderValue" :id="`${testLive}_headerValue`" required/>
                    <input v-else type="text" class="form-control" v-model="api.apikeyLiveHeaderValue" :id="`${testLive}_headerValue`" required/>
                    <label>Value</label>
                  </div>
                </div>
              </div>
              <div class="text-start">
                <base-button title="Save" :loading="loading"></base-button>
              </div>
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
import BaseButton from "../../components/button/BaseButton"
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
  name: "Apikey-Form",
  components: {
    BaseButton
  },
  data: () => {
    return {
      headerKey: "",
      headerValue: "",
      //webHook:"",
      callBackUrl: "",
      model: ApikeyRequest.updateWebHook,
    };
  },

  methods: {
    copyToClipboard() {
      let copyLink = document.getElementById("content").value;
      navigator.clipboard.writeText(copyLink).then(() => {
        Toast.fire({ text: "Copied to clipboard", icon: "success" }).then(() => {});
      });
    },
    copyToClipboard2() {
      let copyLink2 = document.getElementById("content2").value;
      navigator.clipboard.writeText(copyLink2).then(() => {
        Toast.fire({ text:"Copied to clipboard", icon: "success" }).then(() => {});
      });
    },
    saveChanges() {
      if(this.api.apikeyTestCallback == null || this.api.apikeyLiveCallback == null) {
        this.model[`apikey${this.testLive}HeaderKey`] = this.headerKey
        this.model[`apikey${this.testLive}HeaderValue`] = this.headerValue
        this.model[`apikey${this.testLive}Callback`] = this.callBackUrl
        //this.model[`apikey${this.testLive}Webhook`] = this.webHook

        console.log(this.model)

        StoreUtils.dispatch(StoreUtils.actions.apiKey.updateWebhookCallback, this.model).then(() => {
          this.model.apikeyOrganisationId = localStorage.organisationId;
          this.model.apikeyId = localStorage.organisationId;
          StoreUtils.dispatch(
              StoreUtils.actions.apiKey.updateApikey,
              this.model
          );
        })
      }else{
          let headerKey = document.getElementById(`${this.testLive}_headerKey`).value;
          let headerValue = document.getElementById(`${this.testLive}_headerValue`).value;
          let callback = document.getElementById(`${this.testLive}_callback`).value;

          this.model[`apikey${this.testLive}HeaderKey`] = headerKey
          this.model[`apikey${this.testLive}HeaderValue`] = headerValue
          this.model[`apikey${this.testLive}Callback`] = callback


          StoreUtils.dispatch(StoreUtils.actions.apiKey.updateWebhookCallback, this.model).then(() => {
            this.model.apikeyOrganisationId = localStorage.organisationId;
            this.model.apikeyId = localStorage.organisationId;
            StoreUtils.dispatch(
                StoreUtils.actions.apiKey.updateApikey,
                this.model
            );
          })
      }

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
    stage() {
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getStage)
    },
    testLive() {
      if (!this.stage) return "Test"
      return this.stage.replace("PROD", "Live").replace("DEV", "Test");
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
.span-loader {
  width: 20px !important;
  height: 20px !important;
}

.btn-login {
  width: 332px;
  height: 43px;
  left: 51px;
  top: 601px;

  background: var(--primary);
  border-radius: 5px;
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