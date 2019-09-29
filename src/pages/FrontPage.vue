<template>
  <v-container id="frontend">
    <h1>FRONT-END</h1>
    <DeveloperTree :items="front.children"/>
    <h1>Keep learning!</h1>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import DeveloperTree from '../components/DeveloperTree.vue';

export default {
  name: 'FrontPage',
  components: {
    DeveloperTree,
  },
  mounted() {
    this.$store.dispatch('tree/loadFront');
  },
  computed: mapState('tree', ['front']),
};
</script>

<style scoped>
h1{
  text-align: center;
}
</style>