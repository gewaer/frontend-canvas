<template>
    <div>
        <h5>
            Users
            <button class="btn btn-primary" @click="usersCRUD">New user</button>
        </h5>
        <div class="table-responsive">
            <vuetable
                :append-params="{format: 'true'}"
                :fields="usersFields"
                :http-fetch="getTableData"
                api-url="/users"
                class="table table-hover table-condensed"
                pagination-path="">

                <template slot="name" slot-scope="props">
                    <span> {{ props.rowData.firstname }} {{ props.rowData.lastname }} </span>
                </template>

                <template slot="actions" slot-scope="props">
                    <button class="btn btn-primary m-l-5" @click="editUser(props.rowData.id, false)"><i class="fa fa-eye" aria-hidden="true"/></button>
                    <button class="btn btn-complete m-l-5" @click="editUser(props.rowData.id)"><i class="fa fa-edit" aria-hidden="true"/></button>
                    <button
                        :disabled="isCurrentUser(props.rowData.id)"
                        class="btn btn-danger m-l-5"
                        @click="deleteUser(props.rowData.id)">
                        <i class="fa fa-trash" aria-hidden="true" />
                    </button>
                </template>
            </vuetable>
        </div>
    </div>
</template>

<script>
export default {
    name: "UsersList",
    props: {
        currentUser: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            usersFields: [{
                name: "name",
                title: "Name"
            }, {
                name: "rol",
                sortField: "rol",
                width: "30%"
            }, {
                name: "lastvisit",
                sortField: "lastvisit",
                width: "30%"
            }, {
                name: "status",
                sortField: "status",
                width: "30%"
            }, {
                name: "actions",
                title: "Actions"
            }]
        }
    },
    methods: {
        usersCRUD() {
            this.$emit("changeView", "UsersCRUD");
        },
        isCurrentUser(userId) {
            return this.currentUser.id == userId;
        },
        editUser(userId, isEditable = true) {
            this.isEditable = isEditable
            this.$emit("getUser", userId);
        },
        getTableData(apiUrl, options) {
            return axios({
                url: apiUrl,
                params: options.params
            });
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
        }
    }
};
</script>
