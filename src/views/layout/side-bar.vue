<template>
    <!-- BEGIN SIDEBAR -->
    <div
        id="page-sidebar"
        :class="{ 'open' : showSidebar }"
        class="page-sidebar"
        data-pages="sidebar"
        @mouseover="handleSidebar(true)"
        @mouseout="handleSidebar(false)"
    >
        <div id="appMenu" class="sidebar-overlay-slide from-top"/>
        <!-- BEGIN SIDEBAR HEADER -->
        <div class="sidebar-header">
            <router-link :to="{ name: 'dashboard'}" class="app-secondary-logo">
                <img src="/img/secondary-logo.png">
            </router-link>
            <div class="menu-icon d-none d-lg-inline-block">
                <img src="/img/icons/hamburguer-menu.png">
            </div>
        </div>
        <!-- END SIDEBAR HEADER -->
        <!-- BEGIN SIDEBAR MENU -->
        <div id="sidebar-menu" class="sidebar-menu">
            <ul class="menu-items">
                <li class="m-t-30">
                    <router-link id="dashboard-menu-link" :to="{ name: 'dashboard'}">
                        <span class="title">Dashboard</span>
                    </router-link>
                    <span class="icon-thumbnail ">
                        <i class="fas fa-chart-pie"/>
                    </span>
                </li>
                <!-- <li>
                    <a id="browse-inventory-menu-link" href="#">
                        <span class="title">Leads</span>
                    </a>
                    <span class="icon-thumbnail">
                        <i class="fas fa-users"/>
                    </span>
                    <ul class="dealer-sub-menu">
                        <li>
                            <a id="view-vehicle-menu-link">Option 1</a>
                            <span class="icon-thumbnail">V</span>
                        </li>
                        <li>
                            <a id="cost-data-menu-link">Option 1</a>
                            <span class="icon-thumbnail">C</span>
                        </li>
                        <li>
                            <a id="pricing-data-menu-link">Option 1</a>
                            <span class="icon-thumbnail">P</span>
                        </li>
                        <li class="d-none d-md-block">
                            <a id="forms-data-menu-link">Option 1</a>
                            <span class="icon-thumbnail">F</span>
                        </li>
                    </ul>
                </li> -->
                <li v-for="(crud, index) in crudsList" :key="index">
                    <router-link :to="{ name: 'browse', params: { crud: crud.name }}" href="#">
                        <span class="title">{{ crud.name }}</span>
                    </router-link>
                    <span class="icon-thumbnail">
                        <img v-if="crud.icon" :src="crud.icon" width="50%">
                        <span v-else>{{ crud.name | firstLetter }}</span>
                    </span>
                </li>
            </ul>
            <div class="clearfix"/>
        </div>
        <!-- END SIDEBAR MENU -->
    </div>
    <!-- END SIDEBAR -->
</template>

<script type="text/javascript">

export default {
    name: "SideBar",
    filters: {
        firstLetter(value) {
            const stringsArray = value.split("");
            return stringsArray.shift();
        }
    },
    props: {
        showSidebar: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            crudsList: [
                {
                    icon: "https://flaticons.net/gd/makefg.php?i=icons/Shopping/Product.png&r=255&g=255&b=255",
                    name: "products"
                },
                {
                    icon: "https://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Mail-01.png&r=255&g=255&b=255",
                    name: "contacts"
                },
                {
                    icon: "https://flaticons.net/gd/makefg.php?i=icons/Banking/Customer.png&r=255&g=255&b=255",
                    name: "clients"
                },
                {
                    icon: null,
                    name: "suppliers"
                },
                {
                    icon: null,
                    name: "places"
                }
            ]
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (localStorage.getItem("pin-menu")) {
                $('[data-pages="sidebar"]').data("pg.sidebar").togglePinSidebar();
            }
        });
    },
    methods: {
        handleSidebar(payload) {
            this.$emit("handleSidebar", payload);
        },
        togglePinSidebar() {
            if (localStorage.getItem("pin-menu")) {
                localStorage.removeItem("pin-menu")
            } else {
                window.localStorage.setItem("pin-menu", true);
            }
        }
    }
};
</script>

