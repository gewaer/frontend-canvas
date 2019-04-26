<template>
    <div class="cover-upload">
        <img id="logo" :src="temporalCover ? temporalCover : file" class="img-fluid">
        <input type="file" accept="image/png, image/jpeg" @change="setCoverImage">
    </div>
</template>

<script>
export default {
    name: "BookCover",
    props: {
        file: {
            type: String,
            default: "https://www.hibooks.com/img/cover-placeholder.jpg"
        }
    },
    data() {
        return {
            temporalCover: null
        };
    },
    methods: {
        setCoverImage(event) {
            const file = event.target.files[0];
            this.temporalCover = URL.createObjectURL(file);
            this.$emit("set-cover-image", file);
        }
    }
}
</script>
