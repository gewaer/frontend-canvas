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
            <a :to="{ name: 'dashboard'}" class="app-secondary-logo">
                <img src="/img/secondary-logo.png">
            </a>
            <div class="sidebar-header-controls">
                <button type="button" class="btn btn-link d-lg-inline-block d-xlg-inline-block d-md-inline-block d-sm-none d-none" data-toggle-pin="sidebar">
                    <i class="fa fs-12"></i>
                </button>
            </div>
            <div class="menu-icon d-none d-lg-inline-block">
                <img src="../../assets/icons/hamburguer-menu.png">
            </div>
        </div>
        <!-- END SIDEBAR HEADER -->
        <!-- BEGIN SIDEBAR MENU -->
        <div id="sidebar-menu" class="sidebar-menu">
            <ul class="menu-items">
                <li class="m-t-30">
                    <a id="dashboard-menu-link" href="#">
                        <span class="title">Dashboard</span>
                    </a>
                    <span class="icon-thumbnail ">
                        <i class="fas fa-chart-pie"/>
                    </span>
                </li>
                <li>
                    <a id="browse-inventory-menu-link" href="#">
                        <span class="title">Leads</span>
                    </a>
                    <span class="icon-thumbnail">
                        <i class="fas fa-users"/>
                    </span>
                    <!-- <ul class="dealer-sub-menu">
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
                    </ul> -->
                </li>
                <li>
                    <a id="browse-inventory-menu-link" href="#">
                        <span class="title">Rotations</span>
                    </a>
                    <span class="icon-thumbnail">
                        <i class="fas fa-users"/>
                    </span>
                </li>
                <li>
                    <a id="browse-inventory-menu-link" href="#">
                        <span class="title">Lead Owners</span>
                    </a>
                    <span class="icon-thumbnail">
                        <i class="fas fa-users"/>
                    </span>
                </li>
                <li>
                    <a id="browse-inventory-menu-link" href="#">
                        <span class="title">Agents</span>
                    </a>
                    <span class="icon-thumbnail">
                        <i class="fas fa-users"/>
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
    props: {
        showSidebar: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleSidebar(payload) {
            this.$emit("handleSidebar", payload);
        }
    }
};
</script>

<style type="text/css">
.icon-thumbnail>i {
    font-size: 20px !important;
}

.page-sidebar .sidebar-menu .menu-items>li>a>.title {
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 75%;
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

    .sidebar-visible .menu-icon {
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
