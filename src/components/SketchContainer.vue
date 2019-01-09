<template>
  <div
    class="sketch-container"
    :class="{'sketch-container--active': sketch.active}"
    ref="sketch-container"
    @click="toggleActive(sketch)"
  >
  </div>
</template>

<script>
import p5 from "p5";

export default {
  mounted() {
    this.sketchInstance = new p5(
      this.sketch.seed,
      this.$refs["sketch-container"]
    );
    this.registerInstance(this.sketch, this.sketchInstance);
  },
  props: {
    sketch: Object,
    toggleActive: Function,
    registerInstance: Function
  },
  data() {
    return {
      sketchInstance: null
    };
  },
  computed: {
    active() {
      return this.sketch.active;
    }
  },
  watch: {
    "sketch.active": function(active) {
      active ? this.sketchInstance.loop() : this.sketchInstance.noLoop();
    }
  }
};
</script>

<style lang="scss">
.sketch-container {
  flex-grow: 1;
  display: flex;

  --shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
  }

  &--active {
    --shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.25);
  }

  canvas {
    box-shadow: var(--shadow);
    transition: box-shadow 0.3s;
    border-radius: 5px;
  }
}
</style>
