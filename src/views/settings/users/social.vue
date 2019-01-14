<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="socials-connect">
            <div class="social-connect google">
                <img src="/img/google-g.png" alt="">
                <span>connect with <strong>Google</strong></span>
            </div>
        </div>
    </container-template>
</template>

<script>
export default {
    name: "Social",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-users-tabs" */ "@v/settings/users/tabs")
    }
};
</script>

<style lang="scss" scoped>
.socials-connect {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;

    .social-connect {
        width: 320px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        position: relative;
        cursor: pointer;

        &.google {
            background-color: #dc4e41;

            img {
                width: 24px;
                position: absolute;
                left: 10px;
            }
        }
    }
}
</style>
