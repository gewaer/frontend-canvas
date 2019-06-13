<template>
    <img :style="{width: size + 'px'}" src="/img/progress-circle.svg" alt="Loader">
</template>

<script>
export default {
    name: "Loader",
    props: {
        size: {
            type: Number,
            default: 20
        }
    }
}
</script>
