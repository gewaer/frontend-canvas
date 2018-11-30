import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/dashboard";
import Auth from "@/views/users/auth";
import store from "@/store";
import examples from "./views/examples";
import userSettings from "./views/users/settings";
import companySettings from "@/views/settings/company/CompanySettings";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: Dashboard
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
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
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
            path: "/example-page",
            name: "examplePage",
            component: examples,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/users/settings",
            name: "userSettings",
            component: userSettings
        },
        {
            path: "/settings/user",
            name: "userSettings2",
            component: userSettings
        },
        {
            path: "/settings/company",
            name: "companySettings",
            component: companySettings
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth == undefined)) {
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
