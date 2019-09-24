<template>
  <div id="main-menu">
    <router-link to="/back-page">
      <v-btn large>Backend</v-btn>
    </router-link>
    <router-link to="/front-page">
      <v-btn large>Fronted</v-btn>
      </router-link>
    <router-link to="/dev-page">
      <v-btn large>DevOps</v-btn>
      </router-link>
  </div>
</template>

<script>
export default {

};
</script>

<style>
#main-menu {
  text-align: center;
  margin-top: 5vh;
}
a {
  text-decoration: none;
}
</style>
