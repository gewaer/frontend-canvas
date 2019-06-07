<template>
    <div class="bg-pic">
        <img
            :src="backgroundSrc"
            alt=""
        >
        <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
            <h2 class="semi-bold text-white">{{ title }}</h2>
            <p class="small">{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "AuthBackground",
    props: {
        backgroundSrc: {
            type: String,
            default: "https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg"
        },
        title: {
            type: String,
            default: "Some title."
        },
        text: {
            type: String,
            default: "Some text."
        }
    }
}
</script>
