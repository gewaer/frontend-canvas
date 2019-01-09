/**
 * Import plugin configurations.
 */
import Vue from "vue";
import "@/config/axios";
import "@/config/lodash";
import "@/config/cookies";
import "@/config/vee-validate";
import * as filters from "@/utils/filters";
import methods from "@/utils/methods";

// Register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.mixin({
    methods: methods
})
