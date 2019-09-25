import mutations from './mutations';
import actions from './actions';
import state from './state';

const namespaced = true;

export default {
  namespaced,
  state,
  actions,
  mutations,
};
