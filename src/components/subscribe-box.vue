<template>
    <div class="subscribe-box">
        <h4>Subscribe to our newsletter to get in touch in about Kanvas</h4>
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Email">
            <div class="input-group-append">
                <button id="button-addon2" class="btn btn-primary" type="button">
                    Subscribe
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubscribeBox"
}
</script>

<style lang="scss" scoped>
.subscribe-box {
    background-color: #f7f7f8;
    padding: 25px;

    @media (max-width: $sm) {
        padding: 10px 15px;
    }

    h4 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        opacity: .8;
    }
}
</style>
