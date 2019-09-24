import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import vuetify from './plugins/vuetify';

import BackPage from './pages/BackPage.vue';
import FrontPage from './pages/FrontPage.vue';
import MainPage from './pages/MainPage.vue';
import DevPage from './pages/DevPage.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage, name: 'main' },
  { path: '/back-page', component: BackPage },
  { path: '/front-page', component: FrontPage },
  { path: '/dev-page', component: DevPage },
];


const router = new VueRouter({
  mode: 'history',
  routes,
});


new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
