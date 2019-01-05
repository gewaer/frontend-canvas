<template>
    <multiselect
        v-model="option"
        :options="item.options"
        :show-labels="false"
        @input="updateValue"
    />
</template>

<script>
import clone from "lodash/clone";
import fieldsMixin from "../mixins";

export default {
    name: "MSelect",
    mixins: [
        fieldsMixin
    ],
    data() {
        return {
            option: null
        }
    },
    created() {
        this.option = clone(this.item.value);
    },
    methods: {
        updateValue(value) {
            this.$emit("input", value);
        }
    }
}
</script>
