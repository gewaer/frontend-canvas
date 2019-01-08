<template>
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
                        <a
                            v-for="action in bulkActions"
                            :key="action.name"
                            class="dropdown-item"
                            href="#"
                            @click="action.action">
                            {{ action.name }}
                        </a>
                    </div>
                </div>

                <button class="add-record-btn btn btn-primary">
                    <i class="fa fa-plus-circle"/> Add lead
                </button>

                <div class="input-group search-bar">
                    <input
                        v-model="searchOptions.text"
                        type="text"
                        class="form-control"
                        @keydown.13="getData()">
                    <div class="input-group-append">
                        <button class="btn btn-primary" @click="getData()">
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
                        @input="getData()"
                    >
                        <template slot="afterList" >
                            <div class="add-custom-filter-btn option__desc"><a class="option__title" @click="showAddCustomFilter()">
                            <i class="fa fa-plus"/> Add custom Filter</a>
                            </div>
                        </template>
                    </multiselect>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        searchOptions:{
            type: Object,
            required: true
        },
        filterableFields: {
            type: Array,
            required: true
        },
        bulkActions: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        getData() {
            this.$emit("getData")
        },
        showAddCustomFilter() {
            this.$emit("show-add-custom-filter");
        }
    }
}
</script>
