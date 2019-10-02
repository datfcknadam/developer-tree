<template>
  <div>
    <v-timeline>
      <v-timeline-item
        dense
        v-for="(item, i) in items"
        :class="item.type"
        large
        :color="item.color"
        :key="i"
        :ref="`TLItem_${i}`"
      >
        <template v-slot:opposite>
          <span v-text="item.name"></span>
          <br />
          <span class="font-italic" v-text="item.description"></span>
        </template>
        <template v-if="item.image" v-slot:icon>
          <v-avatar >
            <img :src="serverUrl + item.image" />
          </v-avatar>
        </template>
        <v-col v-for="(child, i) in item.children" :key="i">
          <v-card :class="child.type" max-height="200">
            <v-card v-for="(child, i) in child.children" :key="i" class="baby-child">
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
  </div>
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
    calculateLine(a, b) {
      return a - b;
    },
  },
  mounted() {
    const halfScreen = screen.width / 2;
    const radToDeg = (rad) => (rad * 180) / Math.PI;
    const hypotenus = (a, b) => Math.sqrt(a ** 2 + b ** 2);
    const calculateLine = (a, b) => a - b;

    Object.values(this.$refs).forEach((item) => {
      const coordsParent = item[0].$el.getBoundingClientRect();
      const centerParent = {
        x: coordsParent.left + coordsParent.width / 2,
        y: coordsParent.top + coordsParent.height / 2,
      };

      Object.values(item[0].$children).forEach((child) => {
        if (child.$el.classList[0] === 'v-card') {
          const coordsChild = child.$el.getBoundingClientRect();
          const isLeftChild = coordsChild.right > centerParent.x;
          const start = {
            x: centerParent.x,
            y: centerParent.y - 12,
          };
          const end = {
            x: isLeftChild ? coordsChild.left : coordsChild.right,
            y: coordsChild.top + coordsChild.height / 2,
          };
          const lineA = start.x - end.x;
          const lineB = start.y - end.y;
          const lineC = hypotenus(calculateLine(start.x, end.x), calculateLine(start.y, end.y));

          Object.values(child.$el.children).forEach((arrow) => {
            if (arrow.className === 'arrow') {
              const incline = Math.asin(lineB / lineC);
              const degIncline = radToDeg(incline);
              const correctRotate = isLeftChild ? 0 : 180;
              const correctPos = isLeftChild ? -20 : 220;

              arrow.style.transform = `rotate(${correctRotate - degIncline}deg)`;
              arrow.style.position = 'absolute';
              arrow.style.left = `${lineA + correctPos}px`;
              arrow.style.top = `${lineB + 45}px`;
              arrow.style.width = `${lineC}px`;
            }
          });
          Object.values(child.$children).forEach((babyChild) => {
            if (babyChild.$el.classList[0] === 'baby-child') {
              const babyChildElem = babyChild.$el;
              const coordsBabyChildElem = babyChildElem.getBoundingClientRect();
              if (coordsBabyChildElem.x > halfScreen) {
                babyChildElem.style.left = '18vw';

                const startBabyChild = {
                  x: babyChildElem.left,
                  y: babyChildElem.top + babyChildElem.height / 2,
                };
                const endBabyChild = {
                  x: coordsChild.right,
                  y: coordsChild.top + coordsChild.height / 2,
                };
                const lineA = start.x - end.x;
                const lineB = start.y - end.y;
                const lineC = this.hypotenus(lineA, lineB);
              } else {
                babyChildElem.style.right = '18vw';
              }
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
  height: 2px;
  background: linear-gradient(to left, #333, #333, #fff, #fff);
}
.arrow:before,
  .arrow:after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-right: 0;
    top: -7.5px;
    right: -1px;
    border-left-color: black;
    }
.v-card.v-sheet.theme--light.favorite {
  background: #4700f387;
  position: relative;
}
.baby-child{
  position: absolute;
}
</style>
