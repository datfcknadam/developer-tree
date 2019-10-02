<template>
  <div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    child: {
      type: Object,
    },
    refs: {
      type: Object,
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
    const halfScreen = screen.width / 2;
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
          const lineC = this.hypotenus(lineA, lineB);

          Object.values(child.$el.children).forEach((arrow) => {
            if (arrow.className === 'arrow') {
              const incline = Math.asin(lineB / lineC);
              const degIncline = this.radToDeg(incline);
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
