import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/dashboard";
import Auth from "@/views/users/auth";
import store from "@/store";
import examples from "./views/examples";
import SettingsCompaniesProfile from "./views/settings/companies/profile";
import SettingsCompaniesList from "./views/settings/companies/companies/";
import SettingsCompaniesBranches from "./views/settings/companies/branches/";
import SettingsCompaniesUsers from "./views/settings/companies/users/";
import SettingsCompaniesRoles from "./views/settings/companies/roles/";
import SettingsCompaniesSubscriptions from "./views/settings/companies/subscriptions";
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
        // ===== Settings Apps Routes =====
        {
            path: "/settings/apps",
            name: "settingsApps",
            redirect: {
                name: "settingsAppsCustomFieldsList"
            },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/custom-fields",
            name: "settingsAppsCustomFieldsList",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-list" */ "./views/settings/apps/custom-fields/list"),
            meta: {
                group: "settingsAppsCustomFields",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/custom-fields/add",
            name: "settingsAppsCustomFieldsForm",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-form" */ "./views/settings/apps/custom-fields/form"),
            meta: {
                group: "settingsAppsCustomFields",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/custom-fields/edit/:id",
            name: "settingsAppsCustomFieldsFormEdit",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-form" */ "./views/settings/apps/custom-fields/form"),
            meta: {
                group: "settingsAppsCustomFields",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/email-templates",
            name: "settingsAppsEmailTemplatesList",
            component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-list" */ "./views/settings/apps/email-templates/list"),
            meta: {
                group: "settingsAppsEmailTemplates",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/email-templates/add",
            name: "settingsAppsEmailTemplatesForm",
            component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-form" */ "./views/settings/apps/email-templates/form"),
            meta: {
                group: "settingsAppsEmailTemplates",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/email-templates/edit/:id",
            name: "settingsAppsEmailTemplatesFormEdit",
            component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-form" */ "./views/settings/apps/email-templates/form"),
            meta: {
                group: "settingsAppsEmailTemplates",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/webhooks",
            name: "settingsAppsWebhooksList",
            component: () => import(/* webpackChunkName: "settings-apps-webhooks-list" */ "./views/settings/apps/webhooks/list"),
            meta: {
                group: "settingsAppsWebhooks",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/webhooks/add",
            name: "settingsAppsWebhooksForm",
            component: () => import(/* webpackChunkName: "settings-apps-webhooks-form" */ "./views/settings/apps/webhooks/form"),
            meta: {
                group: "settingsAppsWebhooks",
                requiresAuth: true
            }
        },
        {
            path: "/settings/apps/webhooks/edit/:id",
            name: "settingsAppsWebhooksFormEdit",
            component: () => import(/* webpackChunkName: "settings-apps-webhooks-form" */ "./views/settings/apps/webhooks/form"),
            meta: {
                group: "settingsAppsWebhooks",
                requiresAuth: true
            }
        },
        // ============== Settings Companies Routes ==============
        {
            path: "/settings/companies",
            name: "settingsCompanies",
            component: SettingsCompaniesProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/companies/list",
            name: "settingsCompaniesList",
            component: SettingsCompaniesList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/companies/branches",
            name: "settingsCompaniesBranches",
            component: SettingsCompaniesBranches,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/companies/users",
            name: "settingsCompaniesUsers",
            component: SettingsCompaniesUsers,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/companies/roles",
            name: "settingsCompaniesRoles",
            component: SettingsCompaniesRoles,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/settings/companies/subscriptions",
            name: "settingsCompaniesSubscriptions",
            component: SettingsCompaniesSubscriptions,
            meta: {
                requiresAuth: true
            }
        },

        // ======================================================
        {
            path: "/browse",
            name: "browse",
            component: BrowseList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/example-page",
            name: "examplePage",
            component: examples,
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
