<template>
  <v-content class="main-menu">
    <v-card to="/back-page"  class="mx-auto">
      <v-card-title>Backend</v-card-title>
      <v-card-text>Developer tree for Backend developers</v-card-text>
    </v-card>
    <v-card to="/front-page" class="mx-auto">
      <v-card-title>Fronted</v-card-title>
      <v-card-text>Developer tree for Fronted developers</v-card-text>
    </v-card>
    <v-card to="/dev-page" class="mx-auto">
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
  background: no-repeat center  url("https://images.wallpaperscraft.ru/image/gory_tuman_nebo_117795_1920x1080.jpg");
  background-size: cover;
}
.v-content__wrap {
  display: inline-flex !important;
}
.theme--light.v-card {
  max-height: initial;
}
.v-card__title {
  background: #62c2ff87;
  word-break: keep-all;
  position: relative;
  bottom: initial;
}
.v-card {
  margin-bottom: 5vh;
  display: block;
  position: relative;
  top: 25%;
  max-width: 25vw;
  max-height: 25vh;
}

a {
  text-decoration: none;
}
</style>
