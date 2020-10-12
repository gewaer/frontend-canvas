<template>
    <div class="notification-container">
        <div class="notification-container__body" v-html="notification.content" />
        <button
            type="button"
            title="Delete notification"
            class="notification-close-button"
            data-dismiss="modal"
            aria-hidden="true"
            @click="$store.dispatch('Notifications/deleteSingleNotification', notification)"
        >
            <i class="fa fa-times" />
        </button>
    </div>
</template>

<script>
export default {
    name: "NotificationCard",
    props: {
        notification: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
.notification-container {
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;

    &__body {
        font-size: 12px;
    }
}
</style>
