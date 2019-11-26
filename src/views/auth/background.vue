<template>
    <div :style="`background-image:url('${backgroundSrc}'); background-color: ${backgroundColor}`" class="bg-pic">
        <!-- <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
            <h2 class="semi-bold text-white">{{ title }}</h2>
            <p class="small">{{ text }}</p>
        </div> -->
    </div>
</template>

<script>
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
        backgroundColor() {
            const { h, s, l } = hexToHSL(this.$store.state.Application.settings.settings.base_color);
            return `hsla(${h},${s}%,${l}%,0.6)`;
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
