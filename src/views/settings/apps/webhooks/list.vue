<template>
    <settings-template>
        <div class="row webhooks-section">
            <div class="col">
                <h5>
                    Webhooks
                    <router-link :to="{ name: 'settingsAppsWebhooksForm' }" class="btn btn-primary">Create</router-link>
                </h5>
                <div class="table-responsive">
                    <table class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th style="width:45%">Event</th>
                                <th style="width:20%">Format</th>
                                <th style="width:20%">URL</th>
                                <th style="width:15%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="v-align-middle semi-bold">Cart creation</td>
                                <td class="v-align-middle semi-bold">JSON</td>
                                <td class="v-align-middle semi-bold">www.google.com</td>
                                <td class="v-align-middle semi-bold">
                                    <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                    <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <vuetable
                        ref="Vuetable"
                        :append-params="{format: 'true'}"
                        :fields="webhooksFields"
                        :http-fetch="getTableData"
                        api-url="/user-webhooks"
                        class="table table-hover table-condensed"
                        pagination-path="">

                        <template slot="actions" slot-scope="props">
                            <button class="btn btn-primary m-l-5" @click="editWebhook(props.rowData)"><i class="fa fa-eye" aria-hidden="true"/></button>
                            <button class="btn btn-complete m-l-5" @click="editWebhook(props.rowData)"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button
                                class="btn btn-danger m-l-5"
                                @click="confirmDeleteWebhook(props.rowData)">
                                <i class="fa fa-trash" aria-hidden="true" />
                            </button>
                        </template>
                    </vuetable>
                </div>
            </div>
        </div>
    </settings-template>
</template>

<script>
export default {
    name: "List",
    components: {
        SettingsTemplate: () => import("../tab-container")
    },
    data(){
        return{
            webhooksFields: [{
                name: "name",
                title: "Name (Event)"
            }, {
                name: "format",
                sortField: "format"
                // width: "30%"
            }, {
                name: "url",
                sortField: "url"
                // width: "30%"
            }, {
                name: "actions",
                title: "Actions"
            }]
        }
    },
    methods:{
        getTableData(apiUrl, options) {
            return axios({
                url: apiUrl,
                params: options.params
            });
        },
        editWebhook(userWebhook) {
            this.$router.push({ name: "settingsAppsEmailTemplatesFormEdit", params:{id:userWebhook.id} });
        },
        confirmDeleteWebhook(userWebhook){
            this.$modal.show("basic-modal", {
                title:"Delete Webhook",
                message:`Did you want to delete ${userWebhook.webhook.name} webhook ?`,
                buttons: [{
                    title: "Accept",
                    class: "btn-success",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                        this.disableWebhook(userWebhook);
                    }
                }, {
                    title: "Cancel",
                    class: "btn-danger",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                    }
                }]
            });
        },
        disableWebhook(userWebhook) {
            axios({
                url: `/user-webhooks/${userWebhook.id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The Webhook has been deleted",
                    type: "success"
                });
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.$refs.Vuetable.reload();
            })
        }
    }
};
</script>
