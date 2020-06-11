import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import fragment from "vue-fragment";

Vue.config.productionTip = false;

Vue.use(fragment.Plugin);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

