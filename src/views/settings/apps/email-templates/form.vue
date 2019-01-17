<template>
    <container-template>
        <tabs-menu slot="tab-menu" />
        <div slot="tab-content" class="row email-templates-section">
            <div class="col">
                <h5>{{ title }} Email Template</h5>
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
                                placeholder="Title for email template">
                            <span class="error">{{ errors.first("name") }}</span>
                        </div>
                    </div>
                </div>
                <div class="row  m-b-20 m-t-20">
                    <div v-for="chunk in templatesVariablesChunks" :key="chunk.length" class="col">
                        <a
                            v-for="variable in chunk"
                            :key="variable.value"
                            @click.stop="insertIntoQuill(variable.value)">
                            {{
                            '${'+variable.name+'}' }}
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <quill-editor
                            v-validate="'required'"
                            ref="editor"
                            v-model="formData.template"
                            class="template-editor"
                            name="template" />
                        <span class="error">{{ errors.first("template") }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-xl d-flex justify-content-end mt-2">
                        <button class="btn btn-info  m-r-10" @click="verifyFields(true)"> Test</button>
                        <button :disabled="isLoading" class="btn btn-danger m-r-10" @click="triggerCancel">Cancel</button>
                        <button class="btn btn-primary" @click="verifyFields()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import {
    vueCrudMixins
} from "@/utils/mixins";

export default {
    name: "Form",
    components: {
        ContainerTemplate: () => import( /* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import( /* webpackChunkName: "settings-apps-tabs" */ "@v/settings/apps/tabs")
    },
    mixins: [
        vueCrudMixins
    ],
    data() {
        return {
            formData: {
                name: "",
                template: ""
            },
            templateVariables: [],
            isLoading: false
        };
    },
    computed: {
        quillEditor() {
            return this.$refs.editor.quill;
        },
        title() {
            let title = "New"
            if (this.isEditTemplate) {
                title = "Edit";
            }
            return title;
        },
        isEditTemplate() {
            let value = true;
            if (!this.$route.name == "settingsAppsEmailTemplatesFormEdit") {
                value = false;
            }
            return value;
        },
        templatesVariablesChunks() {
            return this.groupVariables(this.templateVariables);
        }
    },
    mounted() {
        this.getEmailTemplateVariables();

        if (this.isEditTemplate) {
            this.getEmailTemplate();
        }
    },
    methods: {
        getEmailTemplate() {
            let url = `/email-templates/${this.$route.params.id}`;
            axios({
                url
            }).then(({
                data
            }) => this.formData = data)
                .catch((error) => {
                    this.notifyError(error);
                    this.cancel();
                });
        },
        getEmailTemplateVariables() {
            let url = `/templates-variables`;
            axios({
                url
            }).then(({
                data
            }) => this.templateVariables = data)
                .catch((error) => {
                    this.notifyError(error);
                });
        },
        verifyFields(test = false) {
            let dialogProps = {
                title: "Edit Email Template!",
                message: `Did you want to Edit this Email Template?`
            };

            if (test) {
                dialogProps = {
                    title: "Send Email Template!",
                    message: `Did you want to test this Email Template?`
                };
            }
            if (this.errors.items.length) {
                let verificationMessage = this.errors.items[0].msg;
                let verificationTitle = `Please verify the ${this.errors.items[0].field}`;
                this.$notify({
                    title: verificationTitle,
                    text: verificationMessage,
                    type: "warn"
                });
            } else {
                this.validateFields(dialogProps, test);
            }
        },
        validateFields(modalProps, test = false) {
            this.$validator.validate().then(result => {
                if (result) {
                    this.$modal.show("basic-modal", {
                        ...modalProps,
                        buttons: [{
                            title: "Accept",
                            class: "btn-primary",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                                this.save(test);
                            }
                        }, {
                            title: "Cancel",
                            class: "btn-danger",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                            }
                        }]
                    });
                }
            });
        },
        save(test = false) {
            let url = `/email-templates/${this.formData.id}`
            let method = "PUT";
            let data = this.formData;

            if (test) {
                url = `/email-templates/test`;
                method = "POST";
                data = this.prepareData();
            }

            if (!this.isLoading) {
                this.sendRequest(url, method, data);
            }
        },
        prepareData() {
            const data = new FormData();

            Object.keys(this.formData).forEach((field) => {
                data.append(field, this.formData[field]);
            });
            return data;
        },
        sendRequest(url, method, data) {
            this.isLoading = true;
            axios({
                url,
                method,
                data
            }).then(() => {
                let text = "Your information has been updated!";
                if(method == "PUT"){
                    text = "Test send succesfully!";
                }
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text,
                    type: "success"
                });
                if(method == "PUT")  {
                    this.cancel();
                }
            }).catch((error) => {
                this.notifyError(error);
            }).finally(() => {
                this.isLoading = false;
            });
        },
        cancel() {
            this.$router.push({
                name: "settingsAppsEmailTemplatesList"
            });
        },
        groupVariables(group = []) {
            let chunks = [];
            let clone = [...group];
            let chunkSize = Math.round(group.length || 4 / 4)
            while (clone.length) {
                chunks.push(clone.splice(0, chunkSize));
            }
            return chunks;
        },
        insertIntoQuill(apiVariable = "") {
            let selection = this.quillEditor.getSelection(true);
            if (selection.index) {
                this.quillEditor.insertText(selection.index, "${" + apiVariable + "}");
            }
        },
        notifyError(error){
            this.$notify({
                group: null,
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
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
