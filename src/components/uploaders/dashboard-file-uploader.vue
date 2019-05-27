<template>
    <div :id="uppyId" >
        <button
            :id="buttonInstanceId"
            :class="['uppy-container', dashboardInstanceId, {'btn btn-primary': modalButton}]"
            type="button"
            class=""
        >
            Select File{{ multipleFiles ? 's' : '' }}
        </button>
    </div>
</template>

<script>
import uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";
import GoogleDrive from "@uppy/google-drive";
import Url from "@uppy/url";
import uuidv4 from "uuid/v4";

export default {
    props: {
        modalButton: {
            type: Boolean,
            default: false
        },
        dashboardConfig: {
            type: Object,
            default() {
                return {}
            }
        },
        xhrConfig: {
            type: Object,
            required: true,
            default() {
                return {
                    headers: {},
                    formData: true,
                    fieldName: "file",
                    endpoint: ""
                }
            }
        },
        uppyConfig: {
            type: Object,
            default() {
                return {
                    restrictions: {}
                }
            }
        },
        urlPlugginConfig: {
            type: Object,
            default() {
                return {};
            }
        },
        googleDrivePluginConfig: {
            type: Object,
            default() {
                return {};
            }
        }
    },

    data() {
        return {
            uppyInstance: null,
            uppyId: `uppy-${uuidv4()}`,
            dashboardInstanceId: `uppy-dashboard-${uuidv4()}`,
            buttonInstanceId: `uppy-dashboard-button-${uuidv4()}`,
            multipleFiles: false
        }
    },
    mounted() {
        const hasDescriptions = Object.keys(this.uppyConfig).some(item => item == "restrictions");
        const customRestrictions = hasDescriptions ? this.uppyConfig.restrictions : {};
        const restrictions = {
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            maxFileSize: null,
            allowedFileTypes: null,
            ...customRestrictions
        };

        this.multipleFiles = restrictions.maxNumberOfFiles > 1;

        const defaultUppyConfig = {
            autoProceed: false,
            debug: false,
            meta: {
                atributes: JSON.stringify({ "key": "value" })
            },
            ...this.uppyConfig,
            restrictions
        };

        const uppyInstance = uppy({
            id: this.uppyId,
            ...defaultUppyConfig
        });

        if (this.modalButton) {
            uppyInstance.use(Dashboard, {
                // showProgressDetails:true,
                ...this.dashboardConfig,
                id: this.dashboardInstanceId,
                trigger: `#${this.buttonInstanceId}`
            });
        } else {
            uppyInstance.use(Dashboard, {
                inline: true,
                replaceTargetContent: true,
                // showProgressDetails:true,
                ...this.dashboardConfig,
                id: this.dashboardInstanceId,
                target: `.${this.dashboardInstanceId}`
            });
        }

        if (Object.keys(this.urlPlugginConfig).some(item => item == "companionUrl")) {
            uppyInstance.use(Url, {
                target: Dashboard,
                ...this.urlPlugginConfig
            });
        }

        if (Object.keys(this.googleDrivePluginConfig).some(item => item == "companionUrl")) {
            uppyInstance.use(GoogleDrive, {
                target: Dashboard,
                ...this.googleDrivePluginConfig
            });
        }

        uppyInstance.use(XHRUpload, {
            ...this.xhrConfig
        });

        uppyInstance.on("upload-success", (file, response) => {
            this.$emit("uploaded", response.body, file);
            if (restrictions.maxNumberOfFiles == 1) {
                this.resetDashboard();
            }
        });

        uppyInstance.on("upload-error", (file, error, response) => {
            this.$emit("uploaderror", file, error, response);
        });

        uppyInstance.on("complete", result => {
            this.$emit("completeuploads", result);
            this.resetDashboard();
        });

        this.uppyInstance = uppyInstance;
    },
    methods:{
        resetDashboard() {
            this.uppyInstance.reset();
            const dashboard = this.uppyInstance.getPlugin(this.dashboardInstanceId);
            if (dashboard.isModalOpen()) {
                dashboard.closeModal();
            }
        }
    }
}
</script>
