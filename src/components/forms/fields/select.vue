<template>
    <multiselect
        v-model="value"
        v-bind="attributes"
        :loading="isLoading"
        :options="options"
        v-on="attachEvents"
        @input="updateValue"
    />
</template>

<script>
import clone from "lodash/clone";
import merge from "lodash/merge";
import isObject from "lodash/isObject";
import fieldsMixin from "../mixins";

export default {
    name: "Select",
    mixins: [
        fieldsMixin
    ],
    data() {
        return {
            isLoading: false,
            options: [],
            value: null
        }
    },
    computed: {
        attachEvents() {
            let events = this.item.url ? { "search-change": this.fetchData} : {};

            if (this.item.searchOnOpen) {
                events.open = this.fetchData;
            }

            events = merge(events, this.item.events);

            return events;
        }
    },
    created() {
        this.options = this.item.options ? clone(this.item.options) : [];
        this.value = isObject(this.item.value) ? clone(this.item.value) : this.item.value;
    },
    methods: {
        fetchData(query) {
            const searchField = this.item.searchField || this.item.attributes.label;
            let params = "";

            if (query && query.length) {
                params = {
                    q: `(${searchField}:%${query || ""}%)`
                };
            }

            this.isLoading = true;
            axios({
                url: this.item.url,
                params
            }).then(({ data }) => {
                this.options = data;
            }).finally(() => {
                this.isLoading = false;
            });
        },
        updateValue(value) {
            this.$emit("input", value);
        }
    }
}
</script>
