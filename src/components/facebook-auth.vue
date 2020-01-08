<template>
    <button type="button" class="facebook-signup btn btn-block" @click.stop="login">
        <img src="/img/facebook-f.svg" alt="Facebook">
        <slot />
    </button>
</template>

<script>
export default {
    name: "FacebookAuth",
    methods: {
        // @see https://developers.facebook.com/docs/reference/javascript/FB.login/v3.2
        login() {
            FB.login(loginResponse => {
                if (loginResponse.status === "connected") {
                    console.log(loginResponse);
                    const authResponse = loginResponse.authResponse;
                    FB.api(`/${authResponse.userID}?fields=email,first_name,last_name`, userData => {
                        userData = { accessToken: authResponse.accessToken, ...userData }
                        this.$emit("facebook-auth", userData);
                    });
                } else {
                    console.log("User cancelled login or did not fully authorize.");
                }
            }, {
                return_scopes: true,
                scope: "email"
            });
        }
    }
}
</script>

<style lang="scss">
.facebook-signup {
    background-color: #3d579b;
    color: white;
    font-size: 14px;

    @media (max-width: $md) {
        padding: .7rem 0.4rem !important;
    }

    img {
        @media (max-width: $md) {
            margin-right: 5px;
        }
    }

    &:hover {
        color: white;
    }
}
</style>
