import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/dashboard";
import Auth from "@/views/users/auth";
import store from "@/store";
import examples from "./views/examples";
import UsersSettings from "@/views/settings/users";
import CompaniesSettings from "@/views/settings/companies";
import AppsSettings from "@/views/settings/apps";
import BrowseList from "@/views/browse/";

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
            component: () => import(/* webpackChunkName: "404" */ "./views/errors/404.vue"),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/forbidden",
            name: "403",
            component: () => import(/* webpackChunkName: "404" */ "./views/errors/403.vue"),
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
        {
            path: "/settings/users",
            name: "usersSettings",
            component: UsersSettings,
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
                requiresAuth: false
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
