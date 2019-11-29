<template>
    <div :style="`background-image:url('${backgroundSrc}'); background-color: ${backgroundColor}`" class="bg-pic" />
</template>

<script>
import { mapState } from "vuex";
import { hexToHSL } from "@/utils/helpers";

export default {
    name: "AuthBackground",
    props: {
        backgroundSrc: {
            type: String,
            default: "https://mc-canvas.s3.amazonaws.com/default-background-auth.jpg"
        },
        title: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        }
    },
    computed: {
        ...mapState({
            appBaseColor: state => state.Application.settings.settings.base_color
        }),
        backgroundColor() {
            const { h, s, l } = hexToHSL(this.appBaseColor);
            return `hsla(${h},${s}%,${l}%,0.5)`;
        }
    }
}
</script>

<style lang="scss">
.bg-pic {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 3;
        background-color: inherit;
    }
}
</style>
