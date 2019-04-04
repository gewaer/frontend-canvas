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
            <notifications
                @toggleNotifications="$emit('toggleNotifications')"
            />
        </div>
    </div>
</template>

<script type="text/javascript">
import AppSwitcher from "./app-switcher";
import CompaniesSwitcher from "./companies-switcher";
import CompanyLogo from "./company-logo";
import Notifications from "./notifications";
import UserOptions from "./user-options";

export default {
    name: "AppHeader",
    components: {
        AppSwitcher,
        CompaniesSwitcher,
        CompanyLogo,
        Notifications,
        UserOptions
    },
    props: {
        showSidebar: {
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
        .notifications-center {
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
