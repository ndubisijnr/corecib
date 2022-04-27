<template>
  <span>
    <span class="support"><i class="fas fa-headset"></i> Support</span>
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
:root{
  --primary: window.__env.app.primaryColor
}

.support{
  position: fixed;
  background-color: var(--primary);
  right: 100px;
  width: 100px;
  padding: 10px;
  text-align: center;
  bottom: 40px;
  border-radius: 30px;
  z-index: 1;
  color: white;
  cursor: pointer;
}

</style>