<style lang="scss">
.icon-thumbnail {
    font-size: 22px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    i {
        font-size: 18px !important;
    }
}

.page-sidebar .sidebar-menu .menu-items>li>a>.title {
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 75%;
    text-transform: capitalize;
}

.page-sidebar .sidebar-menu .menu-items li>a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70%;
}

.page-sidebar {
    transform: translate3d(0px, 0px, 0px);
}

.page-sidebar.open {
    transform: translate(210px, 0px);
}

@media (max-width: 991px) {
    .page-sidebar.open {
        display: block;
    }

    .page-sidebar.open + .page-container {
        transform: translate3d(250px, 0, 0);
    }

    .page-sidebar .sidebar-menu .menu-items li > a {
        width: 75%;
    }
}
</style>

<style lang="scss" scoped>
.sidebar-header {
    .app-secondary-logo {
        img {
            max-height: 30px;
        }
    }
}
.page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu > li > a {
    display: inline-block;
    padding: 5px 0px;
    font-size: 13px;
    font-family: Arial, sans-serif;
    white-space: normal;
}

.page-sidebar .sidebar-menu .menu-items > li ul.sub-menu > li > a,
.page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu > li > a {
    font-family: 'Roboto', sans-serif;
}

.page-sidebar .sidebar-menu .menu-items > li ul.sub-menu > li,
.page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu > li {
    padding: 10px 20px 0 40px;
}

.page-sidebar .sidebar-menu .menu-items > li ul.sub-menu > li:hover,
.page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu > li:hover {
    background:rgba(0,165,222,.5);
}

.icon-thumbnail,
.page-sidebar .sidebar-menu .menu-items>li ul.dealer-sub-menu>li .icon-thumbnail {
    background-color: transparent;
    color: #fff;
}

.page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu > li .icon-thumbnail {
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 0;
    font-size: 14px;
}

.page-sidebar .sidebar-menu .menu-items > li ul.sub-menu i,
.page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu i {
    color:rgba(255,255,255, .8);
    font-size: 16px !important;
}

.page-sidebar .sidebar-header,
.page-sidebar .sidebar-menu .menu-items > li ul.sub-menu,
.page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu {
    background-color:rgba(27,117,188,0);
    border-bottom: 1px solid var(--base-color); }

    .page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu {
        display: block !important;
        list-style: none;
        clear: both;
        margin: 0 0 10px 0;
        padding: 18px 0 10px 0;
    }

    .page-sidebar .sidebar-menu .menu-items>li ul.dealer-sub-menu>li {
        padding: 10px 20px 0 40px;
        background: none;
        margin-top: 1px;
    }

    .icon-thumbnail,
    .page-sidebar .sidebar-menu .menu-items > li ul.sub-menu > li .icon-thumbnail,
    .page-sidebar .sidebar-menu .menu-items > li ul.dealer-sub-menu > li .icon-thumbnail {
        background-color:transparent;
        color: white;
    }

    .menu-icon {
        position: absolute;
        right: 25px;
    }

    .sidebar-visible .menu-icon, .menu-pin .menu-icon {
        display: none !important;
    }

    .page-sidebar {
        background-color: var(--base-color);
        z-index: 1049;
    }

    .page-sidebar .sidebar-menu .menu-items > li > a {
        font-family: 'Roboto', 'Roboto', sans-serif;
        padding-left: 30px;
        font-weight: bold;
    }

    .pace .pace-progress {
        background-color: #00a5de;
    }

    .pace .pace-activity {
        display: none;
    }

    .page-sidebar a:visited,
    .page-sidebar a:focus,
    .page-sidebar button:visited,
    .page-sidebar button:focus,
    .page-sidebar a,
    .page-sidebar button {
        color: white;
    }
</style>
