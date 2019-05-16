<template>
    <div class="browse-list">
        <modal
            :draggable="true"
            :adaptive="true"
            :scrollable="true"
            height="auto"
            name="add-custom-filter"
        >
            <add-custom-filters-modal
                :fields="filterableFields"
                :resource-name="resourceName"
                mode="form"
                @saved="closeAddCustomFilter()"
            />
        </modal>

        <h3 class="section-title p-l-10">{{ currentResource.title }}</h3>

        <table-search
            :bulk-actions="bulkActions"
            :current-resource="currentResource"
            :filterable-fields="filterableFields"
            :search-options="searchOptions"
            @getData="getData"
            @show-add-custom-filter="showAddCustomFilter()"
        />
        <div class="pagination-controls pc-top row">
            <div class="col-auto">
                <label class="mb-0">Results per page:</label>
            </div>
            <div class="col-auto">
                <multiselect
                    v-model="perPage"
                    :allow-empty="false"
                    :show-labels="false"
                    :options="[25, 50, 100]"
                    :searchable="false"
                    placeholder=""
                />
            </div>
            <div v-show="totalPages > 1" class="col-auto separator">|</div>
            <vuetable-pagination
                ref="paginationTop"
                :css="pagination"
                class="col-auto"
                @vuetable-pagination:change-page="onChangePage"
            />
        </div>
        <div class="card m-b-0">
            <div class="card-block">
                <div class="table-responsive">
                    <vuetable
                        ref="Vuetable"
                        :append-params="appendParams"
                        :css="vuetableStyles"
                        :fields="tableFields"
                        :http-options="{ headers: { Authorization: token }}"
                        :per-page="perPage"
                        :query-params="queryParams"
                        :show-sort-icons="true"
                        api-url="https://apicanvas.gewaer.io/v1/roles"
                        class="table table-hover table-condensed"
                        pagination-path=""
                        track-by="id"
                        @vuetable:pagination-data="onPaginationData"
                    >
                        <template slot="actions">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary btn-sm">Edit</button>
                                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </template>
                    </vuetable>
                </div>
            </div>
        </div>
        <div class="pagination-controls pc-bottom row">
            <div class="col-auto">
                <label class="mb-0">Results per page:</label>
            </div>
            <div class="col-auto">
                <multiselect
                    v-model="perPage"
                    :allow-empty="false"
                    :show-labels="false"
                    :options="[25, 50, 100]"
                    :searchable="false"
                    placeholder=""
                />
            </div>
            <div v-show="totalPages > 1" class="col-auto separator">|</div>
            <vuetable-pagination
                ref="paginationBottom"
                :css="pagination"
                class="col-auto"
                @vuetable-pagination:change-page="onChangePage"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AddCustomFiltersModal from "@v/layout/add-custom-filters-modal";
import TableSearch from "@/components/vuetable/table-search";
import VuetableFieldCheckbox from "@/components/vuetable/custom-checkbox";
import { vuexMixins, listMixins } from "@/utils/mixins";

