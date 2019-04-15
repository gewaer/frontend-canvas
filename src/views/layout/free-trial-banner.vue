<template>
    <div class="free-trial-banner">
        <h6>Your free trial is {{ trialText }}, please upgrade <router-link :to="{ name: 'settingsCompaniesSubscriptions'}">here</router-link></h6>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name:"FreeTrialBanner",
    computed:{
        ...mapGetters({
            daysLeft: "Company/subscriptionDaysLeft"
        }),
        trialText(){
            let message = "over"
            if( this.daysLeft > 0){
                message = `${this.daysLeft } days left`;
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
