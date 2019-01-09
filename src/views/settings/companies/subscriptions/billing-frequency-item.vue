<template>
    <div>
        <h5>Choose your billing frequency</h5>
        <div class="row payment-frecuency">
            <div
                v-for="billing in billingFrecuency"
                :key="billing.type"
                class="col-3"
                @click.stop="selectFrequencyType(billing)">
                <div class="card">
                    <div class="card-block">
                        <input
                            :id="billing.type"
                            :value="billing.type"
                            :checked="frecuencyType == billing.type"
                            type="radio"
                            name="payment-frecuency">
                        <label :for="billing.type">
                            Pay {{ billing.title }}
                            <small>${{ billing.price }} per seat per {{ billing.frecuency }}</small>
                        </label>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-block">
                        <div class="row no-gutters w-100">
                            <div class="col-9">
                                <div class="form-group m-b-0">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Redeem a coupon">
                                </div>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-block btn-primary">Redeem</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "BilligFrecuency",
    props: {
        billingFrecuency: {
            required: true,
            type: Array
        },
        frecuencyType:{
            required: true,
            type: String
        }
    },
    watch: {
        plan: {
            deep: true,
            handler(current) {
                this.formatFrecuencys(current);
            }
        }
    },
    methods: {
        selectFrequencyType(billing){
            this.$emit("selectfrequency", billing);
        }
    }
}
</script>
