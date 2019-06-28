<template>
    <div class="login-wrapper">
        <auth-background :background-src="backgroundSrc" />
        <div class="login-container bg-white">
            <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
                <auth-logo
                    :title="logoTitle"
                    :app-name="appName"
                    :logo-src="logoSrc"
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
        appName: {
            type: String,
            required: true
        },
        backgroundSrc: {
            type: String,
            default: "https://mc-canvas.s3.amazonaws.com/default-background-auth.jpg"
        },
        logoSrc: {
            type: String,
            required: true
        },
        logoTitle: {
            type: String,
            default: ""
        }
    }
}
</script>
