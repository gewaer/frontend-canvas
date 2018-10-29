import Vue from "vue";
import App from "./App.vue";
import "./config";
import store from "./store";
import router from "./router";
import vueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.config.productionTip = false;
Vue.component("multiselect", vueMultiselect);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
