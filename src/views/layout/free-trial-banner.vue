<template>
    <div class="free-trial-banner">
        <h6>Your free trial is {{ daysLeft }} days left, please upgrade <router-link :to="{ name: 'settingsCompaniesSubscriptions'}">here</router-link></h6>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name:"FreeTrialBanner",
    computed:{
        ...mapGetters({
            daysLeft: "Company/subscriptionDaysLeft"
        })
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
