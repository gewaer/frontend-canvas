/**
 * Import plugin configurations.
 */
import Vue from "vue";
import "@/config/axios";
import "@/config/lodash";
import * as filters from "@/utils/filters";

// Register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
