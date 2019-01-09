<template>
    <settings-template>
        <div class="row custom-fields-settings">
            <div class="col">
                <h5>
                    Custom Fields
                    <router-link :to="{ name: 'settingsAppsCustomFieldsForm', params: { module: tab } }" class="btn btn-primary">Create</router-link>
                </h5>
                <div class="card card-borderless">
                    <ul class="nav nav-tabs nav-tabs-simple" role="tablist" data-init-reponsive-tabs="dropdownfx">
                        <li v-for="module in modules" :key="'modules-' + module.id" class="nav-item">
                            <a
                                :class="{ active: tab == module.name }"
                                href="#"
                                @click.prevent="changeModule(module)"
                            >
                                {{ module.name.replace("_", " ") }}
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active">
                            <div class="row">
                                <div class="col-12">
                                    <div class="table-responsive">
                                        <!-- <vuetable
                                            :append-params="appendParams"
                                            :fields="companiesFields"
                                            :http-fetch="getTableData"
                                            api-url="/companies"
                                            class="table table-hover table-condensed"
                                            pagination-path=""
                                        >
                                            <template slot="actions" slot-scope="props">
                                                <button class="btn btn-primary m-l-5" @click="editCompany(props.rowData.id, false)"><i class="fa fa-eye" aria-hidden="true"/></button>
                                                <button class="btn btn-complete m-l-5" @click="editCompany(props.rowData.id)"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button
                                                    :disabled="isCurrentCompany(props.rowData.id)"
                                                    class="btn btn-danger m-l-5"
                                                    @click="deleteCompany(props.rowData)">
                                                    <i class="fa fa-trash" aria-hidden="true" />
                                                </button>
                                            </template>
                                        </vuetable> -->

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
    },
    data() {
        return {
            fields: [],
            modules: [],
            tab: ""
        }
    },
    created() {
        this.getModules();
    },
    methods: {
        changeModule(module) {
            this.tab = module.name;
            this.getFields(module.id);
        },
        getFields(moduleId) {
            axios({
                url: `/custom-fields-modules/${moduleId}/fields`
            }).then(({ data }) => {
                this.fields = data;
            });
        },
        getModules() {
            axios({
                url: "/custom-fields-modules"
            }).then(({ data }) => {
                this.modules = data;
                this.changeModule(data[0]);
            });
        }
    }
}
</script>
