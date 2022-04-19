/*!

=========================================================
* Vue Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import store from './store/store';
import BootstrapVue from "bootstrap-vue";
//import Notifications from 'vue-notification';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import { Select, Option, DatePicker, Tabs, TabPane } from 'element-ui'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import ToggleButton from 'vue-js-toggle-button'
import VueFakeInput from 'vue-fake-input';
import vueAwesomeCountdown from 'vue-awesome-countdown'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueCountryCode from "vue-country-code";




import App from './App.vue';

// router setup
import router from './routes/router';
// plugin setup
Vue.use(Toast)
Vue.use(VueCountryCode);
Vue.use(vueAwesomeCountdown, 'vac')
Vue.use(VueFakeInput);
Vue.use(DashboardPlugin);
Vue.use(ToggleButton);
Vue.use(Datetime);
Vue.use(BootstrapVue);
Vue.use(vSelect);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(TabPane);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router
});
