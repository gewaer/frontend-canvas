const state = {
    data: null,
    token: null
}

const mutations = {
    SAVE_DATA(state, payload) {
        state.data = payload;
    },
    SAVE_TOKEN(state, payload) {
        state.token = payload;
    }
}

const actions = {
    saveData({ commit }, payload) {
        commit("SAVE_DATA", payload);
    },
    saveToken({ commit }, payload) {
        commit("SAVE_TOKEN", payload);
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
