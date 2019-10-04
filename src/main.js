import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import BackPage from './pages/BackPage.vue';
import FrontPage from './pages/FrontPage.vue';
import DevPage from './pages/DevPage.vue';
/* @todo: мог быть 1 компонент TreePage*/
import TreePage from './pages/TreePage.vue';
import MainPage from './pages/MainPage.vue';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage, name: 'main' },
  /* @todo: в компоненты можно прокидывать пропы из роутера */
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
