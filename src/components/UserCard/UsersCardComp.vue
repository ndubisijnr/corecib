<template>
  <div class="onboarding-cards">
    <div class="onboarding-card">
      <div class="onboarding-card-icon">
        <span>0</span>
      </div>
      <h5 class="onboarding-card-description">Total Users</h5>
    </div>
    <div class="onboarding-card">
      <div class="onboarding-card-icon">
        <span>0</span>
      </div>
      <h5 class="onboarding-card-description">Active Users</h5>
    </div>
    <div class="onboarding-card">
      <div class="onboarding-card-icon">
        <span>0</span>
      </div>
      <h5 class="onboarding-card-description">Pending Users</h5>
    </div>
    <div class="onboarding-card">
      <div class="onboarding-card-icon">
        <span>0</span>
      </div>
      <h5 class="onboarding-card-description">Delected</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersCardComp"
}
</script>

<style scoped>
.onboarding-cards {
  /*display: -webkit-box;
  display: -ms-flexbox;*/
  display: flex;
  /*-webkit-box-pack: center;*/
  /*-ms-flex-pack: center;*/
  justify-content: space-between;
}
.onboarding-card {
  background: #fff;
  border: solid 1px #f2f2f2;
  border-radius: 3px;
  display: block;
  width: 250px;
  height: auto;
  margin-bottom: 25px;
  padding: 10px;
  text-align: center;
}
.onboarding-card-icon {
  height: 60px;
  width: 60px;
  /*display: -webkit-box;*/
  /*display: -ms-flexbox;*/
  display: flex;
  -webkit-box-pack: center;
  /*-ms-flex-pack: center;*/
  justify-content: center;
  -webkit-box-align: center;
  /*-ms-flex-align: center;*/
  align-items: center;
  border-radius: 50%;
  background-color: #f1fbf4;
  margin: 0 auto 10px;
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
</style>
