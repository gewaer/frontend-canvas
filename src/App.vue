<template>
    <div id="app" :class="{ 'full-height' : $route.meta && !$route.meta.requiresAuth }">
        <notifications/>
        <unsaved-changes-modal/>
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
            />
            <div class="page-content-wrapper animated">
                <div class="content sm-gutter">
                    <free-trial-bar v-if="$route.meta && $route.meta.requiresAuth == undefined"/>
                    <router-view class="container-fluid container-fixed-lg" transition="fade" transition-mode="out-in"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { AbilityBuilder } from "@casl/ability";
import AppHeader from "@/views/layout/header.vue";
import AppSidebar from "@/views/layout/side-bar.vue";
import FreeTrialBar from "@/views/layout/free-trial-banner.vue"
import AfterSignupWizard from "@/components/modals/after-signup-wizard.vue";
import UnsavedChangesModal from "@/components/modals/unsaved-changes.vue";
import BasicModal from "@/components/modals/basic-modal.vue";

export default {
    components: {
        AppHeader,
        AppSidebar,
        FreeTrialBar,
        AfterSignupWizard,
        UnsavedChangesModal,
        BasicModal
    },
    data() {
        return {
            appBaseColor: "#61c2cc",
            appSecondaryColor: "#9ee5b5",
            showSidebar: false
        };
    },
    computed: {
        ...mapState({
            accessList: state => state.User.data.access_list
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
        },
        "$route.path"() {
            this.$nextTick(() => {
                $.Pages.init();
            });
        }
    },
    mounted() {
        this.appInitialize();

        $.Pages.init();
    },
    methods: {
        appInitialize() {
            document.body.style.setProperty("--base-color", this.appBaseColor);
            document.body.style.setProperty("--secondary-color", this.appSecondaryColor);

            $.Pages.init();
        },
        handleSidebar(state) {
            this.showSidebar = state;
        }
    }
}
</script>
<style lang="scss">
.v--modal-overlay {
    z-index: 99999 !important;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.btn-primary {
    background-color: var(--base-color);
    border-color: var(--base-color);
}

.btn-primary.active,
.btn-primary.active:focus,
.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled):active:focus,
.btn-primary:not(:disabled):not(.disabled):active:hover,
.show .dropdown-toggle.btn-primary
.btn-primary.hover,
.btn-primary:hover {
    background-color: var(--base-color);
    border-color: var(--base-color);
}

.full-height {
    height: 100%;

    .page-container {
        padding-left: 0;

        .content.sm-gutter {
            height: 100%;
            padding-top: 0;
            position: absolute;
            width: 100%;

            .login-wrapper   {
                width: initial;
                padding: 0;
                background-color: var(--base-color);
            }
        }
    }
}

[data-toggle-pin=sidebar]>i:before {
    content: "\f111";
}

.page-sidebar .sidebar-header .sidebar-header-controls {
    transform: translate3d(-18px,0,0);
}

body.sidebar-visible .page-sidebar .sidebar-header .sidebar-header-controls {
    transform: translate3d(38px,0,0);
}

.wizard-component ul li {
    padding-left: 0 !important;
}

.table.table-condensed tbody tr td :not(.dropdown-default) {
    overflow: visible;
}

.multiselect {
    .multiselect__placeholder {
        margin-bottom: 8px;
        padding-top: 0;
    }
}

@media only screen and (min-width: 980px) {
    body.menu-pin .page-sidebar {
        width: 280px;
    }
}
</style>
