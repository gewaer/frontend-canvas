import Vue from "vue";
import App from "./App.vue";
import "./config";
import store from "./store";
import router from "./router";
import "@/components/global";
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.component("quill-editor", quillEditor);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
