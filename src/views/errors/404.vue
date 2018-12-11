<template>
    <div class="page-404 d-flex justify-content-center full-height full-width align-items-center">
        <div class="error-container text-center">
            <h1 class="error-number">404</h1>
            <h2 class="semi-bold">Sorry but we couldnt find this page</h2>
            <p class="p-b-10">This page you are looking for does not exsist <a href="#">Report this?</a></p>
            <div class="error-container-innner text-center">
                <router-link to="/" class="btn btn-primary">Go to dashboard</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "404"
}
</script>

<style lang="scss" scoped>
.page-404 {
    border: 10px solid white;
    box-shadow: inset 0px 0px 0 10px var(--base-color);
    width: 100% !important;
}
</style>
