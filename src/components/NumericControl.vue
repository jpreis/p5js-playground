<template>
  <div class="sketch-control sketch-control--numeric">
    <div v-if="hasMinMax">
      <label>{{control.name}}</label>
      <input
        :disabled="disabled"
        class="slider is-circle has-output"
        v-model.number="control.v"
        type="range"
        :min="control.minValue"
        :max="control.maxValue"
        :step="control.stepSize"
      >
      <output class="sketch-control__output">{{control.v}}</output>
    </div>

    <input
      v-else
      class="input"
      :placeholder="control.name"
      :disabled="disabled"
      v-model.number="control.v"
      type="number"
    >

  </div>
</template>

<script>
export default {
  props: {
    control: Object,
    disabled: Boolean
  },
  data() {
    return {};
  },
  computed: {
    hasMinMax() {
      return !!(
        this.control.hasOwnProperty("minValue") &&
        this.control.hasOwnProperty("maxValue")
      );
    }
  }
};
</script>

<style lang="scss">
.sketch-control--numeric {
  &__output {
    width: auto !important;
  }
}
</style>
