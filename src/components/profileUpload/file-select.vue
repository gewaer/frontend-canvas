<template>
    <div ref="dropzoneElement" :id="id" class="btn btn-primary custom-drop">
        <slot> Upload Image </slot>
    </div>
</template>

<script>
import VueDropzone from "vue2-dropzone";
export default {
    name: "FileSelect",
    extends: VueDropzone
}
</script>

<style lang="scss">
    .custom-drop {
        margin-top: 2px;
        width: 100%;
    }
    .dz-preview{
        display: none;
    }
</style>
