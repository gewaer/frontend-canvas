<template>
    <div class="apps-settings">
        <h4 class="section-title p-l-10">Settings</h4>
        <div class="card card-transparent">
            <div class="card-body no-padding">
                <div class="row">
                    <div class="col">
                        <div class="card flex-md-row">
                            <ul id="tab-3" class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'settingsAppsCustomFieldsList' }" :class="{active: $route.name == 'settingsAppsCustomFieldsList'}">Custom Fields</router-link>
                                </li>
                                <li class="nav-item">
                                    <!-- <router-link :to="{ name: 'settingsAppsWebhooks' }" :class="{active: $route.name == 'settingsAppsWebhooks'}">Webhooks</router-link> -->
                                </li>
                                <li class="nav-item">
                                    <!-- <router-link :to="{ name: 'settingsAppsEmailTemplates' }" :class="{active: $route.name == 'settingsAppsEmailTemplates'}">Email Templates</router-link> -->
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div class="tab-pane active">
                                    <slot/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsAppsContainer"
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
