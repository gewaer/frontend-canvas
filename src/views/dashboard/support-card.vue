<template>
    <div class="support-card">
        <div class="card">
            <div class="row">
                <div class="col">
                    <h1>Admin Console</h1>
                    <p>Remember this is a SPA, but Kanvas provides you with the Admin App, a central hub to control your app ecosystem.</p>
                    <button type="button" class="btn btn-outline-light">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SupportCard"
}
</script>

<style lang="scss" scoped>
.support-card {
    > .card {
        color: white;
        background-color: var(--base-color);
    }

    h1 {
        opacity: 1;
        text-transform: uppercase;
        margin-bottom: 30px;
    }

    p {
        margin-bottom: 100px;
    }
}
</style>
