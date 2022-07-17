<template>
  <div>
   <router-link to="/settings/settings"> <div class="myalert" v-if="layout === 'dashboard-layout' && currentOrganisation.organisationStatus == 'PENDING'" id="myalert">
      <h3 class="text-white" > &nbsp; &nbsp; &nbsp; &nbsp; <b-icon-bell-fill/> &nbsp; You are currently only allowed to use bills payment APIs, kindly update your business information to access all our services.  </h3>
    </div> </router-link>
    <dashboard-layout v-if="layout === 'dashboard-layout'"></dashboard-layout>
    <auth-layout v-else></auth-layout>
  </div>
</template>

<script>
import DashboardLayout from "./views/layout/DashboardLayout";
import AuthLayout from "./views/layout/AuthLayout";
import StoreUtils from "./util/baseUtils/StoreUtils";
import AccountPayoutRequest from "./model/request/AccountPayoutRequest";
import router from "@/router";
const default_layout = "default";
export default {
  components: {AuthLayout, DashboardLayout},
  data(){
    return{
      readPayoutAccountModel: AccountPayoutRequest.readAccountPayoutById,

    }
  },
  mounted() {
    setTimeout(()=>{
      if(router.currentRoute.meta.layout !== "auth"){
        const userToken = localStorage.getItem('token')
        StoreUtils.dispatch(StoreUtils.actions.auth.revalidateUser, userToken)
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

    this.stickyAlert()
    setTimeout(()=>{
      let params = this.$route.params
       if(params != null){
         if(params.referralCode != null) localStorage.referralCode = params.referralCode
        }
    },2000)
  },
  methods:{
    stickyAlert(){
      window.addEventListener('scroll', (e)=>{
        if(scrollY){
           document.getElementById('myalert').style.position = "fixed"
        }else{
          document.getElementById('myalert').style.position = "relative"
        }
      })
    }
  },
  computed:{
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    },
    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },

    
  }
}
</script>

<style>
:root{
  --primary: #3F88C5;
}

body{
  font-family: 'Ubuntu', sans-serif;
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
}

.myalert h3{
      font-size: 13px;
}

</style>

