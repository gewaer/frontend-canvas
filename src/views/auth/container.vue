<template>
    <div class="login-wrapper">
        <auth-background />
        <div class="login-container bg-white">
            <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
                <auth-logo
                    :title="logoTitle"
                    logo-src="/img/primary-logo.png"
                />
                <slot name="auth-form" />
            </div>
        </div>
    </div>
</template>

<script>
import AuthBackground from "./background";
import AuthLogo from "./logo";

export default {
    name: "AuthContainer",
    components: {
        AuthBackground,
        AuthLogo
    },
    props: {
        logoTitle: {
            type: String,
            default: ""
        }
    }
}
</script>
