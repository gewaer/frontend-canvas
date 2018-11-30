<template>
    <select class="cs-select cs-skin-slide full-width" :id="id" style="width:500px;" data-init-plugin="select2">
        <option :value="option" v-for="option in options" :key="option">{{ option }}</option>
    </select>
</template>

<script>
export default {
    name: "Select2",
    props:{
        options: {
            type: Array,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            id: Math.random().toString(16).replace(".", ""),
            select: null,
            localValue: ""
        }
    },
    mounted() {
        this.initSelector()
    },
    watch: {
        value(value) {
            this.localValue = value;
            this.select.val(value).trigger("change");
        }
    },
    methods: {
        initSelector() {
            this.select = $(`#${this.id}`).select2();
            this.select.on("select2:select", (e) => {
                this.$emit("input", e.params.data.id);
            })
        }
    }

}
</script>
