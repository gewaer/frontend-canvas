<template>
    <textarea
        v-model="value"
        v-bind="attributes"
        :id="item.label | slugify | lowercase"
        :name="item.label | slugify | lowercase"
        :data-vv-name="item.label"
        :minlength="minLength"
        :maxlength="maxLength"
        class="textarea"
        @input="updateValue"
        @change="updateValue"
        @blur="updateValue"
    />
</template>

<script>
import { FORMS } from "@/config/constants";
import fieldsMixin from "../mixins";

export default {
    name: "Textarea",
    mixins: [
        fieldsMixin
    ],
    data() {
        return {
            value: undefined
        }
    },
    computed: {
        minLength() {
            return !this.isInputNumber && !this.hasPattern && this.item.validations && this.item.validations.min || undefined;
        },
        maxLength() {
            return !this.isInputNumber && !this.hasPattern && this.item.validations ? this.item.validations.max || FORMS.DEFAULT_MAX_LENGTH_TEXTAREA : undefined;
        }
    },
    mounted() {
        this.value = this.item.value;
    }
}
</script>
