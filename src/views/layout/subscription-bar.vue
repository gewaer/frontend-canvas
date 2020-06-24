<template>
    <div class="free-trial-banner">
        <h6 v-if="isActiveFreeSubscription">
            Your free trial {{ trialText }}, please upgrade
            <router-link :to="{ name: 'settingsCompaniesSubscriptions'}">
                here
            </router-link>.
        </h6>
        <h6 v-else-if="isActiveSubscription">
            Your subscription has expired.
            Please proceed to payment
            <router-link :to="{ name: 'settingsCompaniesSubscriptions'}">
                here
            </router-link>
            before the grace period expires.
        </h6>
        <h6 v-else-if="isInactiveSubscription">
            Your subscription has expired.
            Click
            <router-link :to="{ name: 'settingsCompaniesSubscriptions'}">
                here
            </router-link> to pay.
        </h6>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name:"SubscriptionBar",
    computed:{
        ...mapGetters({
            daysLeft: "Subscription/daysLeft",
            isActiveFreeSubscription: "Subscription/isActiveFreeSubscription",
            isActiveSubscription: "Subscription/isActiveSubscription",
            isInactiveSubscription: "Subscription/isInactiveSubscription"
        }),
        trialText() {
            let message = "is over"

            if (this.daysLeft > 0) {
                const daysPlural = this.daysLeft >= 2 ? "days" : "day";
                message = `has ${Math.floor(this.daysLeft)} ${daysPlural} left`;
            }

            return message;
        }
    }
}
</script>

<style lang="scss" scoped>
.free-trial-banner {
    background-color: var(--secondary-color);
    margin-bottom: 30px;
    padding: 15px;
    text-align: center;

    h6 {
        margin: 0;
        font-weight: 500;
    }
}
</style>
