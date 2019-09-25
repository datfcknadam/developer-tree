<template>
  <v-container id="frontend">
    <h1>FRONTEND</h1>
    <v-timeline>
      <v-timeline-item
        dense
        v-for="item in front.children"
        :class="item.type"
        large
        color="false"
        :key="item.name"
      >
        <template v-slot:opposite>
          <span v-text="item.name"></span>
        </template>
        <template v-slot:icon>
          <v-avatar>
            <img :src="serverUrl + item.image" />
          </v-avatar>
        </template>
        <v-col v-for="(child, i) in item.children" :key="i">
          <v-card max-height="200">
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-card-title v-text="child.name" />
                <v-divider class="mx-2" :inset="inset"></v-divider>
                <v-card-text v-text="child.name" />
              </v-list-item-content>
              <v-list-item-avatar tile width="auto" v-if="child.image" rounded>
                <img :src="serverUrl + child.image" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FrontPage",
  mounted() {
    this.$store.dispatch("tree/loadFront");
  },
  computed: mapState("tree", ["front", "serverUrl"])
};
</script>

<style>
.v-card__title {
  padding: 0;
}
.v-card__text {
  padding: 0;
}
</style>
