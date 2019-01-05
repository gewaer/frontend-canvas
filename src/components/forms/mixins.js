import { lowercase, slugify } from "@/utils/helpers";
import { merge, zipObject } from "lodash";

export default {
    filters: {
        lowercase,
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
    computed: {
        attributes() {
            const attributes = {
                class: {
                    "form-control": true,
                    "text-danger": !!this.error
                },
                title: ""
            }

            let fieldClass = (this.item.attributes && this.item.attributes.class) || [];
            fieldClass = zipObject(fieldClass, fieldClass);

            return merge(attributes, this.item.attributes || {}, { class: fieldClass });
        }
    },
    created() {
        this.item.value && (this.$parent.value = this.item.value);
    },
    methods: {
        updateValue(event) {
            this.$emit("input", event.target.value);
        }
    }
}
