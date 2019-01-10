<template>
    <ul class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsAppsCustomFieldsList' }"
                :class="{ active: $route.meta.group == 'settingsAppsCustomFields' }"
            >
                Custom Fields
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsAppsImportList' }"
                :class="{ active: $route.meta.group == 'settingsAppsImport' }"
            >
                Import
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsAppsWebhooksList' }"
                :class="{ active: $route.meta.group == 'settingsAppsWebhooks' }"
            >
                Webhooks
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsAppsEmailTemplatesList' }"
                :class="{ active: $route.meta.group == 'settingsAppsEmailTemplates' }"
            >
                Email Templates
            </router-link>
        </li>
        <li class="nav-item">
            <router-link
                :to="{ name: 'settingsAppsThemesList' }"
                :class="{ active: $route.meta.group == 'settingsAppsThemes' }"
            >
                Themes
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

<style lang="scss" src="@/assets/scss/settings.scss"/>
