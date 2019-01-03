<template>
    <div class="free-trial-banner">
        <h6>Your free trial is 14 days left, please upgrade <router-link :to="{ name: 'settingsCompaniesSubscriptions'}">here</router-link></h6>
    </div>
</template>

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
