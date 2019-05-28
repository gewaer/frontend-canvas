<template>
    <div class="bg-pic">
        <img
            :src="imgSrc"
            :data-src="imgSrc"
            :data-src-retina="imgSrc"
            class="lazy"
        >
        <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
            <h2 class="semi-bold text-white">{{ title }}</h2>
            <p class="small">{{ text }}</p>
        </div>
    </div>
</template>

<script>
import { isURL } from "@/utils/helpers";

export default {
    name: "BackGround",
    props:{
        imgSrc: {
            type: String,
            default:"https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg",
            validator: isURL
        },
        title: {
            type: String,
            default:"Some title."
        },
        text: {
            type: String,
            default:"Some text."
        }
    }
}
</script>
