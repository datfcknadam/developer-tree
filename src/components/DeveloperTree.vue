<template>
  <div>
    <v-timeline>
      <v-timeline-item
        dense
        v-for="(item, i) in items"
        :ref="`TLItem_${i}`"
        :class="item.type"
        large
        :color="item.color"
        :key="i"
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
        <v-col max-height="200px" v-for="(child, i) in item.children" :key="i">
          <v-card :class="child.type" max-height="200">
            <Child :babyChild="child.children"/>
            <div class="arrow"></div>
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-card-title v-text="child.name" />
                <v-divider v-if="child.description" class="mx-2" />
                <v-card-text
                  v-if="child.description"
                  class="font-italic"
                  v-text="child.description"
                />
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
import Child from './Child/Child.vue';

export default {
  name: 'DeveloperTree',
  components: {
    Child,
  },
  props: {
    items: {
      type: Array,
    },
  },
  computed: {
    ...mapState('tree', ['serverUrl']),
  },
  watch: {
    items() {
      const halfScreen = screen.width / 2;
      const radToDeg = (rad) => (rad * 180) / Math.PI;
      const hypotenus = (a, b) => Math.sqrt(a ** 2 + b ** 2);
      const setLine = (start, end) => {
        const lineA = (start.x - end.x);
        const lineB = (start.y - end.y);
        const lineC = hypotenus(lineA, lineB);
        const incline = Math.asin(lineB / lineC);
        const degIncline = radToDeg(incline);
        return {
          lineA, lineB, lineC, incline, degIncline,
        };
      };
      const getCenterCoords = (item) => {
        const coordsParent = item.getBoundingClientRect();
        const centerParent = {
          right: coordsParent.left + coordsParent.width / 2,
          left: coordsParent.right - coordsParent.width / 2,
          x: coordsParent.right - coordsParent.width / 2,
          y: coordsParent.top + coordsParent.height / 2 - 7.5,
        };
        return centerParent;
      };
      const getExtremeCoords = (parent, child) => {
        const isLeftChild = child.x > halfScreen || child.x > parent.x;
        const start = {
          x: isLeftChild ? parent.right : parent.left,
          y: parent.y,
        };
        const end = {
          x: isLeftChild ? child.left : child.right,
          y: child.top + child.height / 2,
        };
        return { start, end, isLeftChild };
      };
      Object.values(this.$refs).forEach((item) => {
        const centerParent = getCenterCoords(item[0].$el);

        Object.values(item[0].$children).forEach((child) => {
          if (child.$el.classList[0] === 'v-card') {
            const coordsChild = child.$el.getBoundingClientRect();
            const extremCoords = getExtremeCoords(centerParent, coordsChild);

            Object.values(child.$el.children).forEach((arrow) => {
              if (arrow.className === 'arrow') {
                const line = setLine(extremCoords.start, extremCoords.end);

                line.degIncline = extremCoords.isLeftChild
                  ? line.degIncline : line.degIncline + 180;

                if (extremCoords.isLeftChild) arrow.style.right = `${coordsChild.width}px`;
                else arrow.style.left = `${coordsChild.width + 8}px`;

                arrow.style.transform = `rotate(${line.degIncline}deg)`;
                arrow.style.position = 'absolute';
                arrow.style.background = 'linear-gradient(to left, #000, #000,  #000, #000, #000, #fff, #fff, #fff,  #fff)';
                arrow.style.top = `calc(${line.lineB}px + 40%)`;
                arrow.style.width = `calc(${line.lineC}px - 10px)`;
              }
            });
            Object.values(child.$children[0].$el.children).forEach((babyChild) => {
              if (babyChild.classList[0] === 'baby-child') {
                const coordsBabyChild = babyChild.getBoundingClientRect();
                const childExtremeCoords = getExtremeCoords(coordsChild, coordsBabyChild);

                if (childExtremeCoords.isLeftChild) {
                  babyChild.style.left = '18vw';
                } else {
                  babyChild.style.right = '18vw';
                }

                Object.values(babyChild.children).forEach((arrowBabyChild) => {
                  if (arrowBabyChild.className === 'arrow') {
                    const line = setLine(childExtremeCoords.start, childExtremeCoords.end);

                    line.degIncline = childExtremeCoords.isLeftChild
                      ? line.degIncline : line.degIncline + 180;

                    if (childExtremeCoords.isLeftChild) {
                      arrowBabyChild.style.right = `${coordsBabyChild.width - 1}px`;
                    } else {
                      arrowBabyChild.style.left = `${coordsBabyChild.width - 1}px`;
                    }

                    if (line.degIncline !== 0) {
                      arrowBabyChild.style.transform = `rotate(${line.degIncline}deg)`;
                    }

                    arrowBabyChild.style.position = 'absolute';
                    arrowBabyChild.style.background = 'linear-gradient(to left, #000, #000,  #000,  #000, #000,  #fff)';
                    arrowBabyChild.style.top = `${coordsBabyChild.height / 2}px`;
                    arrowBabyChild.style.width = `${Math.abs(line.lineC) / 5}px`;
                  }
                });
              }
            });
          }
        });
      });
    },
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
    margin: 0;
  }
  .v-list-item {
    padding: 0;
  }
}
@media screen and (min-width: 500px) {
  img {
    width: auto;
    height: auto;
    max-width: 80%;
    max-height: 80%;
  }
  .v-card {
    max-width: calc(15vw);
  }
  .v-card .v-sheet .theme--light {
    margin-right: 0;
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
    padding-left: 29vw;
  }
}
.arrow {
  height: 2px;
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
}
.baby-child{
  position: relative;
  margin-top: 10px;
  max-height: 50px;

}
</style>
