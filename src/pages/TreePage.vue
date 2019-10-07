<template>
  <v-container id="frontend">
    <h1>{{ title }}</h1>
    <developer-tree :changePage="sectionName" :items="tree.children"/>
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
  background: linear-gradient(to left, #fff0, #fff0, #261c1c00, #0000, rgba(255, 255, 255, 0.35), #fff0, #fff0, #fff0, #fff0);
}
.container {
  background: linear-gradient(to top left, #8895ff, #86ffdda6);
  background-size: cover;
}
</style>
