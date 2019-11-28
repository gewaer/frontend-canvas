/**
 * Here you specify any global components used throughout the application.
 *
 * Usage:
 *
 * Vue.component("conponent", require("@/<path>/<component>"));
 */
const { CustomFieldsForm } = require(`@/import.${process.env.VUE_APP_IMPORTS}`);

import Vue from "vue";
import { abilitiesPlugin as AbilitiesPlugin } from "@casl/vue";
import VueMultiselect from "vue-multiselect";
import Notifications from "vue-notification";
import VModal from "vue-js-modal";
import Dropdown from "bp-vuejs-dropdown";
import Loader from "@c/loader";

Vue.use(AbilitiesPlugin);
Vue.use(Notifications);
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

Vue.component("custom-fields-form", CustomFieldsForm);
Vue.component("dropdown", Dropdown);
Vue.component("loader", Loader);
Vue.component("multiselect", VueMultiselect);
