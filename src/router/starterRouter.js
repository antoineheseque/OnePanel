import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/dashboard/SampleLayout.vue';
import Starter from '../layout/dashboard/SamplePage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          components: { default: Starter }
        }
      ]
    }
  ]
});
