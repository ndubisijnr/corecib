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
                {{stage}}
              </div>
            </div>
          </div>
          <div class="mt-3 row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="container mt-3 d-flex justify-content-center">
                <div class="bg-white p-3">
                  <div class="text-center">
                    <h3 text-center>Your Test Key</h3>
                    <p>
                      Also available in
                      <router-link to="/settings/settings"
                        ><span class="text-primary" style="cursor: pointer"
                          >Settings > API Keys & Webhooks</span
                        ></router-link
                      >
                    </p>  
                  </div>
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
      api:(state) => state.apiKey.apiKey,
      stage:(state) => state.auth.stage

    }),
    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },
   
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
