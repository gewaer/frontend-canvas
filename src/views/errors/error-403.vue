<template>
    <div class="page-403 d-flex justify-content-center full-height full-width align-items-center">
        <div class="error-container text-center">
            <h1 class="error-number">
                Access Denied
            </h1>
            <h2 class="semi-bold">
                Sorry but you are not authorize
            </h2>
            <p class="p-b-10">
                Think this is an error?
                <a href="#">Report this?</a>
            </p>
            <div class="error-container-innner text-center">
                <router-link to="/users/login" class="btn btn-primary">
                    Go to login
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Error403"
}
</script>

<style lang="scss" scoped>
.page-403 {
    border: 10px solid white;
    box-shadow: inset 0px 0px 0 10px var(--base-color);
    width: 100% !important;
}
</style>
