<template>
  <div class="auth-layout-wrapper">
    <div class="auth-layout"></div>
    <div class="router-view">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "AuthLayout",
  mounted() {
     },
}
</script>

<style scoped>
.auth-layout-wrapper{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  /*gap: 80px;*/
}
.auth-layout{
  /*background-color: black;*/
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/Background.png");
  background-repeat: no-repeat;
  background-position:center;
  background-size: cover;
}

.router-view{
  width: 100%;
}
</style>