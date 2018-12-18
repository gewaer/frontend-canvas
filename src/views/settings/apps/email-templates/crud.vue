<template>
    <div>
        <h5>Create email template</h5>
        <div class="row">
            <div class="col">
                <div class="form-group  required">
                    <label>Title</label>
                    <input
                        class="form-control"
                        type="text"
                        name="url"
                        placeholder="Title for email template">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <quill-editor
                    ref="emailTemplatesEditor"
                    v-model="emailTemplate"
                    class="emailTemplatesEditor"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-xl d-flex justify-content-end mt-2">
                <button class="btn btn-danger m-r-10" @click="emailTemplatesList">Cancel</button>
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            emailTemplate: ""
        };
    },
    computed: {
        quillEditor() {
            return this.$refs.emailTemplatesEditor.quill;
        }
    },
    methods: {
        save() {
            // Save code and then show the webhooks list
            this.emailTemplatesList();
        },
        emailTemplatesList() {
            this.$emit("emailTemplatesList");
        }
    }
}
</script>

<style lang="scss">
.emailTemplatesEditor {
    .ql-editor {
        min-height: 250px;
    }
}
</style>
