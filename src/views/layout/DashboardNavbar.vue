<template>
  <div class="bottom">
    <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{ 'nav-bar-head': type === 'default' }"
    :style="isdarkMode === 'false' ? {backgroundColor:'#FFFFFF'}:{backgroundColor:'#181818'}"
  >
    <div class="mr-5 nav-bottom">
      <div
        class="sidenav-toggler d-none d-xl-block"
        :class="{ active: !$sidebar.isMinimized }"
        @click="minimizeSidebar"
      >
        <div class="sidenav-toggler-inner">
          <i class="sidenav-toggler-line"></i>
          <i class="sidenav-toggler-line"></i>
          <i class="sidenav-toggler-line"></i>
        </div>
      </div>
    </div>
    <ul class="navbar-nav align-items-center ml-md-auto">
      
      <li class="nav-item d-xl-none">
        <div
          class="pr-3 sidenav-toggler"
          :class="{
            active: $sidebar.showSidebar,
            'sidenav-toggler-dark': type === 'default',
            'sidenav-toggler-light': type === 'light',
          }"
          @click="toggleSidebar"
        >
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
<!--      <div @click="switchTodarkMode" style="cursor:pointer;border:solid #ddd;margin-right:10px;display:flex;justify-content:center;align-items:center;width: 30px;height:30px;border-radius: 360px;background-color: #FFFFFF">-->
<!--        <img src="../../assets/swithmode.png" width="20" />-->
<!--      </div>-->
      <span :class="{ 'spinner-border': loading }"></span>&nbsp;
       <div class="text-center" v-if="organisation.length > 0">
                <span style="font-size:12px">Switch to {{stage == 'Live' ? 'Test' : 'Live' }} </span>
                <br>
                <toggle-button
                  :value="toggleBtnValue"
                  :width="60"
                  :height="20"
                  :sync="true"
                  :font-size="10"
                  :color="{checked:'#75c791', unchecked:'#EE9BA9'}"
                  :labels="{ unchecked: stage, checked: stage }"
                  @change="switchApi()"
                />
              </div>
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <div class="media align-items-center">
            <i class="fa fa-user-circle nav-profile" :style="isdarkMode === 'false' ?{color:primaryColor} :{color:'#FFFFFF'}"></i>
          </div>
        </a>
        <div>
          <h3 class="text-dark text-center m-1 small">{{ user.customerFirstName }} {{ user.customerLastName }} </h3>
          <b-list-group class="m-3 text-left small">
            <b-list-group-item button disabled>{{user.customerEmail}}</b-list-group-item>
<!--            <b-list-group-item button disabled>{{user.customerEmail}}</b-list-group-item>-->
<!--            <router-link to="/kyc-verifications" v-if="organisation.length > 0"><b-list-group-item button>KYC Verification </b-list-group-item></router-link>-->
            <a href="https://www.corebanknigeria.com/contact" target="_blank"> <b-list-group-item button>Support</b-list-group-item></a>
            <b-list-group-item button  @click="adminLogOut()">Log Out</b-list-group-item>
          </b-list-group>
        </div>
      </base-dropdown>
    </ul>

  </base-nav>
  </div>
</template>
<script>
import { BaseNav } from "@/components";
import { mapState, mapActions, mapGetters } from "vuex";
import { ToggleButton } from "vue-js-toggle-button";
import OrganisationRequest from "../../model/request/OrganisationRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "DashboardNavbar",
  components: {
    BaseNav,
    ToggleButton,
  },
  props: {
    type: {
      type: Boolean,
      default: false, // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  data() {
    return {
      toggleBtnValue: true,
      switchStageModel: OrganisationRequest.switchStage,
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
      primaryColor: window.__env.app.primaryColor
    };
  },
  computed: {
    darkMode(){
      return localStorage.darkMode
    },
    ...mapState({
      user: (state) => state.auth.userInfo,
      organisation: (state) => state.auth.allOrganisations,
      loading: (state) => state.auth.loading,
      isdarkMode:state => state.auth.darkMode,


    }),
    
    stage() {
      let testLive = (
        StoreUtils.rootGetters(StoreUtils.getters.auth.getStage)
          ? StoreUtils.rootGetters(StoreUtils.getters.auth.getStage)
          : "-"
      ).replace("PROD", "Live").replace("DEV", "Test");
      this.toggleBtnValue = testLive === "Live";
      return testLive;
    },
  },

  methods: {
    switchTodarkMode(){
      if(localStorage?.darkMode == 'true') {
        localStorage.darkMode = 'false'
      }else{
        localStorage.darkMode = 'true'
      }
      StoreUtils.commit(StoreUtils.mutations.auth.updateDarkMode, localStorage.darkMode)
    },
    adminLogOut() {
      StoreUtils.dispatch(StoreUtils.actions.auth.logOut, {customerEmail: this.user.customerEmail})
    },
    switchApi() {
      if (this.toggleBtnValue === true)
        this.switchStageModel.organisationStage = "DEV";
      else this.switchStageModel.organisationStage = "PROD";
      StoreUtils.dispatch(
        StoreUtils.actions.auth.updateStage,
        this.switchStageModel
      ).then(()=>{});
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },

    switch() {
      this.$store.dispatch("switchMode");
    },
  },

  mounted() {
    this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth;
    this.minimizeSidebar();
  },

};
</script>

<style scoped>
.nav-bar-head {
  background-color: #f8f9fe;
}

.nav-profile{
  font-size:40px;
}
.profile-drop-down li{
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: solid 2px;

}

.bottom{
  border-bottom-color:#3F88C5;
  background:red;
}

/*  */
</style>
