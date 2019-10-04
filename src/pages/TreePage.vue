<template>
  <v-container id="frontend">
    <h1>{{ title }}</h1>
    <DeveloperTree :items="tree.children"/>
    <h1>Keep learning!</h1>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
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
    ...mapState('tree', { tree: (state) => state[this.sectionName] }),
    title() {
      return (this.sectionName || '').toUpperCase();
    },
  },
};
</script>

<style scoped>
  h1{
    text-align: center;
  }
</style>
