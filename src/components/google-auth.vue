<template>
    <google-signin-btn label="Sign In" class="my-button" @click="googleSignIn" />
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
            this.$emit("google-auth", mergedUserData);
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
