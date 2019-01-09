/**
 * Here you specify any global components used throughout the application.
 *
 * Usage:
 *
 * Vue.component("conponent", require("@/<path>/<component>"));
 */
import Vue from "vue";
import { abilitiesPlugin as AbilitiesPlugin } from "@casl/vue";
import { quillEditor as QuillEditor } from "vue-quill-editor";
import VueMultiselect from "vue-multiselect";
import Notifications from "vue-notification";
import VModal from "vue-js-modal";
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";

Vue.use(AbilitiesPlugin);
Vue.use(Notifications);
Vue.use(VModal);

Vue.component("quill-editor", QuillEditor);
Vue.component("multiselect", VueMultiselect);
Vue.component("vuetable", Vuetable);
Vue.component("vuetable-pagination", VuetablePagination);
