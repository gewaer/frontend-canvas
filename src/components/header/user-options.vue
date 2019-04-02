<template>
    <dropdown :x="-45" class="user-bar">
        <template slot="btn">
            <div class="user-name">
                <span class="bold">{{ userData.firstname }}</span>
                <span> {{ userData.lastname }}</span>
            </div>
            <div class="profile-image">
                <img :src="profileImage">
            </div>
        </template>
        <ul slot="body" class="profile-dropdown" role="menu">
            <router-link :to="{ name: 'setingsUsersProfile' }">
                <span>Users Settings</span>
            </router-link>
            <router-link :to="{ name: 'settingsCompaniesProfile' }">
                <span>{{ companyName }} Settings</span>
            </router-link>
            <router-link :to="{ name: 'settingsAppsCustomFieldsList' }">
                <span>App Settings</span>
            </router-link>
            <router-link :to="{ name: 'settingsManagerList' }">
                <span>Companies Manager</span>
            </router-link>
            <a href="#" @click.prevent="logout()">
                <span>Logout</span>
                <i class="pg-power" />
            </a>
        </ul>
    </dropdown>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "UserOptions",
    computed: {
        ...mapState({
            companyName: state => state.Company.data && state.Company.data.name,
            userData: state => state.User.data
        }),
        profileImage() {
            return this.userData.profile_image || "/img/icons/avatar-icon.png";
        }
    },
    methods: {
        logout() {
            axios({
                method: "PUT",
                url: "/auth/logout"
            }).then(() => {
                Cookies.remove("token", { path: "/", domain: process.env.VUE_APP_DOMAIN });
                this.$store.dispatch("User/setToken", null);
                this.$store.dispatch("Application/resetGlobalData");
                this.$router.push({ name: "login" });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.user-bar {
    background-color: #ededed;
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 20px;
    order: 5;

    .user-name {
        margin-right: 10px;
        text-transform: capitalize;
    }

    .profile-image {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            border-radius: 100%;
            height: initial;
        }
    }

    .profile-dropdown {
        a {
            display: flex;
            align-items: center;
            margin-top: 0;
            padding: 5px 10px;
            text-transform: capitalize;

            i {
                margin-left: 5px;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .user-bar {
        padding: 0 5px;

        .user-name {
            display: none;
        }
    }
}
</style>
