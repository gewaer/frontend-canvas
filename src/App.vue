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
            @handle-sidebar="handleSidebar"
        >
            <span slot="app-logo">KANVAS</span>
        </app-sidebar>
        <div class="page-container">
            <app-header
                v-if="$route.meta && $route.meta.requiresAuth == undefined && companyData"
                :companies-list="companiesList"
                :company-data="companyData"
                :show-sidebar="showSidebar"
                :user-data="userData"
                @toggle-notifications="toggleNotifications"
                @selected-company="switchCompany"
            />
            <div class="page-content-wrapper animated">
                <div class="content sm-gutter">
                    <subscription-bar v-if="isSubscriptionBased && $route.meta && $route.meta.requiresAuth == undefined"/>
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
                v-if="showNotificationCenter"
                @toggleNotifications="toggleNotifications"
            />
        </transition>
    </div>
</template>

<script>
const { AppHeader, AppSidebar } = require(`./import.${process.env.VUE_APP_IMPORTS}`);

import { mapActions, mapGetters, mapState } from "vuex";
import { AbilityBuilder } from "@casl/ability";
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
            showNotificationCenter: false
        };
    },
    computed: {
        ...mapState({
            appSettings: state => state.Application.settings,
            accessList: state => state.User.data.access_list,
            companyData: state => state.Company.data,
            companiesList: state => state.Company.list,
            resources: state => state.Application.resources,
            userData: state => state.User.data
        }),
        ...mapGetters({
            isSubscriptionBased: "Application/isSubscriptionBased"
        })
    },
    watch: {
        accessList(permissions) {
            if (permissions) {
                const ability = AbilityBuilder.define((can, cannot) => {
                    can("manage", "all");

                    Object.keys(permissions).forEach((resource) => {
                        Object.keys(permissions[resource]).forEach((action) => {
                            cannot(action, resource);
                        });
                    });
                });

                this.$ability.update(ability.rules);
            }
        }
    },
    async created() {
        await this.$store.dispatch("Application/setEnv");
        await this.getAppData();
        this.appBaseColor = this.appSettings.settings.base_color || this.appBaseColor;
        this.appSecondaryColor = this.appSettings.settings.secondary_color || this.appSecondaryColor;
        this.appInitialize();
        this.$store.dispatch("Notifications/getNotifications");
    },
    methods: {
        ...mapActions({
            getAppData: "Application/getSettings"
        }),
        appInitialize() {
            const root = document.documentElement;
            const { h, s, l } = this.hexToHSL(this.appBaseColor);
            root.style.setProperty("--base-color", `hsl(${h},${s}%,${l}%)`);
            root.style.setProperty("--darken-base-color", `hsla(${h},${s - 10}%,${l - 40}%)`);
            root.style.setProperty("--secondary-color", this.hexToHSL(this.appSecondaryColor));
        },
        handleSidebar(state) {
            this.showSidebar = state;
        },
        switchCompany(company) {
            axios({
                url: `/users/${this.userData.id}`,
                method: "PUT",
                data: {
                    "default_company": company.id
                }
            }).then(() => {
                // Solution implemented for now until we can properly refresh all
                // of the user's and company's data through Vuex implementation.
                window.location.reload();
            });
        },
        toggleNotifications() {
            this.showNotificationCenter = !this.showNotificationCenter;
        },
        hexToHSL(H) {
            // Convert hex to RGB first
            let r = 0, g = 0, b = 0;
            if (H.length == 4) {
                r = "0x" + H[1] + H[1];
                g = "0x" + H[2] + H[2];
                b = "0x" + H[3] + H[3];
            } else if (H.length == 7) {
                r = "0x" + H[1] + H[2];
                g = "0x" + H[3] + H[4];
                b = "0x" + H[5] + H[6];
            }
            // Then to HSL
            r /= 255;
            g /= 255;
            b /= 255;
            let cmin = Math.min(r,g,b),
                cmax = Math.max(r,g,b),
                delta = cmax - cmin,
                h = 0,
                s = 0,
                l = 0;

            if (delta == 0) {
                h = 0;
            } else if (cmax == r) {
                h = ((g - b) / delta) % 6;
            } else if (cmax == g) {
                h = (b - r) / delta + 2;
            } else {
                h = (r - g) / delta + 4;
            }

            h = Math.round(h * 60);

            if (h < 0) {
                h += 360;
            }

            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            return { h, s, l };
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

        &.menu-pinned  {
            padding-left: 210px;
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
                padding-bottom: 69px;
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
                }
            }
        }
    }
}
</style>
