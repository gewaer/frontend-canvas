<template>
    <div :id="uppyId">
        <div v-show="collection" class="dashboard-container"/>
        <div v-show="!collection" class="thumbnail-container">
            <button id="open-thumbnail-modal" type="button" class="btn btn-primary" >Select File{{ collection ? 's' : '' }}</button>
        </div>
    </div>
</template>

<script>
import uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";

export default {
    props: {
        collection: {
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
        }
    },

    data() {
        return {
            uppyInstance: null,
            uppyId: `uppy-${Math.random().toLocaleString(16)}`,
            dashboardInstanceId: `uppy-dashboard-input-${Math.random().toLocaleString(16)}`
        }
    },
    mounted() {
        const collectionType = this.collection ? "collection" : "thumbnail";
        const hasDescriptions = Object.keys(this.uppyConfig).some(item => item == "restrictions");
        const customRestrictions = hasDescriptions ? this.uppyConfig.restrictions : {};
        const restrictions = {
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            maxFileSize: null,
            allowedFileTypes: null,
            ...customRestrictions
        };

        const defaultUppyConfig = {
            autoProceed: false,
            debug: false,
            meta: {
                collection: collectionType
            },
            ...this.uppyConfig,
            restrictions
        };

        const uppyInstance = uppy({
            id: this.uppyId,
            ...defaultUppyConfig
        });
        if (this.collection) {
            const defaultDashboardConfig = {
                pretty: true,
                inline: true,
                maxHeight: 500,
                replaceTargetContent: true,
                ...this.dashboardConfig
            }
            uppyInstance.use(Dashboard, {
                id: this.dashboardInstanceId,
                target: ".dashboard-container",
                ...defaultDashboardConfig
            })
        } else {
            uppyInstance.use(Dashboard, {
                id: this.dashboardInstanceId,
                trigger: "#open-thumbnail-modal",
                closeAfterFinish: true,
                allowMultipleUploads: false,
                replaceTargetContent: false,
                ...this.dashboardConfig
            })

        }
        uppyInstance.use(XHRUpload, {
            ...this.xhrConfig
        })
        uppyInstance.on("upload-success", (file, response) => {
            this.$emit("uploaded", response.body, file);
            if (restrictions.maxNumberOfFiles == 1) {
                this.resetDashboard();
            }
        });
        uppyInstance.on("complete", result => {
            this.$emit("completeuploads", result);
            this.resetDashboard();
        })
        uppyInstance.run();
        this.uppyInstance = uppyInstance;
    },
    methods: {
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
