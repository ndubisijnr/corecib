<template>
  <div class="wrapper" :style="isdarkMode === 'false' ? {backgroundColor:'#FFFFFF'}:{backgroundColor:'#181818'}">
    <side-bar>
      <template slot="links">
        <span class="header" v-for="sidebar in sidebarItems" v-bind:key="sidebar.header">
            <h6 class="sidebar-headers">{{ sidebar.header }} </h6>

            <span v-for="item in sidebar.items" v-bind:key="item.name">
              <div>
                <sidebar-item :target="item.target" :link="{
                  name: item.name,
                  icon: item.icon,
                  path: item.path }"/>
              </div>

          </span>

<!--            <span  v-if="sidebar.items.length <= 2"  v-for="item in sidebar.items" v-bind:key="item.name">-->
<!--              <div >-->
<!--                <sidebar-item v-if="!item.path.includes('http')" :target="item.target" :link="{-->
<!--                  name: item.name,-->
<!--                  icon: item.icon,-->
<!--                  path: item.path }"/>-->

<!--                <a v-else :href="item.path" target="_blank" class="nav-link pt-2 pb-0 text-white"><i :class="item.icon"></i> {{item.name}}</a>-->
<!--              </div>-->
<!--          </span>-->
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
    </div>
  </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import DashboardSidebarItems from "../../util/sidebarUtils/DashboardSidebarItems";
import ReportSidebarItems from "../../util/sidebarUtils/ReportSidebarItems";
import SettingsSidebarItems from "../../util/sidebarUtils/SettingsSidebarItems";
// import UserSidebarItems from "../../util/sidebarUtils/UserSidebarItems";
// import WalletActivitiesItems from "../../util/sidebarUtils/WalletActivitiesItems";
import DocumentationSidebarItems from "@/util/sidebarUtils/DocumentationSidebarItems";
import SkeletonLoader1 from "../../components/loader/SkeletonLoader1";
import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import {FadeTransition} from 'vue2-transitions';
import BillsSidebarItems from "../../util/sidebarUtils/BillsSidebarItems";
import {mapState} from "vuex";

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
export default {
  name: "DashboardLayout",
  data(){
    return{
      toggle:false
    }
  },
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
     SkeletonLoader1
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    },

    dropdown(){
      const arrow = document.getElementById('arrow')
      const drop = document.getElementById('dropdown-content')
      this.toggle = !this.toggle
      if(this.toggle){
        drop.classList.remove('show')
        drop.classList.add('hide')
      }else{
        drop.classList.remove('hide')
        drop.classList.add('show')

      }
    }
  },
  computed:{
    sidebarItems(){
      return [DashboardSidebarItems,DocumentationSidebarItems, ReportSidebarItems,BillsSidebarItems,SettingsSidebarItems]
    },
    ...mapState({
      isdarkMode:state => state.auth.darkMode,

    })
  },
  mounted() {
    // this.initScrollbar()
  }
};
</script>
<style scoped>
.header{
  /*border: solid;*/
}
.sidebar-headers{
  color: #Fefefe;
  font-size: 14px;
  margin: 0;
  /*text-decoration: underline;*/
  /*border: solid #236395 1px;*/
  /*color: #236395;*/
  text-align: left;
  padding: 15px;
  /*padding-top: 15px;*/
  font-weight: 500;
  letter-spacing: 1px;
  /*background-color: rgba(35, 99, 149, 0.18);*/
}

.hide{
  height: 0;
  cursor: pointer;
  transition: .5s ease;
  opacity: 0;
}
.wrapper{
  height: auto;
  /*border: solid;*/
  /*overflow-y: scroll;*/
  width: 100%;
}

.dropdown-content{}

.show{
  height:5vh;
  opacity: 1;
  transition: .5s ease;
  z-index: 1;
  border: solid black;
}

.rotate{
  transform: rotate(-90deg);
  transition: .5s ease;
  cursor: pointer;
}

.arrow{
  font-size: 12px;
  font-weight: 900;
  transform: rotate(0deg);
  color: #ffffff;
  transition: .5s ease;
  /*border: solid;*/
}

.content{
  /*background-image: url("https://quikgem-repo.s3.amazonaws.com/15410+1.png");*/
  /*background-position: center;*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
  min-height: 100vh;

}
</style>
