<template>
    <settings-template>
        <div class="row themes-section">
            <div class="col">
                <h5>
                    Themes
                </h5>
                <p>Coming Soon!</p>
            </div>
        </div>
    </settings-template>
</template>

<script>
export default {
    name: "List",
    components: {
        SettingsTemplate: () => import("./tab-container")
    }
};
</script>
