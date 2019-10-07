<template>
  <v-container id="frontend">
    <h1>{{ title }}</h1>
    <DeveloperTree :changePage="sectionName" :items="tree.children"/>
    <h1>Keep learning!</h1>
  </v-container>
</template>

<script>
import DeveloperTree from '../components/DeveloperTree.vue';

export default {
  name: 'FrontPage',
  props: {
    sectionName: String,
  },
  components: {
    DeveloperTree,
  },
  mounted() {
    this.$store.dispatch('tree/loadData', { sectionName: this.sectionName });
  },
  computed: {
    tree() {
      return this.$store.state.tree[this.sectionName];
    },
    title() {
      return (this.sectionName || '').toUpperCase();
    },
  },
  watch: {
    sectionName() {
      this.$store.dispatch('tree/loadData', { sectionName: this.sectionName });
    },
  },
};
</script>

<style scoped>
h1{
  text-align: center;
}
.container {
  background: linear-gradient(to top left, #6c7cfc, #98fce0a6);
  background-size: cover;
}
</style>
