<template>
    <div class="profile-upload">
        <div class="profile-image">
            <img id="logo" :src="imgUrl" class="img-fluid">
        </div>
        <div class="upload-profile-image">
            <file-uploader
                ref="importUpload"
                :endpoint="endpoint"
                @uploadedfile="uploaded"
                @error="onError"/>
        </div>
    </div>
</template>

<script>
import FileUploader from "./file-uploader.vue";
export default {
    name:"ProfileUploader",
    components: {
        FileUploader
    },
    props: {
        avatarUrl: {
            type: String,
            required: false,

            default(){
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
            file: null
        }
    },
    computed:{
        imgUrl(){
            const url = "http://img2.thejournal.ie/inline/2470754/original?width=428&version=2470754";
            return this.avatarUrl.length ? this.avatarUrl:url ;
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
            this.$emit("uploaded", data);
        }
    }
}
</script>
