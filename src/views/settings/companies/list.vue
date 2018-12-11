<template>
    <div class="row">
        <div class="col">
            <h5>Companies
                <button class="btn btn-primary" @click="addCompany()">New company</button>
            </h5>
            <div class="table-responsive">
                <vuetable
                    :append-params="{format: 'true'}"
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
                            @click="deleteCompany(props.rowData.id)">
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
            @closed="selectedCompany = null">
            <companies-form :company="selectedCompany" mode="form"/>
        </modal>
    </div>
</template>

<script>
import {mapState} from "vuex";
import CompaniesForm from "@/components/forms/companies";

export default {
    name: "CompaniesList",
    components: {
        CompaniesForm
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
                title: "Actions"
            }],
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
        addCompany() {
            this.selectedCompany = {};
            this.$modal.show("company-modal");
        },
        deleteCompany(id) {
            if (this.isLoading) {
                return
            }

            this.isLoading = true;

            axios({
                url: `/companies/${id}`,
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
        async editCompany(companyId, isEditable = true) {
            this.isEditable = isEditable;
            await this.getCompany(companyId);
            this.$modal.show("company-modal");
        },
        getCompany(id) {
            return axios(`/companies/${id}`).then(({ data }) => {
                this.selectedCompany = data;
            })
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
