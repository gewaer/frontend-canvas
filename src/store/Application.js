import { isValidJWT } from "@/utils/helpers";
import isEmpty from "lodash/isEmpty";
import store from "@/store/index";

const state = {
    data: {},
    isLoading: true,
    languages: [],
    timezones: [],
    locales: [],
    currencies: [],
    roles: [],
    resources: [],
    settings: {}
};

const mutations = {
    SET_DATA(state, payload) {
        state.data = payload;
    },
    SET_LANGUAGES(state, payload) {
        state.languages = payload;
    },
    SET_IS_LOADING(state, payload) {
        state.isLoading = payload;
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
    SET_RESOURCES(state, payload) {
        state.resources = payload;
    },
    SET_ROLES(state, payload) {
        state.roles = payload;
    },
    SET_SETTINGS(state, payload) {
        state.settings = payload;
    }
};

const actions = {
    async getData({ commit }, appsId) {
        await axios({
            url: `/apps/${appsId}`
        }).then(response => {
            commit("SET_DATA", response.data);
        });
    },
    getGlobalStateData({ dispatch }) {
        if (!Cookies.get("token") || !isValidJWT(Cookies.get("token"))) {
            return new Promise((resolve, reject) => {
                reject("ERROR");
            });
        }

        return Promise.all([
            dispatch("User/getData", null, { root: true }),
            dispatch("Company/getData", null, { root: true }),
            dispatch("getResources")
        ]).then(async(response) => {
            const [{ data: userData }, { data: companies }, { data: resources }] = response;
            const currentCompany = companies.find((company) => company.id == userData.default_company);

            await dispatch("getData", currentCompany.apps.apps_id);

            dispatch("setGlobalData", {
                userData,
                companies,
                resources,
                currentCompany
            });
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
    getResources() {
        return axios({
            url: "/system-modules"
        });
    },
    async getSettings({ commit }) {
        await axios({
            url: `/apps/${process.env.VUE_APP_APPLICATION_KEY}/settings`
        }).then(response => {
            commit("SET_SETTINGS", response.data);
            commit("SET_IS_LOADING", false);
        });
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
    setGlobalData({ commit, dispatch }, data) {
        dispatch("User/setData", data.userData, { root: true });
        dispatch("Company/setList", data.companies, { root: true });
        dispatch("Company/setData", data.currentCompany, { root: true });
        commit("SET_RESOURCES", data.resources);
    }
};

const getters = {
    allowUserRegistration() {
        return Boolean(Number(state.settings.settings.allow_user_registration));
    },
    isDataReady() {
        return !isEmpty(state.data);
    },
    isStateReady() {
        return !isEmpty(store.User.state.data) && !!store.Company.state.data;
    },
    isSubscriptionBased() {
        return Boolean(Number(state.data.payments_active));
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
