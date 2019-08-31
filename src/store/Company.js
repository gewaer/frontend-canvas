import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

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
        dispatch("Subscription/setData", data.subscription, { root: true });
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
    currentCompanyId(state) {
        return state.data ? state.data.id : null;
    },
    isTrialSubscription(state) {
        let isTrial = "0";
        if (!isEmpty(state.data)) {
            isTrial = !isEmpty(state.data) ? get(state.data, "subscription.is_freetrial", "0") : "0" ;
        }
        return !!Number(isTrial);
    },
    subscriptionDaysLeft(state, getters) {
        let daysLeft = moment();
        let timeLeft = 0;
        if (getters.isTrialSubscription) {
            daysLeft = moment(state.data.subscription.trial_ends_at);
        }
        if (daysLeft.diff(moment(), "days")) {
            timeLeft = daysLeft.diff(moment(), "days")
        }
        return timeLeft;
    },
    subscriptionHasEnded(state, getters) {
        const subscriptionDaysLeft = getters["subscriptionDaysLeft"] || 0;
        return subscriptionDaysLeft <= 0;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
