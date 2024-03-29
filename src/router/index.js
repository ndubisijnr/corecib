import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";

import NProgress from "nprogress";

import store from "../store/store";
import authRoutes from './routes/auth-routes'
import dashRoutes from './routes/dashboard-routes'
import StoreUtils from "../util/baseUtils/StoreUtils";
import reportRoutes from "./routes/report-routes"
import virtualAccountRoutes from "./routes/virtual-account-routes"
import walletRoutes from "./routes/wallet-routes"
import settingsRoutes from "./routes/settings-routes"
import payBillsRoutes from "./routes/pay-bills"
import notFound from "./routes/not-found-route"
import kycRoutes from "../router/routes/kyc-routes"
import userManagementRoute from "../router/routes/user-management"
import transactions from "./routes/transactions";
import fundTransfer from "./routes/fund-transfer"
import account_routes from "./routes/account_routes";


Vue.use(VueRouter);
Vue.use(NProgress)
Vue.use(VueMeta, {
    // The component option name that vue-meta looks for meta info on.
    keyName: "page"
});

VueRouter.prototype.absUrl = function(url, newTab = true) {
    const link = document.createElement('a')
    link.href = url
    link.target = newTab ? '_blank' : ''
    if (newTab) link.rel = 'noopener noreferrer' // IMPORTANT to add this
    link.click()
}

export const baseRoutes = [];

export const routes = baseRoutes.concat(userManagementRoute,transactions,account_routes,kycRoutes,payBillsRoutes,settingsRoutes,fundTransfer,walletRoutes,virtualAccountRoutes,reportRoutes,dashRoutes,authRoutes,notFound);

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking router)
    // instead of router with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: "history",
    base: process.env.BASE_URL,
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
// Before each route evaluates...
router.beforeEach(async (routeTo, routeFrom, next) => {
    // Check if auth is required on this route
    NProgress.start();

    // Check if auth is required on this route
    // (including nested router).
    const authRequired = routeTo.matched.some(route => route.meta.authRequired);

    // console.log("Token b4: ",store.getters["getToken"])

    // If auth isn't required for the route, just continue.
    if (!authRequired) return next();
    // console.log("userManagement getter info: "+StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo))
    if (StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo).responseCode === '00') {
        return next()
    }else if (StoreUtils.rootGetters(StoreUtils.getters.auth.getUserToken) != null){
        return next()
    }
    redirectToLogin();
    // eslint-disable-next-line no-unused-vars
    function redirectToLogin() {
        next({ name: "Logon", query: { redirectFrom: routeTo.fullPath } });
    }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        // If the userManagement chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            // Complete the redirect.
                            next(...args);
                            reject(new Error("Redirected"));
                        } else {
                            resolve();
                        }
                    });
                } else {
                    // Otherwise, continue resolving the route.
                    resolve();
                }
            });
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return;
    }

    // If we reach this point, continue resolving the route.
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
