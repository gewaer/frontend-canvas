<template>
    <gw-browse
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
            token: this.$store.state.User.token || Cookies.get("token")
        }
    },
    computed: {
        ...mapState({
            resources: state => state.Company.data.resources
        })
    }
}
</script>
