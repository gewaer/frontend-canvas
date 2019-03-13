<template>
    <div class="header app-header">
        <div class="left-side-header d-flex">
            <div class="sidebar-toggle" @click="handleSidebar(!showSidebar)">
                <img src="/img/icons/hamburguer-menu.png">
            </div>
            <router-link :to="{ name: 'dashboard'}" class="app-logo">
                <slot name="logo">
                    <div class="company-name">{{ companyName }}</div>
                </slot>
            </router-link>
            <!-- <dropdown class="app-switcher">
                <template slot="btn">
                    <span class="app-mode">A1</span>
                    <a
                        id="app-grid"
                        class="grid-box"
                    />
                </template>
                <ul slot="body">
                    <li>
                        <a href="javascript:void(0)" target="_blank">
                            <span class="app-mode mode">A1</span>
                            <p>Application 1</p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" target="_blank">
                            <span class="app-mode mode">A2</span>
                            <p>Application 2</p>
                        </a>
                    </li>
                </ul>
            </dropdown> -->
        </div>
        <div class="right-side-header  d-flex">
            <div class="multi-rooftop">
                <multiselect
                    id="rooftop-select"
                    v-model="selectedCompany"
                    :allow-empty="false"
                    :options="companies"
                    :searchable="false"
                    :show-labels="false"
                    class="rooftop-select"
                    label="name"
                    @select="switchCompany"
                />
            </div>
            <dropdown class="user-bar">
                <template slot="btn">
                    <div class="user-name">
                        <span class="bold">{{ userData.firstname }}</span>
                        <span> {{ userData.lastname }}</span>
                    </div>
                    <div class="profile-image">
                        <img src="/img/icons/avatar-icon.png" alt="Avatar icon">
                    </div>
                </template>
                <ul slot="body" class="profile-dropdown" role="menu">
                    <router-link :to="{name: 'setingsUsersProfile'}">
                        <span>Users Settings</span>
                    </router-link>
                    <router-link :to="{name: 'settingsCompaniesProfile'}">
                        <span>{{ companyName }} Settings</span>
                    </router-link>
                    <router-link :to="{name: 'settingsAppsCustomFieldsList'}">
                        <span>App Settings</span>
                    </router-link>
                    <router-link :to="{name: 'settingsManagerList'}">
                        <span>Companies Manager</span>
                    </router-link>
                    <a href="#" @click.prevent="logout()">
                        <span>Logout</span>
                        <i class="pg-power"/>
                    </a>
                </ul>
            </dropdown>

            <!-- <a
                href="#"
                class="notification-sidebar header-icon pg pg-alt_menu btn-link m-l-10 sm-no-margin"
                data-toggle="quickview"
                data-toggle-element="#quickview"
            /> -->
        </div>
    </div>
</template>

<script type="text/javascript">
import { mapState } from "vuex";

export default {
    name: "Header",
    props: {
        showSidebar: {
            type: Boolean,
            default: false
        },
        applications: {
            type: Array,
            default() {
                return false
            }
        }
    },
    data() {
        return {
            selectedCompany: {}
        }
    },
    computed: {
        ...mapState("Company", {
            companies: state => state.list,
            defaultCompany: state => state.data
        }),
        ...mapState("User", {
            userData: state => state.data
        }),
        companyName() {
            return this.selectedCompany ? this.selectedCompany.name : "company";
        }
    },
    watch: {
        defaultCompany() {
            this.selectedCompany = this.defaultCompany;
        }
    },
    methods: {
        handleSidebar(payload) {
            this.$emit("handleSidebar", payload);
        },
        logout() {
            axios({
                url: "/auth/logout",
                method: "PUT"
            }).then(() => {
                Cookies.remove("token", { path: "/", domain: process.env.VUE_APP_DOMAIN });
                this.$store.dispatch("User/setToken", null);
                this.$store.dispatch("Application/resetGlobalData");
                this.$router.push({ name: "login" });
            });
        },
        switchCompany(company) {
            axios({
                url: `/users/${this.userData.id}`,
                method: "PUT",
                data: {
                    "default_company": company.id
                }
            }).then(() => {
                this.$store.dispatch("Company/setData", company);
            });
        }
    }
};
</script>

