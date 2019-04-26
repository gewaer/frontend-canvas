<template>
    <div class="browse-list">
        <modal
            :draggable="true"
            :adaptive="true"
            :scrollable="true"
            name="add-custom-filter"
            height="auto">
            <add-custom-filters-modal
                :fields="filterableFields"
                :resource-name="resourceName"
                mode="form"
                @saved="closeAddCustomFilter"/>
        </modal>

        <h4 class="section-title p-l-10">{{ currentResource.title }}</h4>

        <table-search
            :search-options="searchOptions"
            :filterable-fields="filterableFields"
            :bulk-actions="bulkActions"
            :current-resource="currentResource"
            @show-add-custom-filter="showAddCustomFilter"
            @getData="getData()"
        />

        <!-- Table  -->
        <div class="card">
            <div class="card-block">
                <div class="table-responsive">
                    <vuetable
                        ref="Vuetable"
                        :append-params="appendParams"
                        :fields="tableFields"
                        :http-fetch="getTableData"
                        :query-params="queryParams"
                        :per-page="perPage"
                        :show-sort-icons="true"
                        :api-url="currentResource.endpoint"
                        track-by="id"
                        class="table table-hover table-condensed"
                        pagination-path=""
                        @vuetable:pagination-data="onPaginationData">

                        <template slot="actions" slot-scope="props">
                            <div class="btn-group vehicle-edit">
                                <router-link
                                    :to="{ name: `edit-${ currentResource.name }`, params: { resource: currentResource.name, id: props.rowData.id } }"
                                    tag="button"
                                    type="button"
                                    class="btn btn-default smaller-btn">Edit</router-link>
                                <button type="button" class="btn btn-default smaller-btn" @click="deleteResource(props.rowData.id)">Delete</button>
                            </div>
                        </template>
                    </vuetable>

                    <vuetable-pagination
                        ref="pagination"
                        :css="pagination"
                        class="justify-content-end"
                        @vuetable-pagination:change-page="onChangePage"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import addCustomFiltersModal from "../layout/add-custom-filters-modal";
import TableSearch from "@/components/vuetable/table-search";
import VuetableFieldCheckbox from "@/components/vuetable/custom-checkbox";
import { vuexMixins, listMixins } from "@/utils/mixins";

