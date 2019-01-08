<template>
    <div class="apps-settings">
        <h4 class="section-title p-l-10">Settings</h4>
        <div class="card card-transparent">
            <div class="card-body no-padding">
                <div class="row">
                    <div class="col">
                        <div class="card flex-md-row">
                            <ul id="tab-3" class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
                                <li v-for="tab in tabs" :key="tab.name" class="nav-item">
                                    <router-link
                                        :to="{ name: tab.name }"
                                        :class="{ active: $route.name == tab.name }"
                                    >
                                        {{ tab.title }}
                                    </router-link>
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