<style lang="scss">
.app-header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    height: 60px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    justify-content: space-between;
    align-items: inherit;
    padding: 0;

    .sidebar-toggle {
        max-width: 70px;
        background-color: var(--base-color);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 23px;
        order: 0;
    }

    .app-logo {
        padding: 5px 25px;
        order: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-height: 30px;
        }

        .company-name {
            text-transform: uppercase;
            font-size: 28px;
            font-weight: 500;
        }
    }

    .app-switcher {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 30px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        order: 2;
        // margin-right: auto;

        #app-grid {
            background: url('/img/icons/top_tray.png') no-repeat;
            background-position-x: 0%;
            background-position-y: 0%;
            background-position: -41px center;
            width: 14px;
            height: 14px;
            padding: 0;
            display: block;
        }

        .bp-dropdown__body {
            border-radius: 0;
            text-align: center;
            box-shadow: 0 0 0 1px rgba(98,98,98,.2);
            margin-top: 0;

            li {
                padding: 5px 10px;

                a {
                    display: flex;
                    align-items: center;

                    p {
                        color: var(--base-color);
                        margin-bottom: 0;
                        margin-left: 10px;
                    }
                }
            }
        }

        .app-mode {
            color: var(--base-color);
            font-size: 12px !important;
            font-weight: bolder;
            line-height: 26px;
            display: block;
            border:2px solid var(--base-color);
            text-align: center;
            height: 30px;
            width: 30px;
        }

        .grid-box {
            margin-left: 15px;
        }

        .dropdown-menu {
            min-width: 250px;

            .dropdown-item {
                padding: 5px 20px;

                a {
                    display: flex;
                    align-items: center;

                    p {
                        margin-bottom: 0;
                        margin-left: 10px;
                    }
                }
            }
        }
    }

    .notifications-center {
        order: 3;
        margin-left: 15px;
        display: flex;
        align-items: center;

        .header-icon {
            position: relative;
        }
    }

    .multi-rooftop {
        display: flex;
        align-items: center;
        padding: 0 15px;
        order: 4;
    }

    .user-bar {
        background-color: #ededed;
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 20px;
        order: 5;

        .user-name {
            margin-right: 10px;
        }

        .profile-image {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 100%;
                border-radius: 100%;
                height: initial;
            }
        }

        .profile-dropdown {
            a {
                display: flex;
                align-items: center;
                margin-top: 0;
                padding: 5px 10px;
                text-transform: capitalize;

                i {
                    margin-left: 5px;
                }
            }
        }
    }

    .notification-sidebar {
        order: 6;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}

.desactivate-lm {
    cursor: not-allowed;
}

.desactivate-lm span, .desactivate-lm p {
    color: #ccc;
    border-color: #ccc;
}

@media(max-width: 992px) {
    .app-header {
        .app-logo {
            order: 2;
            margin-right: auto;
            margin-left: auto;
            padding: 0;
            padding-left: 10px;
        }

        .app-switcher {
            order: 1;
            margin-right: initial;
            padding: 0 10px;

            #app-grid {
                position: absolute;
                left: 0;
                margin: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: none;
            }
        }

        .notifications-center, .notification-sidebar {
            display: none;
        }

        .multi-rooftop {
            padding: 0 5px;

            .multiselect {
                .multiselect__content {
                    position: fixed;
                    width: 100%;
                    left: 0;
                    border: 0;
                    margin-top: 10px;
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .app-header {
        .free-trial-icon {
            display: none;
        }
        .user-bar {
            padding: 0 5px;

            .user-name {
                display: none;
            }
        }
    }
}

@media screen and (max-width: 475px) {
    .app-header {
        .app-logo {
            display: none;
        }
    }
}
</style>
