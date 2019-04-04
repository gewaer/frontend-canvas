<template>
    <div class="card">
        <div class="card-block">
            <input
                :id="billingFrecuency.type"
                :value="billingFrecuency.type"
                :checked="isSelected"
                type="radio"
                name="payment-frecuency"
                @click.stop="()=> $emit('selectfrequency',billingFrecuency)">
            <label :for="billingFrecuency.type">
                Pay {{ billingFrecuency.title }}
                <small>${{ billingFrecuency.price }} per seat per {{ billingFrecuency.frecuency }}</small>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "FrequencyItem",
    props: {
        billingFrecuency: {
            required: true,
            type: Object
        },
        isSelected:{
            type: Boolean,
            default: false
        }
    }
}
</script>
