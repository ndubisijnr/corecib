<template>
  <div>
    <router-view></router-view>
    <div class="text-center text-dark"><p>© 2020 BizGem.</p></div>
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
  }
}
</script>

<style scoped>

</style>