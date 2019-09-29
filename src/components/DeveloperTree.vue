<template>
  <v-timeline>
    <v-timeline-item
      dense
      v-for="(item, i) in items"
      :class="item.type"
      large
      :color="item.color"
      :key="i"
      :elemId="item.name"
      :id="item.name"
      :ref="`TLItem_${i}`"
    >
      <template v-slot:opposite>
        <span v-text="item.name"></span>
        <br />
        <span class="font-italic" v-text="item.description"></span>
      </template>
      <template v-if="item.image" v-slot:icon>
        <v-avatar>
          <img :src="serverUrl + item.image" />
        </v-avatar>
      </template>
      <v-col v-for="(child, i) in item.children" :key="i">
        <div class="arrow"></div>
        <v-card :class="child.type" max-height="200">
          <v-list-item three-line>
            <v-list-item-content class="align-self-start">
              <v-card-title v-text="child.name" />
              <v-divider v-if="child.description" class="mx-2" />
              <v-card-text v-if="child.description" class="font-italic" v-text="child.description" />
            </v-list-item-content>
            <v-list-item-avatar v-if="child.image" tile width="auto">
              <img :src="serverUrl + child.image" />
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DeveloperTree",
  props: {
    items: {
      type: Array
    }
  },
  computed: {
    ...mapState("tree", ["serverUrl"])
  },
  methods: {
    setStyle(key) {
      const cords = [];
    }
  },
  mounted() {
    Object.values(this.$refs).forEach(item => {
      const cords = item[0].$el.getBoundingClientRect();
      console.log(cords.top);
    });
  }
};
</script>

<style>
@media screen and (max-width: 500px) {
  .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse)
    .v-timeline-item:nth-child(even):not(.v-timeline-item--after)
    .v-timeline-item__body,
  .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse)
    .v-timeline-item--before
    .v-timeline-item__body {
    max-width: calc(50% - 48px);
  }
  .theme--light.v-card {
    max-width: calc(5vw + 30vh);
    max-height: 50px;
  }
  .v-card__text {
    padding: 4px;
    font-size: 9px;
  }
  .v-card__title {
    font-size: 10px;
    word-break: keep-all;
    padding: 1px;
    position: relative;
  }
  span {
    font-size: 10px;
  }
  img {
    width: auto;
    height: auto;
    max-width: 70%;
    max-height: 70%;
  }
  .v-application--is-ltr .v-list-item__avatar:last-of-type:not(:only-child) {
    margin: 0px;
  }
  .v-list-item {
    padding: 0;
  }
}
@media screen and (min-width: 500px) {
  .v-card {
    max-width: calc(15vw);
  }

  .v-card__title {
    word-break: keep-all;
    position: relative;
  }
  .v-card__text {
    padding: 4px;
  }

  .basis {
    position: relative;
    bottom: 120px;
  }

  .basis1 {
    position: relative;
    bottom: 220px;
    padding-bottom: 0px;
  }

  .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse)
    .v-timeline-item:nth-child(even):not(.v-timeline-item--after)
    .v-timeline-item__body,
  .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse)
    .v-timeline-item--before
    .v-timeline-item__body {
    max-width: calc(20% - 48px);
  }

  .v-timeline-item:nth-child(even) {
    position: relative;
    left: 30%;
  }
}
.arrow {
  position: relative;
  margin: 0px;
}
.arrow:before,
.arrow:after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: 0;
}
.arrow {
  width: 68px;
  height: 2px;
  background: black;
}
.arrow:after {
  top: -7px;
  right: -7px;
  width: 0px;
  height: 0px;
  border-left-color: black;
}
.v-card.v-sheet.theme--light.favorite {
  background: #4700f387;
}
</style>
