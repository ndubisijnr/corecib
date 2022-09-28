<template>
  <div>
    <router-link to="/settings/settings">
      <div class="myalert" v-if="layout === 'dashboard-layout' && currentOrganisation.organisationStatus == 'PENDING'">
        <h3 class="text-white" > <b-icon-bell-fill/> &nbsp; You are currently only allowed to use bills payment APIs, kindly update your business information to access all our services.  </h3>
      </div>
    </router-link>
    <div class="session" v-if="layout === 'dashboard-layout' && isExpired">
      <h3 class="text-white" > <b-icon-bell-fill/> Your session was timed out please refresh this page to <span> re-authenticate </span></h3>
    </div>
    <dashboard-layout v-if="layout === 'dashboard-layout'"></dashboard-layout>
    <auth-layout v-else></auth-layout>

    <add-new-business @closeBusinessForm="updateAddBusiness" :show-business-form="addBizForm"></add-new-business>

  </div>
</template>

<script>
import DashboardLayout from "./views/layout/DashboardLayout";
import AuthLayout from "./views/layout/AuthLayout";
import StoreUtils from "./util/baseUtils/StoreUtils";
import AccountPayoutRequest from "./model/request/AccountPayoutRequest";
import router from "@/router";
import {mapState} from "vuex";
import AddNewBusiness from "./components/form/AddNewBusiness";

const default_layout = "default";
export default {
  components: {AuthLayout, DashboardLayout, AddNewBusiness},
  data(){
    return{
      readPayoutAccountModel: AccountPayoutRequest.readAccountPayoutById,
      primaryColor: window.__env.app.primaryColor

    }
  },
  computed:{
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    },
    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },

    ...mapState({
      isExpired:state => state.auth.isTimedOut,
      addBizForm: (state) => state.auth.form
    })


  },
  mounted() {
    console.log(this.showBusinessForm)
    setTimeout(()=>{
      if(router.currentRoute.meta.layout !== "auth"){
        const userToken = localStorage.getItem('token')
        StoreUtils.dispatch(StoreUtils.actions.auth.revalidateUser, userToken)

        this.readPayoutAccountModel.accountOrganisationId =
            localStorage.organisationId;
        StoreUtils.dispatch(
            StoreUtils.actions.accountPayout.readAddedBanks,
            this.readPayoutAccountModel
        );
        console.clear()
      }else{
        localStorage.clear()
      }
    },1000)

    // this.readPayoutAccountModel.accountOrganisationId = localStorage.organisationId;
    // StoreUtils.dispatch(
    //     StoreUtils.actions.accountPayout.readAddedBanks,
    //     this.readPayoutAccountModel
    // );

    setTimeout(()=>{
      let params = this.$route.params
       if(params != null){
         if(params.referralCode != null) localStorage.referralCode = params.referralCode
        }
    },2000)
    // console.clear()

  },
  methods:{
    updateAddBusiness(value) {
      StoreUtils.commit(StoreUtils.mutations.auth.updateForm, value)
    },
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
*{
  font-family: 'Montserrat';
  box-sizing: border-box;
}

.myalert{
  background-color: #EE9BA9 !important;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  display: flex;
  align-items: flex-end;
  justify-content:center;
  height: 46px;
  width: 100%;
  z-index: 5;
  position: sticky;
  top: 0;
}
.session{
  background-color: #AA3349FF !important;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  height: 46px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
  text-align: center;
  padding: 10px;
}

.session > h3 {
  font-size: 14px;
  /*margin-top: 9px;*/
}

.myalert h3{
  font-size: 13px;
}

@media (max-width: 500px) {
  .myalert{
    background-color: #EE9BA9 !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
    height: 46px;
    width: 100%;
    z-index: 1;
    text-align: center;
    padding: 5px;
  }



  .myalert h3{
    font-size: 10px;
  }

}
</style>

