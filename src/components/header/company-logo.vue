<template>
    <router-link :to="{ name: 'dashboard'}" class="app-logo">
        <img
            v-if="companyData.profile_image"
            :src="companyData.profile_image"
            :alt="companyData.name"
        >
        <div v-else class="company-name">
            {{ companyData.name }}
        </div>
    </router-link>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "CompanyLogo",
    computed: {
        ...mapState({
            companyData: state => state.Company.data || {}
        })
    }
}
</script>

<style lang="scss" scoped>
.app-logo {
    padding: 5px 25px;
    order: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        max-height: 30px;
    }

    .company-name {
        text-transform: uppercase;
        font-size: 28px;
        font-weight: 500;
    }
}

@media(max-width: 992px) {
    .app-logo {
        order: 2;
        margin-right: auto;
        margin-left: auto;
        padding: 0;
        padding-left: 10px;
    }
}

@media screen and (max-width: 475px) {
    .app-logo {
        display: none;
    }
}
</style>
