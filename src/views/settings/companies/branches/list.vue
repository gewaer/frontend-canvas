<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="row">
            <div class="col">
                <h5>
                    Branches
                    <router-link :to="{ name: 'settingsCompaniesBranchesForm' }" class="btn btn-primary">
                        New Branch
                    </router-link>
                </h5>
                <div class="table-responsive">
                    <vuetable
                        ref="Vuetable"
                        :append-params="appendParams"
                        :fields="branchesFields"
                        :http-fetch="getTableData"
                        api-url="/companies-branches"
                        class="table table-hover table-condensed"
                        pagination-path="">
                        <img
                            slot="profile_image"
                            slot-scope="props"
                            :src="props.rowData.profile_image || defaultImage"
                            height="25px"
                        >
                        <template slot="actions" slot-scope="props">
                            <button class="btn btn-primary m-l-5" @click="editBranch(props.rowData.id, false)"><i class="fa fa-eye" aria-hidden="true"/></button>
                            <button class="btn btn-complete m-l-5" @click="editBranch(props.rowData.id)"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button
                                :disabled="isCurrentBranch(props.rowData.id)"
                                class="btn btn-danger m-l-5"
                                @click="confirmDelete(props.rowData.id)">
                                <i class="fa fa-trash" aria-hidden="true" />
                            </button>
                        </template>
                    </vuetable>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import { mapState } from "vuex";
import { vuexMixins, listMixins } from "@/utils/mixins";

export default {
    name: "List",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/companies/tabs")
    },
    mixins: [
        vuexMixins,
        listMixins
    ],
    data() {
        return {
            branchesFields: [{
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
                q: "(is_deleted:0)"
            },
            defaultImage: "https://mctekk.com/images/logo-o.svg",
            isEditable: true,
            isLoading: false,
            selectedBranch: null
        }
    },
    computed: {
        ...mapState("Company", {
            branch: state => state.data.branch
        })
    },
    methods: {
        confirmDelete(roleId) {
            // change for swal or any other
            if (confirm("are you sure?")) {
                this.delete(roleId)
            }
        },
        delete(id) {
            if (this.isLoading || this.branch.id == id) {
                return
            }

            this.isLoading = true;

            axios({
                url: `/companies-branches/${id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    title: "Deleted",
                    text: "The branch has been deleted",
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

        editBranch(branchId, isEditable = true) {
            this.isEditable = isEditable;
            this.$router.push({
                name: "settingsCompaniesBranchesFormEdit",
                params: {
                    id: branchId
                }
            });
        },

        isCurrentBranch(branchId) {
            return this.branch.id == branchId;
        }
    }
};
</script>
