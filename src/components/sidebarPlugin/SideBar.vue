<template>
  <div class="sidenav  navbar-vertical fixed-left navbar-expand-xs"
       @mouseenter="$sidebar.onMouseEnter()"
       @mouseleave="$sidebar.onMouseLeave()">
    <div class="scrollbar-inner" ref="sidebarScrollArea">
      <slot></slot>
      <!-- <b-icon-arrows-collapse block v-b-toggle.collapse-a style="position:absolute;right:30px;top:40px;color:black;cursor:pointer"/> -->
      <div class="account-details" v-b-toggle.collapse-a>
        <!-- <span :class="{'spinner-border': loading}"></span> -->
        <h3>{{ currentOrganisation.organisationName }}</h3>
        <h4 class="small">{{ `Customer ID : ${Math.floor(Math.random() * (10000,10000))}${(currentOrganisation.organisationId)}${Math.floor(Math.random() * (10000,10000))}`}}</h4>
        <div>
        </div>
         <b-collapse id="collapse-a">
        
             <b-list-group>
            <b-list-group-item button  @click="adminLogOut()" style="font-size:12px">Sign Out</b-list-group-item>
          </b-list-group>
  
        </b-collapse>
      </div>
      <div class="navbar-inner">
        <ul class="navbar-nav one">
          <slot name="links">
            <sidebar-item
                v-for="(link, index) in sidebarLinks"
                :key="link.name + index"
                :link="link"
            >
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

export default {
  name: 'sidebar',
  data() {
    return {

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

    toggleBusinessDropDown() {
      let x = document.getElementById("k");
      let y = document.getElementById("arrow")
      if (x.style.display === "none") {
        x.style.display = "block";
        y.classList.remove("rotate0");
        y.classList.add("rotate-180");
      } else {
        x.style.display = "none";
        y.classList.add("rotate0");
        y.classList.remove("rotate-180");
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.auth.userInfo,
      loading: state => state.auth.loading
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

  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style scoped>

.account-details{
   box-shadow: 0 1px 2px hsl(0deg 0% 0% / 10%);
      background-color: white;
      text-align: center;
      margin:10%;
      padding: 5%;
      color: #0000;
}
.sidenav{
  background-color: rgba(1,34,63,0.96);
  border: none !important;
  overflow: hidden !important;
} 



.rotate90 {
  transform: rotate(-90deg);
  transition: ease 0.4s;
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

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.rotate-90 {
  transform: rotate(90deg);
  transition: ease 0.4s;
}

.link-drop {
  padding-left: 19px;
  margin-bottom: 5px;
  cursor: pointer;
  color: white;
  list-style: none;
  text-align: left;
}

.link-drop:hover {
  color: #736f6f;
}
</style>
