<template>
  <div class="sketch-control sketch-control--boolean">
    <div class="field">
      <input
        :id="`${controlId}-toggle`"
        type="checkbox"
        name="switchExample"
        class="switch is-rounded is-outlined"
        v-model="control.v"
        :disabled="disabled"
      >
      <label :for="`${controlId}-toggle`">{{control.name}}</label>
    </div>
  </div>
</template>

<script>
import { toId } from "../util/helpers";

export default {
  props: {
    control: Object,
    disabled: Boolean
  },
  computed: {
    controlId() {
      return toId(this.control.name);
    }
  }
};
</script>

<style lang="scss">
</style>
