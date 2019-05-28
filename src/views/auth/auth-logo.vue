<template>
    <div >
        <router-link :to="{ name: 'login' }">
            <img
                :src="imgSrc"
                :data-src="imgSrc"
                alt="logo"
                style="max-height:30px;"
        ></router-link>
    <p class="p-t-10">{{ text }}</p>    </div>
</template>

<script>
export default {
    name: "Logo",
    props:{
        imgSrc: {
            type: String,
            default:"/img/primary-logo.png"
        },
        text: {
            type: String,
            default:"Sign into your Gewaer account."
        }
    }
}
</script>
