<template>
    <div :id="uppyId">
        <div v-show="collection" class="DashboardContainer"/>
        <div v-show="!collection" class="ThumbnailContainer">
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
            required: false,
            default() {
                return false;
            }
        },
        dashboardConfig: {
            type: Object,
            required: false,
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
            required: false,
            default() {
                return {
                    restrictions: {}
                }
            }
        }
    },

    data() {
        return {
            uppyInstace: null,
            uppyId: `uppy-${Math.random().toLocaleString(16)}`,
            dashboardInstanceId: `uppy-file-input-${Math.random().toLocaleString(16)}`
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
            // configure FileInput
            const defaultDashboardConfig = {
                pretty: true,
                inline: true,
                // note: "Images and PDF only.",
                maxHeight: 500,
                ...this.dashboardConfig,
                replaceTargetContent: true
            }
            uppyInstance.use(Dashboard, {
                id: this.dashboardInstanceId,
                target: ".DashboardContainer",
                ...defaultDashboardConfig
            })
        } else {
            uppyInstance.use(Dashboard, {
                id: this.dashboardInstanceId,
                trigger: "#open-thumbnail-modal",
                replaceTargetContent: false
            })

        }
        uppyInstance.use(XHRUpload, {
            getResponseData: (responseText, {response}) => {
                this.$emit("uploadedfile", JSON.parse(responseText), JSON.parse(response))
            },
            ...this.xhrConfig
        })
        uppyInstance.on("complete", result => {
            this.$emit("completeuploads", result)
        })
        uppyInstance.run();
        this.uppyInstace = uppyInstance;
    }
}
</script>
