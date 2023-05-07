<template>
  <div class="sidenav navbar-vertical fixed-left navbar-expand-xs"
       @mouseenter="$sidebar.onMouseEnter()"
       @mouseleave="$sidebar.onMouseLeave()" :style="{backgroundColor:'#413d52'}">
    <div class="scrollbar-inner" ref="sidebarScrollArea">
      <div class="sidenav-header">
        <div class="add-business" @click="toogleD()" :style="{backgroundColor:'#413d52'}">
              <div class="">
                <span class="arrow ni ni-bold-down" id="arrow"></span>
                <div class="mt-3" v-if="allOrganisation.length > 0">
                <h4 class="elispe text-white" id="orgname">{{currentOrganisation.organisationName}}</h4>
                <h4 class="small text-white" id="id" v-if="currentOrganisation.organisationId" >{{ `Customer ID : ${Math.floor(Math.random() * (10000,10000))}${(currentOrganisation.organisationId)}${Math.floor(Math.random() * (10000,10000))}`}}</h4>
                <h4 class="small text-white "  v-else > regenerating ID... </h4>
                </div>
                <div class="mt-3 only-mobile" v-if="allOrganisation.length > 0">
                  <h4 class="elispe text-white">{{currentOrganisation.organisationName}}</h4>
                  <h4 class="small text-white" v-if="currentOrganisation.organisationId" >{{ `Customer ID : ${Math.floor(Math.random() * (10000,10000))}${(currentOrganisation.organisationId)}${Math.floor(Math.random() * (10000,10000))}`}}</h4>
                  <h4 class="small text-white" v-else >regenerating...</h4>
                </div>
              </div>
        </div>
        <div id="k" :style="{background:primaryColor}">
            <ul class="add-business-ul">
              <li class="add-business-li" v-for="(item, index) in allOrganisation" :key="index" v-if="item.organisationName !== currentOrganisation.organisationName " @click="switchBusiness(item.organisationId)">
                {{item.organisationName}} {{index === 0 ? '⭐' : null}}
              </li>
            </ul>
            <div class="pl-3 pb-2 p-2 mt--2">
              <b-button size="sm" @click="showBusinessForm(true)">Add New Business</b-button>
            </div>
          </div>
      </div>
      <slot></slot>
      <div class="mt-3 navbar-inner" v-if="allOrganisation.length > 0" style="transform: scale(.9)">
        <ul class="navbar-nav">
          <slot name="links">
            <sidebar-item
                v-for="(link, index) in sidebarLinks"
                :key="link.name + index"
                :link="link">
              <sidebar-item
                  v-for="(subLink, index) in link.children"
                  :key="subLink.name + index"
                  :link="subLink"
              >
              </sidebar-item>
            </sidebar-item>

          </slot>
        </ul>
        <slot name="links-after"></slot>
      </div>
    </div>
  </div>

</template>
<script>


import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import OrganisationRequest from "../../model/request/OrganisationRequest";
import WalletRequest from "../../model/request/WalletRequest";


export default {
  name: 'sidebar',
  data() {
    return {
      primaryColor:window.__env.app.primaryColor,
      primaryColorGradient: window.__env.app.primaryColorGradient,
      // showBusinessForm:false,
      organisationRequest:OrganisationRequest.readOrganisationById,
      readOrganisation:OrganisationRequest.readOrganisationByUserId,
      allTransactionsModel: WalletRequest.readAllWalletTransaction,
    }
  },
  props: {
    title: {
      type: String,
      default: 'Creative Tim',
      description: 'Sidebar title'
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title'
    },
    logo: {
      type: String,
      default: '/img/theme/LOGOTEXT.png',
      description: 'Sidebar app logo'
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
          "List of sidebar links as an array if you don't want to use components for these."
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
          'Whether sidebar should autoclose on mobile when clicking an item'
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  methods: {
    showBusinessForm(value){
      StoreUtils.commit(StoreUtils.mutations.auth.updateForm, value)
    },

    switchBusiness(value){
      localStorage.organisationId = value
      StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationById)
      // location.reload()
      const userToken = localStorage.getItem('token')
      StoreUtils.dispatch(StoreUtils.actions.auth.revalidateUser, userToken)
    },

    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },

    addBusiness() {
      this.$router.push({name: "NewBusiness"})
    },

    getId(payload) {
      console.log(JSON.stringify(payload.organisationId));
      this.$store.dispatch('switchOrganisation', payload, {root: false})
    },
    toogleD(){
      let x = document.getElementById("k");
      let y = document.getElementById("arrow")
      if (x.style.display === "none") {
        x.style.display = "block";
        x.classList.add('transition')
        y.classList.remove("rotate0");
        y.classList.add("rotate-180");
      } else {
        x.style.display = "none";
        x.classList.add('transition')
        x.style.transition = '2s ease-out-in infinite'
        y.classList.add("rotate0");
        y.classList.remove("rotate-180");
      }
    }

  },
  computed: {
    ...mapState({
      userInfo: state => state.auth.userInfo,
      loading: state => state.auth.loading,
      allOrganisation:state => state.auth.allOrganisations,
      isdarkMode:state => state.auth.darkMode
    }),
    stage(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getStage)
    },
    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },
    organisationList(){
      return this.userInfo.organisations.filter(it => it.organisationId !== this.currentOrganisation.organisationId)
    }

  },
  mounted() {
    this.$sidebar.isMinimized = this.$sidebar.breakpoint < window.innerWidth
    this.minimizeSidebar()
    document.getElementById("k").style.display = 'none'
    // if(this.isdarkMode) document.getElementById('wrapper').style.backgroundColor = '#181818'
    // document.getElementById('wrapper').style.backgroundColor = '#f6f6f6'
    // document.getElementById('cardd').style.backgroundColor = '#FFFFFF'


  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>


<style scoped>
.add-business{
  padding-left: 30px;
  padding-top: 4px;
  width: 100%;
  /*background: linear-gradient(to bottom,#3F88Cd, #236395);*/
  left: 0;
  height: 90px;
  cursor: pointer;
  transition: .2s ease-out;

}

.transition{
  transition: ease-in-out 2s;
}
.add-business-li{
  list-style: circle !important;
  padding-top: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: .5s ease-out;

}

.add-business-li:hover{
  transform: scaleX(1.1);
  /*background: red;*/
  transition: .1s ease-in;
}
.add-business-ul{
}


.elispe{
  width: 105px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#k{
  z-index: 1;
  position: relative;
  /*top: 44px;*/
  left: 0;
  /*background-color: #e7e7ef;*/
  color: #ffffff !important;
  /*background-color: #91a0af;*/
  width: 100%;
  transition: 2s ease-out infinite;
  /*padding: 12px;*/
}

.arrow{
  position: absolute;
  right: 20px;
  font-size: 15px;
  font-weight: 900;
  transform: rotate(0deg);
  color: #ffffff;
}


.sidenav{
  border: none !important;
  overflow: scroll;
  color: white !important;
}

.sidenav::-webkit-scrollbar {
  display: none;
}

.sidenav::-webkit-scrollbar:hover{
  display: block;
}

.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
  border: .25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border .75s linear infinite;
  animation: spinner-border .75s linear infinite;
}
.only-mobile{
  display: none;
}
@media(max-width:999px){
  .only-mobile{
    display:block;
  }
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.link-drop {
  padding-left: 19px;
  margin-bottom: 5px;
  cursor: pointer;
  color: white;
  list-style: none;
  text-align: left;
}

</style>
