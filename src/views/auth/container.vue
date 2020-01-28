<template>
    <div class="login-wrapper row no-gutters">
        <auth-background :background-src="backgroundSrc" class="col d-none d-md-block" />
        <div class="col-12 col-md-auto">
            <div class="login-container">
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

<style lang="scss">
.login-wrapper {
    .login-container {
        width: 500px;
        height: 100%;
        background-color: white;
        padding: 0 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media(max-width: $md) {
            width: 100%;
            padding: 0 40px;
        }
    }
}
</style>
