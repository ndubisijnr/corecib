<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <span v-for="sidebar in sidebarItems" v-bind:key="sidebar.header">
          <h6 class="navbar-heading pt-2 pb-0 text-muted">{{ sidebar.header }}</h6>
          <sidebar-item v-for="item in sidebar.items" :link="{
            name: item.name,
            icon: item.icon,
            path: item.path }" v-bind:key="item.name"/>
        </span>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>
      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import DashboardSidebarItems from "../../util/sidebarUtils/DashboardSidebarItems";
import ReportSidebarItems from "../../util/sidebarUtils/ReportSidebarItems";
import SettingsSidebarItems from "../../util/sidebarUtils/SettingsSidebarItems";
import UserSidebarItems from "../../util/sidebarUtils/UserSidebarItems";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(className);
  } else {
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

console.log(DashboardSidebarItems)
let dashboardSidebarItems = DashboardSidebarItems

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import {FadeTransition} from 'vue2-transitions';

export default {
  name: "DashboardLayout",
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    },
    call() {
      console.log("heollllldfdfdfd");
    }
  },
  computed:{
    sidebarItems(){
      return [DashboardSidebarItems,ReportSidebarItems,SettingsSidebarItems,UserSidebarItems]
    },
  },
  mounted() {
    this.initScrollbar()
  }
};
</script>
<style scoped>

sidebar-link {
  color: white;
}

</style>
