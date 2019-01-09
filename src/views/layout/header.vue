<template>
    <div class="header app-header">
        <div class="sidebar-toggle" @click="handleSidebar(!showSidebar)">
            <img src="../../assets/icons/hamburguer-menu.png">
        </div>
        <router-link :to="{ name: 'dashboard'}" class="app-logo">
            <img src="/img/primary-logo.png" alt="logo">
        </router-link>
        <div class="app-switcher">
            <span class="app-mode">A1</span>
            <a
                id="app-grid"
                class="grid-box"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
            />
            <ul class="dropdown-menu" aria-labelledby="app-grid">
                <li class="dropdown-item">
                    <a href="javascript:void(0)" target="_blank">
                        <span class="app-mode mode">A1</span>
                        <p>Application 1</p>
                    </a>
                </li>
                <li class="dropdown-item">
                    <a href="javascript:void(0)" target="_blank">
                        <span class="app-mode mode">A2</span>
                        <p>Application 2</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="notifications-center dropdown">
            <a
                id="notification-center"
                href="javascript:;"
                class="header-icon pg pg-world"
                data-toggle="dropdown"
            >
                <span class="bubble"/>
            </a>
            <div class="dropdown-menu notification-toggle" role="menu" aria-labelledby="notification-center">
                <div class="notification-panel">
                    <div class="notification-body scrollable">
                        <!-- START Notification Item-->
                        <div class="notification-item unread clearfix">
                            <!-- START Notification Item-->
                            <div class="heading open">
                                <a href="#" class="text-complete pull-left">
                                    <i class="pg-map fs-16 m-r-10"/>
                                    <span class="bold">Carrot Design</span>
                                    <span class="fs-12 m-l-10">David Nester</span>
                                </a>
                                <div class="pull-right">
                                    <div class="thumbnail-wrapper d16 circular inline m-t-15 m-r-10 toggle-more-details">
                                        <div><i class="fa fa-angle-left"/></div>
                                    </div>
                                    <span class=" time">few sec ago</span>
                                </div>
                                <div class="more-details">
                                    <div class="more-details-inner">
                                        <h5 class="semi-bold fs-16">
                                            “Apple’s Motivation - Innovation<br>
                                            distinguishes between<br>
                                            A leader and a follower.”
                                        </h5>
                                        <p class="small hint-text">
                                            Commented on john Smiths wall.
                                            <br> via pages framework.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- END Notification Item-->
                            <!-- START Notification Item Right Side-->
                            <div
                                class="option"
                                data-toggle="tooltip"
                                data-placement="left"
                                title="mark as read">
                                <a href="#" class="mark"/>
                            </div>
                        <!-- END Notification Item Right Side-->
                        </div>
                        <!-- START Notification Body-->
                        <!-- START Notification Item-->
                        <div class="notification-item  clearfix">
                            <div class="heading">
                                <a href="#" class="text-danger pull-left">
                                    <i class="fa fa-exclamation-triangle m-r-10"/>
                                    <span class="bold">98% Server Load</span>
                                    <span class="fs-12 m-l-10">Take Action</span>
                                </a>
                                <span class="pull-right time">2 mins ago</span>
                            </div>
                            <!-- START Notification Item Right Side-->
                            <div class="option">
                                <a href="#" class="mark"/>
                            </div>
                        <!-- END Notification Item Right Side-->
                        </div>
                        <!-- END Notification Item-->
                        <!-- START Notification Item-->
                        <div class="notification-item  clearfix">
                            <div class="heading">
                                <a href="#" class="text-warning-dark pull-left">
                                    <i class="fa fa-exclamation-triangle m-r-10"/>
                                    <span class="bold">Warning Notification</span>
                                    <span class="fs-12 m-l-10">Buy Now</span>
                                </a>
                                <span class="pull-right time">yesterday</span>
                            </div>
                            <!-- START Notification Item Right Side-->
                            <div class="option">
                                <a href="#" class="mark"/>
                            </div>
                        <!-- END Notification Item Right Side-->
                        </div>
                        <!-- END Notification Item-->
                        <!-- START Notification Item-->
                        <div class="notification-item unread clearfix">
                            <div class="heading">
                                <div class="thumbnail-wrapper d24 circular b-white m-r-5 b-a b-white m-t-10 m-r-10">
                                    <img
                                        width="30"
                                        height="30"
                                        data-src-retina="assets/img/profiles/1x.jpg"
                                        data-src="assets/img/profiles/1.jpg"
                                        alt=""
                                        src="assets/img/profiles/1.jpg">
                                </div>
                                <a href="#" class="text-complete pull-left">
                                    <span class="bold">Revox Design Labs</span>
                                    <span class="fs-12 m-l-10">Owners</span>
                                </a>
                                <span class="pull-right time">11:00pm</span>
                            </div>
                            <!-- START Notification Item Right Side-->
                            <div
                                class="option"
                                data-toggle="tooltip"
                                data-placement="left"
                                title="mark as read">
                                <a href="#" class="mark"/>
                            </div>
                        <!-- END Notification Item Right Side-->
                        </div>
                        <!-- END Notification Item-->
                    </div>
                    <div class="notification-footer text-center">
                        <a href="#" class="">Read all notifications</a>
                        <a data-toggle="refresh" class="portlet-refresh text-black pull-right" href="#">
                            <i class="pg-refresh_new"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
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
        <div class="user-bar">
            <div class="user-name">
                <span class="bold">{{ userData.firstname }}</span>
                <span> {{ userData.lastname }}</span>
            </div>
            <div class="dropdown">
                <div
                    class="profile-image"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <img src="../../assets/icons/avatar-icon.png" alt="Avatar icon">
                </div>
                <ul class="dropdown-menu dropdown-menu-right profile-dropdown" role="menu">
                    <router-link :to="{name: 'setingsUsersProfile'}" class="dropdown-item">
                        <span>Users Settings</span>
                    </router-link>
                    <router-link :to="{name: 'settingsCompanies'}" class="dropdown-item">
                        <span>Companies Settings</span>
                    </router-link>
                    <router-link :to="{name: 'settingsAppsCustomFieldsList'}" class="dropdown-item">
                        <span>App Settings</span>
                    </router-link>
                    <a href="#" class="dropdown-item" @click.prevent="logout()">
                        <span>Logout</span>
                        <i class="pg-power"/>
                    </a>
                </ul>
            </div>
        </div>
        <a
            href="#"
            class="notification-sidebar header-icon pg pg-alt_menu btn-link m-l-10 sm-no-margin"
            data-toggle="quickview"
            data-toggle-element="#quickview"
        />
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
        }
    },
    data() {
        return {
            selectedCompany: null
        }
    },
    computed: {
        ...mapState("Company", {
            companies: state => state.list,
            defaultCompany: state => state.data
        }),
        ...mapState("User", {
            userData: state => state.data
        })
    },
    watch: {
        defaultCompany() {
            this.selectedCompany = this.defaultCompany;
        }
    },
    created() {
        this.selectedCompany = this.defaultCompany;
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

<style lang="scss" scoped>
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
    }

    .app-switcher {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 30px;
        border-left: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        order: 2;
        margin-right: auto;

        #app-grid {
            background: url(../../assets/icons/top_tray.png) no-repeat;
            background-position-x: 0%;
            background-position-y: 0%;
            background-position: -41px center;
            width: 14px;
            height: 14px;
            padding: 0;
            display: block;
            height: 100%;
        }

        #app-grid + ul {
            left: -75px !important;
            border-radius: 0;
            text-align: center;
            box-shadow: 0 0 0 1px rgba(98,98,98,.2);
            margin-top: 0;

            li {
                padding: 5px 20px;

                a {
                    p {
                        color: var(--base-color);
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
            .dropdown-item {
                display: flex;
                align-items: center;
                margin-top: 0;

                i {
                    margin-left: 5px;
                }
            }

            .dropdown-item:hover {
                background-color: transparent;
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