export default {
    name: "Browse",
    comments: {
        VuetableFieldCheckbox
    },
    components: {
        addCustomFiltersModal,
        TableSearch
    },
    mixins: [
        vuexMixins,
        listMixins
    ],
    data() {
        return {
            currentResource: {},
            resourceName: "roles",
            appendParams: {
                format: "true"
            },
            perPage: 15,
            queryParams: {
                sort: "sort",
                page: "page",
                perPage: "limit"
            },
            searchOptions: {
                text: "",
                filters: []
            },
            tableFields: [
                // {
                //     name: VuetableFieldCheckbox,
                //     title: "checkbox",
                //     titleClass: "text-center",
                //     dataClass: "text-center",
                //     width: "5%"
                // }
            ],
            pagination: {
                icons: {
                    first: "fa fa-chevron-left",
                    prev:  "fa fa-chevron-left",
                    next:  "fa fa-chevron-right",
                    last:  "fa fa-chevron-right"
                }
            }
        };
    },
    computed: {
        ...mapState({
            companyData: state => state.Company.data
        }),
        filterableFields() {
            return this.tableFields.filter(field => field.filterable).map(field => field.name);
        },
        searchableFields() {
            return this.tableFields.filter(field => field.searchable).map(field => field.name);
        },
        bulkActions() {
            return [
                {
                    name: "Export",
                    action: this.exportRows
                }, {
                    name: "Delete",
                    action: this.deleteRows
                }
            ]
        }
    },
    created() {
        this.getResource(this.$route.params.resource);
    },
    beforeRouteUpdate(to, from, next) {
        this.getResource(to.params.resource);
        next();
    },
    methods: {
        deleteResource(resourceId) {
            axios({
                url: `${this.currentResource.endpoint}/${resourceId}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    text: `${this.currentResource.title} deleted successfully`,
                    type: "success"
                });
                window.location.reload();
            }).catch(() => {
                this.isLoading = false;
                this.$notify({
                    text: `Something went wrong`,
                    type: "error"
                });
            });
        },
        getResource(resourceName) {
            const resourceIndex = this.companyData.resources.findIndex(resource => {
                return resource.name == resourceName;
            });

            this.currentResource = this.companyData.resources[resourceIndex];
            this.tableFields = [];
            this.tableFields = [...this.tableFields, ...this.currentResource.tableFields]
        },
        showAddCustomFilter() {
            this.$modal.show("add-custom-filter");
        },
        closeAddCustomFilter() {
            this.$modal.hide("add-custom-filter");
        },
        //table methods
        getData() {
            let params = "";
            if (this.searchOptions.text){
                if ( !this.searchOptions.filters.length) {
                    params += this.getParams(this.searchableFields);
                } else {
                    params += this.getParams(this.searchOptions.filters);
                }
            }

            this.appendParams.q = `(${params})`;
            this.$refs.Vuetable.refresh();
        },

        getParams(fields, separator="%") {
            return  fields.map(field => `${field}:${separator}${encodeURIComponent(this.searchOptions.text.trim())}${separator}`).join(";");
        },

        // pagination data
        onPaginationData(data) {
            const paginationData = {
                total: data.total_pages,
                per_page: data.limit,
                current_page: data.page,
                last_page: data.total_pages
            }
            this.$refs.pagination.setPaginationData(paginationData);
        },

        onChangePage(page) {
            // Vuetable.changePage() wasn't working as espected
            this.$refs.Vuetable.currentPage = page;
            this.$refs.Vuetable.reload();
        },
        //row actions
        deleteRow() {
            // your delete function here

        },
        editRow() {
            // your edit function here
        },
        // bulk actions
        deleteRows() {
            // your function here
            alert("rows deleted")
        },
        exportRows() {
            // your function here
            alert("rows exported")
        },
        getSelectedRows() {
            return this.$refs.Vuetable.selectedTo;
        }


    }
}
</script>


<style lang="scss">
.browse-list {
    .browse-list-row {
        display: flex;
        align-items: center;
        padding: 8px;

        .bulk-actions {
            padding-left: 5px;
            padding-right: 15px;
        }

        .search-bar {
            margin-left: 25px;
            max-width: 320px;
        }

        .browse-list-filters {
            margin-left: auto;
            max-width: 450px;

            .multiselect__tags {
                min-width: 280px;
            }

            .add-custom-filter-btn {
                background-color: var(--base-color);
                color: white;
                padding: 5px;
                cursor: pointer;
            }
        }
    }

    table {
        table-layout: initial !important;

        thead, tbody {
            tr {
                th, td {
                    white-space: normal !important;
                    overflow: visible !important;
                    text-overflow: initial !important;
                    vertical-align: middle;
                }
            }
        }

        thead {
            background-color: white;

            tr {
                th {
                    padding-left: 10px !important;
                    padding-right: 10px !important;
                    padding-top: 0;
                    padding-bottom: 0;
                    font-weight: bold;
                    color: black;
                    height: 50px;
                }
            }
        }

        tr {
            td {
            padding: 10px;

                .checkbox label:before {
                    top: 0;
                }

                p {
                    margin-bottom: 0;
                }
            }
        }
    }

    .sorted-desc {
        ::after {
            font-family: "Font Awesome 5 Free";
            font-style: normal;
            content: "\f0d8"
        }
        // add icons
    }
    .sorted-asc {
        ::after {
            font-family: "Font Awesome 5 Free";
            font-style: normal;
            content: "\f0d7"
        }
        // add icons
    }

    .pagination.menu {
        padding: 10px;

        .item {
            background-color: var(--base-color);
            color: white;
            padding: 5px;
            margin-left: 5px;
            border-radius: 100%;
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 0;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
</style>

