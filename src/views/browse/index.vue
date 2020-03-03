<template>
    <gw-browse
        ref="gwBrowse"
        :append-params="appendParams"
        :http-options="{ baseURL, headers: { Authorization: token }}"
        :pagination-data="paginationData"
        :query-params="queryParams"
        :resource="resource"
        pagination-path=""
        @load-error="loadError"
    />
</template>

<script>
const { GwBrowse } = require(`@/import.${process.env.VUE_APP_IMPORTS}`);
import { mapState } from "vuex";

export default {
    name: "Browse",
    components: {
        GwBrowse
    },
    data() {
        return {
            appendParams: {
                format: "true"
            },
            baseURL: process.env.VUE_APP_BASE_API_URL,
            queryParams: {
                sort: "sort",
                page: "page",
                perPage: "limit"
            },
            token: this.$store.state.User.token || Cookies.get("token")
        }
    },
    computed: {
        ...mapState({
            resources: state => state.Application.resources
        }),
        resource() {
            return this.resources.find(resource => resource.slug == this.$route.params.resource);
        }
    },
    methods: {
        loadError(error) {
            this.$notify({
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
        },
        paginationData(data) {
            const paginationData = {
                total: parseInt(data.total_rows),
                per_page: parseInt(data.limit),
                current_page: parseInt(data.page),
                last_page: parseInt(data.total_pages)
            }

            const nextParams = this.$refs.gwBrowse.getAllQueryParams();
            nextParams.page = nextParams.page == paginationData.last_page ? null : nextParams.page + 1;
            const prevParams = this.$refs.gwBrowse.getAllQueryParams();
            prevParams.page = prevParams.page == 1 ? null : prevParams.page - 1;

            const nextQuery = Object.keys(nextParams).map(key => `${key}=${nextParams[key]}`);
            const prevQuery = Object.keys(prevParams).map(key => `${key}=${prevParams[key]}`);

            paginationData.next_page_url = nextParams.page === null ? null : `${this.baseURL}?${nextQuery.join("&")}&format=true`;
            paginationData.prev_page_url = prevParams.page === null ? null : `${this.baseURL}?${prevQuery.join("&")}&format=true`;
            paginationData.from = (paginationData.current_page - 1) * paginationData.per_page + 1;
            paginationData.to = paginationData.from + paginationData.per_page - 1;

            return paginationData;
        }
    }
}
</script>
