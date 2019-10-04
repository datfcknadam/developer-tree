import api from '../api';

export default {
  loadData({ commit }, sectionName) {
    api.get(Object.values(sectionName), (response) => { commit('SET_DATA', { sectionName, data: response.data }); });
  },
};
