/*
OnePanel | Basé sur la fonctionnalité bootstrap Black Dashboard:
* Lien: https://www.creative-tim.com/product/black-dashboard
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
*/
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import './registerServiceWorker'
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
