<template>
    <multiselect
        v-model="value"
        :options="item.options"
        :show-labels="false"
        @input="updateValue"
    />
</template>

<script>
import clone from "lodash/clone";
import isObject from "lodash/isObject";
import fieldsMixin from "../mixins";

export default {
    name: "MSelect",
    mixins: [
        fieldsMixin
    ],
    data() {
        return {
            value: null
        }
    },
    created() {
        this.value = isObject(this.item.value) ? clone(this.item.value) : this.item.value;
    },
    methods: {
        updateValue(value) {
            this.$emit("input", value);
        }
    }
}
</script>
