import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

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
    currentCompanyId(state) {
        return state.data ? state.data.id : null;
    },
    isTrialSubscription(state){
        let isTrial = false;
        if(!isEmpty(state.data)){
            isTrial = !isEmpty(state.data) ? !!get(state.data, "subscription.is_freetrial", false) : false ;
        }
        return isTrial
    },
    subscriptionDaysLeft(state, getters){
        let daysLeft = 0;
        if(getters.isTrialSubscription){
            daysLeft = state.data.subscription.trial_ends_days;
        }
        return daysLeft;
    }

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
