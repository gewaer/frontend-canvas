<template>
    <div class="user-settings">
        <h4 class="section-title p-l-10">Settings</h4>
        <div class="card card-transparent">
            <div class="card-body no-padding">
                <div class="row">
                    <div class="col">
                        <div class="card flex-md-row">
                            <ul id="tab-3" class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
                                <li class="nav-item">
                                    <a :class="{active: tab == 'profile'}" href="#" @click.prevent="changeTab('profile')">User Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a :class="{active: tab == 'notifications'}" href="#" @click.prevent="changeTab('notifications')">Notifications</a>
                                </li>
                                <li class="nav-item">
                                    <a :class="{active: tab == 'social'}" href="#" @click.prevent="changeTab('social')">Social</a>
                                </li>
                                <li class="nav-item">
                                    <a :class="{active: tab == 'security'}" href="#" @click.prevent="changeTab('security')">Security</a>
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div id="user-profile" class="tab-pane active">
                                    <component :is="tab"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserSettings",
    components: {
        notifications: () => import("./notifications"),
        profile: () => import("./profile"),
        security: () => import("./security"),
        social: () => import("./social")
    },
    data() {
        return {
            tab: "profile"
        }
    },
    created() {
        this.tab = this.$route.hash.replace("#", "");
    },
    beforeRouteLeave(to, from, next) {
        // if (this.formFields.some(field => field.changed)) {
        //     this.$modal.show("unsaved-changes", {
        //         buttons: [{
        //             title: "Discard",
        //             handler: () => {
        //                 next();
        //                 this.$modal.hide("unsaved-changes");
        //             }
        //         }, {
        //             title: "Cancel",
        //             class: "btn-primary",
        //             handler: () => {
        //                 next(false);
        //                 this.$modal.hide("unsaved-changes");
        //             }
        //         }]
        //     });
        // } else {
        //     next();
        // }
        next();
    },
    methods: {
        changeTab(tab) {
            this.tab = tab;
            // this.$router.push({ name: this.$route.name, hash: `#${tab}` });
        }
    }
};
</script>

<style lang="scss" src="@/assets/scss/settings.scss"/>
