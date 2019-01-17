import { isValidJWT } from "@/utils/helpers";
import isEmpty from "lodash/isEmpty";
import store from "@/store/index";

const state = {
    languages: [],
    timezones: [],
    locales: [],
    currencies: [],
    roles: []
};

const mutations = {
    SET_LANGUAGES(state, payload) {
        state.languages = payload;
    },
    SET_TIMEZONES(state, payload) {
        state.timezones = payload;
    },
    SET_LOCALES(state, payload) {
        state.locales = payload;
    },
    SET_CURRENCIES(state, payload) {
        state.currencies = payload;
    },
    SET_ROLES(state, payload) {
        state.roles = payload;
    }
};

const actions = {
    getGlobalStateData({ dispatch }) {
        if (!Cookies.get("token") || !isValidJWT(Cookies.get("token"))) {
            return new Promise((resolve, reject) => {
                reject("ERROR");
            });
        }

        return Promise.all([
            dispatch("User/getData", null, { root: true }),
            dispatch("Company/getData", null, { root: true })
        ]).then(response => {
            dispatch("setGlobalData", { userData: response[0].data, companies: response[1].data });
        });
    },
    getLanguages({ commit }) {
        if (!state.languages.length) {
            return axios({
                url: "/languages"
            }).then((response) => {
                commit("SET_LANGUAGES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getSettingsLists({ dispatch }) {
        return Promise.all([
            dispatch("getLanguages"),
            dispatch("getTimezones"),
            dispatch("getLocales"),
            dispatch("getCurrencies"),
            dispatch("getRoles")
        ]);
    },
    getTimezones({ commit }) {
        if (!state.timezones.length) {
            return axios({
                url: "/timezones"
            }).then((response) => {
                commit("SET_TIMEZONES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getRoles({ commit }) {
        if (!state.roles.length) {
            return axios({
                url: "/roles"
            }).then((response) => {
                commit("SET_ROLES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getLocales({ commit }) {
        if (!state.locales.length) {
            return axios({
                url: "/locales?limit=300"
            }).then((response) => {
                commit("SET_LOCALES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getCurrencies({ commit }) {
        if (!state.currencies.length) {
            return axios({
                url: "/currencies?limit=200"
            }).then((response) => {
                commit("SET_CURRENCIES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    resetGlobalData({ dispatch }) {
        dispatch("User/setData", {}, { root: true });
        dispatch("Company/setList", [], { root: true });
        dispatch("Company/setData", null, { root: true });
    },
    setGlobalData({ dispatch }, data) {
        dispatch("User/setData", data.userData, { root: true });
        dispatch("Company/setList", data.companies, { root: true });
        dispatch("Company/setData", data.companies.find((company) => company.id == data.userData.default_company), { root: true });
    }
};

const getters = {
    isStateReady() {
        return !isEmpty(store.User.state.data) && !!store.Company.state.data;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
