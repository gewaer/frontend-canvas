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
                                    <a :class="{active: tab == 'profile'}" href="#" @click="tab = 'profile'">User Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a :class="{active: tab == 'notifications'}" href="#" @click="tab = 'notifications'">Notifications</a>
                                </li>
                                <!-- <li class="nav-item">
                                    <a :class="{active: tab == 'social'}" href="#" @click="tab = 'social'">Social</a>
                                </li> -->
                                <li class="nav-item">
                                    <a :class="{active: tab == 'security'}" href="#" @click="tab = 'security'">Security</a>
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div id="user-profile" :class="{active: tab == 'profile'}" class="tab-pane">
                                    <user-profile/>
                                </div>
                                <div id="user-notifications" :class="{active: tab == 'notifications'}" class="tab-pane">
                                    <user-notifications/>
                                </div>
                                <!-- <div id="user-social" :class="{active: tab == 'social'}" class="tab-pane">
                                    <user-social/>
                                </div> -->
                                <div id="user-security" :class="{active: tab == 'security'}" class="tab-pane">
                                    <user-security/>
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
import userNotifications from "./notifications";
import userProfile from "./profile";
import userSecurity from "./security";
import userSocial from "./social";

export default {
    name: "UserSettings",
    components: {
        userNotifications,
        userProfile,
        userSecurity,
        userSocial
    },
    data() {
        return {
            tab: "profile"
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.errors.items.length) {
            this.$modal.show("unsaved-changes", {
                buttons: [{
                    title: "Discard",
                    handler: () => {
                        next();
                        this.$modal.hide("unsaved-changes");
                    }
                }, {
                    title: "Cancel",
                    class: "btn-primary",
                    handler: () => {
                        next(false);
                        this.$modal.hide("unsaved-changes");
                    }
                }]
            });
        }
    }
};
</script>

<style lang="scss" src="@/assets/scss/settings.scss"/>
