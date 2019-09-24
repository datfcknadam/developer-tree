<template>
  <div>
    <v-toolbar>
        <v-toolbar-title>DevTree</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <router-link to='/back-page'>
          <v-btn text>Backend</v-btn>
        </router-link>
        <router-link to='/front-page'>
          <v-btn text>Fronted</v-btn>
        </router-link>
        <router-link to='/dev-page'>
          <v-btn text>DevOps</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
    </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
