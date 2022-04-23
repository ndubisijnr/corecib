<template>
  <div>
    <base-header class="pb-6" type="">
      <!-- <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Get Started</h6>
        </div>
      </div> -->
      <span :class="{ 'spinner-border': loading }"></span>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col-lg-12 col-md-12 text-center">
              <div class="onboarding-title text-center">
                <h5 class="m-b-xs"><b>Welcome to BizGem</b></h5>
                <h6>Your business is in <span v-if="stage === 'DEV'">Test</span><span v-else>Live</span> mode</h6>
              </div>
            </div>
          </div>
          <div class="mt-3 row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="onboarding-cards">
                <div class="onboarding-card">
                  <div class="onboarding-card-icon">
                    <svg
                      width="25"
                      height="25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 15.5s1-1 4-1 5 2 8 2 4-1 4-1v-12s-1 1-4 1-5-2-8-2-4 1-4 1v12zM4.5 22.5v-7"
                        stroke="#000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h5 class="onboarding-card-description">
                    Submit compliance details to accept live payments
                  </h5>
                  <base-button
                    size="md"
                    outline
                    class="mt-3 btn btn-primary"
                    @click="getbiz()"
                  >
                    Activate a Business
                  </base-button>
                </div>
                <div class="onboarding-card">
                  <div class="onboarding-card-icon">
                    <svg
                      width="25"
                      height="25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5 21.5a3 3 0 100-6 3 3 0 000 6zM6.5 9.5a3 3 0 100-6 3 3 0 000 6zM13.5 6.5h3a2 2 0 012 2v7M6.5 9.5v12"
                        stroke="#000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h5 class="onboarding-card-description">
                    Learn what you can do with the BizGem Dashboard
                  </h5>
                  <base-button size="md" outline class="mt-3 btn btn-primary">
                    Take a tour
                  </base-button>
                </div>
                <div class="onboarding-card">
                  <div class="onboarding-card-icon">
                    <svg
                      width="25"
                      height="25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 22.5c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
                        stroke="#000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M12.5 16.5a4 4 0 100-8 4 4 0 000 8zM5.43 5.43l4.24 4.24M15.33 15.33l4.24 4.24M15.33 9.67l4.24-4.24M15.33 9.67l3.53-3.53M5.43 19.57l4.24-4.24"
                        stroke="#000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h5 class="onboarding-card-description">
                    Find answers to questions you might have or get in touch
                  </h5>
                  <base-button size="md" outline class="mt-3 btn btn-primary">
                    Go to Support
                  </base-button>
                </div>
              </div>

              <div class="container mt-3 d-flex justify-content-center">
                <div class="card bg-white p-3">
                  <h3 text-center>Your Test Key</h3>
                  <p>
                    Also available in
                    <router-link to="/settings/settings"
                      ><span class="text-primary" style="cursor: pointer"
                        >Settings > API Keys & Webhooks</span
                      ></router-link
                    >
                  </p>  
                  
                  <api-form></api-form>                           
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import ApiForm from '../../components/form/ApiKeyDisplayForm.vue'

export default {
  name:"GetStarted",
  components: {ApiForm},

  data: ()=>{
      return{
          isSwitched:false
      }
  },

  methods: {
    getbiz() {
      this.$router.push({ name: "NewBusiness" });
      StoreUtils.rootGetters(StoreUtils.getters)
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.userInfo,
      loading: (state) => state.auth.loading,
      api:(state) => state.apiKey.apiKey

    }),
    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },
    stage(){
      return this.currentOrganisation.organisationStage
    }
  },

  mounted: function () {},
};
</script>
<style scoped>
.center-block {
  float: none;
}
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.onboarding-cards {
  /*display: -webkit-box;
    display: -ms-flexbox;*/
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.onboarding-card {
  background: #fff;
  border: solid 1px #f2f2f2;
  border-radius: 3px;
  display: block;
  width: 300px;
  margin: 10px;
  padding: 50px;
  text-align: center;
}
.onboarding-card-icon {
  height: 60px;
  width: 60px;

  display: flex;
  -webkit-box-pack: center;

  justify-content: center;
  -webkit-box-align: center;
  /*-ms-flex-align: center;*/
  align-items: center;
  border-radius: 50%;
  background-color: #f1fbf4;
  margin: 0 auto 30px;
}
svg:not(:root) {
  overflow: hidden;
}
.onboarding-card-description {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  margin-bottom: 0;
  color: #727366;
}
.onboarding-title {
  padding: 20px 0 0;
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
