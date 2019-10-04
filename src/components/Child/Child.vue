<template>
  <div class = "card-baby-child">
    <v-card v-for="(child, i) in babyChild" :key="i" class="baby-child">
      <div class="arrow"></div>
      <v-list-item>
        <v-list-item-content class="align-self-start">
          <v-card-title v-text="child.name" />
          <v-divider v-if="child.description" class="mx-2" />
          <v-card-text v-if="child.description"
            class="font-italic"
            v-text="child.description" />
        </v-list-item-content>
        <v-list-item-avatar v-if="child.image" tile width="auto">
          <img :src="serverUrl + child.image" />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    babyChild: {
      type: Array,
    },
  },
  computed: {
    ...mapState('tree', ['serverUrl']),
  },
};
</script>

<style>
.card-baby-child {
  max-height: 0px;
  position: relative;
  bottom: 20px;
}
.v-card__title {
  word-break: keep-all;
  position: relative;
  bottom: 10px;
}

</style>
