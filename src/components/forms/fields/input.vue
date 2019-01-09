<template>
    <input
        v-model="value"
        v-bind="attributes"
        :id="item.label | slugify | lowercase"
        :name="item.label | slugify | lowercase"
        :type="item.type || 'text'"
        :minlength="minLength"
        :maxlength="maxLength"
        :min="minValue"
        :max="maxValue"
        class="input"
        @input="updateValue"
        @change="updateValue"
        @blur="updateValue"
    >
</template>

<script>
import { FORMS } from "@/config/constants";
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
            return !!(this.item.validations && this.item.validations.regex);
        },
        isInputNumber() {
            return this.item.type === "number";
        },
        minLength() {
            return !this.isInputNumber && !this.hasPattern && this.item.validations && this.item.validations.min || undefined;
        },
        maxLength() {
            return !this.isInputNumber && !this.hasPattern && this.item.validations ? this.item.validations.max || FORMS.DEFAULT_MAX_LENGTH_INPUT : undefined;
        },
        minValue() {
            return this.isInputNumber && this.item.validations && this.item.validations.min_value || undefined;
        },
        maxValue() {
            return this.isInputNumber && this.item.validations && this.item.validations.max_value || undefined;
        }
    },
    mounted() {
        this.value = this.item.value;
    }
}
</script>
