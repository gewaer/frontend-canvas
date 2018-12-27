<template>
    <settings-template>
        <div class="row email-templates-section">
            <div class="col">
                <h5>
                    Email Templates
                    <router-link :to="{ name: 'settingsAppsEmailTemplatesForm' }" class="btn btn-primary">Create</router-link>
                </h5>
                <div class="table-responsive">
                    <table class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th style="width:50%">Template name</th>
                                <th style="width:10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                                <td class="v-align-middle semi-bold">
                                    <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                    <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </settings-template>
</template>

<script>
export default {
    name: "List",
    components: {
        SettingsTemplate: () => import("../tab-container")
    }
}
</script>
