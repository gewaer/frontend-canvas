<template>
    <div class="google-auth">
        <google-signin-btn label="Sign In" class="sign-in-button" @click="googleSignIn" />
    </div>
</template>
<script>
export default {
    name: "GoogleAuth",
    methods: {
        async googleSignIn() {
            await this.$gapi.signIn();
            const currentUser = await this.$gapi.currentUser();
            const baseGapi = await this.$gapi._load();
            const authInstance = baseGapi.auth2.getAuthInstance();
            const { Zi } = authInstance.currentUser.get();
            const mergedUserData = { ...currentUser, access_token: Zi.access_token }
            const googleAuth = { ...mergedUserData, provider: "google" }
            this.$emit("google-auth", googleAuth);
        }
    }
}
</script>
<style lang="scss" scoped>
.google-auth {
    .sign-in-button {
        width: 100%;
        text-align: center;
    }
}
</style>
