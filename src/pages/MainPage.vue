<template>
  <v-content class="main-menu">
    <v-card to="/back-page" max-width="400"  class="mx-auto">
      <v-card-title>Backend</v-card-title>
      <v-card-text>Developer tree for Backend developers</v-card-text>
    </v-card>
    <v-card to="/front-page" max-width="400" class="mx-auto">
      <v-card-title>Fronted</v-card-title>
      <v-card-text>Developer tree for Fronted developers</v-card-text>
    </v-card>
    <v-card to="/dev-page" max-width="400" class="mx-auto">
      <v-card-title>DevOps</v-card-title>
      <v-card-text>Developer tree for DevOps developers</v-card-text>
    </v-card>
  </v-content>
</template>

<script>
export default {};
</script>

<style scoped>
.main-menu {
  margin-top: calc(10vh + 2vw);
}
.v-card__title {
  background: #62c2ff87;
}
.v-card {
  margin-bottom: 5vh;
  display: block;
}
a {
  text-decoration: none;
}
</style>
