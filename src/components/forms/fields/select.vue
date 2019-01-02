<template>
    <div :class="{ 'is-danger': !!error }" class="select is-block">
        <select
            :id="item.label | slugify"
            :name="item.label | slugify"
            :required="item.isRequired !== false"
            class="is-fullwidth"
            @change="updateValue"
            @blur="updateValue"
        >
            <option
                v-if="item.placeholder"
                disabled="disabled"
                selected="selected"
                value=""
            >
                {{ item.placeholder }}
            </option>
            <option
                v-for="(option, index) in item.options"
                :key="index"
                :selected="option.selected"
                :value="option.value || option.text || option"
            >
                {{ option.text || option }}
            </option>
        </select>
    </div>
</template>

<script>
import fieldsMixin from "../mixins";

export default {
    name: "Select",
    mixins: [
        fieldsMixin
    ],
    mounted() {
        const optionSelected = this.item.options && this.item.options.find(x => typeof x === "object" && x.selected);
        this.$parent.value = optionSelected
            ? optionSelected.value || optionSelected.text
            : undefined;
    }
}
</script>

<style lang="scss" scoped>
.is-fullwidth {
    width: 100%;
}
</style>
