<template>
    <textarea
        v-model="item.value"
        :id="item.label | slugify"
        :name="item.label | slugify"
        :class="{ 'is-danger': !!error }"
        :data-vv-name="item.label"
        :required="item.isRequired !== false"
        :minlength="item.minLength || defaultMinLength"
        :maxlength="item.maxLength || defaultMaxLength"
        class="textarea"
        @input="updateValue"
        @change="updateValue"
        @blur="updateValue"
    />
</template>

<script>
import fieldsMixin from "../mixins";

export default {
    name: "Textarea",
    mixins: [
        fieldsMixin
    ],
    computed: {
        defaultMinLength() {
            return this.$parent.$parent.defaultMinLength;
        },
        defaultMaxLength() {
            return this.$parent.$parent.defaultMaxLength;
        }
    }
}
</script>
