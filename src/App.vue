<template>
  <div id="app">
  <go-top/>
  <v-app>
    <navbar />
    <router-view></router-view>
  </v-app>
  </div>
</template>

<script>
import GoTop from '@inotom/vue-go-top';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    GoTop,
  },
};
</script>
