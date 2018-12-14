<template>
    <div class="row">
        <div class="col">
            <transition name="fade" mode="out-in">
                <component
                    :is="currentComponent"
                    :user="selectedUser"
                    :current-user="currentUser"
                    @getUser="getUser"
                    @changeView="changeView"/>
            </transition>
        </div>
    </div>
</template>

<script>
import UsersCRUD from "./crud.vue";
import UsersList from "./list.vue";

export default {
    components: {
        UsersCRUD,
        UsersList
    },
    data() {
        return {
            currentComponent: "UsersList",
            users: [],
            currentUser: null,
            selectedUser: null,
            isEditable: true
        }
    },
    mounted() {
        this.currentUser = _.clone(this.$store.state.User.data);
    },
    methods: {
        getUser(userId) {
            return axios(`/users/${userId}`).then(({ data }) => {
                this.selectedUser = data;
                this.currentComponent = "UsersCRUD";
            })
        },

        changeView(view) {
            if (view == "UsersCRUD") {
                this.selectedUser = {};
            }
            this.currentComponent = view;
        }
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

