/**
 * Dynamically import store elements.
 */
import Vue from "vue";
import Vuex from "vuex";
import modules from "./store/";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    modules,
    // plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== "production"
});
