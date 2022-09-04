<template>
  <div class="nav">
    <router-link v-for="i in getAllRoute" :key="i" :to="i.path"> / <span class="link">  {{i.name}}  </span> /</router-link>
  </div>
</template>

<script>
import {routes} from "../router";


export default {
  name: "RouteNav",

  computed:{

    getAllRoute() {
      let route = routes.map((item) => item)
      let link = this.$router.currentRoute.fullPath.split("/")[1]
      let filteredRoute = route.filter(it => it.path.includes(link))
      filteredRoute.pop()
      return filteredRoute
      },

  },
}

</script>

<style scoped>
.link{
  color: #2b2b58;
  font-size: 14px;
  padding: 5px;
  text-decoration: underline;
}

.nav{
  padding: 1%;
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
  width: 100%;
  /*position: absolute;*/
  /*display: flex;*/
  /*justify-content: center;*/
  left: 0;
  /*text-align: center;*/


}


/*.export-btn-area{*/
/*  gap: 10px;*/
/*  padding: 1%;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  background-color: #ffffff;*/

/*}*/
</style>