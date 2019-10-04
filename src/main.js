import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import MainPage from './pages/MainPage.vue';
import TreePage from './pages/TreePage.vue';

import store from './store/index';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage, name: 'main' },
  { path: '/back-page', component: TreePage, props: { sectionName: 'backend' } },
  { path: '/front-page', component: TreePage, props: { sectionName: 'frontend' } },
  { path: '/dev-page', component: TreePage, props: { sectionName: 'dev' } },
];


const router = new VueRouter({
  mode: 'history',
  routes,
});


new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
