import Vue from "vue";
import App from "./App.vue";
import "bulma";
import "bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css";
import "bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
