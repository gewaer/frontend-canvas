<template>
    <div class="browse-list">
        <modal
            :draggable="true"
            :adaptive="true"
            :scrollable="true"
            name="add-custom-filter"
            height="auto">
            <add-custom-filters-modal mode="form" />
        </modal>

        <h4 class="section-title p-l-10">Leads</h4>
        <div class="card">
            <div class="card-block">
                <div class="browse-list-row">
                    <div class="dropdown bulk-actions">
                        <button
                            id="bulk-actions"
                            class="btn btn-info dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Bulk actions
                        </button>
                        <div class="dropdown-menu" aria-labelledby="bulk-actions">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>

                    <button class="add-record-btn btn btn-primary">
                        <i class="fa fa-plus-circle"/> Add lead
                    </button>

                    <div class="input-group search-bar">
                        <input type="text" class="form-control" v-model="searchOptions.text" @keydown.13="getData">
                        <div class="input-group-append">
                            <button class="btn btn-primary" @click="getData">
                                <i class="fa fa-search"/> Search
                            </button>
                        </div>
                    </div>

                    <div class="browse-list-filters d-flex align-items-center">
                        <span class="mr-3">Filters</span>
                        <multiselect
                            v-model="searchOptions.filters"
                            :multiple="true"
                            :show-labels="false"
                            :options="filterableFields"
                        >
                            <template slot="afterList" >
                                <div class="add-custom-filter-btn option__desc"><a class="option__title" @click="showAddCustomFilter">
                                <i class="fa fa-plus"/> Add custom Filter</a>
                                </div>
                            </template>
                        </multiselect>
                    </div>

                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-block">
                <div class="table-responsive">
                    <vuetable
                        ref="Vuetable"
                        :append-params="appendParams"
                        :fields="tableFields"
                        :http-fetch="getTableData"
                        api-url="/roles"
                        class="table table-hover table-condensed"
                        pagination-path="">

                        <template slot="actions" slot-scope="props">
                            <div class="btn-group vehicle-edit">
                                <button type="button" class="btn btn-default smaller-btn">Edit</button>
                                <button
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    class="btn btn-default dropdown-toggle dropdown-toggle-split">
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>

                                <ul class="dropdown-menu">
                                    <a href="javascript:void(0)" class="dropdown-item">Action 1</a>
                                    <a href="javascript:void(0)" class="dropdown-item">Action 2</a>
                                </ul>
                            </div>
                        </template>
                    </vuetable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import addCustomFiltersModal from "../layout/add-custom-filters-modal.vue";
import VuetableFieldCheckbox from 'vuetable-2/src/components/VuetableFieldCheckbox';

export default {
    name: "browse",
    components: {
        addCustomFiltersModal
    },
    comments: {
        VuetableFieldCheckbox
    },
    data() {
        return {
            appendParams: {
                format: "true"
            },
            searchOptions: {
                text: "",
                filters: []
            },
            tableFields: [{
                    name: VuetableFieldCheckbox,
                    title: "checkbox",
                    titleClass: 'text-center',
                    dataClass: 'text-center',
                    width: "5%"
                }, {
                    name: "name",
                    title: "Name",
                    filterable: true,
                    searchable: true
                }, {
                    name: "description",
                    filterable: true,
                    searchable: true
                }, {
                    name: "users",
                }, {
                    name: "actions",
                    title: "Actions"
                }
            ]
        };
    },
    computed: {
        filterableFields() {
            return this.tableFields.filter(field => field.filterable).map(field => field.name);
        },
        searchableFields() {
            return this.tableFields.filter(field => field.searchable).map(field => field.name);
        }
    },
    methods: {
        showAddCustomFilter() {
            this.$modal.show("add-custom-filter");
        },
        //table methods
        getData() {
            let params = "";
            if (this.searchOptions.text){
                if ( !this.searchOptions.filters.length) {
                    params += this.getParams(this.searchableFields);
                } else if (this.searchOptions.filters.lenght) {
                    params += this.getParams(this.searchOptions.filters);
                }
            }

            this.appendParams.q = `(${params})`;
            this.$refs.Vuetable.refresh();
        },

        getParams(fields, separator="%") {
            return  fields.map(field => `${field}:${separator}${encodeURIComponent(this.searchOptions.text.trim())}${separator}`).join(";");
        },

        //row actions
        deleteRow() {

        },
        editRow() {

        },
        // bulk actions
        deleteRows() {

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
                    padding-top: 0;
                    padding-bottom: 0;
                    font-weight: bold;
                    color: black;
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
}
</style>

