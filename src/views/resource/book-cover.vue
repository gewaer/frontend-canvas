<template>
    <div class="cover-upload">
        <img id="logo" :src="coverUrl" class="img-fluid">
        <input type="file" accept="image/png, image/jpeg" @change="setCoverImage">
    </div>
</template>

<script>
export default {
    name: "BookCover",
    props: {
        file: {
            type: File,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            coverUrl: "https://www.hibooks.com/img/cover-placeholder.jpg"
        };
    },
    watch: {
        file(newFile, oldFile) {
            console.log("newFile", newFile);
            console.log("oldFile", oldFile);
        }
    },
    methods: {
        setCoverImage(event) {
            const file = event.target.files[0];
            this.coverUrl = URL.createObjectURL(file);
            this.$emit("set-cover-image", file);
        }
    }
}
</script>
