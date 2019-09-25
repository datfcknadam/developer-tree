<template>
  <v-container id="frontend">
    <h1>FRONTEND</h1>
    <v-treeview open-all :items="front.data">
    </v-treeview>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FrontPage',
  mounted() {
    this.$store.dispatch('tree/loadFront');
  },
  computed: mapState('tree', ['front']),
};
</script>

<style>
.mdi-menu-down::before {
  content: url('../assets/arrow.png');
  transform: scale(.1);
  width: 100px;
  height: 100px;
}
.v-treeview-node__content {
  border: 1px solid;
}
#frontend {
  display: flex;
}
.v-card {
  display: flex;
}
</style>
