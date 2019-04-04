<template>
    <a
        href="#"
        class="notification-sidebar header-icon pg pg-alt_menu btn-link m-l-10 sm-no-margin"
        @click="$emit('toggleNotifications')"
    >
        <div class="notification-badge bg-danger">1</div>
    </a>
</template>

<script>
export default {
    name: "Notifications"
}
</script>

<style lang="scss" scoped>
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

@media(max-width: 992px) {
    .notification-sidebar {
        display: none;
    }
}
</style>
