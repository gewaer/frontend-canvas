/**
 * Here you specify any global components used throughout the application.
 *
 * Usage:
 *
 * Vue.component("conponent", require("@/<path>/<component>"));
 */
import Vue from "vue";
import vueMultiselect from "vue-multiselect";
import Notifications from "vue-notification";

import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.use(Notifications);

Vue.component("multiselect", vueMultiselect);
