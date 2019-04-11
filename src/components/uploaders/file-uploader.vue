<template>
    <div :id="uppyId">
        <div class="uppyFileInput" />
    </div>
</template>

<script>
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import FileInput from "@uppy/file-input";
import store from "@/store";
/**
 * Please visit the Uppy docs at https://uppy.io/docs/uppy/
 */
export default {
    props: {
        modelClass: {
            type: String,
            required: false,
            default() {
                return `uppy-${Math.random().toLocaleString(16)}`;
            }
        },
        endpoint: {
            type: String,
            required: false,
            default() {
                return "/filesystem"
            }
        },
        buttonTitle: {
            type: String,
            required: false,
            default() {
                return "Select File"
            }
        },
        restrictions:{
            type: Object,
            required: false,
            default() {
                return  {
                    maxNumberOfFiles: 1,
                    minNumberOfFiles: 1,
                    maxFileSize: null,
                    allowedFileTypes : null
                }
            }
        }
    },

    data() {
        return {}
    },

    computed: {
        uppyId() {
            return this.modelClass;
        }
    },

    mounted() {
        const uppy = Uppy({
            id: this.uppyId,
            autoProceed: true,
            debug: true,
            restrictions: this.restrictions
        });

        uppy.use(FileInput, {
            inline: true,
            target: ".uppyFileInput",
            replaceTargetContent: false,
            pretty: true,
            locale: {
                strings: {
                    chooseFiles: this.buttonTitle
                }
            }
        })
        uppy.use(XHRUpload, {
            endpoint: `${axios.defaults.baseURL}${this.endpoint}`,
            headers: {  Authorization: store.state.User.token },
            formData: true,
            fieldName: "file",
            getResponseData: (responseText) => {
                this.$emit("uploadedfile", JSON.parse(responseText))
            }
        })
        uppy.on("upload-error", (file, error, response) => {
            console.error(response);
            this.$emit("error", error);
        });
        uppy.run();
    },

    methods: {}
}
</script>

