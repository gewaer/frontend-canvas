<template>
    <div class="col" @click="sendSchema()">
        <div class="custom-field">
            <div class="custom-field__image">
                <img src="/img/settings/custom-fields/text-field.png" class="img-fluid">
            </div>
            <span>Text</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FieldsText",
    data() {
        return {
            schema: [{
                label: "Modules",
                type: "select",
                url: "/custom-fields-modules",
                searchOnOpen: true,
                attributes: {
                    allowEmpty: false,
                    clearOnSelect: false,
                    closeOnSelect: false,
                    internalSearch: false,
                    label: "name",
                    multiple: true,
                    showLabels: false,
                    trackBy: "id"
                }
            }, {
                label: "Field Label",
                type: "text",
                validations: {
                    required: true
                }
            }]
        }
    },
    methods: {
        sendSchema() {
            this.$emit("schema", this.schema, "text");
        }
    }
}
</script>
