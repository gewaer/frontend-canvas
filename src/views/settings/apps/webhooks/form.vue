<template>
    <settings-template>
        <div class="row webhooks-section">
            <div class="col">
                <h5>{{ title }}</h5>
                <div class="row">
                    <div class="col-12 col-sm">
                        <label>Event</label>
                        <multiselect
                            v-validate="'required:true'"
                            v-model="selectedWebhook"
                            :options="webhooks"
                            data-vv-as="event"
                            data-vv-name="event"
                            label="name"
                            track-by="id"
                            @input="setWebhook" />
                        <span class="text-danger">{{ errors.first("event") }}</span>
                    </div>
                    <div class="col-12 col-sm">
                        <label>Format</label>
                        <multiselect
                            v-validate="'required:true'"
                            v-model="selectedFormat"
                            :show-labels="false"
                            :options="webhooksFormats"
                            data-vv-as="webhook format"
                            data-vv-name="webhook format"
                            @input="setFormat" />
                        <span class="text-danger">{{ errors.first("webhook format") }}</span>
                    </div>
                    <div class="col-12 col-sm">
                        <label>Method</label>
                        <multiselect
                            v-validate="'required:true'"
                            v-model="selectedMethod"
                            :show-labels="false"
                            :options="webhooksMethods"
                            data-vv-as="method"
                            data-vv-name="method"
                            @input="setWebhookMethod" />
                        <span class="text-danger">{{ errors.first("method") }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group  required">
                            <label>URL</label>
                            <input
                                v-validate="'required:true|url:require_protocol'"
                                v-model="webhookData.url"
                                data-vv-as="url"
                                data-vv-name="url"
                                class="form-control"
                                type="text"
                                name="url">
                            <span
                                class="text-danger"> {{ errors.first('url') }}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-xl d-flex justify-content-end mt-2">
                        <div class="col-12 col-xl d-flex justify-content-end mt-2">
                            <button :disabled="isLoading" class="btn btn-danger m-r-10" @click="triggerCancel">Cancel</button>
                            <button :disabled="isLoading" class="btn btn-primary" @click="verifyFields">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </settings-template>
</template>

<script>

import { vueCrudMixins } from "@/utils/mixins";
export default {
    name: "Form",
    components: {
        SettingsTemplate: () => import("../tab-container")
    },
    mixins: [
        vueCrudMixins
    ],
    data() {
        return {
            isLoading: false,
            selectedFormat: null,
            selectedMethod: null,
            selectedWebhook: null,
            webhookData: {},
            webhooksFormats:[
                "JSON",
                "XML"
            ],
            webhooks:[
            ],
            webhooksMethods:[
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ]
        }
    },
    computed: {
        isEditWebhook() {
            return this.$route.name === "settingsAppsWebhooksFormEdit";
        },
        title() {
            let title = "New Webhook"
            if (this.isEditWebhook) {
                title = "Edit Webhook";
            }
            return title;
        }

    },
    watch:{
        "webhookData.format"() {
            this.setInitialFormat();
        },
        "webhookData.webhooks_id"() {
            this.setInitialWebhook();
        },
        "webhookData.method"() {
            this.setInitialMethod();
        },
        "route.params.id"(){
            //this.getUserWebhook();
        },
        "webhooks":{
            handler(){
                this.setInitialWebhook();
            },
            deep:true
        }
    },
    mounted() {
        this.getWebhooks();
        if (this.isEditWebhook) {
            this.getUserWebhook();
        }
    },
    methods: {
        setFormat(value) {
            this.webhookData.format = value;
        },
        setWebhookMethod(value) {
            this.webhookData.method = value;
        },
        setWebhook(value) {
            this.webhookData.webhooks_id = value.id;
        },
        setInitialFormat() {
            this.selectedFormat = this.webhooksFormats.find(format => format == this.webhookData.format);
        },
        setInitialMethod() {
            this.selectedMethod = this.webhooksMethods.find(method => method == this.webhookData.method);
        },
        setInitialWebhook() {
            this.selectedWebhook = this.webhooks.find(webhook => webhook.id == this.webhookData.webhooks_id);
        },
        getUserWebhook() {
            let url = `/user-webhooks/${this.$route.params.id}`;
            axios({
                url
            }).then(({
                data
            }) => this.webhookData = data)
                .catch((error) => {
                    this.$notify({
                        group: null,
                        title: "Error",
                        text: error.response.data.errors.message,
                        type: "error"
                    });
                    this.$router.push({
                        name: "settingsAppsWebhooksList"
                    });
                });
        },
        verifyFields() {
            let dialogProps = {
                title: "Create Webhook!",
                message: `Did you want to create a new Webhook?`
            };

            if (this.isEditWebhook) {
                dialogProps = {
                    title: "Edit Webhook!",
                    message: `Did you want to Edit this Webhook?`
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
            let url = "/user-webhooks";
            let method = "POST";
            let data = this.prepareData();

            if (this.isEditWebhook) {
                url = `/user-webhooks/${this.webhookData.id}`;
                method = "PUT";
                data = this.webhookData;
            }

            if (!this.isLoading) {
                this.sendRequest(url, method, data);
            }
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

                this.$router.push({
                    name: "settingsAppsWebhooksList"
                });
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
                name: "settingsAppsWebhooksList"
            });
        },
        prepareData() {
            const data = new FormData();

            Object.keys(this.webhookData).forEach((field) => {
                data.append(field, this.webhookData[field]);
            });
            return data;
        },
        getWebhooks(){
            let url = `/webhooks`;
            axios({
                url
            }).then(({
                data
            }) => this.webhooks = data)
                .catch(() => this.webhooks= []);
        }
    }
}
</script>
