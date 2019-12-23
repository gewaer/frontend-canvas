import store from "@/store/index";

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
            url: "/companies?relationships=apps,subscription,branch,branches,logo"
        });
    },
    setData({ commit, dispatch }, data) {
        commit("SET_DATA", data);
        dispatch("Subscription/setData", data && data.subscription || {}, { root: true });
    },
    setList({ commit }, data) {
        commit("SET_LIST", data);
    },
    updateData({ dispatch }, companiesId) {
        return new Promise((resolve) => {
            dispatch("getData").then(({ data }) => {
                dispatch("setData", data.find((company) => company.id == companiesId));
                dispatch("setList", data);
            }).finally(() => resolve());
        });
    }
};

const getters = {
    currentBranch() {
        if (!store.Application.getters.isStateReady) {
            return null;
        }

        return state.data.branches.find(branch => branch.id == store.User.state.data.default_company_branch);
    },
    currentCompanyId(state) {
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
