import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import store from './store/store';
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
import './filters'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// router setup
import router from './router'
import "animate.css";

// plugin setup
Vue.use(Toast)
Vue.use(VueCountryCode);
Vue.use(vueAwesomeCountdown, 'vac')
Vue.use(VueFakeInput);
Vue.use(DashboardPlugin);
Vue.use(ToggleButton);
Vue.use(Datetime);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
Vue.use(vSelect);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(TabPane);

const moment = require('moment')
require('moment/locale/en-gb')
Vue.use(require('vue-moment'), { moment })
Vue.prototype.moment = moment
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD-MMM-YYYY')
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router
});
