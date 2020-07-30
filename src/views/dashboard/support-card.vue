<template>
    <div class="support-card">
        <div class="card">
            <div class="row">
                <div class="col">
                    <h1>Lorem Ipsum is simply</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
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
