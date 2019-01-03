<template>
    <input
        v-model="value"
        v-bind="attributes"
        :id="item.label | slugify"
        :name="item.label | slugify"
        :type="item.type || 'text'"
        :minlength="!isInputNumber && !hasPattern ? item.minLength || defaultMinLength : undefined"
        :maxlength="!isInputNumber && !hasPattern ? item.maxLength || defaultMaxLength : undefined"
        :min="isInputNumber ? item.min || defaultMin : undefined"
        :max="isInputNumber ? item.max || defaultMax : undefined"
        class="input"
        @input="updateValue"
        @change="updateValue"
        @blur="updateValue"
    >
</template>

<script>
import fieldsMixin from "../mixins";

export default {
    name: "Input",
    mixins: [
        fieldsMixin
    ],
    data() {
        return {
            value: undefined
        }
    },
    computed: {
        hasPattern() {
            return !!this.item.pattern;
        },
        isInputNumber() {
            return this.item.type === "number";
        },
        defaultMin() {
            return this.$parent.$parent.defaultMin;
        },
        defaultMax() {
            return this.$parent.$parent.defaultMax;
        },
        defaultMinLength() {
            return this.$parent.$parent.defaultMinLength;
        },
        defaultMaxLength() {
            return this.$parent.$parent.defaultMaxLength;
        }
    },
    mounted() {
        this.value = this.item.value;
    }
}
</script>
