<template>
    <div :id="uppyId">
        <div class="uppyFileInput" />
    </div>
</template>

<script>
import uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import FileInput from "@uppy/file-input";
/**
     * Please visit the Uppy docs at https://uppy.io/docs/uppy/
     *
     * You can change the ccs of Uppy Input FIle with the following class
     * .uppy-FileInput-btn {}
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
            uppyId: `uppy-${Math.random().toLocaleString(16)}`,
            fileInputInstanceId: `uppy-file-input-${Math.random().toLocaleString(16)}`
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

        const defaultUppyConfig = {
            autoProceed: true,
            debug: false,
            ...this.uppyConfig,
            restrictions
        };

        const uppyInstance = uppy({
            id: this.uppyId,
            ...defaultUppyConfig
        });

        const defaultFileInputConfig = {
            pretty: true,
            inline: true,
            replaceTargetContent: false,
            locale: {},
            ...this.fileInputConfig
        }
        uppyInstance.use(FileInput, {
            id: this.fileInputInstanceId,
            target: `.uppyFileInput`,
            ...defaultFileInputConfig
        })

        uppyInstance.use(XHRUpload, {
            getResponseData: (responseText, {response}) => {
                this.$emit("uploaded", JSON.parse(responseText), JSON.parse(response));
                uppyInstance.reset();
            },
            ...this.xhrConfig
        })
        uppyInstance.on("upload-error", (file, error, response) => {
            this.$emit("error", error, file, response);
        });
        uppyInstance.run();
        this.uppyInstance = uppyInstance;
    }
}
</script>
