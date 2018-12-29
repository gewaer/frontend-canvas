<template>
    <label
        v-if="item.showLabel !== false"
        :for="item.label | slugify"
        class="label"
    >
        <p>
            {{ item.label }}
            <span v-if="item.help" class="helpLabel has-text-grey-light is-size-7 is-italic">{{ item.help }}</span>
            <span v-if="item.isRequired !== false">
                <sup class="has-text-grey-light is-size-7"> *</sup>
            </span>
        </p>
    </label>
</template>

<script>
import { slugify } from "@/utils/helpers";

export default {
    name: "Label",
    filters: {
        slugify
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.helpLabel {
    margin-left: 0.5rem;
    font-weight: normal;
}
</style>
