<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
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
                        <button :disabled="isLoading" class="btn btn-danger m-r-10" @click="triggerCancel">Cancel</button>
                        <button class="btn btn-primary" @click="verifyFields()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import { vueCrudMixins } from "@/utils/mixins";

export default {
    name: "Form",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/apps/tabs")
    }, mixins: [
        vueCrudMixins
    ],
    data() {
        return {
            formData: {
                name: "",
                template: ""
            },
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
                title= "Edit";
            }
            return title;
        },
        isEditTemplate(){
            let value = true;
            if (!this.$route.name =="settingsAppsEmailTemplatesFormEdit"){
                value = false;
            }
            return value;
        }
    },
    mounted() {
        if (this.isEditTemplate) {
            this.getEmailTemplate();
        }
    },
    methods: {
        getEmailTemplate(){
            let url = `/email-templates/${this.$route.params.id}`;
            axios({
                url
            }).then(({
                data
            }) => this.formData = data)
                .catch((error) => {
                    this.$notify({
                        group: null,
                        title: "Error",
                        text: error.response.data.errors.message,
                        type: "error"
                    });
                    this.cancel();
                });
        },
        verifyFields() {
            let dialogProps = {
                title: "Create Email Template!",
                message: `Did you want to create a new Email Template?`
            };

            if (this.isEditTemplate) {
                dialogProps = {
                    title: "Edit Email Template!",
                    message: `Did you want to Edit this Email Template?`
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
                this.validateFields(dialogProps);
            }
        },
        validateFields(modalProps) {
            this.$validator.validate().then(result => {
                if (result) {
                    this.$modal.show("basic-modal", {
                        ...modalProps,
                        buttons: [{
                            title: "Accept",
                            class: "btn-primary",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                                this.save();
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
        save() {
            let url = "/email-templates";
            let method = "POST";
            let data = this.prepareData();

            if (this.isEditTemplate) {
                url = `/email-templates/${this.formData.id}`;
                method = "PUT";
                data = this.formData;
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
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "Your information has been updated!",
                    type: "success"
                });
                this.cancel();
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },
        cancel() {
            this.$router.push({
                name: "settingsAppsEmailTemplatesList"
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
