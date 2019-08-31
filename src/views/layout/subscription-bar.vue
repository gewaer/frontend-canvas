<template>
    <div class="free-trial-banner">
        <h6 v-if="isFreeTrialSubscription">Your free trial {{ trialText }}, please upgrade <router-link :to="{ name: 'settingsCompaniesSubscriptions'}">here</router-link></h6>
        <!-- Your subscription has expired. Click here to pay. -->
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name:"SubscriptionBar",
    computed:{
        ...mapGetters({
            daysLeft: "Subscription/daysLeft",
            isFreeTrialSubscription: "Subscription/isFreeTrial"
        }),
        trialText() {
            let message = "is over"

            if (this.daysLeft >= 0) {
                message = `has ${this.daysLeft} days left`;
            }

            return message;
        }
    }
}
</script>

<style lang="scss" scoped>
.free-trial-banner {
    background-color: var(--secondary-color);
    text-align: center;
    padding: 15px;

    h6 {
        margin: 0;
        font-weight: 500;
    }
}
</style>
