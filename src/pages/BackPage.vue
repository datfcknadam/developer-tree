<template>
  <v-container id="frontend">
    <h1>BACK-END</h1>
    <DeveloperTree :items="back.children"/>
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
    this.$store.dispatch('tree/loadBack');
  },
  computed: mapState('tree', ['back']),
};
</script>

<style scoped>
h1{
  text-align: center;
}
</style>