export default {
    name: "Browse",
    components: {
        AddCustomFiltersModal,
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
            perPage: 25,
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
                {
                    name: VuetableFieldCheckbox,
                    title: "checkbox",
                    titleClass: "text-center",
                    dataClass: "text-center",
                    width: "5%"
                }, {
                    name: "name",
                    title: "Name",
                    sortField: "name",
                    filterable: true,
                    searchable: true
                }, {
                    name: "description",
                    sortField: "description",
                    filterable: true,
                    searchable: true
                }, {
                    name: "users"
                }, {
                    name: "actions",
                    title: "Actions",
                    titleClass: "table-actions",
                    dataClass: "table-actions"
                }
            ],
            pagination: {
                activeClass: "active",
                icons: {
                    first: "fa fa-angle-double-left",
                    prev: "fa fa-angle-left",
                    next: "fa fa-angle-right",
                    last: "fa fa-angle-double-right"
                }
            },
            token: this.$store.state.User.token || Cookies.get("token"),
            totalPages: null,
            vuetableStyles: {
                ascendingClass: "",
                ascendingIcon: "fa fa-sort-up",
                descendingClass: "",
                descendingIcon: "fa fa-sort-down",
                sortableIcon: "fa fa-sort"
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
                },
                {
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
        getResource(resourceName) {
            const resourceIndex = this.companyData.resources.findIndex(resource => {
                return resource.name == resourceName;
            });

            this.currentResource = this.companyData.resources[resourceIndex];

            axios({
                url: `/${this.currentResource.name}`,
                method: "GET"
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        },
        showAddCustomFilter() {
            this.$modal.show("add-custom-filter");
        },
        closeAddCustomFilter() {
            this.$modal.hide("add-custom-filter");
        },
        getData(searchOptions) {
            let params = "";
            searchOptions.text = searchOptions.text.trim();

            if (searchOptions.text.length) {
                if (!searchOptions.filters.length) {
                    params += this.getParams(this.searchableFields, searchOptions);
                } else {
                    params += this.getParams(searchOptions.filters, searchOptions);
                }
            }

            this.appendParams.q = `(${params})`;
            this.$refs.Vuetable.refresh();
        },
        getParams(fields, searchOptions, separator = "%") {
            const encodedParams = encodeURIComponent(searchOptions.text);

            return fields.map(field => `${field}:${separator}${encodedParams}${separator}`).join(";");
        },
        onPaginationData(data) {
            const paginationData = {
                data: data.data,
                total: parseInt(data.total_rows),
                per_page: parseInt(data.limit),
                current_page: parseInt(data.page),
                last_page: parseInt(data.total_pages)
            }

            this.totalPages = paginationData.last_page;
            const baseUrl = this.$refs.Vuetable.apiUrl;

            const nextParams = this.$refs.Vuetable.getAllQueryParams();
            nextParams.page = nextParams.page == paginationData.last_page ? null : nextParams.page + 1;
            const prevParams = this.$refs.Vuetable.getAllQueryParams();
            prevParams.page = prevParams.page == 1 ? null : prevParams.page - 1;

            const nextQuery = Object.keys(nextParams).map(key => `${key}=${nextParams[key]}`);
            const prevQuery = Object.keys(prevParams).map(key => `${key}=${prevParams[key]}`);

            paginationData.next_page_url = nextParams.page === null ? null : `${baseUrl}?${nextQuery.join("&")}&format=true`;
            paginationData.prev_page_url = prevParams.page === null ? null : `${baseUrl}?${prevQuery.join("&")}&format=true`;
            paginationData.from = (paginationData.current_page - 1) * paginationData.per_page + 1;
            paginationData.to = paginationData.from + paginationData.per_page - 1;

            this.$refs.Vuetable.tablePagination = paginationData;
            this.$refs.paginationBottom.setPaginationData(paginationData);
            this.$refs.paginationTop.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.$refs.Vuetable.changePage(page);
        },
        deleteRow() {
            // your delete function here
        },
        editRow() {
            // your edit function here
        },
        deleteRows() {
            alert("rows deleted")
        },
        exportRows() {
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
        padding: 10px 10px 10px 4px;

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

            &.active {
                background-color: white;
                border: 1px solid var(--base-color);
                color: var(--base-color);
                pointer-events: none;
            }

            &:hover {
                background-color: var(--secondary-color);
                border-color: transparent;
                color: white;
            }

            &.disabled {
                opacity: 0.5;
                pointer-events: none;
            }
        }
    }

    .pagination-controls {
        align-items: center;
        display: flex;
        justify-content: flex-end;

        &.pc-top {
            padding-bottom: 3px;
        }

        &.pc-bottom {
            padding-top: 3px;
        }

        .multiselect {
            width: 75px;
        }

        .separator {
            color: #ccc;
            font-size: 18px;
            padding-right: 0;
        }
    }
}
</style>
