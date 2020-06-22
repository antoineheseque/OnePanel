
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
import router from "./router/index";
import BlackDashboard from "./plugins/blackDashboard";
import './registerServiceWorker'

const VueMasonryPlugin = require('vue-masonry').VueMasonryPlugin

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(VueMasonryPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");