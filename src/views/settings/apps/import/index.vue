<template>
    <settings-template>
        <div class="row import-section">
            <div class="col">
                <h5>Import</h5>
                <form-wizard class="wizard-component import-wizard" shape="tab" color="var(--base-color)">
                    <span slot="title"/>
                    <tab-content title="Upload" icon="fa fa-file-upload">
                        <vue-dropzone id="fileUpload" :options="dropzoneOptions"/>
                    </tab-content>
                    <tab-content title="Field Mapping" icon="fa fa-map-signs">
                        <div class="table-responsive">
                            <table class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th style="width:20%">Imported File</th>
                                        <th style="width:30%">CRM</th>
                                        <th style="width:20%">Sample Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </tab-content>
                    <tab-content title="Finish" icon="fa fa-check">
                        <h1>Finish</h1>
                    </tab-content>
                    <template slot="footer" slot-scope="props">
                        <div class="wizard-footer-left">
                            <wizard-button
                                v-if="props.activeTabIndex"
                                :style="props.fillButtonStyle"
                                @click.native="props.prevTab()"
                            >
                                Previous
                            </wizard-button>
                        </div>
                        <div class="wizard-footer-right">
                            <wizard-button
                                v-if="!props.isLastStep"
                                :style="props.fillButtonStyle"
                                class="wizard-footer-right"
                                @click.native="props.nextTab()"
                            >
                                Next
                            </wizard-button>
                            <wizard-button
                                v-else
                                :style="props.fillButtonStyle"
                                class="wizard-footer-right finish-button"
                                @click.native="$modal.hide('after-signup-wizard')"
                            >
                                {{ props.isLastStep ? 'Done' : 'Next' }}
                            </wizard-button>
                        </div>
                    </template>
                </form-wizard>
            </div>
        </div>
    </settings-template>
</template>

<script>
export default {
    name: "List",
    components: {
        SettingsTemplate: () => import("../tab-container"),
        VueDropzone: () => import(/* webpackChunkName: "vue-dropzone" */ "vue2-dropzone"),
        FormWizard: () => import(/* webpackChunkName: "form-wizard-form" */ "vue-form-wizard").then(({ FormWizard }) => FormWizard),
        TabContent: () => import(/* webpackChunkName: "form-wizard-tab-content" */ "vue-form-wizard").then(({ TabContent }) => TabContent),
        WizardButton: () => import(/* webpackChunkName: "form-wizard-wizard-button" */ "vue-form-wizard").then(({ WizardButton }) => WizardButton)
    },
    data() {
        return {
            dropzoneOptions: {
                url: "#"
            }
        };
    }
};
</script>

<style lang="scss">
.import-wizard {
    .wizard-header,
    .wizard-card-footer {
        padding: 0;
    }

    .wizard-tab-content {
        padding: 30px 0 10px;
        min-height: 400px;

        .dropzone {
            min-height: 400px;
        }

        .table.table-condensed {
            tbody {
                 tr {
                    td {
                        overflow: visible;
                    }
                 }
            }
        }
    }
}
</style>
