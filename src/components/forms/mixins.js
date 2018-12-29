import { slugify } from "@/utils/helpers";

export default {
    filters: {
        slugify
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        error: {
            required: true
        }
    },
    methods: {
        updateValue(event) {
            this.$emit("input", event.target.value);
        }
    },
    created() {
        this.item.value && (this.$parent.value = this.item.value);
    }
}
