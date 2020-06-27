import moment from "moment";
import "moment-timezone";

const state = {
    data: {},
    paymentData: {},
    plans: []
};

const mutations = {
    SET_DATA(state, payload) {
        state.data = payload;
    },
    SET_PAYMENT_DATA(state, payload) {
        state.paymentData = payload;
    },
    SET_PLANS(state, payload) {
        state.plans = payload;
    }
};

const actions = {
    getPlans() {
        return axios({
            url: "/apps-plans?relationships=settings"
        });
    },
    getPaymentData() {
        return axios({
            url: "/apps-plans/0/method"
        });
    },
    async getSubscriptionData({ commit, dispatch }) {
        await Promise.all([
            dispatch("getPaymentData"),
            dispatch("getPlans")
        ]).then(async(response) => {
            const [
                { data: paymentData },
                { data: plans }
            ] = response;

            commit("SET_PAYMENT_DATA", paymentData);
            commit("SET_PLANS", plans);
        });
    },
    setData({ commit }, data) {
        commit("SET_DATA", data);
    },
    setPaymentData({ commit }, data) {
        commit("SET_PAYMENT_DATA", data);
    }
};

const getters = {
    isFreeTrial() {
        return Boolean(Number(state.data.is_freetrial));
    },
    isActive() {
        return Boolean(Number(state.data.is_active));
    },
    isActiveSubscription() {
        return getters.isActive() && getters.daysLeft() < 0 && getters.graceDaysLeft() > 0;
    },
    isActiveFreeSubscription() {
        return getters.isActive() && getters.isFreeTrial();
    },
    isCancelled() {
        return Boolean(Number(state.data.is_cancelled));
    },
    isInactiveSubscription() {
        return !getters.isActive() || getters.daysLeft() < 0 && getters.graceDaysLeft() <= 0;
    },
    isPaid() {
        return Boolean(Number(state.data.paid));
    },
    isReady() {
        return Boolean(state.data.is_active);
    },
    daysLeft() {
        return !getters.isFreeTrial() && getters.isPaid() || state.data.trial_ends_at && moment.tz(state.data.trial_ends_at, "UTC").diff(moment(), "days", true) || 0;
    },
    graceDaysLeft() {
        return state.data.grace_period_ends && moment.tz(state.data.grace_period_ends, "UTC").diff(moment(), "days", true) || 0;
    },
    showSubscriptionBar() {
        return getters.isReady() && (getters.isActiveFreeSubscription() || getters.isActiveSubscription() || getters.isInactiveSubscription());
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
