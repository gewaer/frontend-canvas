const state = {
    timezones: [],
    languages: ["English", "Spanish", "French"]
};

const mutations = {
    SET_TIMEZONES(state, payload) {
        state.timezones = payload;
    }
};

const actions = {
    getTimezones({ commit }) {
        axios.get("/timezones")
            .then(({data}) => {
                commit("SET_TIMEZONES", data);
            })
    },

    getSettings({ dispatch }) {
        dispatch("getTimezones");
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
