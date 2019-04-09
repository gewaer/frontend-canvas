<template>
    <div id="app" :class="{ 'full-height' : !($route.meta && $route.meta.requiresAuth == undefined) }">
        <!-- <modals-container/> -->
        <notifications/>
        <after-signup-wizard/>
        <basic-modal/>
        <app-sidebar
            v-if="$route.meta && $route.meta.requiresAuth == undefined"
            :show-sidebar="showSidebar"
            @handleSidebar="handleSidebar"
        />
        <div class="page-container">
            <app-header
                v-if="$route.meta && $route.meta.requiresAuth == undefined"
                :show-sidebar="showSidebar"
                @handleSidebar="handleSidebar"
                @toggleNotifications="toggleNotifications"
            />
            <div class="page-content-wrapper animated">
                <div class="content sm-gutter">
                    <free-trial-bar v-if="$route.meta && $route.meta.requiresAuth == undefined && isTrial"/>
                    <router-view class="container-fluid container-fixed-lg" transition="fade" transition-mode="out-in"/>
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
import { mapState, mapGetters } from "vuex";
import { AbilityBuilder } from "@casl/ability";
import AppHeader from "@c/header/";
import AppSidebar from "@/views/layout/side-bar.vue";
import FreeTrialBar from "@/views/layout/free-trial-banner.vue"
import AfterSignupWizard from "@/components/modals/after-signup-wizard.vue";
import BasicModal from "@/components/modals/basic-modal.vue";
import NotificationCenter from "@/views/layout/notification-center";

export default {
    components: {
        AppHeader,
        AppSidebar,
        FreeTrialBar,
        AfterSignupWizard,
        BasicModal,
        NotificationCenter
    },
    data() {
        return {
            appBaseColor: "#61c2cc",
            appSecondaryColor: "#9ee5b5",
            showSidebar: false,
            showNotificationCenter: false
        };
    },
    computed: {
        ...mapState({
            accessList: state => state.User.data.access_list
        }),
        ...mapGetters({
            isTrial: "Company/isTrialSubscription"
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
    mounted() {
        this.appInitialize();
    },
    methods: {
        appInitialize() {
            document.body.style.setProperty("--base-color", this.appBaseColor);
            document.body.style.setProperty("--secondary-color", this.appSecondaryColor);
        },
        handleSidebar(state) {
            this.showSidebar = state;
        },
        toggleNotifications() {
            this.showNotificationCenter = !this.showNotificationCenter;
        }
    }
}
</script>
