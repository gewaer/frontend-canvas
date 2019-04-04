<template>
    <div class="networks-strip">
        <div :class="{'deactivated': brand != 'visa' && brand != 'unknown' }" class="network">
            <img src="/img/creditcards/visa.svg" alt="Visa logo">
        </div>
        <div :class="{'deactivated': brand != 'mastercard' && brand != 'unknown' }" class="network">
            <img src="/img/creditcards/mastercard.svg" alt="Mastercard logo">
        </div>
        <div :class="{'deactivated': brand != 'amex' && brand != 'unknown' }" class="network">
            <img src="/img/creditcards/american_express.svg" alt="American Express logo">
        </div>
        <div :class="{'deactivated': brand != 'discover' && brand != 'unknown' }" class="network">
            <img src="/img/creditcards/discover.svg" alt="Discover logo">
        </div>
    </div>
</template>

<script>
export default {
    name: "NetworksStrip",
    props: {
        brand: {
            type: String,
            default: "unknown"
        }
    }
}
</script>

<style lang="scss" scoped>
.networks-strip {
    display: flex;

    .network {
        margin-left: 5px;

        &:first-child {
            margin-left: 0;
        }
    }
}
</style>
