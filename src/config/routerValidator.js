import store from "@/store";

import { isValidJWT } from "@/utils/helpers";

const validateSubscription = function validateSubscription(routeTo) {
    let routeToGo = routeTo;
    if (routeTo.name != "settingsCompaniesSubscriptions" && store.getters["Company/subscriptionHasEnded"]) {
        routeToGo = { name: "settingsCompaniesSubscriptions" }
    }
    return routeToGo;
};

const validationHandler = function validationHandler(routeTo) {
    let routeToGo = validateSubscription(routeTo);

    return routeToGo;
}
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
            const routeToGo = validationHandler(to);
            resolve(routeToGo);
        } else {
            if (Cookies.get("token") && isValidJWT(Cookies.get("token"))) {

                store.dispatch("Application/getGlobalStateData").then(() => {
                    const routeToGo = validationHandler(to);
                    resolve(routeToGo);
                }).catch(() => reject(LoginRoute));
            } else {
                reject(LoginRoute)
            }

        }

    });
}

