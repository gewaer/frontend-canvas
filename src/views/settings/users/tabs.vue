<template>
    <ul class="nav nav-tabs nav-tabs-simple nav-tabs-left bg-white">
        <li class="nav-item">
            <router-link :to="{ name: 'setingsUsersProfile' }" :class="{active: $route.name == 'setingsUsersProfile'}">Profile</router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{ name: 'setingsUsersNotifications' }" :class="{active: $route.name == 'setingsUsersNotifications'}">Notifications</router-link>
        </li>
        <!-- <li class="nav-item">
            <router-link :to="{ name: 'setingsUsersSocial' }" :class="{active: $route.name == 'setingsUsersSocial'}">Social</router-link>
        </li> -->
        <li class="nav-item">
            <router-link :to="{ name: 'setingsUsersSecurity' }" :class="{active: $route.name == 'setingsUsersSecurity'}">Security</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "TabsMenu"
};
</script>
