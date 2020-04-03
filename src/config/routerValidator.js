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

const validateRouteAcl = function validateRouteAcl(routeTo) {
    let routeToGo = routeTo;

    if (Object.prototype.hasOwnProperty.call(routeTo.meta, "acl")) {
        const routeAcl = routeTo.meta.acl;

        if (store.state.User.abilities.cannot(routeAcl.action, routeAcl.resource)) {
            routeToGo = { name: "dashboard" };
        }
    }

    return routeToGo;
}

/**
 * @param {Object} to the route that the user will go
 * @param {Object} from the route that the user came from
 * @returns {Object} routeToGo
 */
export default function(to) {
    const loginRoute = {
        name: "login",
        query: {
            redirect: to.fullPath
        }
    };

    return new Promise((resolve, reject) => {
        if (store.getters["Application/isStateReady"]) {
            const aclValidatedRoute = validateRouteAcl(to);
            resolve(validateSubscription(aclValidatedRoute));
        } else {
            if (Cookies.get("token") && isValidJWT(Cookies.get("token"))) {
                store.dispatch("Application/getGlobalStateData").then(() => {
                    const aclValidatedRoute = validateRouteAcl(to);
                    resolve(validateSubscription(aclValidatedRoute));
                }).catch((error) => {
                    console.log(error);
                    reject(loginRoute);
                });
            } else {
                reject(loginRoute);
            }
        }
    });
}
