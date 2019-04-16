<template>
    <div class="profile-upload">
        <div class="profile-image">
            <img id="logo" :src="imgUrl" class="img-fluid">
        </div>
        <div class="upload-profile-image">
            <dashboard-uploader
                ref="fileUploader"
                :xhr-config="uppyXhrConfig"
                :uppy-config="uppyConfig"
                @uploaded="uploaded"
                @error="onError" />
        </div>
    </div>
</template>

<script>
import store from "@/store";
import { isURL } from "@/utils/helpers";

export default {
    name: "ProfileUploader",
    components: {
        DashboardUploader: () => import(/* webpackChunkName: "dashboard-uploader" */ "@c/uploaders/dashboard-file-uploader")
    },
    props: {
        defaultAvatar: {
            type: String,
            default: "http://img2.thejournal.ie/inline/2470754/original?width=428&version=2470754"
        },
        avatarUrl: {
            type: String,
            default: ""
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
                debug: process.env.NODE_ENV !== "production",
                restrictions: {
                    maxNumberOfFiles: 1,
                    allowedFileTypes: ["image/*"]
                }
            }
        }
    },
    computed: {
        imgUrl() {
            return this.avatarUrl.length && isURL(this.avatarUrl) ? this.avatarUrl : this.defaultAvatar;
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
