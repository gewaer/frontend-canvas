<script>
import TabContainer from "@/views/layout/tab-container";

export default {
    extends: TabContainer,
    data() {
        return {
            tab: "info",
            tabs: [
                {
                    name: "settingsCompanies",
                    title: "Company Info"
                },
                {
                    name: "settingsCompaniesList",
                    title: "Companies"
                },
                {
                    name: "settingsCompaniesBranches",
                    title: "Branches"
                },
                {
                    name: "settingsCompaniesUsers",
                    title: "Users"
                },
                {
                    name: "settingsCompaniesRoles",
                    title: "Roles"
                },
                {
                    name: "settingsCompaniesSubscriptions",
                    title: "Subscriptions"
                }
            ]
        }
    }
};
</script>
