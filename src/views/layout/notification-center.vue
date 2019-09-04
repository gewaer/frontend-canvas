<template>
    <div v-on-clickout="closeNotifications" class="notifications-center">
        <div class="notifications-center__header">
            Notifications
            <button
                type="button"
                class="notification-close-button"
                data-dismiss="modal"
                aria-hidden="true"
                @click="closeNotifications">
                <i class="pg-close fs-14"/>
            </button>
        </div>
        <div class="notifications-center__day-group">
            <template
                v-for="(notifications, notificationGroup) in notificationsList"
                :notification="notification">
                <notification-header
                    :header="notificationGroup"
                    :key="notificationGroup" />

                <notification-card
                    v-for="notification in notifications"
                    :notification="notification"
                    :key="notification.id" />
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import NotificationCard from "./notification-card";
import NotificationHeader from "./notification-header";

import { directive as onClickout } from "vue-clickout";

export default {
    name: "NotificationCenter",
    components: {
        NotificationCard,
        NotificationHeader
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
            console.log("XX")
            this.$store.dispatch("Notifications/readAllNotification");
        } else {
            console.log("Nope")
        }
    },
    methods: {
        closeNotifications() {
            this.$emit("toggleNotifications");
        }
    }
};
</script>

<style lang="scss">
.notification-container {
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 0 9px rgba(191, 191, 191, 0.36);
    border: 1px solid rgba(222, 227, 231, 0.56);
    background-color: white;

    &__header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eaebeb;
        padding: 5px 10px;
        background-color: #f1f1f1;


        .header__icon {
            width: 16px;
            margin-right: 10px;
        }

        .header__title {
            text-transform: uppercase;
        }

        .header__time-and-close {
            margin-left: auto;
            display: flex;

            .header__time {
                margin-right: 10px;
            }
        }
    }

    &__body {
        padding: 10px;
        font-size: 12px;
    }
}

.notifications-center {
    width: 300px;
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
    padding: 15px;

    h1 {
        font-size: 22px;
        line-height: 25px;
    }

    &__header {
        background-color: #eaebeb;
        padding: 10px;
        border-radius: 5px;
        display: flex;
    }

    // &__do-not-disturb {
    //     padding: 10px;
    //     padding-bottom: 0;
    //     display: flex;
    //     align-items: center;

    //     .vue-switcher {
    //         margin-left: auto;
    //     }
    // }

    &__day-group {
        .day-group__header {
            display: flex;
            align-items: center;
            padding: 10px;
            padding-top: 25px;

            h1 {
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
    line-height: 0;
    border: 0;
    cursor: pointer;

    i {
        color: gray;
    }
}
</style>
