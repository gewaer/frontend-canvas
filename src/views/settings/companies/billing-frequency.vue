<template>
    <div>
        <h5>Choose your billing frequency</h5>
        <div class="row payment-frecuency">
            <div
                v-for="billing in billingFrecuency"
                :key="billing.type"
                class="col-3"
                @click="selectBillig(billing)">
                <div class="card">
                    <div class="card-block">
                        <input
                            :id="billing.type"
                            :value="billing.type"
                            v-model="frecuencyType"
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
        <h5>Order Details</h5>
        <div class="row order-details">
            <div class="col">
                <div class="card">
                    <div class="card-block">
                        <div class="selected-payment">
                            <div class="d-flex flex-column">
                                <strong>1 seat</strong>
                                <small>{{ plan.name }} Plan {{ selectedFrecuency.title }}</small>
                            </div>
                            <div class="d-flex flex-column ml-auto text-right">
                                <strong>${{ selectedFrecuency.price }}</strong>
                                <small>every {{ selectedFrecuency.frecuency }}</small>
                            </div>
                        </div>
                        <div class="d-flex m-t-10">
                            <div>VAT</div>
                            <strong class="ml-auto">$0</strong>
                        </div>
                        <div class="card-yellow">
                            <div class="d-flex flex-column">
                                <strong>Order Total</strong>
                                <small>{{ plan.name }} Plan for 1 seat {{ selectedFrecuency.title }} payment in USD</small>
                            </div>
                            <div class="final-price">${{ selectedFrecuency.price }}</div>
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
        plan: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            pricingMonthly: {
                type:"pricing",
                title: "Monthly",
                price: "10",
                frecuency: "month"
            },
            "pricingAnual": {
                type:"pricing_anual",
                title: "Annually",
                price: "100",
                frecuency: "year"
            },
            frecuencyType:"pricing"
        }
    },
    computed: {
        billingFrecuency() {
            return [
                this.pricingMonthly,
                this.pricingAnual
            ];
        },
        selectedFrecuency(){
            return this.billingFrecuency.find(billig => billig.type == this.frecuencyType);
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
        formatFrecuencys(plan) {
            this.pricingMonthly.price = plan["pricing"];
            this.pricingAnual.price= plan["pricing_anual"];
        },
        selectBillig(billing){
            this.frecuencyType = billing.type;
            this.$emit("selectfrequency", this.frecuencyType, billing);
        }
    }
}
</script>
