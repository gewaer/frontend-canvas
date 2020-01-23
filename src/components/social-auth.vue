<template>
    <div class="social-auth">
        <facebook-auth class="provider-auth" @facebook-auth="handleSocialAuthRequest" />
        <google-auth class="provider-auth" @google-auth="handleSocialAuthRequest" />
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
        handleSocialAuthRequest(userAuth) {
            const formData = new FormData();
            formData.append("email", userAuth.email);
            formData.append("firstname", userAuth.firstname);
            formData.append("lastname", userAuth.lastname);
            formData.append("provider", userAuth.provider);
            formData.append("social_id", userAuth.id);
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
    .provider-auth {
        margin-bottom: 10px;
    }
}
</style>
