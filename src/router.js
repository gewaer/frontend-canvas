import Vue from "vue";
import Router from "vue-router";
import isEqual from "lodash/isEqual";
import Dashboard from "./views/dashboard";
import Auth from "@/views/users/auth";
import BrowseList from "./views/browse/";
import createResource from "./views/resource/create.vue";
import routerValidator from "@/config/routerValidator";

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
            path: "/users/invites/:hash",
            name: "usersInvites",
            component: Auth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/users/link/:hash",
            name: "usersInvitesConfirmation",
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
            }
        },
        {
            path: "/settings/users/profile",
            name: "setingsUsersProfile",
            component: () => import(/* webpackChunkName: "settings-users-profile" */ "./views/settings/users/profile")
        },
        {
            path: "/settings/users/notifications",
            name: "setingsUsersNotifications",
            component: () => import(/* webpackChunkName: "settings-users-notifications" */ "./views/settings/users/notifications")
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
            component: () => import(/* webpackChunkName: "settings-users-security" */ "./views/settings/users/security")
        },
        {
            path: "/settings/users/devices",
            name: "setingsUsersDevices",
            component: () => import(/* webpackChunkName: "settings-users-devices" */ "./views/settings/users/devices")
        },
        // ===== Settings Apps Routes =====
        {
            path: "/settings/apps",
            name: "settingsApps",
            redirect: {
                name: "settingsAppsCustomFieldsList"
            }
        },
        {
            path: "/settings/apps/custom-fields",
            name: "settingsAppsCustomFieldsList",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-list" */ "./views/settings/apps/custom-fields/list"),
            meta: {
                group: "settingsAppsCustomFields"
            }
        },
        {
            path: "/settings/apps/custom-fields/add",
            name: "settingsAppsCustomFieldsForm",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-form" */ "./views/settings/apps/custom-fields/form"),
            meta: {
                group: "settingsAppsCustomFields"
            }
        },
        {
            path: "/settings/apps/custom-fields/edit/:id",
            name: "settingsAppsCustomFieldsFormEdit",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-form" */ "./views/settings/apps/custom-fields/form"),
            meta: {
                group: "settingsAppsCustomFields"
            }
        },
        {
            path: "/settings/apps/email-templates",
            name: "settingsAppsEmailTemplatesList",
            component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-list" */ "./views/settings/apps/email-templates/list"),
            meta: {
                group: "settingsAppsEmailTemplates"
            }
        },
        {
            path: "/settings/apps/email-templates/add",
            name: "settingsAppsEmailTemplatesForm",
            component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-form" */ "./views/settings/apps/email-templates/form"),
            meta: {
                group: "settingsAppsEmailTemplates"
            }
        },
        {
            path: "/settings/apps/email-templates/edit/:id",
            name: "settingsAppsEmailTemplatesFormEdit",
            component: () => import(/* webpackChunkName: "settings-apps-emailTemplates-form" */ "./views/settings/apps/email-templates/form"),
            meta: {
                group: "settingsAppsEmailTemplates"
            }
        },
        {
            path: "/settings/apps/webhooks",
            name: "settingsAppsWebhooksList",
            component: () => import(/* webpackChunkName: "settings-apps-webhooks-list" */ "./views/settings/apps/webhooks/list"),
            meta: {
                group: "settingsAppsWebhooks"
            }
        },
        {
            path: "/settings/apps/webhooks/add",
            name: "settingsAppsWebhooksForm",
            component: () => import(/* webpackChunkName: "settings-apps-webhooks-form" */ "./views/settings/apps/webhooks/form"),
            meta: {
                group: "settingsAppsWebhooks"
            }
        },
        {
            path: "/settings/apps/webhooks/edit/:id",
            name: "settingsAppsWebhooksFormEdit",
            component: () => import(/* webpackChunkName: "settings-apps-webhooks-form" */ "./views/settings/apps/webhooks/form"),
            meta: {
                group: "settingsAppsWebhooks"
            }
        },
        {
            path: "/settings/apps/import",
            name: "settingsAppsImportList",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-list" */ "./views/settings/apps/import/"),
            meta: {
                group: "settingsAppsImport"
            }
        },
        {
            path: "/settings/apps/themes",
            name: "settingsAppsThemesList",
            component: () => import(/* webpackChunkName: "settings-apps-customFields-list" */ "./views/settings/apps/themes"),
            meta: {
                group: "settingsAppsThemes"
            }
        },
        // ===== Settings Companies Routes =====
        {
            path: "/settings/companies",
            name: "settingsCompanies",
            redirect: {
                name: "settingsCompaniesProfile"
            }
        },
        {
            path: "/settings/companies/profile",
            name: "settingsCompaniesProfile",
            component: () => import(/* webpackChunkName: "settings-companies-profile" */ "./views/settings/companies/profile"),
            meta: {
                group: "settingsCompaniesProfile"
            }
        },
        {
            path: "/settings/companies/branches/list",
            name: "settingsCompaniesBranchesList",
            component: () => import(/* webpackChunkName: "settings-companies-branches-list" */ "./views/settings/companies/branches/list"),
            meta: {
                group: "settingsCompaniesBranches"
            }
        },
        {
            path: "/settings/companies/branches/add",
            name: "settingsCompaniesBranchesForm",
            component: () => import(/* webpackChunkName: "settings-companies-branches-form" */ "./views/settings/companies/branches/form"),
            meta: {
                group: "settingsCompaniesBranches"
            }
        },
        {
            path: "/settings/companies/branches/edit/:id",
            name: "settingsCompaniesBranchesFormEdit",
            component: () => import(/* webpackChunkName: "settings-companies-branches-form" */ "./views/settings/companies/branches/form"),
            meta: {
                group: "settingsCompaniesBranches"
            }
        },
        {
            path: "/settings/companies/users/list",
            name: "settingsCompaniesUsersList",
            component: () => import(/* webpackChunkName: "settings-companies-users-list" */ "./views/settings/companies/users/list"),
            meta: {
                group: "settingsCompaniesUsers"
            }
        },
        {
            path: "/settings/companies/users/add",
            name: "settingsCompaniesUsersForm",
            component: () => import(/* webpackChunkName: "settings-companies-users-form" */ "./views/settings/companies/users/form"),
            meta: {
                group: "settingsCompaniesUsers"
            }
        },
        {
            path: "/settings/companies/users/edit/:id",
            name: "settingsCompaniesUsersFormEdit",
            component: () => import(/* webpackChunkName: "settings-companies-users-form" */ "./views/settings/companies/users/form"),
            meta: {
                group: "settingsCompaniesUsers"
            }
        },
        // TODO: This is temp, remove later
        {
            path: "/settings/companies/roles",
            name: "settingsCompaniesRoles",
            component: () => import(/* webpackChunkName: "settings-companies-roles-list" */ "./views/settings/companies/roles/list"),
            meta: {
                group: "settingsCompaniesRoles"
            }
        },
        {
            path: "/settings/companies/roles/list",
            name: "settingsCompaniesRolesList",
            component: () => import(/* webpackChunkName: "settings-companies-roles-list" */ "./views/settings/companies/roles/list"),
            meta: {
                group: "settingsCompaniesRoles"
            }
        },
        {
            path: "/settings/companies/roles/add",
            name: "settingsCompaniesRolesForm",
            component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./views/settings/companies/roles/form"),
            meta: {
                group: "settingsCompaniesRoles"
            }
        },
        {
            path: "/settings/companies/roles/edit/:id",
            name: "settingsCompaniesRolesFormEdit",
            component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./views/settings/companies/roles/form"),
            meta: {
                group: "settingsCompaniesRoles"
            }
        },
        {
            path: "/settings/companies/subscriptions",
            name: "settingsCompaniesSubscriptions",
            component: () => import(/* webpackChunkName: "settings-companies-subscriptions" */ "./views/settings/companies/subscriptions"),
            meta: {
                group: "settingsCompaniesSubscriptions"
            }
        },
        // ===== Settings Companies Manager Routes =====
        {
            path: "/settings/manager/list",
            name: "settingsManagerList",
            component: () => import(/* webpackChunkName: "settings-manager-list" */ "./views/settings/manager/list"),
            meta: {
                group: "settingsManager"
            }
        },
        {
            path: "/settings/manager/add",
            name: "settingsManagerForm",
            component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./views/settings/manager/form"),
            meta: {
                group: "settingsManager"
            }
        },
        {
            path: "/settings/manager/edit/:id",
            name: "settingsManagerFormEdit",
            component: () => import(/* webpackChunkName: "settings-companies-roles-form" */ "./views/settings/manager/form"),
            meta: {
                group: "settingsManager"
            }
        },
        // ======================================================
        {
            path: "/browse/:resource",
            name: "browse",
            component: BrowseList
        },
        {
            path: "/browse/:resource/create",
            name: "create-resource",
            component: createResource
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth !== false)) {
        routerValidator(to, from).then((routeToGo) => {
            if (isEqual(routeToGo, to)) {
                next()
            } else {
                next(routeToGo)
            }
        }).catch((routeToGo) => next(routeToGo));

    } else {
        next();
    }
});

export default router;
