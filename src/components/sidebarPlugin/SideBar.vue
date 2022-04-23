<template>
  <div class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs"
       @mouseenter="$sidebar.onMouseEnter()"
       @mouseleave="$sidebar.onMouseLeave()" style="background-color: rgba(1,34,63,0.96);">
    <div class="scrollbar-inner" ref="sidebarScrollArea">
      <div class="sidenav-header">
        <div class="add-business" @click="toggleBusinessDropDown()">
          <div class="">
            <span class="arrow ni ni-bold-down text-primary" id="arrow"></span>
            <div class="d-flex">
              <span :class="{'spinner-border': loading}"></span>
              <h6 class="link-drop">{{ currentOrganisation.organisationName }}</h6>
            </div>
          </div>
        </div>
        <div id="k">
          <hr style="margin:5px;border: 1px solid;color: #91a0af">
          <h4 v-for="(organisation, index) in organisationList" :key="index" class="link-drop" @click="getId(organisation)">
            {{ organisation.organisationName }}
          </h4>
          <base-button size="md" outline @click="addBusiness()" style="color:white; border:solid white;"> Add a Business
          </base-button>
          <!-- <button class="btn btn-primary w-100 mt-2" >Add a Business</button> -->
        </div>
      </div>
      <slot></slot>
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
    document.getElementById("k").style.display = 'none'

  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style scoped>
.add-business {
  z-index: 9999999;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: flex-start;*/
  padding-left: 18px;
  padding-top: 20px;
  width: 100%;
  /*background-color: #e7e7ef;*/
  background-color: rgba(2, 32, 61, 0.99);
  position: absolute;
  left: 0;
  height: 50px;
  cursor: pointer;
  transition: .2s ease-out;

}

#k {
  text-align: justify;
  z-index: 1;
  position: absolute;
  top: 44px;
  left: 0;
  /*background-color: #e7e7ef;*/
  background-color: rgba(2, 32, 61, 0.99);
  /*background-color: #91a0af;*/
  width: 100%;
  transition: 2s ease;
  padding: 12px;
}

.arrow {
  position: absolute;
  right: 20px;
  font-size: 12px;
  font-weight: 900;
  transform: rotate(0deg);
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
