<template>
  <div>
    <v-app-bar id="navbar">
      <v-toolbar-title>
        <router-link to="/" class="toolbar-title">DevTree</router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn to="/back-page" text>Backend</v-btn>
        <v-divider
        class="mx-4"
        vertical
        ></v-divider>
        <v-btn to="/front-page" text>Fronted</v-btn>
        <v-divider
        class="mx-4"
        vertical
        ></v-divider>
        <v-btn to="/dev-page" text>DevOps</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
