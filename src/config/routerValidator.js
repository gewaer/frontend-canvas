import store from "@/store";

import { isValidJWT } from "@/utils/helpers";

const validateSubscription = function validateSubscription(routeTo) {
    const daysLeft = store.getters["Subscription/daysLeft"];
    const graceDaysLeft = store.getters["Subscription/graceDaysLeft"];
    const isActive = store.getters["Subscription/isActive"];
    const isNotInRoute = routeTo.name != "settingsCompaniesSubscriptions";
    const isSubscriptionBased = store.getters["Application/isSubscriptionBased"];

    let routeToGo = routeTo;

    if (isSubscriptionBased && (!isActive && isNotInRoute || isNotInRoute && daysLeft <= 0 && graceDaysLeft <= 0)) {
        routeToGo = { name: "settingsCompaniesSubscriptions" }
    }

    return routeToGo;
};

/**
 * @param {Object} to the route that the user will go
 * @param {Object} from the route that the user came from
 * @returns {Object} routeToGo
 */
export default function(to) {
    const LoginRoute = {
        name: "login",
        query: {
            redirect: to.fullPath
        }
    };

    return new Promise((resolve, reject) => {
        if (store.getters["Application/isStateReady"]) {
            resolve(validateSubscription(to));
        } else {
            if (Cookies.get("token") && isValidJWT(Cookies.get("token"))) {
                store.dispatch("Application/getGlobalStateData").then(() => {
                    resolve(validateSubscription(to));
                }).catch(() => reject(LoginRoute));
            } else {
                reject(LoginRoute);
            }
        }
    });
}
