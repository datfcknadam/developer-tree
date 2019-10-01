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
        <v-card :class="child.type" max-height="200">
          <div class="arrow"></div>
          <v-list-item three-line>
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
      </v-col>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DeveloperTree',
  props: {
    items: {
      type: Array,
    },
  },
  computed: {
    ...mapState('tree', ['serverUrl']),
  },
  methods: {
    radToDeg(rad) {
      return (rad * 180) / Math.PI;
    },
    hypotenus(a, b) {
      return Math.sqrt(a ** 2 + b ** 2);
    },
  },
  mounted() {
    Object.values(this.$refs).forEach((item) => {
      const cordsParent = item[0].$el.getBoundingClientRect();
      const centerParent = {
        x: cordsParent.left + cordsParent.width / 2,
        y: cordsParent.top + cordsParent.height / 2,
      };

      Object.values(item[0].$children).forEach((child) => {
        if (child.$el.className !== 'v-avatar') {
          console.log(child.$el);
          const cordsChild = child.$el.getBoundingClientRect();
          const isLeftChild = cordsChild.right > centerParent.x;
          /* const sideChild = {
            x: cordsChild.x + cordsChild.width / 2,
            y: cordsChild.y + cordsChild.height / 2,
          }; */
          const start = {
            x: centerParent.x,
            y: centerParent.y,
          };
          const end = {
            x: isLeftChild ? cordsChild.left : cordsChild.right,
            y: cordsChild.top + cordsChild.height / 2,
          };

          const lineA = start.x - end.x;
          const lineB = start.y - end.y;
          const lineC = this.hypotenus(lineA, lineB);

          const px = isLeftChild ? -20 : 250;
          const incline = Math.asin(lineB / lineC);
          const degIncline = this.radToDeg(incline);
          console.log(incline, (start.x - end.x), (start.y - end.y));
          /*  const incline = Math.tan(((start.x - end.x) / (start.y - end.y))); */
          /* const scalar = start.x * end.x + start.y * end.y;
          const mod = (p) => Math.sqrt(p.x ** 2 + p.y ** 2);
          const m = mod(start) * mod(end);
          const angle = Math.acos(scalar / m);
          const incline = angle; */
          Object.values(child.$el.children).forEach((arrow) => {
            if (arrow.className === 'arrow') {
              arrow.style.transform = `rotate(${180 - 9 + degIncline}deg)`;
              arrow.style.left = `${start.x - end.x + px}px`;
              arrow.style.top = `${start.y - end.y + 35}px`;
              arrow.style.width = `${lineC}px`;
            }
          });
        }
      });
    });

    console.log(this.$refs);
  },
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
    max-width: calc(50% - 329px);
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
  .v-card .v-sheet .theme--light{
    margin-right: 0px;
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
      max-width: calc(50% - 329px);
  }

  .v-timeline-item:nth-child(even){
    padding-left: 30%;
  }
}
.arrow {
  position: relative;
  margin: 0px;
}
.arrow {
  height: 2px;
  background: black;
  position: relative;
  top: 20px;
  right: -32px;
}
.v-card.v-sheet.theme--light.favorite {
  background: #4700f387;
}
</style>
