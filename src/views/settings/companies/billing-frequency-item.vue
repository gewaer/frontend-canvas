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
