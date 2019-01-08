<template>
    <label :class="classes">
        <slot>
            <i class="fa fa-cloud-upload"/>
        </slot>
        <input
            id="logo"
            :accept="accept"
            type="file"
            class="input-file"
            name="logo"
            @change="handleFileChange">
        {{ title }}
    </label>
</template>

<script>
export default {
    name: "FileSelect",
    props: {
        value: {
            type: File,
            default: null
        },
        accept: {
            type: String,
            default: "image/*"
        },
        title: {
            type: String,
            default: "Upload Image"
        },
        classes: {
            type: String,
            default: "btn btn-primary"
        }
    },
    methods: {
        handleFileChange(e) {
            this.$emit("input", e.target.files[0])
        }
    }
}
</script>
