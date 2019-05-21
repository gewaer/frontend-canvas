<template>
    <gw-browse
        :bulk-actions="bulkActions"
        :bulk-actions-methods="bulkActionsMethods"
        :http-options="{ baseURL, headers: { Authorization: token }}"
        :resources="resources"
    />
</template>

<script>
import { mapState } from "vuex";
import GwBrowse from "@/npm-components/gw-browse/src/browse"

export default {
    name: "Browse",
    components: {
        GwBrowse
    },
    data() {
        return {
            baseURL: process.env.VUE_APP_BASE_API_URL,
            bulkActions: [
                {
                    name: "Export",
                    action: "exportRows"
                },
                {
                    name: "Delete",
                    action: "deleteRows"
                }
            ],
            bulkActionsMethods: {
                deleteRows: this.deleteRows,
                exportRows: this.exportRows
            },
            token: this.$store.state.User.token || Cookies.get("token")
        }
    },
    computed: {
        ...mapState({
            resources: state => state.Company.data.resources
        })
    },
    methods: {
        deleteRows() {
            console.log("rows deleted")
        },
        exportRows() {
            console.log("rows exported")
        }
    }
}
</script>
