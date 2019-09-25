import api from '../api';

export default {
  loadFront({ commit }) {
    api.get('frontend', (response) => { commit('SET_FRONT', response.data); });
    console.log('ds');
  },
};
