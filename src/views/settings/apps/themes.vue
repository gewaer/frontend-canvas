<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="row themes-section">
            <div class="col">
                <h5>
                    Themes
                </h5>
                <p>Coming Soon!</p>
            </div>
        </div>
    </container-template>
</template>

<script>
export default {
    name: "List",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/apps/tabs")
    }
};
</script>
