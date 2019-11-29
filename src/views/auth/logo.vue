<template>
    <div>
        <router-link :to="{ name: 'login' }">
            <img
                :alt="appName"
                :src="logoSrc"
                class="company-logo"
            >
        </router-link>
        <p class="p-t-10 login-title">
            {{ title }}
        </p>
    </div>
</template>

<script>
export default {
    name: "AuthLogo",
    props:{
        appName: {
            type: String,
            required: true
        },
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

.login-title {
    font-size: 14px;
    margin: 10px 0;
}
</style>
