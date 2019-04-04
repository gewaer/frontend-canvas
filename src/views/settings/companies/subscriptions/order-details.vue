<template>
    <div>
        <h5>Order Details</h5>
        <div class="row order-details">
            <div class="col">
                <div class="card">
                    <div class="card-block">
                        <div class="selected-payment">
                            <div class="d-flex flex-column">
                                <strong>1 seat</strong>
                                <small>{{ plan.name }} Plan {{ frecuency.title }}</small>
                            </div>
                            <div class="d-flex flex-column ml-auto text-right">
                                <strong>${{ frecuency.price }}</strong>
                                <small>every {{ frecuency.frecuency }}</small>
                            </div>
                        </div>
                        <div class="d-flex m-t-10">
                            <div>VAT</div>
                            <strong class="ml-auto">$0</strong>
                        </div>
                        <div class="card-yellow">
                            <div class="d-flex flex-column">
                                <strong>Order Total</strong>
                                <small>{{ plan.name }} Plan for 1 seat {{ frecuency.title }} payment in USD</small>
                            </div>
                            <div class="final-price">${{ frecuency.price }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderDetails",
    props: {
        plan: {
            required: true,
            type: Object
        },
        frecuency: {
            required: true,
            type: Object
        }
    }
}
</script>
<style lang="scss" scoped>
    .order-details {
        .card-block {
            padding: 20px;

            .selected-payment {
                display: flex;
                border-bottom: 1px dashed rgba(0, 0, 0, .125);
                padding-bottom: 10px;
            }

            .final-price {
                margin-left: auto;
                font-size: 28px;
            }
        }
    }
</style>
