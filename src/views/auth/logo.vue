<template>
    <div >
        <router-link :to="{ name: 'login' }">
            <img
                :src="logoSrc"
                alt="Gewaer.io"
                class="company-logo"
            >
        </router-link>
        <p class="p-t-10">{{ title }}</p>
    </div>
</template>

<script>
export default {
    name: "AuthLogo",
    props:{
        logoSrc: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
.company-logo {
    max-height: 30px;
}
</style>
