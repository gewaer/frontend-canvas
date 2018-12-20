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
                                    <router-link :to="{ name: 'setingsUsersProfile' }" :class="{active: $route.name == 'setingsUsersProfile'}">Profile</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ name: 'setingsUsersNotifications' }" :class="{active: $route.name == 'setingsUsersNotifications'}">Notifications</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ name: 'setingsUsersSocial' }" :class="{active: $route.name == 'setingsUsersSocial'}">Social</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="{ name: 'setingsUsersSecurity' }" :class="{active: $route.name == 'setingsUsersSecurity'}">Security</router-link>
                                </li>
                            </ul>
                            <div class="tab-content bg-white">
                                <div id="user-profile" class="tab-pane active">
                                    <slot/>
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
    name: "UserSettingsTemplate"
};
</script>

<style lang="scss" src="@/assets/scss/settings.scss"/>
