import Vue from "vue";
import lang from "element-ui/lib/locale/lang/en"
import locale from "element-ui/lib/locale"
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";


// configure language
locale.use(lang)
import { DatePicker, Popover } from "element-ui";

Vue.use(DatePicker)
Vue.use(Popover)
Vue.use(CollapseTransition)
Vue.component(CollapseTransition.name, CollapseTransition)
