<template>
    <div v-on-clickout="closeNotifications" class="notifications-center">
        <div class="notifications-center__header">
            <span>Notifications</span>
            <a href="#">View all notifications</a>
        </div>
        <div class="notifications-center__day-group">
            <template
                v-for="(notifications, notificationGroup) in notificationsList"
                :notification="notification"
            >
                <notification-header
                    :key="notificationGroup"
                    :header="notificationGroup"
                />

                <notification-card
                    v-for="notification in notifications"
                    :key="notification.id"
                    :notification="notification"
                />
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { directive as onClickout } from "vue-clickout";
import NotificationCard from "./notification-card";
import NotificationHeader from "./notification-header";

export default {
    name: "NotificationCenter",
    components: {
        NotificationCard,
        NotificationHeader
    },
    directives: {
        onClickout
    },
    props: {
        showNotificationCenter: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            notificationsList: state => state.Notifications.grouped,
            notifications: state => state.Notifications.notifications
        })
    },
    created() {
        if (this.notifications.total_notifications) {
            this.$store.dispatch("Notifications/readAllNotification");
        }
    },
    methods: {
        closeNotifications() {
            this.$store.dispatch("Notifications/deleteAllNotifications");
            this.$emit("toggleNotifications");
        }
    }
};
</script>

<style lang="scss">
.notifications-center {
    width: 400px;
    background-color: white;
    z-index: 1000;
    right: 0;
    position: fixed;
    bottom: 0;
    top: 0;
    left: auto;
    overflow: auto;
    transition: transform 400ms cubic-bezier(0.05, 0.74, 0.27, 0.99);
    box-shadow: 0 0 9px rgba(191, 191, 191, 0.36);
    border-left: 1px solid rgba(222, 227, 231, 0.56);
    padding-top: 6px;

    h1 {
        font-size: 22px;
        line-height: 25px;
    }

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        top: 0;
        height: 6px;
        background-color: var(--base-color);
    }

    &__header {
        padding: 15px 40px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;

        span {
            color: var(--base-color);
            font-family: 'Lato', sans-serif;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            font-weight: bold;
        }

        a {
            color: var(--secondary-color);
            font-weight: 400;
        }
    }

    &__day-group {
        padding: 20px 40px;
        border-top: 1px solid #E2E8ED;
        border-bottom: 1px solid #E2E8ED;

        .day-group__header {
            display: flex;
            align-items: center;
            padding: 10px 0;

            h1 {
                font-size: 20px;
                margin: 0;
                font-weight: 500;
            }
        }
    }
}

.notification-close-button {
    margin-left: auto;
    background-color: #eaebeb;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    cursor: pointer;

    i {
        color: #c1bfbf;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
