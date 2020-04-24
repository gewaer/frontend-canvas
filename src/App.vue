<template>
    <div id="app" :class="{ 'full-height' : !($route.meta && $route.meta.requiresAuth == undefined) }" class="app">
        <fullscreen-loader />
        <notifications />
        <after-signup-wizard />
        <basic-modal />
        <app-sidebar
            v-if="$route.meta && $route.meta.requiresAuth == undefined"
            :resources="resources"
            :show-sidebar="showSidebar"
            :sidebar-state="sidebarState"
            @handle-sidebar="handleSidebar"
        >
            <span slot="app-logo">KANVAS</span>
        </app-sidebar>
        <div
            :class="{ 'menu-pinned': sidebarState == 'opened' }"
            class="page-container"
        >
            <app-header
                v-if="$route.meta && $route.meta.requiresAuth == undefined && companyData"
                :apps-list="appsList"
                :companies-list="companiesList"
                :company-branch-data="companyBranchData"
                :company-data="companyData"
                :notifications-count="notificationsCount"
                :show-notifications="showNotifications"
                :show-sidebar="showSidebar"
                :sidebar-state="sidebarState"
                :user-data="userData"
                @handle-sidebar="handleSidebar(!showSidebar)"
                @toggle-notifications="toggleNotifications"
                @selected-company="switchCompany"
            />
            <div class="page-content-wrapper animated">
                <div class="content sm-gutter">
                    <subscription-bar v-if="isSubscriptionBased && $route.meta && $route.meta.requiresAuth == undefined" />
                    <router-view
                        :app-settings="appSettings"
                        class="container-fluid container-fixed-lg"
                        transition="fade"
                        transition-mode="out-in"
                    />
                </div>
            </div>
        </div>
        <transition name="slide-left" mode="out-in">
            <notification-center
                v-if="showNotifications && showNotificationCenter"
                @toggleNotifications="toggleNotifications"
            />
        </transition>
    </div>
</template>

<script>
const { AppHeader, AppSidebar } = require(`./import.${process.env.VUE_APP_IMPORTS}`);
import { hexToHSL } from "@/utils/helpers";
import { mapActions, mapGetters, mapState } from "vuex";
import AfterSignupWizard from "@/components/modals/after-signup-wizard";
import BasicModal from "@/components/modals/basic-modal";
import SubscriptionBar from "@/views/layout/subscription-bar";
import FullscreenLoader from "@c/fullscreen-loader";
import NotificationCenter from "@/views/layout/notification-center";

export default {
    components: {
        AfterSignupWizard,
        AppHeader,
        AppSidebar,
        BasicModal,
        SubscriptionBar,
        FullscreenLoader,
        NotificationCenter
    },
    data() {
        return {
            appBaseColor: "#8582D1",
            appSecondaryColor: "#9ee5b5",
            showSidebar: false,
            sidebarState: "hover",
            showNotificationCenter: false
        };
    },
    computed: {
        ...mapState({
            appsList: state => state.Application.apps,
            appSettings: state => state.Application.settings,
            companyData: state => state.Company.data,
            companiesList: state => state.Company.list,
            notificationsCount: state => state.Notifications.notifications.total_notifications || 0,
            resources: state => state.Application.resources,
            userData: state => state.User.data,
            userPermissions: state => state.User.abilities
        }),
        ...mapGetters({
            companyBranchData: "Company/currentBranch",
            isSubscriptionBased: "Application/isSubscriptionBased",
            userIsLoggedIn: "User/isLoggedIn"
        }),
        showNotifications() {
            return this.appSettings.settings && Boolean(+this.appSettings.settings.show_notifications);
        }
    },
    watch: {
        userPermissions() {
            this.$ability.update(this.userPermissions.rules);
        }
    },
    async created() {
        await this.$store.dispatch("Application/setEnv");
        await this.getAppData();
        this.sidebarState = this.appSettings.settings.default_sidebar_state;
        this.appBaseColor = this.appSettings.settings.base_color || this.appBaseColor;
        this.appSecondaryColor = this.appSettings.settings.secondary_color || this.appSecondaryColor;
        this.appInitialize();
    },
    mounted() {
        window.addEventListener("resize", () => {
            if (screen.availWidth <= 991) {
                this.sidebarState = "closed";
            } else {
                this.sidebarState = this.appSettings.settings.default_sidebar_state;
            }
        });
        FB.init({
            appId : process.env.VUE_APP_FACEBOOK_APP_ID,
            xfbml : true,
            version : "v5.0"
        });
    },
    methods: {
        ...mapActions({
            getAppData: "Application/getSettings"
        }),
        appInitialize() {
            const documentRoot = document.documentElement;
            // Primary App HSL Color
            const { h: pH, s: pS, l: pL } = hexToHSL(this.appBaseColor);
            // Secondary App HSL Colors
            const { h: sH, s: sS, l: sL } = hexToHSL(this.appSecondaryColor);
            documentRoot.style.setProperty("--base-color", `hsl(${pH},${pS}%,${pL}%)`);
            documentRoot.style.setProperty("--darken-base-color", `hsla(${pH},${pS - 10}%,${pL - 40}%)`);
            documentRoot.style.setProperty("--secondary-color", `hsl(${sH},${sS}%,${sL}%)`);
        },
        handleSidebar(state) {
            this.showSidebar = state;
        },
        switchCompany(company) {
            axios({
                url: `/users/${this.userData.id}`,
                method: "PUT",
                data: {
                    "default_company": company.companies_id,
                    "default_company_branch": company.id
                }
            }).then(() => {
                // Solution implemented for now until we can properly refresh all
                // of the user's and company's data through Vuex implementation.
                window.location.reload();
            });
        },
        toggleNotifications() {
            this.showNotificationCenter = !this.showNotificationCenter;
        }
    }
}
</script>

<style lang="scss">
.app {
    .page-container {
        width: 100%;
        height: 100%;
        padding-left: 70px;
        background-color: inherit;

        &.menu-pinned  {
            padding-left: 280px;
        }

        @media (max-width: $lg) {
            padding-left: 0;
            position: relative;
            transition: transform .25s ease;
        }

        .page-content-wrapper {
            min-height: 100%;
            position: relative;

            .content {
                z-index: 10;
                padding-top: 90px;
                padding-bottom: 70px;
                min-height: 100%;
                transition: all .3s ease;

                .container-fluid {
                    padding-left: 30px;
                    padding-right: 30px;
                    position: relative;

                    @media (min-width: 1824px) {
                        width: 1700px;
                        margin-right: auto;
                        margin-left: auto;

                        &.menu-pinned {
                            width: 1450px;
                        }
                    }

                    @media (max-width: $md) {
                        padding-left: 5px;
                        padding-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
