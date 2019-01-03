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
import VeeValidate from "vee-validate";
import Vuetable from "vuetable-2";
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.use(AbilitiesPlugin);
Vue.use(Notifications);
Vue.use(VeeValidate, { fieldsBagName: "formFields" });
Vue.use(VModal);
Vue.use(VueFormWizard);

Vue.component("quill-editor", QuillEditor);
Vue.component("multiselect", VueMultiselect);
Vue.component("vuetable", Vuetable);
