<template>
    <container-template>
        <div slot="tab-content" class="row">
            <div class="col">
                <h5>
                    Companies
                    <router-link :to="{ name: 'settingsManagerForm' }" class="btn btn-primary">
                        New Company
                    </router-link>
                </h5>
                <div class="table-responsive">
                    <vuetable
                        ref="Vuetable"
                        :append-params="appendParams"
                        :fields="companiesFields"
                        :http-fetch="getTableData"
                        api-url="/companies"
                        class="table table-hover table-condensed"
                        pagination-path=""
                    >
                        <img
                            slot="profile_image"
                            slot-scope="props"
                            :src="props.rowData.profile_image || defaultImage"
                            height="25px"
                        >
                        <template slot="actions" slot-scope="props">
                            <button class="btn btn-primary m-l-5" @click="editCompany(props.rowData.id, false)"><i class="fa fa-eye" aria-hidden="true"/></button>
                            <button class="btn btn-complete m-l-5" @click="editCompany(props.rowData.id)"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button
                                :disabled="isCurrentCompany(props.rowData.id)"
                                class="btn btn-danger m-l-5"
                                @click="beforeDeleteCompany(props.rowData)">
                                <i class="fa fa-trash" aria-hidden="true" />
                            </button>
                        </template>
                    </vuetable>
                </div>
            </div>

            <modal
                :draggable="true"
                :adaptive="true"
                :scrollable="true"
                name="company-modal"
                height="auto"
                @closed="selectedCompany = null"/>
        </div>
    </container-template>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "CompaniesManager",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container")
    },
    data() {
        return {
            companiesFields: [{
                name: "profile_image",
                title: "Logo",
                width: "30%"
            }, {
                name: "name",
                sortField: "name",
                width: "30%"
            }, {
                name: "actions",
                title: "Actions",
                titleClass: "table-actions",
                dataClass: "table-actions"
            }],
            appendParams:{
                format: "true",
                relationships: "hasActivities",
                q: "(is_deleted:0)"
            },
            defaultImage: "https://mctekk.com/images/logo-o.svg",
            isEditable: true,
            isLoading: false,
            selectedCompany: null
        }
    },
    computed: {
        ...mapState({
            company: state => state.Company.data
        })
    },
    methods: {
        beforeDeleteCompany(company) {
            if (this.isLoading) {
                return ;
            }
            if (company.hasActivities == "1") {
                this.$notify({
                    title: "Error",
                    text: "No puede eliminar esta compañia por que tiene actividades",
                    type: "error"
                });
                return ;
            }
            this.confirmDeleteCompany(company);
        },
        confirmDeleteCompany(company) {
            this.$modal.show("basic-modal", {
                title:"Delete Company",
                message:`Did you want to delete ${company.name} company ?`,
                buttons: [{
                    title: "Accept",
                    class: "btn-success",
                    handler: () => {
                        this.$modal.hide("basic-modal");
                        this.deleteCompany(company.id);
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
        deleteCompany(companyId) {
            this.isLoading = true;

            axios({
                url: `/companies/${companyId}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    title: "Deleted",
                    text: "The company has been deleted",
                    type: "success"
                });
                this.$refs.Vuetable.reload();
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            })
        },
        editCompany(companyId, isEditable = true) {
            this.isEditable = isEditable;
            this.$emit("getCompany", companyId);
        },
        getTableData(apiUrl, options) {
            return axios({
                url: apiUrl,
                params: options.params
            });
        },
        isCurrentCompany(companyId) {
            return this.company.id == companyId;
        }
    }
};
</script>
