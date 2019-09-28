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
    isActive() {
        return Boolean(Number(state.data.is_active));
    },
    isPaid() {
        return Boolean(Number(state.data.paid));
    },
    isReady() {
        return Boolean(state.data.is_active);
    },
    daysLeft() {
        return state.data.trial_ends_at && moment.tz(state.data.trial_ends_at, "UTC").diff(moment(), "days", true) || 0;
    },
    graceDaysLeft() {
        return state.data.grace_period_ends && moment.tz(state.data.grace_period_ends, "UTC").diff(moment(), "days", true) || 0;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
