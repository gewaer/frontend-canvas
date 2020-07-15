<template>
    <div class="community-card">
        <div class="card">
            <div class="row">
                <div class="col">
                    <h1>Find the community on the web</h1>
                    <p>Discuss with the team members, contributors and developers on different channels</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-5 col-xl">
                    <div class="networks-links">
                        <div class="row">
                            <div v-for="(network, index) in networks" :key="index" class="col-6 col-md-3 col-lg-6">
                                <social-network :network="network" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-7 col-xl">
                    <subscribe-box />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommunityCard",
    components: {
        SocialNetwork: () => import(/* webpackChunkName: "social-network" */ "@c/social-network"),
        SubscribeBox: () => import(/* webpackChunkName: "subscribe-box" */ "@c/subscribe-box")
    },
    data() {
        return {
            networks: [
                {
                    name: "Github",
                    icon: "fab fa-github",
                    link: "#"
                },
                {
                    name: "Slack",
                    icon: "fab fa-slack",
                    link: "#"
                },
                {
                    name: "Medium",
                    icon: "fab fa-medium",
                    link: "#"
                },
                {
                    name: "Twitter",
                    icon: "fab fa-twitter",
                    link: "#"
                }
            ]
        };
    }
}
</script>

<style lang="scss" scoped>
.community-card {
    .networks-links, .row {
        height: 100%;
    }
}
</style>
