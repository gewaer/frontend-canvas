<template>
    <div class="login-wrapper">
        <auth-background/>
        <div class="login-container bg-white">
            <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
                <auth-logo/>
                <slot name="auth-form"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AuthContainer",
    components:{
        AuthBackground: () => import(/* webpackChunkName: "auth-background" */ "@v/auth/auth-background.vue"),
        AuthLogo: () => import(/* webpackChunkName: "auth-logo" */ "@v/auth/auth-logo.vue")
    }
}
</script>
