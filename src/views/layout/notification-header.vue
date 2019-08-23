<template>
    <div>
        <div class="day-group__header">
            <h1 :title="header" class="text-green">{{ formattedHeader }}</h1>
            <button
                :title="`Remove notifications from ${formattedHeader}`"
                type="button"
                class="notification-close-button"
                data-dismiss="modal"
                aria-hidden="true"
                @click="removeNotificationGroup"><i class="pg-close fs-14"/>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
    name: "NotificationHeader",
    props: {
        header: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState({
            notifications: state => state.Notifications.data
        }),
        formattedHeader() {
            const formattedDate = moment(this.header).fromNow();
            if (formattedDate.includes("hours")) {
                return "Today";
            }

            return moment(this.header).fromNow();
        }
    },
    methods: {
        removeNotificationGroup() {
            this.$store.dispatch("Notifications/deleteGroupNotifications", this.header);
        }
    }
}
</script>
