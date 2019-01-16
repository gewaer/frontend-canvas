<template>
    <container-template>
        <tabs-menu slot="tab-menu" />
        <div slot="tab-content" class="row email-templates-section">
            <div class="col">
                <h5>
                    Email Templates
                    <!-- <router-link :to="{ name: 'settingsAppsEmailTemplatesForm' }" class="btn btn-primary">Create</router-link> -->
                </h5>
                <div class="table-responsive">
                    <vuetable
                        ref="Vuetable"
                        :append-params="appendParams"
                        :fields="templatesFields"
                        :http-fetch="getTableData"
                        api-url="/email-templates"
                        class="table table-hover table-condensed"
                        pagination-path="">
                        <template slot="actions" slot-scope="props">
                            <button class="btn btn-complete m-l-5" @click="editTemplate(props.rowData)"><i
                                class="fa fa-edit"
                                aria-hidden="true" /></button>
                            <button class="btn btn-danger m-l-5" @click="confirmDeleteTemplate(props.rowData)">
                                <i class="fa fa-trash" aria-hidden="true" />
                            </button>
                            <button class="btn btn-complete m-l-5" title="clone role" @click="cloneTemplate(props.rowData)">
                                <i class="fa fa-copy" aria-hidden="true"/>
                            </button>
                        </template>
                    </vuetable>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
export default {
    name: "List",
    components: {
        ContainerTemplate: () => import( /* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import( /* webpackChunkName: "settings-apps-tabs" */ "@v/settings/apps/tabs")
    },
    data() {
        return {
            appendParams: {
                format: "true",
                q: "(is_deleted:0)"
            },
            templatesFields: [{
                name: "name",
                title: "Name",
                sortField: "name",
                width: "50%"

            }, {
                name: "actions",
                title: "Actions"
            }]
        }
    },

    methods: {
        editTemplate(template) {
            this.$router.push({
                name: "settingsAppsEmailTemplatesFormEdit",
                params: {
                    id: template.id
                }
            });
        },
        confirmDeleteTemplate(template) {
            this.$modal.show("basic-modal", {
                title: "Delete Email Template",
                message: `Did you want to delete the Email Template ?`,
                buttons: [{
                    title: "Accept",
                    class: "btn-success",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                        this.disableTemplate(template);
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
        disableTemplate(template) {
            axios({
                url: `/email-templates/${template.id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The email template has been deleted",
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
        },
        cloneTemplate(template) {
            axios({
                url: `/email-templates/${template.id}/copy`,
                method: "POST"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The email template has clone deleted",
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
}

</script>
