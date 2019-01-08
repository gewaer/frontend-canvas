<template>
    <div class="profile-upload">
        <div class="profile-image">
            <img id="logo" :src="avatarUrl" class="img-fluid">
        </div>

        <file-select
            ref="FileSelect"
            :accept="accept"
            v-model="file"
            @input="updateAvatar()">
            <i class="ion-image"/>
        </file-select>
    </div>
</template>

<script>
import FileSelect from "./file-select";
export default {
    components: {
        FileSelect
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
            localAvatarUrl: "",
            isUploaded: false,
            error: "",
            accept: "image/png, image/jpeg",
            file: null
        }
    },
    methods: {
        updateAvatar() {
            let fileData = new FormData();
            fileData.append("logo", this.file);
            axios({
                url: this.endpoint,
                method: "POST",
                data: fileData
            }).then(response => {
                if (response.data) {
                    this.$emit("uploaded", response.data);
                }
            }).catch(response => {
                toastr.error(response.body.status.message, "Error");
            });

        }
    }
}
</script>
