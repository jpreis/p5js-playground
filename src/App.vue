<template>
  <div
    id="app"
    class="app"
  >

    <Header />

    <div class="container">
      <div class="column is-10 is-offset-1">
        <ul class="sketches">
          <li
            v-for="sketch in sketches"
            :key="sketch.name"
            class="sketch"
          >

            <SketchContainer v-bind="{sketch, toggleActive, registerInstance}" />
            <div class="sketch-meta">
              <h3 class="sketch-meta__title">{{sketch.name}}
              </h3>
              <p class="sketch-meta__source"><a :href="sketchSrcUrl(sketch)">view source</a>
              </p>
              <!-- <div
                class="sketch-meta__controls"
                v-if="sketch.instance !== null"
              >
                <SketchControl
                  v-for="control in sketch.instance.controls"
                  :key="control.name"
                  :control="control"
                  :disabled="!sketch.active"
                ></SketchControl>
              </div> -->

            </div>
          </li>
        </ul>

      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import SketchContainer from "./components/SketchContainer";
import Footer from "./components/Footer";
import SketchControl from "./components/SketchControl";

import softbody from "./sketches/softbody";
import diamonds from "./sketches/diamonds";

export default {
  name: "app",
  mounted() {
    setTimeout(() => {
      this.sketches.forEach((sketch, idx) => {
        if (idx !== 0) {
          this.setActive(sketch, false);
        }
      });
    }, 2000);
  },
  data() {
    return {
      sketches: [{ ...diamonds, active: true }, { ...softbody, active: true }]
    };
  },
  methods: {
    setActive(sketch, active) {
      sketch.active = active;
    },
    toggleActive(sketch) {
      sketch.active = !sketch.active;
    },
    registerInstance(sketch, sketchInstance) {
      sketch.instance = sketchInstance;
    },
    sketchSrcUrl(sketch) {
      let fileName = sketch.name.toLowerCase().replace(" ", "-");
      return `https://github.com/jpreis/p5js-playground/blob/master/src/sketches/${fileName}.js`;
    }
  },
  computed: {
    activeSketch() {
      return this.sketches.filter(sketch => sketch.active)[0];
    }
  },
  components: { Header, SketchContainer, SketchControl, Footer }
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}

.sketches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: 1fr;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.sketch {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
  --opacity: 0;

  &:hover {
    --opacity: 1;
  }
}

.sketch-meta {
  &__title {
    font-weight: bold;
  }

  &__controls,
  &__source {
    opacity: var(--opacity);
    font-size: small;
    transition: opacity 0.3s;
  }
}
</style>
