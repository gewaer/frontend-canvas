<template>
    <div class="row">
        <div class="col">
            <h5>Companies
                <button class="btn btn-primary" @click="addCompany()">New company</button>
            </h5>
            <div class="table-responsive">
                <table class="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th style="width:30%">Logo</th>
                            <th style="width:30%">Name</th>
                            <th style="width:20%">Lorem Dolor</th>
                            <th style="width:10%">Lorem Dolor</th>
                            <th style="width:15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="company in companies" :key="`company-${company.id}`">
                            <td class="v-align-middle semi-bold text-">
                                <img :src="company.profile_image || defaultImage" height="25px" alt="Company Logo">
                            </td>
                            <td class="v-align-middle semi-bold"> {{ company.name }}</td>
                            <td class="v-align-middle semi-bold">Lorem Dolor sit amet</td>
                            <td class="v-align-middle semi-bold">Lorem Dolor</td>
                            <td class="v-align-middle semi-bold">
                                <button class="btn btn-primary m-l-5" @click="editCompany(company.id, false)"><i class="fa fa-eye" aria-hidden="true"/></button>
                                <button class="btn btn-complete m-l-5" @click="editCompany(company.id)"><i class="fa fa-edit" aria-hidden="true"/></button>
                                <button
                                    :disabled="isCurrentCompany(company.id)"
                                    class="btn btn-danger m-l-5"
                                    @click="deleteCompany(company.id)">
                                    <i class="fa fa-trash" aria-hidden="true" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
import CompaniesForm from "@/components/forms/companiesForm";

export default {
    name: "CompaniesList",
    components: {
        CompaniesForm
    },
    data() {
        return {
            companies: [],
            defaultImage: "https://mctekk.com/images/logo-o.svg",
            selectedCompany: null,
            isEditable: true
        }
    },
    computed: {
        ...mapState("Company", {
            company: state => state.data
        })
    },
    mounted() {
        this.companies = _.clone(this.$store.state.Company.list);
    },
    methods: {
        isCurrentCompany(companyId) {
            return this.company.id == companyId;
        },
        getCompany(id) {
            return axios(`/companies/${id}`).then(({ data }) => {
                this.selectedCompany = data;
            })
        },

        async editCompany(companyId, isEditable = true) {
            this.isEditable = isEditable
            await this.getCompany(companyId);
            this.$modal.show("company-modal");
        },

        deleteCompany(id) {
            if (this.isCurrentCompany) {
                return
            }

            axios({
                url: `/companies/${id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The company has been deleted",
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

            })
        },

        addCompany() {
            this.selectedCompany = {};
            this.$modal.show("company-modal");
        }
    }
};
</script>

