<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <span v-for="sidebar in sidebarItems" v-bind:key="sidebar.header">
          <h6 class="navbar-heading pt-2 pb-0 text-white">{{ sidebar.header }}</h6>
          <span v-for="item in sidebar.items" v-bind:key="item.name">
            <sidebar-item v-if="!item.path.includes('http')" :target="item.target" :link="{
              name: item.name,
              icon: item.icon,
              path: item.path }"/>

            <a v-else :href="item.path" target="_blank" class="nav-link pt-2 pb-0 text-white"><i :class="item.icon"></i> {{item.name}}</a>

          </span>
        </span>
      </template>
    </side-bar>
    <div class="main-content animate__fadeIn animate__animated">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>
      <div @click="$sidebar.displaySidebar(false)" class="content">
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
import DocumentationSidebarItems from "@/util/sidebarUtils/DocumentationSidebarItems";

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

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import {FadeTransition} from 'vue2-transitions';
import BillsSidebarItems from "../../util/sidebarUtils/BillsSidebarItems";
import {mapState} from "vuex";

export default {
  name: "DashboardLayout",
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    },
  },
  computed:{
    sidebarItems(){
      return [DashboardSidebarItems,DocumentationSidebarItems,ReportSidebarItems,BillsSidebarItems,SettingsSidebarItems]
    },
    ...mapState({

    })
  },
  mounted() {
    // this.initScrollbar()
  }
};
</script>
<style scoped>
.wrapper{
  /*background-color: #070606D8;*/
}

.content{
  /*background-image: url("https://quikgem-repo.s3.amazonaws.com/15410+1.png");*/
  /*background-position: center;*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
  height: 100vh;
}
</style>
