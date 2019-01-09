<template>
  <component
    :is="componentForControl(control)"
    v-bind="{control}"
    :disabled="disabled"
  ></component>
</template>

<script>
import NumericControl from "./NumericControl";
import BooleanControl from "./BooleanControl";

export default {
  props: {
    disabled: Boolean,
    control: Object
  },
  methods: {
    componentForControl(control) {
      switch (control.type) {
        case "number":
          return NumericControl;
          break;
        case "boolean":
          return BooleanControl;
          break;
        default:
          return null;
      }
    }
  },
  components: {
    NumericControl,
    BooleanControl
  }
};
</script>

<style lang="scss">
.sketch-control {
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #ddd;
}
</style>
