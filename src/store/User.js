const state = {
    data: {},
    token: null
}

const mutations = {
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
            url: "/users/0?relationships=roles"
        });
    },
    setData({ commit }, payload) {
        commit("SET_DATA", payload);
    },
    setToken({ commit }, token) {
        commit("SET_TOKEN", token);
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
