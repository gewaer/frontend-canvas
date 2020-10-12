<template>
    <a :href="network.link" class="network">
        <div class="row no-gutters align-items-center">
            <div class="col-auto">
                <div class="network-icon">
                    <i :class="network.icon" />
                </div>
            </div>
            <div class="col">
                <span>{{ network.name }}</span>
            </div>
        </div>
    </a>
</template>

<script>
export default {
    name: "Network",
    props: {
        network: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.network {
    text-decoration: none;
    display: block;
    color: black;

    @media (max-width: $lg) {
        margin-bottom: 30px;
    }

    .network-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        margin-right: 20px;

        @media (max-width: $sm) {
            margin-right: 5px;
        }

        i {
            font-size: 50px;
            color: #828282;
        }
    }

    span {
        opacity: .7;
        font-weight: 600;
    }
}
</style>
