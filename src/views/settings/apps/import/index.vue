<template>
    <settings-template>
        <div class="row import-section">
            <div class="col">
                <h5>
                    Import
                </h5>
                <form-wizard class="wizard-component import-wizard" shape="tab" color="var(--base-color)">
                    <span slot="title"></span>
                    <tab-content title="Upload" icon="fa fa-file-upload">
                        <vue-dropzone ref="importUpload" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
                    </tab-content>
                    <tab-content title="File Mapping" icon="fa fa-map-signs">
                        <div class="table-responsive">
                            <table class="table table-hover table-condensed" id="condensedTable">
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
                                        <!-- <td class="v-align-middle bold"><img :src="CDN_URL+'/assets/img/icons/checkmark-success-icon.png'" width="20px" alt="Checkmark Icon"></td> -->
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <!-- <td class="v-align-middle bold"><img :src="CDN_URL+'/assets/img/icons/checkmark-success-icon.png'" width="20px" alt="Checkmark Icon"></td> -->
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <!-- <td class="v-align-middle bold"><img :src="CDN_URL+'/assets/img/icons/checkmark-success-icon.png'" width="20px" alt="Checkmark Icon"></td> -->
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <!-- <td class="v-align-middle bold"><img :src="CDN_URL+'/assets/img/icons/checkmark-success-icon.png'" width="20px" alt="Checkmark Icon"></td> -->
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <!-- <td class="v-align-middle bold"><img :src="CDN_URL+'/assets/img/icons/checkmark-success-icon.png'" width="20px" alt="Checkmark Icon"></td> -->
                                        <td class="v-align-middle">Sample Data 1</td>
                                    </tr>
                                    <tr>
                                        <td class="v-align-middle">Fyle value</td>
                                        <td class="v-align-middle">
                                            <div class="form-group m-b-0">
                                                <multiselect :options="['Map option 1', 'Map option 2', 'Map option 3', 'Map option 4']" />
                                            </div>
                                        </td>
                                        <!-- <td class="v-align-middle bold"><img :src="CDN_URL+'/assets/img/icons/checkmark-success-icon.png'" width="20px" alt="Checkmark Icon"></td> -->
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
                            <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle" @click.native="props.prevTab()">Previous</wizard-button>
                        </div>
                        <div class="wizard-footer-right">
                            <wizard-button
                                v-if="!props.isLastStep"
                                :style="props.fillButtonStyle"
                                class="wizard-footer-right"
                                @click.native="props.nextTab()">Next</wizard-button>
                            <wizard-button
                                v-else
                                :style="props.fillButtonStyle"
                                class="wizard-footer-right finish-button"
                                @click.native="$modal.hide('after-signup-wizard')">{{ props.isLastStep ? 'Done' : 'Next' }}</wizard-button>
                        </div>
                    </template>
                </form-wizard>
            </div>
        </div>
    </settings-template>
</template>

<script>
import vueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
    name: "List",
    components: {
        vueDropzone,
        SettingsTemplate: () => import("../tab-container")
    },
    data() {
        return {
            dropzoneOptions: {
                url: '#',
                // thumbnailWidth: 150,
                // maxFilesize: 0.5,
                // headers: { "My-Awesome-Header": "header value" }
            }
        };
    }
};
</script>

<style lang="scss">
.import-wizard {
    .wizard-header, .wizard-card-footer {
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
