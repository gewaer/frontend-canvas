import { AbilityBuilder } from "@casl/ability";

const state = {
    abilities: null,
    data: {},
    token: null
}

const mutations = {
    SET_ABILITIES(state, data) {
        state.abilities = data;
    },
    SET_DATA(state, data) {
        state.data = data;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    }
}

const actions = {
    getData() {
        return axios({
            url: "/users/0?relationships=roles,photo"
        });
    },
    setAbilities({ commit }, permissons) {
        const rules = AbilityBuilder.define((can, cannot) => {
            can("manage", "all");

            Object.keys(permissons).forEach((resource) => {
                Object.keys(permissons[resource]).forEach((action) => {
                    cannot(action, resource);
                });
            });
        });

        commit("SET_ABILITIES", rules);
    },
    setData({ commit, dispatch }, payload) {
        commit("SET_DATA", payload);
        dispatch("setAbilities", payload.access_list);
    },
    setToken({ commit }, token) {
        commit("SET_TOKEN", token);
    },
    updateData({ dispatch }) {
        return new Promise((resolve) => {
            dispatch("getData").then(({ data }) => {
                dispatch("setData", data);
            }).finally(() => resolve());
        });
    }
}

const getters = {
    isLoggedIn() {
        return state.token != null;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
