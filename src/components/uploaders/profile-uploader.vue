<template>
    <div class="profile-upload">
        <div class="profile-image">
            <img id="logo" :src="imgUrl" class="img-fluid">
        </div>
        <div class="upload-profile-image">
            <file-uploader
                ref="fileUploader"
                :xhr-config="uppyXhrConfig"
                :uppy-config="uppyConfig"
                :file-input-config="fileInputConfig"
                @uploadedfile="uploaded"
                @error="onError" />
        </div>
    </div>
</template>

<script>
import store from "@/store";
import FileUploader from "./input-file-uploader.vue";
export default {
    name: "ProfileUploader",
    components: {
        FileUploader
    },
    props: {
        avatarUrl: {
            type: String,
            required: false,
            default() {
                return ""
            }
        },
        endpoint: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            file: null,
            uppyConfig: {
                debug: process.env.NODE_ENV !== "production"
            }
        }
    },
    computed: {
        imgUrl() {
            const url = "http://img2.thejournal.ie/inline/2470754/original?width=428&version=2470754";
            return this.avatarUrl.length ? this.avatarUrl : url;
        },
        uppyXhrConfig() {
            return {
                formData: true,
                fieldName: "file",
                endpoint: `${axios.defaults.baseURL}${this.endpoint}`,
                headers: {
                    Authorization: store.state.User.token
                }
            };
        },
        fileInputConfig() {
            return {
                locale: {
                    strings: {
                        chooseFiles: "Select Files"
                    }
                }
            };
        }
    },
    methods: {
        onError(file, error) {
            this.$notify({
                title: "Error:",
                text: error,
                type: "error"
            });
        },
        uploaded(file, data) {
            this.$emit("uploaded", file, data);
        }
    }
}
</script>
