<template>
    <div class="notification-container">
        <div class="notification-container__header">
            <div class="header__icon">
                <i class="fa text-primary fa-info-circle" />
            </div>
            <span :title="notification.created_at" class="header__title">{{ notification.title }}</span>
            <div class="header__time-and-close">
                <button
                    type="button"
                    title="Delete notification"
                    class="notification-close-button"
                    data-dismiss="modal"
                    aria-hidden="true"
                    @click="$store.dispatch('Notifications/deleteSingleNotification', notification)"
                >
                    <i class="pg-close fs-14" />
                </button>
            </div>
        </div>
        <div class="notification-container__body" v-html="notification.content" />
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
