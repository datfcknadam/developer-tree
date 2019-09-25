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
            <img :src="serverUrl + item.image">
          </v-avatar>
        </template>
        <v-card v-for="child in item.children"
          max-height="200"
          :key="child.name"
        >
        <v-list-item-avatar width="auto" v-if="child.image" rounded>
          <img :src="serverUrl + child.image">
        </v-list-item-avatar>
          <v-card-title v-text="child.name" class="headline"/>
          <v-card-text v-text="child.name"/>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FrontPage',
  mounted() {
    this.$store.dispatch('tree/loadFront');
  },
  computed: mapState('tree', ['front', 'serverUrl']),
};
</script>

<style>
.v-timeline{
  flex-direction: row;
}
</style>
