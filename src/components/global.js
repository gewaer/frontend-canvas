/**
 * Here you specify any global components used throughout the application.
 *
 * Usage:
 *
 * Vue.component("conponent", require("@/<path>/<component>"));
 */
import Vue from "vue";
import { abilitiesPlugin } from "@casl/vue";
import vueMultiselect from "vue-multiselect";
import Notifications from "vue-notification";
import VModal from "vue-js-modal";
import Vuetable from "vuetable-2";

import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.use(Notifications);
Vue.use(abilitiesPlugin);
Vue.use(VModal);

Vue.component("multiselect", vueMultiselect);
Vue.component("vuetable", Vuetable);
