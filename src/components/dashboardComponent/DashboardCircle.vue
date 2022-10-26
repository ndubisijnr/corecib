<template>
  <div :class="dashboardCardStyle" class="card" :style="{borderColor:primaryColor}" id="dashboardCard">
    <p v-if="isLoading" class="skeleton-text"></p>
    <p v-if="isLoading" class="skeleton-text"></p>
    <span v-if="!isLoading" class="currency">{{currency}}<span class="value"> {{value}}</span></span>
    <p v-if="!isLoading" class="title">{{title}}</p>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "DashboardView",
  data(){
    return{
      primaryColor:window.__env.app.primaryColor,
      styleType:2
    }
  },
  props:{
      value:{
          type:[String,Number]
      },
      title:{
          type:String
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

  computed:{
    dashboardCardStyle(){
      if(this.styleType === 2) return "total-referrals-style-2"
      return "skeleton-card"
    },

    ...mapState({
      isLoading:state => state.auth.loginLoading
    })
  },

  mounted() {
   console.log()
  }
};
</script>
<style scoped>
.value{
    font-size: 25px;
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
    font-size: 20px
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