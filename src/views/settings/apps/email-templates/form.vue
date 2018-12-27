<template>
    <settings-template>
        <div class="row email-templates-section">
            <div class="col">
                <h5>Create Email Template</h5>
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
                            ref="editor"
                            v-model="emailTemplate"
                            class="emailTemplatesEditor"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-xl d-flex justify-content-end mt-2">
                        <router-link :to="{ name: 'settingsAppsEmailTemplatesList' }" class="btn btn-danger m-r-10">Cancel</router-link>
                        <button class="btn btn-primary" @click="save()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </settings-template>
</template>

<script>
export default {
    name: "Form",
    components: {
        SettingsTemplate: () => import("../tab-container")
    },
    data() {
        return {
            emailTemplate: ""
        };
    },
    computed: {
        quillEditor() {
            return this.$refs.editor.quill;
        }
    },
    methods: {
        save() {
            // Save code and then show the webhooks list
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
