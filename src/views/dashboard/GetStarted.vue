<template>
  <div>
    <base-header class="pb-6" type="">
      <span :class="{ 'spinner-border': loading }"></span>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="cardd p-3 m-3">
            <div class="text-center ">
                <h1 class="m-b-xs"><b>Hello {{user.customerFirstName}}, Welcome to BizGem</b></h1>
                <h2>Your business is in <span v-if="getStage === 'DEV'">Test</span><span v-else>Live</span> mode</h2>
                <div class="card-area">
                  <dashboard-card :showBtn="false" :showBtn1="false" :value="'0'" :title="'Wallet Balance'"></dashboard-card>
                  <dashboard-card :showBtn="false" :showBtn1="false" :currency="'₦'" :value="'1,000,000'" :title="'Referral'"></dashboard-card>
                  <dashboard-card  :currency="'₦'" :value="'200,000'" :title="'Referral Balance'" :button_title="'Widthdraw'"></dashboard-card>
                  <dashboard-card :showBtn="false" :showBtn1="false" :currency="'₦'" :value="'1,000,000'" :title="'Wallet Balance'"></dashboard-card>
                </div> 
                <div class="mb-3">
                <b-button style="background-color:#3F88C5;color:white" v-b-modal.modal-1>Fund Wallet </b-button>
                <b-button v-b-modal.modal-no-backdrop> Withdraw</b-button>
              </div> 
              <div>
                 <h4 class="badge"> All Transactions</h4>
                <transaction withSearch="YES"></transaction>
              </div>
            </div>   
      </div>
    </div>

     <b-modal  centered title="BootstrapVue" id="modal-no-backdrop" hide-backdrop content-class="shadow" hide-footer>
          <template #modal-title>
                    Withdraw
                    </template>
                        <div class="d-block text-center">
                          <div>
                            <b-form>
                              <label>Enter Amount</label>
                               <b-input-group size="md" prepend="NGN" append=".00" class="mb-3">
                                <b-form-input type="number"></b-form-input>
                              </b-input-group>
                              <base-button title="Withdraw"></base-button>
                            </b-form>
                          </div>
                        </div>
                <div class="d-flex">
   </div>
                           
  </b-modal>

   <b-modal  centered title="BootstrapVue" id="modal-1" hide-backdrop content-class="shadow" hide-footer>
          <template #modal-title>
              <p>Fund Wallet</p>
            </template>
             <h3  style="text-align:center">
               Topup Balance
            </h3>  
            <div>
              <h3>To fund your wallet</h3>
              <span>Transfer the amount you want to fund to the account
                    details below and your balance will be funded.</span>
              <div class="carddd">
                <h6 class="text-right bg-warning rounded-3 p-1 text-white" style="position:absolute;right:50px;cursor:pointer" @click="copyToClipboard()">Copy</h6>
                <code>
                   <span class="mb-3 text-dark">Some Bank Acount Name</span><br>
                   <span class="mb-3 text-dark">{{currentOrganisation.organisationName}}</span><br>
                   <span class="text-dark" id="content">0233733545</span>
                </code>
              </div>
            </div>
                        
  </b-modal>



  </div>
</template>
<script>
import { mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import ApiForm from '../../components/form/ApiKeyDisplayForm.vue'
import DashboardView from "../../components/dashboardComponent/DashboardCircle"
import ApikeyRequest from "../../model/request/ApiKeyRequest";
import Swal from "sweetalert2";
import Transaction from "../report/Transactions.vue"
import BaseButton from "../../components/button/BaseButton"


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  widthdrawmodel:"",
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  name:"GetStarted",
  components: {ApiForm,'dashboard-card':DashboardView, Transaction,BaseButton},

  data: ()=>{
      return{
          isSwitched:false,
          apikeyModel: ApikeyRequest.regenerateApiKey,

      }
  },

  methods: {
    getbiz() {
      this.$router.push({ name: "NewBusiness" });
      StoreUtils.rootGetters(StoreUtils.getters)
    },
      regenerateApiKey() {
      StoreUtils.dispatch(StoreUtils.actions.apiKey.regenerateApiKey, this.apikeyModel).then(() => {
        this.$bvModal.hide('modal-no-backdrop')
      })

    },
        copyToClipboard() {
      let copyLink = document.getElementById("content").textContent;
      navigator.clipboard.writeText(copyLink).then(() => {
        Toast.fire({ text: "Copied to clipboard", icon: "success" }).then(
          () => {}
        );
      });
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

    getStage(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getStage)
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
.badge{
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
.inner-card {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  line-height: 3rem;
  font-family: "Fibon Sans";
}
@media (max-width:999px) {
  .inner-card {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  flex-direction: column-reverse;
  line-height: 3rem;
  font-family: "Fibon Sans";
}
.itemabc123 {
  width: auto;
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
    flex-direction: column-reverse;

}
}
.itemabc123 {
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  flex-wrap: wrap;
}

.cardd{
    box-shadow: 0 1px 2px hsl(0deg 0% 0% / 10%);
    background-color: white;
  
    
}

.carddd{
    box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
    background-color: white;
    margin-top: 20px;
    padding: 10px;
  
    
}

.card-area{
  display: flex;
  justify-content: space-around;
  /* border: solid yellow; */
  padding: 10px;
  width: 100%;
}

.itemabc1234 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
}
</style>
