<template>
    <div class="home">
        <!-- <h4 class="section-title p-l-10">
            Dashboard
        </h4>
        <h1 class="title">
            Overview
        </h1> -->
        <div class="row section">
            <div class="col-12 col-xl">
                <welcome-card />
                <community-card />
            </div>
            <div class="col-12 col-xl-4">
                <support-card />
            </div>
        </div>
        <welcome-section />
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {
        WelcomeCard: () => import(/* webpackChunkName: "welcome-section" */ "./welcome-card"),
        CommunityCard: () => import(/* webpackChunkName: "community-scard" */ "./community-card"),
        SupportCard: () => import(/* webpackChunkName: "support-card" */ "./support-card")
    }
};
</script>

<style lang="scss" scoped>
.home {
    /deep/ .card {
        padding: 40px;

        @media (max-width: $sm) {
            padding: 30px 20px;
        }
    }

    /deep/ p {
        opacity: .7;
        margin-bottom: 35px;
    }

    /deep/ h1 {
        font-size: 28px;
        opacity: .8;
        font-weight: 600;
        margin-bottom: 0;
    }

    /deep/ h2 {
        font-size: 25px;
        margin-bottom: 25px;
        opacity: .8;
    }
}
</style>
