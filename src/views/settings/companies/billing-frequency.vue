<template>
    <div>
        <billing-item
            :frecuency-type="frecuencyType"
            :billing-frecuency="billingFrecuencies"
            @selectfrequency="selectBilling" />
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
import BillingItem from "./billing-frequency-item.vue";

export default {
    name: "BilligFrecuency",
    components:{BillingItem},
    props: {
        plan: {
            required: true,
            type: Object
        },
        frecuencyType:{
            required: true,
            type: Number|String
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
            }
        }
    },
    computed: {
        billingFrecuencies() {
            return [
                this.pricingMonthly,
                this.pricingAnual
            ];
        },
        selectedFrecuency(){
            return this.billingFrecuencies.find(billig => billig.type == this.frecuencyType);
        }
    },
    watch: {
        "plan.id": {
            deep: true,
            handler() {
                this.formatFrecuencys();
            }
        }
    },
    mounted(){
        this.formatFrecuencys();
    },
    methods: {
        formatFrecuencys() {
            this.pricingMonthly.price = this.plan.pricing;
            this.pricingAnual.price = this.plan.pricing_anual;
        },
        selectBilling(billing){
            this.$emit("selectbillingtype", billing.type, billing);
        }
    }
}
</script>
