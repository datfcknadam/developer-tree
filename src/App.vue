<template>
  <div id="app">
  <v-app>
    <navbar />
    <router-view></router-view>
  </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
};
</script>
