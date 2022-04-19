import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from "../store/store";


Vue.use(VueRouter);

// configure router
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes, // short for routes: routes
    linkActiveClass: 'active',
    scrollBehavior: (to, from ,savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { selector: to.hash };
      }
      return { x: 0, y: 0 };
    }
});
router.beforeEach((to, from, next) => {
    //console.log("Testingggffffg&&&&&&");
    //console.log(store.getters["getUserInfo"]);
    if (to.matched.some(route => route.meta.requiresAuth)) {
        //console.log("Testingggffffg");
        if (Object.keys(store.getters["getUserInfo"]).length > 0) {
            next();
        } else {
            next({ name: 'Login' });
        }
    }
    next();
});


export default router;
