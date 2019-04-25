<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content">
            <h5>
                Users
                <router-link :to="{ name: 'settingsCompaniesUsersForm' }" class="btn btn-primary">
                    New User
                </router-link>
            </h5>
            <div class="table-responsive">
                <vuetable
                    ref="Vuetable"
                    :append-params="{format: 'true', relationships:'roles'}"
                    :fields="usersFields"
                    :http-fetch="getTableData"
                    api-url="/users"
                    class="table table-hover table-condensed"
                    pagination-path="">

                    <template slot="name" slot-scope="props">
                        <span> {{ props.rowData.firstname }} {{ props.rowData.lastname }} </span>
                    </template>

                    <template slot="actions" slot-scope="props">
                        <button class="btn btn-primary m-l-5" @click="rowAction(props.rowData, true)"><i class="fa fa-eye" aria-hidden="true"/></button>
                        <button class="btn btn-complete m-l-5" @click="rowAction(props.rowData, false)"><i class="fa fa-edit" aria-hidden="true"/></button>
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
    </container-template>
</template>

<script>
import { vuexMixins, listMixins } from "@/utils/mixins";

export default {
    name: "UsersList",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/companies/tabs")
    },
    mixins: [
        vuexMixins,
        listMixins
    ],
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
                name: "roles.0.name",
                title:"Rol",
                sortField: "roles_id",
                width: "30%"
            }, {
                name: "lastvisit",
                sortField: "lastvisit",
                width: "30%"
            }, {
                name: "status",
                sortField: "status",
                width: "30%",
                formatter(value) {
                    return value ? "Active" : "Inactive";
                }
            }, {
                name: "actions",
                title: "Actions",
                titleClass: "table-actions",
                dataClass: "table-actions"
            }]
        }
    },
    methods: {
        isCurrentUser(userId) {
            return this.currentUser.id == userId;
        },
        rowAction(userData, isReadOnly) {
            this.$router.push({ name: "settingsCompaniesUsersFormEdit", params: { user: userData, readOnlyMode: isReadOnly } });
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
