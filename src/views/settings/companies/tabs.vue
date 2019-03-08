<template>
    <ul class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesProfile' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesProfile' }"
            >
                Profile
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesBranchesList' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesBranches' }"
            >
                Branches
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesUsersList' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesUsers' }"
            >
                Users
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesRoles' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesRoles' }"
            >
                Roles
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsCompaniesSubscriptions' }"
                :class="{ active: $route.meta.group == 'settingsCompaniesSubscriptions' }"
            >
                Subscriptions
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "TabsMenu"
};
</script>

<style lang="scss" scoped>
.apps-settings {
    .card.flex-md-row {
        min-height: 400px;
    }
}
</style>
