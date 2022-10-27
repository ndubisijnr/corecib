<template>
  <div :class="dashboardCardStyle" class="card" :style="{borderColor:primaryColor}" id="dashboardCard">
    <p v-if="isLoading" class="skeleton-text"></p>
    <p v-if="isLoading" class="skeleton-text"></p>
    <div v-else class="text-center">
      <span class="currency">{{currency}}<span class="value"> {{value}}</span></span>
      <p  class="title">{{title}}</p>
      <button @click="refreshWallet" v-if="refresh" class="refresh" title="reload wallet balance" style="background-color:#FFFF;color:black;border: none;width:35px;height:35px"> <img :class="{'loadMore':isRefresh}" src="../../assets/Refresh.svg"/> </button>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "DashboardView",
  data(){
    return{
      primaryColor:window.__env.app.primaryColor,
      styleType:2,
      isRefresh:false
    }
  },
  props:{
      value:{
          type:[String,Number]
      },
      title:{
          type:String,
          default:false
      },
      refresh:{
        type:Boolean
      },
      currency:{
          type:String,
      },
      showBtn:{
        type:Boolean,
      },
        showBtn1:{
        type:Boolean,
      },
       button_title:{
        type:String,
      },
      id:{
        type:String,
      }
      },

  methods:{
    refreshWallet(){
      this.isRefresh = !this.isRefresh
      StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions).then(() => {
        this.isRefresh = !this.isRefresh
      })
    }
  },

  computed:{
    dashboardCardStyle(){
      if(this.styleType === 2) return "total-referrals-style-2"
      return "skeleton-card"
    },

    ...mapState({
      isLoading:state => state.auth.loginLoading,
    })
  },

  mounted() {}
};
</script>
<style scoped>
.value{
    font-size: 25px;
}

.refresh{
  position: absolute;
  bottom: 5px;
  left: 2px;

}

.loadMore{
  animation:rotate infinite linear .9s;
  transition: .9s ease forward;
}
@keyframes rotate {
  100%{transform: rotate(360deg)}
}

.skeleton-text {
  width: 60%;
  height: 1.5rem;
  margin: 1%;
  border-radius: 0.25rem;
  background: #FFFFFF;
  animation: skeleton-loading 1s linear infinite alternate;

}

.skeleton-card{
  width: 220px;
  height: 120px;
  border-radius: 15px !important;
  margin: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  /*border:solid 2px ;*/
  color: black !important;
  /*background-color: #FFFFFF;*/
  animation: skeleton-loading 1s linear infinite alternate;

  /*box-shadow: 0 1px 2px hsl(0deg 0% 0% / 1100%);*/
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}


.title{
  font-size: 13px;
  text-align: center;
}

@media (max-width: 500px) {
  .value{
    font-size: 20px;
  }
  .title{
    font-size: 12px !important;
  }
}

.currency{
    font-size: 20px;
}

.display-btn{
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.mybtn{
  width: 150px;
  margin: 2%;
}

.total-referrals-style-1 {
  width: 220px;
  /*height: 120px;*/
  height: 220px;
  border-radius: 300px;
  margin: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  border:solid 2px ;
  /*color: white !important;*/
  /*background-color: #3F88C5;*/
  /*box-shadow: 4px 4px 4px 4px rgba(.2,.2,.2,.5);*/
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 1100%);

}
.total-referrals-style-2 {
  width: 220px;
  height: 120px;
  border-radius: 15px !important;
  margin: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  border:solid 2px ;
  color: black !important;
  background-color: #FFFFFF;
  /*box-shadow: 0 1px 2px hsl(0deg 0% 0% / 1100%);*/

}

</style>