import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

/* @todo: удалить не используемое */
import VueAxios from 'vue-axios';

import tree from './modules/tree/index';

Vue.use(Vuex);

/* @todo: удалить не используемое */
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  modules: {
    tree,
  },
  plugins: [createPersistedState()],
});
