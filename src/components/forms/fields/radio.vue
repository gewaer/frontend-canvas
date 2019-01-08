<template>
    <div>
        <label
            v-for="(x, index) in item.items"
            :key="index"
            :for="x.text || x | slugify"
            class="radio"
        >
            <input
                v-model="value"
                :id="x.text || x | slugify"
                :name="item.label | slugify"
                :value="x.value || x.text || x"
                :type="item.type"
                :required="item.isRequired !== false"
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
    name: "Radio",
    mixins: [
        fieldsMixin
    ],
    data() {
        return {
            value: []
        }
    },
    mounted() {
        try {
            const { value, text } = this.item.items.find(({ checked }) => checked);

            this.value = value || text;
            this.$parent.value = value || text;
        } catch (error) {
            //
        }
    },
    methods: {
        updateValue() {
            this.$emit("input", this.value);
        }
    }
}
</script>

<style lang="scss" scoped>
.radio {
    margin-right: 1rem;

    .checkboxLabel {
        margin-left: 0.5rem;
    }

    + .radio {
        margin-left: inherit;
    }
}
</style>
