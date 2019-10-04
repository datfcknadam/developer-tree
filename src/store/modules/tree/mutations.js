export default {
  SET_FRONT(state, value) {
    state.front = value;
  },
  SET_BACK(state, value) {
    state.back = value;
  },
  SET_DEV(state, value) {
    state.dev = value;
  },

  /* @todo: могла быть 1 мутация */
  SET_DATA(state, { sectionName, data }) {
    state[sectionName] = data;
  },
};
