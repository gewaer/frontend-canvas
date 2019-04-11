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
            url: "/companies?relationships=apps,subscription,branch,filesystem,logo"
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
    currentCompanyId(state) {
        return state.data ? state.data.id : null;
    },
    isTrialSubscription(state){
        let isTrial = "0";
        if(!isEmpty(state.data)){
            isTrial = !isEmpty(state.data) ? get(state.data, "subscription.is_freetrial", "0") : "0" ;
        }
        return !!Number(isTrial)
    },
    subscriptionDaysLeft(state, getters){
        let daysLeft = moment();
        if(getters.isTrialSubscription){
            daysLeft = moment(state.data.subscription.trial_ends_at);
        } else {
            daysLeft = moment(state.data.subscription.ends_at);
        }
        return  daysLeft.diff(moment(), "days");
    },
    subscriptionHasEnded(state, getters){
        return getters.subscriptionDaysLeft == "0"
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
