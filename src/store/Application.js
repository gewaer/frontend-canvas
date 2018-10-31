import { isValidJWT } from "@/utils/helpers";
import store from "@/store";

const state = {};

const mutations = {};

const actions = {
    getGlobalStateData({ dispatch }) {
        // RETURN IF NO COOKIES FOUND SENT ERROR (CATCH) !Cookies.get('userID'
        if (!Cookies.get("token") || !isValidJWT(Cookies.get("token"))) {
            return new Promise((resolve, reject) => {
                reject("ERROR");
            });
        }

        return Promise.all([
            dispatch("User/getData", null, { root: true }),
            dispatch("Company/getData", null, { root: true })
        ]).then(response => {
            dispatch("setGlobalData", { userData: response[0].data, companies: response[1].data });
        })
    },
    setGlobalData({ dispatch }, data) {
        dispatch("User/setData", data.userData, { root: true });
        dispatch("Company/setList", data.companies, { root: true });
        dispatch("Company/setData", data.companies.find((company) => company.id == data.userData.default_company), { root: true });
    }
};

const getters = {
    isStateReady() {
        return !!store.state.User.data && !!store.state.Company.data;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
