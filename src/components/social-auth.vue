<template>
    <div>
        <facebook-auth @facebook-auth="handleFacebookAuth" />
    </div>
</template>

<script>

import facebookAuth from "@c/facebook-auth.vue";
import authMixins from "@/mixins/auth";

export default {
    name: "SocialAuth",
    components: {
        facebookAuth
    },
    mixins: [authMixins],
    methods: {
        handleFacebookAuth(userData) {
            console.log(userData);
            this.socialAuthRequest(userData, "facebook");
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

</style>
