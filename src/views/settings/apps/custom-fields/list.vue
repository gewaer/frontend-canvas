<template>
    <settings-template>
        <div class="row custom-fields-settings">
            <div class="col">
                <h5>
                    Custom Fields
                    <router-link :to="{ name: 'settingsAppsCustomFieldsForm' }" class="btn btn-primary">Create</router-link>
                </h5>
                <div class="card card-borderless">
                    <ul class="nav nav-tabs nav-tabs-simple" role="tablist" data-init-reponsive-tabs="dropdownfx">
                        <li class="nav-item">
                            <a
                                class="active"
                                href="#"
                            >
                                Category 1
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="category1" class="tab-pane active">
                            <div class="row">
                                <div class="col-12">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-condensed">
                                            <thead>
                                                <tr>
                                                    <th style="width:45%">Field name</th>
                                                    <th style="width:20%">Type</th>
                                                    <th style="width:20%">Field API</th>
                                                    <th style="width:15%">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="v-align-middle semi-bold">Title</td>
                                                    <td class="v-align-middle semi-bold">Text</td>
                                                    <td class="v-align-middle semi-bold">title</td>
                                                    <td class="v-align-middle semi-bold">
                                                        <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                        <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"/></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
