<template>
    <form>
        <creditcard-networks :brand="cardBrand" class="mb-3" />
        <div class="add-credit-card-form credit-card-inputs">
            <div class="card-number">
                <div class="form-group">
                    <label :class="{ 'text-danger' : errors.first('cardNumber') }">
                        <span>Card Number</span>
                        <img v-tooltip="'Transactions are encrypted and secure.'" src="/img/padlock-icon.svg" alt="Padlock">
                    </label>
                    <card-number
                        ref="cardNumber"
                        :class="{ 'is-danger' : errors.first('cardNumber') }"
                        :stripe="stripeKey"
                        :options="stripeOptions"
                        class="card-number form-control"
                        @change="handleChange('cardNumber', $event)"
                    />
                    <span v-show="errors.has('cardNumber')" class="text-danger mt-1">
                        {{ errors.first('cardNumber') }}
                    </span>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label :class="{ 'text-danger' : errors.first('cardExpiry') }" for="expiration">
                        <span>Expiration</span>
                    </label>
                    <card-expiry
                        ref="cardExpiry"
                        :class="{ 'is-danger' : errors.first('cardExpiry') }"
                        :stripe="stripeKey"
                        :options="stripeOptions"
                        class="card-expiry form-control"
                        @change="handleChange('cardExpiry', $event)"
                    />
                    <span v-show="errors.has('cardExpiry')" class="text-danger mt-1">
                        {{ errors.first('cardExpiry') }}
                    </span>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label :class="{ 'text-danger' : errors.first('cardCvc') }" for="cvc">
                        <span class="mr-1">
                            CVC
                        </span>
                        <img
                            v-tooltip="'The security code, or CVV, refers to the extra 3 or 4 numbers on the back or front of your card.'"
                            class="mr-auto"
                            src="/img/help-icon.png"
                            alt="Help"
                        >
                    </label>
                    <card-cvc
                        ref="cardCvc"
                        :class="{ 'is-danger' : errors.first('cardCvc') }"
                        :stripe="stripeKey"
                        :options="stripeOptions"
                        class="card-cvc form-control"
                        @change="handleChange('cardCvc', $event)"
                    />
                    <span v-show="errors.has('cardCvc')" class="text-danger mt-1">
                        {{ errors.first('cardCvc') }}
                    </span>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label :class="{ 'text-danger' : errors.first('postalCode') }" for="zip-code">
                        <span>Zip Code</span>
                    </label>
                    <postal-code
                        ref="postalCode"
                        :class="{ 'is-danger' : errors.first('postalCode') }"
                        :stripe="stripeKey"
                        :options="stripeOptions"
                        class="card-postal-code form-control"
                        @change="handleChange('postalCode', $event)"
                    />
                    <span v-show="errors.has('postalCode')" class="text-danger mt-1">
                        {{ errors.first('postalCode') }}
                    </span>
                </div>
            </div>
        </div>
        <span v-show="errors.has('stripe_errors')" class="text-danger">
            {{ errors.first('stripe_errors') }}
        </span>
    </form>
</template>

<script>

import {
    CardNumber,
    CardExpiry,
    CardCvc,
    PostalCode,
    createToken
} from "vue-stripe-elements-plus";

import creditcardNetworks from "./card-networks";
export default {
    name: "Card",
    components: {
        CardNumber,
        CardExpiry,
        CardCvc,
        PostalCode,
        creditcardNetworks
    },
    data() {
        return {
            stripeKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
            complete: false,
            isComplete: {
                cardExpiry: false,
                cardCvc: false,
                cardNumber: false,
                postalCode: false
            },
            stripeOptions: {
                style: {
                    base: {
                        fontFamily: "Open Sans, sans-serif"
                    },
                    invalid: {
                        color: "#d0021b"
                    }
                },
                fontFamily: "Open Sans, sans-serif",
                base: "form-control",
                invalid: "form-control is-danger"
            },
            cardBrand: "unknown"
        }
    },
    watch: {
        isComplete: {
            handler() {
                this.reportValidFields();
            },
            deep: true
        }
    },
    methods: {
        reportValidFields() {
            if (this.validateFields()) {
                this.errors.remove("stripe_errors");
                createToken().then(cardInfo => {
                    if (cardInfo.error) {
                        this.errors.add({
                            field: "stripe_errors",
                            msg: cardInfo.error.message
                        });
                        return;
                    }
                    this.$emit("striped-card", cardInfo.token.id)
                })
            } else {
                this.$emit("striped-card", "");
            }
        },
        validateFields() {
            return Object.values(this.isComplete).every(value => value);
        },
        handleChange(field, event) {
            if (event.error) {
                if (this.errors.has(event.elementType)) {
                    this.errors.clear(event.elementType);
                }
                this.errors.add({
                    id: event.error.code,
                    field: event.elementType,
                    msg: event.error.message
                });
            } else {
                this.errors.remove(event.elementType)
            }

            if (event.elementType == "cardNumber" && event.brand) {
                this.cardBrand = event.brand;
            }

            this.isComplete[field] = event.complete;
        },
        clear() {
            Object.keys(this.isComplete).forEach((key) => {
                this.$refs[key].clear();
            })
        }
    }
}
</script>


<style lang="scss">
    .add-credit-card-form {
        display: flex;
        flex-wrap: wrap;

        > div {
            padding-left: 5px;
            padding-right: 5px;
            min-width: 80px;
            flex-basis: 0;
            flex-grow: 1;
            max-width: 100%;
            margin-bottom: 20px;
        }

        .card-number {
            flex-basis: 240px;
            min-width: 240px;
        }

        .form-group {
            .form-control {
                display: flex;
                align-items: center;

                .StripeElement  {
                    width: 100%;
                }
                &.is-danger {
                    border: 1px solid #d0021b;
                }
            }
        }
    }
</style>
