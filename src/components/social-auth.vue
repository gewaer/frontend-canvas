<template>
    <div class="social-auth">
        <facebook-auth @facebook-auth="handleFacebookAuth" />
        <google-auth @google-auth="handleGoogleAuth" />
    </div>
</template>

<script>

import facebookAuth from "@c/facebook-auth.vue";
import googleAuth from "@c/google-auth.vue";
import authMixins from "@/mixins/auth";

export default {
    name: "SocialAuth",
    components: {
        facebookAuth,
        googleAuth
    },
    mixins: [authMixins],
    methods: {
        handleFacebookAuth(userData) {
            this.socialAuthRequest(userData, "facebook");
        },
        handleGoogleAuth(userData) {
            this.socialAuthRequest(userData, "google");
        },
        socialAuthRequest(userData, provider) {
            const formData = new FormData();
            formData.append("email", userData.email);
            formData.append("firstname", userData.firstname);
            formData.append("lastname", userData.lastname);
            formData.append("provider", provider);
            formData.append("social_id", userData.id);
            axios.post("users/social", formData)
                .then((response) => {
                    this.handleResponse(response);
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.social-auth {
    .my-button {
    background-color: #eee;
    }
    .my-button span.text {
    color: red;
    }
}
</style>
