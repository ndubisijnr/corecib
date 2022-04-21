<template>
  <span>
    <dashboard-layout v-if="layout === 'dashboard-layout'"></dashboard-layout>
    <auth-layout v-else></auth-layout>
  </span>
</template>

<script>
import DashboardLayout from "./views/layout/DashboardLayout";
import AuthLayout from "./views/layout/AuthLayout";
const default_layout = "default";
export default {
  components: {AuthLayout, DashboardLayout},
  mounted() {
    const userToken = localStorage.getItem('token')
    this.$store.dispatch('revalidateUser',userToken, {root:false})
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

