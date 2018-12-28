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
                                v-validate="'required'"
                                v-model="formData.name"
                                class="form-control"
                                type="text"
                                name="name"
                                placeholder="Title for email template"
                            >
                            <span class="error">{{ errors.first("name") }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <quill-editor
                            v-validate="'required'"
                            ref="editor"
                            v-model="formData.template"
                            class="template-editor"
                            name="template"
                        />
                        <span class="error">{{ errors.first("template") }}</span>
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
            formData: {
                name: "",
                template: ""
            }
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

<style lang="scss" scoped>
.template-editor /deep/ {
    .ql-editor {
        min-height: 250px;
    }
}
</style>
