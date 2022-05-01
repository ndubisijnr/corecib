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
     },
}
</script>

<style scoped>

</style>