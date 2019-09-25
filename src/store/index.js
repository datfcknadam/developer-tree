import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import tree from './modules/tree/index';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  modules: {
    tree,
  },
  plugins: [createPersistedState()],
});
