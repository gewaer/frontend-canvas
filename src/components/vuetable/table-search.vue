<template>
    <div class="card">
        <div class="card-block">
            <div class="browse-list-row">
                <dropdown class="bulk-actions">
                    <button
                        id="bulk-actions"
                        slot="btn"
                        class="btn btn-info dropdown-toggle"
                        type="button"
                    >
                        Bulk actions
                    </button>
                    <div slot="body">
                        <a
                            v-for="action in bulkActions"
                            :key="action.name"
                            class="dropdown-item"
                            href="#"
                            @click.prevent="action.action"
                        >
                            {{ action.name }}
                        </a>
                    </div>
                </dropdown>
                <router-link
                    :to="{ name: 'create-resource', params: { resource: currentResource.name }}"
                    class="add-record-btn btn btn-primary"
                >
                    <i class="fa fa-plus-circle"/>
                    Add {{ currentResource.title }}
                </router-link>
                <div class="input-group search-bar">
                    <input
                        v-model="search.text"
                        type="text"
                        class="form-control"
                        @keydown.enter="$emit('getData', search)"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-primary" @click="$emit('getData', search)">
                            <i class="fa fa-search"/>
                            Search
                        </button>
                    </div>
                </div>
                <div class="browse-list-filters d-flex align-items-center">
                    <span class="mr-3">Filters</span>
                    <multiselect
                        v-model="search.filters"
                        :multiple="true"
                        :show-labels="false"
                        :options="filterableFields"
                        @input="$emit('getData', search)"
                    >
                        <template slot="afterList">
                            <div class="add-custom-filter-btn option__desc">
                                <a class="option__title" @click="$emit('show-add-custom-filter')">
                                    <i class="fa fa-plus"/>
                                    Add custom Filter
                                </a>
                            </div>
                        </template>
                    </multiselect>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _clone from "lodash/clone";

export default {
    props: {
        searchOptions: {
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
                return [];
            }
        },
        currentResource: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            search: _clone(this.searchOptions)
        }
    }
}
</script>
