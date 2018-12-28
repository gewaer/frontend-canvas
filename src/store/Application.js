import { isValidJWT } from "@/utils/helpers";
import store from "@/store/index";

const state = {
    languages: [],
    timezones: [],
    roles: []
};

const mutations = {
    SET_LANGUAGES(state, payload) {
        state.languages = payload;
    },
    SET_TIMEZONES(state, payload) {
        state.timezones = payload;
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
            axios({
                url: "/languages"
            }).then((response) => {
                commit("SET_LANGUAGES", response.data);
            });
        }
    },
    getSettingsLists({ dispatch }) {
        dispatch("getLanguages");
        dispatch("getTimezones");
        dispatch("getRoles");
    },
    getTimezones({ commit }) {
        if (!state.timezones.length) {
            axios({
                url: "/timezones"
            }).then((response) => {
                commit("SET_TIMEZONES", response.data);
            });
        }
    },
    getRoles({ commit }) {
        if (!state.roles.length) {
            axios({
                url: "/roles"
            }).then((response) => {
                commit("SET_ROLES", response.data);
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
        return !!store.User.data && !!store.Company.data;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
