<template>
    <div>
        <label
            v-for="(x, index) in item.items"
            :key="index"
            :for="x.text || x | slugify"
            class="checkbox"
        >
            <input
                v-model="value"
                :id="x.text || x | slugify"
                :name="item.label | slugify"
                :value="x.value || x.text || x"
                :type="item.type"
                :class="{ 'is-danger': !!error }"
                @input="updateValue()"
                @change="updateValue()"
                @blur="updateValue()"
            >
            <span class="checkboxLabel">{{ x.text || x }}</span>
        </label>
    </div>
</template>

<script>
import fieldsMixin from "../mixins";

export default {
    name: "Checkbox",
    mixins: [
        fieldsMixin
    ],
    data() {
        return {
            value: []
        }
    },
    mounted() {
        const itemsChecked = this.item.items
            .filter(({ checked }) => checked)
            .map(({ value, text }) => value || text);

        this.value = itemsChecked;

        itemsChecked.length && (this.$parent.value = itemsChecked);
    },
    methods: {
        updateValue() {
            this.$emit("input", this.value);
        }
    }
}
</script>

<style lang="scss" scoped>
.checkbox {
    margin-right: 1rem;

    .checkboxLabel {
        margin-left: 0.5rem;
    }
}
</style>
