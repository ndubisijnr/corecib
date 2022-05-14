<template>
  <div class="total-referrals card">
    <span class="currency">{{currency}}<span class="value"> {{value}}</span></span>
    <p class="title">{{title}}</p>
    <div class="display-btn">
        <b-button v-if="showBtn == true" :id="id" class="mybtn">{{button_title}}</b-button>
        <b-button v-if="showBtn1 == true" class="mybtn">{{button_title}}</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardView",
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
      }
};
</script>
<style scoped>
.value{
    font-size: 25px;
    color: black;
}

.currency{
    font-size: 20px
}

.title{
  color: black;
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

.total-referrals {
  width: 220px;
  height: 220px;
  border-radius: 300px;
  margin: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  border:var(--primary) solid 2px ;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 110%);

}
</style>