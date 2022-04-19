<template>
    <div>
      <div v-if="Object.keys(res_branch).length !== 0">
        <div class="row">
            <div class="col-xl-12 col-12 col-md-12">
          <stats-card title="Total Transactions"
                      type="gradient-blue"
                      :sub-title="res_branch.totalTransactions"
                      icon="fas fa-clipboard">
          </stats-card>
        </div>
        <div class="col-xl-12 col-12 col-md-12">
          <stats-card title="Total Users"
                      type="gradient-blue"
                      :sub-title="res_branch.totalUsers"
                      icon="fas fa-users">
          </stats-card>
        </div>
        <div class="col-xl-12 col-12 col-md-12">
          <stats-card title="Total Customers"
                      type="gradient-blue"
                      :sub-title="res_branch.totalCustomers"
                      icon="ni ni-building">
          </stats-card>
        </div>
        <div class="col-xl-12 col-12 col-md-12">
          <stats-card title="Total Branches"
                      type="gradient-blue"
                      :sub-title="res_branch.totalBranches"
                      icon="fas fa-code-branch">
          </stats-card>
        </div>
        </div>
      </div>
      <div v-else>
              <LoadingPanel></LoadingPanel>
          </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import StatsCard from '@/components/Cards/StatsCard';
import LoadingPanel from '@/components/LoadingPanel';
export default {
    components:{
        StatsCard,
        LoadingPanel
    },
    data() {
      return {

      }
    },
    computed:{
           ...mapState({
               //errors: state => state.role.role_errors,loading: state => state.role.role_loading,
    //success: state => state.role.role_success,
    userInformation: state => state.auth.userInfo,
    //response: state => state.role.role_response, response_read: state => state.role.role_read_response,
    /*role_bran: state => state.branch.branch_role,*/
    res_branch: state => state.branch.branch_res,
    /*loading_user: state => state.user.user_loading,
    success_branch: state => state.branch.branch_success,error_branch: state => state.branch.branch_error,
    error_user: state => state.user.user_error,success_user: state => state.user.user_success,
    response_user: state => state.user.user_response*/
    }),
    ...mapActions(['branchReadInfo']),
    ...mapGetters([""]),
    
    },
    watch:{
        res_branch(newValue, oldValue) {
      //console.log(`Updating from Role ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`);
      if(Object.keys(this.res_branch).length !== 0){
    
      }
        }
    },
    mounted:function (){
   this.$store.dispatch("branchReadInfo", {
              readAll: "YES",
              source:'web',
              branchBankCode:this.userInformation.userBankCode,
              roleBankCode:this.userInformation.role.roleBankCode,
              } , { root: false });
    
    },
    
}
</script>
<style scoped>

</style>