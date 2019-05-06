<template>
    <div>
        <h5>Choose your billing frequency</h5>
        <div class="row payment-frecuency">
            <div
                v-for="frecuency in billingFrecuencies"
                :key="frecuency.type"
                class="col-12 col-xl-4"
                @click.stop="selectBilling(frecuency)">
                <frecuency-item
                    :billing-frecuency="frecuency"
                    :is-selected="selectedFrecuency == frecuency.type"
                    @selectfrequency="selectBilling"
                />
            </div>
            <div v-if="showRedeem" class="col">
                <div class="card">
                    <div class="card-block">
                        <div class="row no-gutters w-100">
                            <div class="col-12 col-sm">
                                <div class="form-group m-b-0">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Redeem a coupon">
                                </div>
                            </div>
                            <div class="col-12 col-sm-auto">
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
    name: "Frecuencies",
    components: {
        FrecuencyItem: () => import(/* webpackChunkName: "settings-companies-subscriptions-frequency-item" */ "@c/plans/frecuencies/frequency-item")
    },
    props: {
        plan: {
            required: true,
            type: Object
        },
        selectedFrecuency: {
            required: true,
            type: String
        },
        showRedeem: {
            default: false,
            type: Boolean
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
    mounted() {
        this.formatFrecuencys();
    },
    methods: {
        formatFrecuencys() {
            const monthly = this.plan.pricing || "1";
            this.pricingMonthly.price = `${monthly}`;
            this.pricingAnual.price = this.plan.pricing_anual || `${monthly * 10}`;
        },
        selectBilling(billing) {
            this.$emit("selectbillingtype", billing.title, billing);
        }
    }
}
</script>
