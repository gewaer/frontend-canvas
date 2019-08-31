import moment from "moment";
import "moment-timezone";

const state = {
    data: {}
};

const mutations = {
    SET_DATA(state, payload) {
        state.data = payload;
    }
};

const actions = {
    setData({ commit }, data) {
        commit("SET_DATA", data);
    }
};

const getters = {
    isFreeTrial() {
        return Boolean(Number(state.data.is_freetrial));
    },
    daysLeft() {
        return moment.tz(state.data.trial_ends_at, "UTC").tz(moment.tz.guess()).diff(moment(), "days");
    },
    graceDaysLeft() {
        return moment.tz(state.data.grace_period_ends, "UTC").tz(moment.tz.guess()).diff(moment(), "days") || 0;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
