<template>
    <div>
        <h5>Roles <button class="btn btn-primary" @click="rolesCRUD">New role</button></h5>
        <span style="width:30%">{{ 'name' | capitalize }}</span>
        <div class="table-responsive">

            <vuetable
                ref="Vuetable"
                :append-params="{format: 'true'}"
                :fields="rolesFields"
                :http-fetch="getTableData"
                api-url="/roles"
                class="table table-hover table-condensed"
                pagination-path="">
                <!--
                <template slot="name" slot-scope="props">
                    <span> {{ props.rowData.firstname }} {{ props.rowData.lastname }} </span>
                </template> -->

                <template slot="actions" slot-scope="props">
                    <button v-if="!isGlobal(props.rowData)" class="btn btn-primary m-l-5" @click="editRole(props.rowData)">
                        <i class="fa fa-eye" aria-hidden="true"/>
                    </button>
                    <button v-if="!isGlobal(props.rowData)" class="btn btn-complete m-l-5" @click="editRole(props.rowData)">
                        <i class="fa fa-edit" aria-hidden="true"/>
                    </button>
                    <button class="btn btn-complete m-l-5" title="clone role" @click="cloneRole(props.rowData)">
                        <i class="fa fa-copy" aria-hidden="true"/>
                    </button>
                    <button v-if="!isGlobal(props.rowData)" class="btn btn-danger m-l-5" @click="confirmDelete(props.rowData.id)">
                        <i class="fa fa-trash" aria-hidden="true" />
                    </button>
                </template>
            </vuetable>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rolesFields: [{
                name: "name",
                title: "Name"
            }, {
                name: "description"
            }, {
                name: "users"
            }, {
                name: "actions",
                title: "Actions"
            }]
        }
    },
    methods: {
        rolesCRUD() {
            this.$emit("changeView", "rolesCrud");
        },

        confirmDelete(roleId) {
            // change for swal or any other
            if (confirm("are you sure?")) {
                this.deleteRole(roleId)
            }
        },

        isGlobal(role) {
            return Number(role.apps_id) == 0;
        },

        deleteRole(id) {
            axios({
                url: `/roles/${id}`,
                method: "DELETE"
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Deleted",
                    text: "The roles has been deleted",
                    type: "success"
                });
                this.$refs.Vuetable.reload();
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

        editRole(role) {
            this.$emit("getRole", role);
        },

        cloneRole(role) {
            this.$emit("cloneRole", role);
        }
    }

}
</script>
