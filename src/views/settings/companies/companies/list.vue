<template>
    <div class="row">
        <div class="col">
            <h5>Companies
                <button class="btn btn-primary" @click="toCrud">New company</button>
            </h5>
            <div class="table-responsive">
                <vuetable
                    :append-params="appendParams"
                    :fields="companiesFields"
                    :http-fetch="getTableData"
                    api-url="/companies"
                    class="table table-hover table-condensed"
                    pagination-path="">
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
                            @click="deleteCompany(props.rowData)">
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
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "CompaniesList",
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
                title: "Actions"
            }],
            appendParams:{
                format: "true",
                relationships: "hasActivities"
            },
            defaultImage: "https://mctekk.com/images/logo-o.svg",
            isEditable: true,
            isLoading: false,
            selectedCompany: null
        }
    },
    computed: {
        ...mapState("Company", {
            company: state => state.data
        })
    },
    methods: {
        toCrud() {
            this.$emit("changeView", "CompaniesCRUD");
        },
        deleteCompany(company) {
            if (this.isLoading) {
                return
            }

            if(company.hasActivities == "1"){
                this.$notify({
                    title: "Error",
                    text: "No puede eliminar esta compañia por que tiene actividades",
                    type: "error"
                });
                return ;
            }
            this.isLoading = true;

            axios({
                url: `/companies/${company.id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    title: "Deleted",
                    text: "The company has been deleted",
                    type: "success"
                });
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
