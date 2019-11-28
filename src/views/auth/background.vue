<template>
    <div class="bg-pic">
        <img :src="backgroundSrc" alt="">
        <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
            <h2 class="semi-bold text-white">
                {{ title }}
            </h2>
            <p class="small">
                {{ text }}
            </p>
        </div>
    </div>
</template>

<script>
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
    }
}
</script>
