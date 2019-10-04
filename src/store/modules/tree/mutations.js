export default {
  SET_DATA(state, { sectionName, data }) {
    const name = Object.values(sectionName);
    state[name[0]] = data;
  },
};
