<template>
    <div class="header app-header">
        <div class="left-side-header d-flex">
            <div class="sidebar-toggle" @click="$emit('handleSidebar', !showSidebar)">
                <img src="/img/icons/hamburguer-menu.png">
            </div>
            <company-logo />
            <!-- <app-switcher /> -->
        </div>
        <div class="right-side-header d-flex">
            <companies-switcher />
            <user-options />
            <a
                href="#"
                class="notification-sidebar header-icon pg pg-alt_menu btn-link m-l-10 sm-no-margin"
                @click="$emit('handleNotificationCenter', !showNotificationCenter)"
            >
                <div class="notification-badge bg-danger">1</div>
            </a>
        </div>
    </div>
</template>

<script type="text/javascript">
import AppSwitcher from "./app-switcher";
import CompaniesSwitcher from "./companies-switcher";
import CompanyLogo from "./company-logo";
import UserOptions from "./user-options";

export default {
    name: "AppHeader",
    components: {
        AppSwitcher,
        CompaniesSwitcher,
        CompanyLogo,
        UserOptions
    },
    props: {
        showSidebar: {
            type: Boolean,
            default: false
        },
        showNotificationCenter: {
            type: Boolean,
            default: false
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

    .notifications-center {
        order: 3;
        margin-left: 15px;
        display: flex;
        align-items: center;

        .header-icon {
            position: relative;
        }
    }

    .notification-sidebar {
        order: 6;
        display: flex;
        align-items: center;
        margin-right: 20px;
        position: relative;

        .notification-badge {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 12px;
            right: -14px;
            border-radius: 100%;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            font-size: 14px;
            font-weight: 500;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
        }
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
        .notifications-center, .notification-sidebar {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .app-header {
        .free-trial-icon {
            display: none;
        }
    }
}
</style>
