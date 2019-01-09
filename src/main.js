import Vue from "vue";
import App from "./App.vue";
import "./config";
import store from "./store";
import router from "./router";
import "@/components/global-styles";
import "@/components/global";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
