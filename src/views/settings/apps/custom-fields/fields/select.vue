<template>
    <div class="col" @click="sendSchema()">
        <div class="custom-field">
            <div class="custom-field__image">
                <img src="/img/settings/custom-fields/autocomplete.png" class="img-fluid">
            </div>
            <span>Pick List</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FieldsText",
    data() {
        return {
            schema: [{
                label: "Field Label",
                type: "text",
                validations: {
                    required: true
                }
            }, {
                label: "Field Options",
                type: "textarea",
                validations: {
                    required: true
                }
            }]
        }
    },
    methods: {
        sendSchema() {
            this.$emit("schema", this.schema, "select");
        }
    }
}
</script>
