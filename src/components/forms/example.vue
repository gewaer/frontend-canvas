<template>
    <div class="section">
        <app-form
            :form-fields="jsonFields"
            :form-name="'userProfile'"
        />
    </div>
</template>

<script>
import Form from "./form";
import jsonFields from "./fields";

export default {
    name: "FieldsExample",
    components: {
        appForm: Form
    },
    data: () => ({
        jsonFields
    }),
    mounted() {
        this.$root.$on("formSubmitted", values => alert(JSON.stringify(values)));
    }
}
</script>
