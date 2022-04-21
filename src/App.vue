<template>
  <span>
    <dashboard-layout v-if="layout === 'dashboard-layout'"></dashboard-layout>
    <auth-layout v-else></auth-layout>
  </span>
</template>

<script>
import DashboardLayout from "./views/layout/DashboardLayout";
import AuthLayout from "./views/layout/AuthLayout";
import StoreUtils from "./util/baseUtils/StoreUtils";
const default_layout = "default";
export default {
  components: {AuthLayout, DashboardLayout},
  mounted() {
    const userToken = localStorage.getItem('token')
    StoreUtils.dispatch(StoreUtils.actions.auth.revalidateUser, userToken)
  },
  computed:{
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  }
}
</script>

<style>


</style>

