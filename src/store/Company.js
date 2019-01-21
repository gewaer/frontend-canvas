const state = {
    data: null,
    list: []
};

const mutations = {
    SET_DATA(state, payload) {
        state.data = payload;
    },
    SET_LIST(state, payload) {
        state.list = payload;
    }
};

const actions = {
    getData() {
        return axios({
            url: "/companies?relationships=apps,subscription,branch,filesystem"
        });
    },
    setData({ commit }, data) {
        commit("SET_DATA", data);
    },
    setList({ commit }, data) {
        commit("SET_LIST", data);
    }
};

const getters = {
    currentCompanyID(state) {
        return state.data ? state.data.id : null;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
