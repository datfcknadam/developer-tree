<template>
  <v-container id="frontend">
    <h1>DevOps</h1>
    <DeveloperTree :items="dev.children"/>
    <h1>Keep Exploring!</h1>
  </v-container>
</template>

<script>
/* @todo: мог быть 1 компонент см. TreePage */
import { mapState } from 'vuex';
import DeveloperTree from '../components/DeveloperTree.vue';

export default {
  name: 'FrontPage',
  components: {
    DeveloperTree,
  },
  mounted() {
    this.$store.dispatch('tree/loadDev');
  },
  computed: mapState('tree', ['dev']),
};
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
