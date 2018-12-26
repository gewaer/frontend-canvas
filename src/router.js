import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/dashboard";
import Auth from "@/views/users/auth";
import store from "@/store";
import examples from "./views/examples";
import CompaniesSettings from "./views/settings/companies";
import AppsSettings from "./views/settings/apps";
import BrowseList from "./views/browse/";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/users/login",
            name: "login",
            component: Auth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/users/signup",
            name: "signup",
            component: Auth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/users/forgot-password",
            name: "forgotPassword",
            component: Auth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/users/reset-password/:resetKey",
            name: "resetPassword",
            component: Auth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "*",
            name: "404",
            component: () => import(/* webpackChunkName: "error-404" */ "./views/errors/error-404"),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/forbidden",
            name: "403",
            component: () => import(/* webpackChunkName: "error-404" */ "./views/errors/error-403"),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/example-page",
            name: "examplePage",
            component: examples,
            meta: {
                requiresAuth: false
            }
        },
        // ===== Settings Users Routes =====
        {
            path: "/settings/users",
            name: "setingsUsers",
            redirect: {
                name: "setingsUsersProfile"
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/users/profile",
            name: "setingsUsersProfile",
            component: () => import(/* webpackChunkName: "settings-users-profile" */ "./views/settings/users/profile"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/users/notifications",
            name: "setingsUsersNotifications",
            component: () => import(/* webpackChunkName: "settings-users-notifications" */ "./views/settings/users/notifications"),
            meta: {
                requiresAuth: true
            }
        },
        // {
        //     path: "/settings/users/social",
        //     name: "setingsUsersSocial",
        //     component: () => import(/* webpackChunkName: "settings-users-social" */ "./views/settings/users/social"),
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        {
            path: "/settings/users/security",
            name: "setingsUsersSecurity",
            component: () => import(/* webpackChunkName: "settings-users-security" */ "./views/settings/users/security"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/companies",
            name: "companiesSettings",
            component: CompaniesSettings,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps",
            name: "appsSettings",
            component: AppsSettings,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/browse",
            name: "browse",
            component: BrowseList,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth == true)) {
        if (store.getters["Application/isStateReady"]) {
            next();
        } else {
            store.dispatch("Application/getGlobalStateData").then(() => {
                next();
            }).catch(() => {
                next({
                    name: "login",
                    query: {
                        redirect: to.fullPath
                    }
                });
            });
        }
    } else {
        next();
    }
});

export default router;
