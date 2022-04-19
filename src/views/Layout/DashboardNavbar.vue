<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{'nav-bar-head': type === 'default'}"
  >
    <!-- Sidenav toggler begin -->
    <!-- ml-auto -->
    <div class="mr-5">
      <div class="sidenav-toggler d-none d-xl-block"
           :class="{'active': !$sidebar.isMinimized }"
           @click="minimizeSidebar">
        <div class="sidenav-toggler-inner">
          <i class="sidenav-toggler-line"></i>
          <i class="sidenav-toggler-line"></i>
          <i class="sidenav-toggler-line"></i>
        </div>
      </div>
    </div>
    <!-- sidebar toggler-end -->
    <!-- Search form -->
<!--    <form class="navbar-search form-inline mr-sm-3"-->
<!--          :class="{'navbar-search-light': type === 'default', 'navbar-search-dark': type === 'light'}"-->
<!--          id="navbar-search-main">-->
<!--      <div class="form-group mb-0">-->
<!--        <div class="input-group input-group-alternative input-group-merge">-->
<!--          <div class="input-group-prepend">-->
<!--            <span class="input-group-text"><i class="fas fa-search"></i></span>-->
<!--          </div>-->
<!--          <input class="form-control" placeholder="Search" type="text">-->
<!--        </div>-->
<!--      </div>-->
<!--      <button type="button" class="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">-->
<!--        <span aria-hidden="true">×</span>-->
<!--      </button>-->
<!--    </form>-->
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div class="pr-3 sidenav-toggler"
             :class="{active: $sidebar.showSidebar, 'sidenav-toggler-dark': type === 'default', 'sidenav-toggler-light': type === 'light'}"
             @click="toggleSidebar">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
<!--      <li class="nav-item d-sm-none">-->
<!--        <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">-->
<!--          <i class="ni ni-zoom-split-in"></i>-->
<!--        </a>-->
<!--      </li>-->

<toggle-button v-model="switchBtn" :value="true"  :width="100" :height="30" :font-size="10" :color="{checked: '#75c791', unchecked: '#c02026'}"
               :labels="{unchecked: 'Test Mode', checked: 'Live Mode'}" @change="onChecked, swithApi()" />

      <base-dropdown class="nav-item"
                     tag="li"
                     title-classes="nav-link"
                     title-tag="a"
                     icon="ni ni-bell-55"
                     menu-classes="dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden">
        <p class="text-center text-dark pt-3">No Notifications Here.</p>

      </base-dropdown>
      <base-dropdown menu-classes="dropdown-menu-lg dropdown-menu-dark bg-default dropdown-menu-right"
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link"
                     icon="ni ni-ungroup">
<!--        <template>-->
<!--          <div class="row shortcuts px-4">-->
<!--            <a href="#!" class="col-4 shortcut-item">-->
<!--                    <span class="shortcut-media avatar rounded-circle bg-gradient-red">-->
<!--                      <i class="ni ni-calendar-grid-58"></i>-->
<!--                    </span>-->
<!--              <small>Calendar</small>-->
<!--            </a>-->
<!--            <a href="#!" class="col-4 shortcut-item">-->
<!--                    <span class="shortcut-media avatar rounded-circle bg-gradient-orange">-->
<!--                      <i class="ni ni-email-83"></i>-->
<!--                    </span>-->
<!--              <small>Email</small>-->
<!--            </a>-->
<!--            <a href="#!" class="col-4 shortcut-item">-->
<!--                    <span class="shortcut-media avatar rounded-circle bg-gradient-info">-->
<!--                      <i class="ni ni-credit-card"></i>-->
<!--                    </span>-->
<!--              <small>Payments</small>-->
<!--            </a>-->
<!--            <a href="#!" class="col-4 shortcut-item">-->
<!--                    <span class="shortcut-media avatar rounded-circle bg-gradient-green">-->
<!--                      <i class="ni ni-books"></i>-->
<!--                    </span>-->
<!--              <small>Reports</small>-->
<!--            </a>-->
<!--            <a href="#!" class="col-4 shortcut-item">-->
<!--                    <span class="shortcut-media avatar rounded-circle bg-gradient-purple">-->
<!--                      <i class="ni ni-pin-3"></i>-->
<!--                    </span>-->
<!--              <small>Maps</small>-->
<!--            </a>-->
<!--            <a href="#!" class="col-4 shortcut-item">-->
<!--                    <span class="shortcut-media avatar rounded-circle bg-gradient-yellow">-->
<!--                      <i class="ni ni-basket"></i>-->
<!--                    </span>-->
<!--              <small>Shop</small>-->
<!--            </a>-->
<!--          </div>-->
<!--        </template>-->
        <p class="text-center text-white pt-3">Nothing Here.</p>
      </base-dropdown>
    </ul>
    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <base-dropdown menu-on-right
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link pr-0">
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-3.jpg">
                  </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{user.customerFirstName}} {{user.customerLastName}} </span><br>
              <span class="mb-0 text-sm  font-weight-bold">{{organisation.organisationName}} </span>
            </div>
          </div>
        </a>

        <template>

          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </div>
          <a class="dropdown-item">
            <i class="ni ni-user-run"></i>
            <span @click="adminLogOut()">Logout</span>
          </a>

        </template>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { BaseNav } from '@/components';
import { mapState, mapActions, mapGetters } from "vuex";
import { ToggleButton } from 'vue-js-toggle-button'
export default {
  name:"DashboardNavbar",
  components: {
    BaseNav,
    ToggleButton
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
    }
  },
  // computed: {
  //   routeName() {
  //     const { name } = this.$route;
  //     return this.capitalizeFirstLetter(name);
  //   }
  // },
  data() {
    return {
      switchBtn:false,
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  computed:{
           ...mapState({
     user: state => state.auth.userInfo,
     organisation: state => state.auth.organisation
    }),
    ...mapActions(['logOut']),
    ...mapGetters([""]),

    },
  methods: {
    adminLogOut(){
      this.$store.dispatch("logOut",{
          customerEmail: this.user.customerEmail,
        },{ root: false })

    },
    swithApi(){
      this.$store.dispatch('switchMode',this.switchBtn,{ root: false })
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

    switch(){
      this.$store.dispatch('switchMode')
    }

  },
  mounted() {
    this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth
    this.minimizeSidebar()
  },
};
</script>

<style scoped>
.nav-bar-head{
  background-color: #f8f9fe;
}
</style>
