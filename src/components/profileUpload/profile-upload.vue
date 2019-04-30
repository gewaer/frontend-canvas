<template>
    <div class="profile-upload">
        <div class="profile-image">
            <img id="logo" :src="avatarUrl" class="img-fluid">
        </div>
        <div class="upload-profile-image">
            <file-select
                id="dropzone"
                ref="importUpload"
                :options="dropzoneOptions"
                :include-styling="false"
                @vdropzone-error="onError"
                @vdropzone-success="uploaded"/>
        </div>
    </div>
</template>

<script>
import FileSelect from "./file-select";
import vueDropzone from "vue2-dropzone";
import store from "@/store";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
    components: {
        FileSelect,
        vueDropzone
    },
    props: {
        avatarUrl: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            file: null,
            dropzoneOptions: {
                url: this.endpoint,
                // withCredentials: true,
                acceptedFiles: "image/png, image/jpeg",
                // thumbnailWidth: 150,
                maxFilesize: 5,
                headers: { Authorization: store.state.User.token }
            }
        }
    },
    created() {
        this.dropzoneOptions.url = axios.defaults.baseURL + this.endpoint;
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
            this.$emit("uploaded", data);
        }
    }
}
</script>
