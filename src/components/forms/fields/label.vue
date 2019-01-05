<template>
    <label
        v-if="item.showLabel !== false"
        :for="item.label | slugify"
    >
        {{ item.label }}
        <span v-if="item.help" class="help">{{ item.help }}</span>
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
label {
    .help {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
        margin-left: 0;
        text-transform: none;
    }
}
</style>
