<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "AuthLayout",
  created() {
    if (localStorage.token) {
      StoreUtils.dispatch(StoreUtils.actions.auth.revalidateUser, localStorage.token)
    }
  },
  mounted() {
    // if(this.$route.param.referralCode != null)
    //   localStorage.referralCode = this.$route.param.referralCode
  },
}
</script>

<style scoped>

</style>