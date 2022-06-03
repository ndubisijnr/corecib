<template>
  <div class="sidenav navbar-vertical fixed-left navbar-expand-xs"
       @mouseenter="$sidebar.onMouseEnter()"
       @mouseleave="$sidebar.onMouseLeave()">
    <div class="scrollbar-inner" ref="sidebarScrollArea">
            <div class="sidenav-header">

           <div class="add-business" @click="toogleD()">
            <div class="">
              <span class="arrow ni ni-bold-down" id="arrow"></span>
              <div class="mt-3">
              <h4 class="elispe text-white" id="orgname">{{currentOrganisation.organisationName}}</h4>
              <h4 class="small text-white" id="id" v-if="currentOrganisation.organisationId" >{{ `Customer ID : ${Math.floor(Math.random() * (10000,10000))}${(currentOrganisation.organisationId)}${Math.floor(Math.random() * (10000,10000))}`}}</h4>
              <h4 class="small text-white " id="id"  v-else > regenerating ID... </h4>
              </div>
              <div class="mt-3 only-mobile">
                <h4 class="elispe text-white">{{currentOrganisation.organisationName}}</h4>
                <h4 class="small text-white" v-if="currentOrganisation.organisationId" >{{ `Customer ID : ${Math.floor(Math.random() * (10000,10000))}${(currentOrganisation.organisationId)}${Math.floor(Math.random() * (10000,10000))}`}}</h4>
                <h4 class="small text-white" v-else >regenerating...</h4>
              </div>
            </div>
          </div>
        <div id="k">
          <hr style="margin:5px;border: 1px solid;color: #91a0af">
            <h4 v-for="(org, index) in organisationList" :key="index" class="link-drop" @click="getId(org)"> {{org.organisationName}}</h4>
               <base-button size="md" outline @click="addbiz()" style="color:white; border:solid white;"> Sign Out</base-button>
          <!-- <button class="btn btn-primary w-100 mt-2" >Add a Bussiness</button> -->
        </div>
            </div>
      <slot></slot>
      <!-- <b-icon-arrows-collapse block v-b-toggle.collapse-a style="position:absolute;right:30px;top:40px;color:black;cursor:pointer"/> -->
      <!-- <div class="account-details" v-b-toggle.collapse-a>
         <span :class="{'spinner-border': loading}"></span> 
        <h3>{{ currentOrganisation.organisationName }}</h3>
        <h4 class="small">{{ `Customer ID : ${Math.floor(Math.random() * (10000,10000))}${(currentOrganisation.organisationId)}${Math.floor(Math.random() * (10000,10000))}`}}</h4>
        <div>
        </div>
         <b-collapse id="collapse-a">
        
             <b-list-group>
            <b-list-group-item button  @click="adminLogOut()" style="font-size:12px">Sign Out</b-list-group-item>
          </b-list-group>
  
        </b-collapse>
      </div> -->
      <div class="navbar-inner mt-4 text-white">
        <ul class="navbar-nav one text-white">
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
       toogleD(){
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
.add-business{
  /* z-index: 9999999; */
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: flex-start;*/
  padding-left: 18px;
  padding-top: 4px;
  width: 100%;
  /*background-color: #e7e7ef;*/
  background: linear-gradient(to bottom,#3F88Cd, #236395);
  /* position: absolute; */
  left: 0;
  height: 90px;
  cursor: pointer;
  transition: .2s ease-out;

}

.elispe{
  width: 105px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#k{
  text-align: justify;
  z-index: 1;
  position: absolute;
  top: 44px;
  left: 0;
  /*background-color: #e7e7ef;*/
  background-color:var(--primary);
  color: #ffffff !important;
  /*background-color: #91a0af;*/
  width: 100%;
  transition: 2s ease;
  padding: 12px;
}

/*.one{*/
/*  border: solid red;*/
/*}*/

.arrow{
  position: absolute;
  right: 20px;
  font-size: 15px;
  font-weight: 900;
  transform: rotate(0deg);
  color: #ffffff;
}

.rotate90 {
  transform: rotate(-90deg);
  transition: ease 0.4s;
}

/* .account-details{
   box-shadow: 0 1px 2px hsl(0deg 0% 0% / 10%);
      background-color: white;
      text-align: center;
      margin:10%;
      padding: 5%;
      color: #0000;
}
 */

.sidenav{
  background-color: var(--primary);
  border: none !important;
  overflow: hidden !important;
  color: white !important;
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

</style>
