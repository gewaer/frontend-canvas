<template>
    <div class="row">
        <div class="col">
            <h5>Users
                <button class="btn btn-primary" @click="addUser()">New user</button>
            </h5>
            <div class="table-responsive">
                <table class="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th style="width:30%">Name</th>
                            <th style="width:25%">Rol</th>
                            <th style="width:20%">Last activity</th>
                            <th style="width:10%">Status</th>
                            <th style="width:15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="`users-${user.id}`">
                            <td class="v-align-middle semi-bold"> {{ user.firstname }} {{ user.lastname }} </td>
                            <td class="v-align-middle semi-bold"> {{ user.role_id }}</td>
                            <td class="v-align-middle semi-bold">{{ user.lastvisit }}</td>
                            <td class="v-align-middle semi-bold">{{ user.status }}</td>
                            <td class="v-align-middle semi-bold">
                                <button class="btn btn-primary m-l-5" @click="editUser(user.id, false)"><i class="fa fa-eye" aria-hidden="true"/></button>
                                <button class="btn btn-complete m-l-5" @click="editUser(user.id)"><i class="fa fa-edit" aria-hidden="true"/></button>
                                <button
                                    :disabled="isCurrentUser(user.id)"
                                    class="btn btn-danger m-l-5"
                                    @click="deleteUser(user.id)">
                                    <i class="fa fa-trash" aria-hidden="true" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <modal
            :draggable="true"
            :adaptive="true"
            :scrollable="true"
            name="user-modal"
            height="auto"
            @closed="selectedUser = null">
            <users-form :user="selectedUser" mode="form"/>
        </modal>
    </div>
</template>

<script>
import UsersForm from "@/components/forms/usersForm";

export default {
    components: {
        UsersForm
    },
    data() {
        return {
            users: [],
            selectedUser: null,
            isEditable: true
        }
    },
    mounted() {
        this.getUsers();
        this.currentUser = _.clone(this.$store.state.User.data);
    },
    methods: {
        isCurrentUser(userId) {
            return this.currentUser.id == userId;
        },

        getUsers() {
            axios("/users").then(({data}) => {
                this.users = data;
            })
        },

        getUser(userId) {
            return axios(`/users/${userId}`).then(({ data }) => {
                this.selectedUser = data;
            })
        },

        async editUser(userId, isEditable = true) {
            this.isEditable = isEditable
            await this.getUser(userId);
            this.$modal.show("user-modal");
        },

        deleteUser(id) {
            if (this.isCurrentUser) {
                return
            }

            axios({
                url: `/users/${id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The user has been deleted",
                    type: "success"
                });
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {

            })
        },

        addUser() {
            this.selectedUser = {};
            this.$modal.show("user-modal");
        }
    }
};
</script>
