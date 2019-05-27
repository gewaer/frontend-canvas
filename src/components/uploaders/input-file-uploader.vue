<template>
    <div :id="uppyId" >
        <button
            :id="buttonInstanceId"
            :class="['uppy-container','btn btn-primary']"
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
import FileInput from "@uppy/file-input";
import uuidv4 from "uuid/v4";

/**
     * Please visit the Uppy docs at https://uppy.io/docs/uppy/
     *
     * You can change the ccs of Uppy Input FIle with the following class
     *
     */
export default {
    props: {
        fileInputConfig: {
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
            uppyId: `uppy-${uuidv4()}`,
            fileInputInstanceId: `uppy-dashboard-${uuidv4()}`,
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
            autoProceed: true,
            ...this.uppyConfig,
            restrictions
        };

        const uppyInstance = uppy({
            id: this.uppyId,
            ...defaultUppyConfig
        });

        const defaultFileInputConfig = {
            replaceTargetContent: false,
            locale: {},
            ...this.fileInputConfig
        }
        uppyInstance.use(FileInput, {
            id: this.fileInputInstanceId,
            target: `#${buttonInstanceId}`,
            ...defaultFileInputConfig
        })

        uppyInstance.use(XHRUpload, {
            getResponseData: (responseText, { response }) => {
                this.$emit("uploaded", JSON.parse(responseText), JSON.parse(response));
                uppyInstance.reset();
            },
            ...this.xhrConfig
        })
        uppyInstance.on("upload-error", (file, error, response) => {
            this.$emit("error", error, file, response);
        });
        this.uppyInstance = uppyInstance;
    }
}
</script>
