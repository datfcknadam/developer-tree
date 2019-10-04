import api from '../api';

export default {
  loadFront({ commit }) {
    api.get('frontend', (response) => { commit('SET_FRONT', response.data); });
  },
  loadBack({ commit }) {
    api.get('backend', (response) => { commit('SET_BACK', response.data); });
  },
  loadDev({ commit }) {
    api.get('dev', (response) => { commit('SET_DEV', response.data); });
  },
  /* @todo: мог бы быть 1 метод */
  loadData({ commit }, sectionName) {
    api.get(sectionName, (response) => { commit('SET_DATA', { sectionName, data: response.data }); });
  },
};
