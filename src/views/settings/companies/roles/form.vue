<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="row">
            <div class="col">
                <h5>Selecciona los permisos <button v-if="!isNewRole" class="btn btn-primary" @click="cloneRole">Clone role</button></h5>
                <!-- Role Form-->
                <form class="row" role="form">
                    <div class="col-md-6">
                        <div class="form-group form-group-default required">
                            <label>Name role</label>
                            <input
                                v-validate="'required'"
                                v-model="roleData.name"
                                name="name"
                                vee-validate="required"
                                type="text"
                                class="form-control"
                                required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group form-group-default">
                            <label>Description</label>
                            <input
                                v-validate="''"
                                v-model="roleData.description"
                                type="text"
                                name="description"
                                class="form-control" >
                        </div>
                    </div>
                </form>
                <!-- Role Select -->
                <div class="row">
                    <div v-if="accessGroup" class="col">
                        <div
                            id="accordion"
                            class="card-group horizontal"
                            role="tablist"
                            aria-multiselectable="true"
                        >
                            <div v-for="(group, groupName) in accessGroup" :key="groupName" class="card card-default m-b-0">
                                <div id="headingOne" class="card-header " role="tab">
                                    <h4 class="card-title access-group__title">
                                        <div class="checkbox check-success">
                                            <input
                                                id="checkbox1"
                                                v-model="group.isGroupSelected"
                                                type="checkbox"
                                                checked="checked"
                                                @click="checkGroup($event, groupName)">
                                            <label for="checkbox1"/>
                                        </div>
                                        <a
                                            :href="`#collapse-${groupName}`"
                                            data-toggle="collapse"
                                            data-parent="#accordion"
                                            aria-expanded="true"
                                            aria-controls="collapseOne">
                                            {{ groupName }}
                                        </a>
                                    </h4>
                                </div>
                                <div
                                    :id="`collapse-${groupName}`"
                                    class="collapse show"
                                    role="tabcard"
                                    aria-labelledby="headingOne">
                                    <div class="card-body">
                                        <div class="row">
                                            <div v-for="(access, accessName) in group.permissions" :key="`${groupName}-${accessName}`" class="col-md-6 row">
                                                <div class="col">
                                                    <span>{{ accessName | capitalize }}</span>
                                                </div>
                                                <div class="col-xs-1">
                                                    <div class="checkbox check-success">
                                                        <input
                                                            :id="`checkbox-${groupName}-${accessName}`"
                                                            :name="`checkbox-${groupName}-${accessName}`"
                                                            v-model="access.allowed"
                                                            type="checkbox"
                                                            @change="checkSelectedGroup(groupName)">
                                                        <label :for="`checkbox-${groupName}-${accessName}`"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-xl d-flex justify-content-end mt-2">
                        <button class="btn btn-danger m-r-10" @click="rolesList()">Cancel</button>
                        <button :disabled="!hasChanged" class="btn btn-primary" @click="save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </container-template>
</template>

<script>
import { vueRouterMixins } from "@/utils/mixins";

export default {
    name: "Form",
    components: {
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/companies/tabs")
    },
    mixins: [
        vueRouterMixins
    ],
    data() {
        return {
            accessListData: [],
            accessGroup: {},
            roleData: {}
        }
    },
    computed: {
        isNewRole() {
            return !this.roleData.id
        }
    },
    watch: {
        "$route.params.id"(roleId) {
            this.getRole(roleId, !roleId)
        }
    },
    created() {
        const roleId = this.$route.params.id;
        this.getRole(roleId, !roleId)
    },
    methods: {
        getRoleData(roleId) {
            return axios({
                url: `/roles/${roleId}`
            }).then(({ data }) => {
                return data;
            });
        },
        // initialization
        getRole(roleId = 1, forCreate = true) {
            let role = {};
            axios({
                url: `/roles-acceslist?q=(roles_id: ${roleId})`
            }).then(async({ data }) => {
                if (forCreate) {
                    data.forEach(access => {
                        access.allowed = "1";
                        access.role_name = "";
                    });
                    role = { name: "", description: "" }
                } else {
                    role = await this.getRoleData(roleId);
                }

                let accessesTemplate = await this.getAccess(role);
                let accessList = this.mergeAccesses(data, accessesTemplate);
                accessList = this.formatAccesses(accessList);
                this.formatRole(accessList, role);
            })
        },

        getAccess(role) {
            return axios({
                url: "/permissions-resources-access"
            }).then(({ data }) => {
                return this.formatAccesses(data, role);
            })
        },

        mergeAccesses(accessList, accessesTemplate) {
            accessesTemplate.forEach(access => {
                const localAccess = this.findLocalAccess(accessList, access);
                if (!localAccess) {
                    accessList.push(access)
                }
            })
            return accessList;
        },

        findLocalAccess(accessList, access) {
            return accessList.find(permission => access.access_name == permission.access_name && access.resources_name == permission.resources_name);
        },

        formatRole(accessList, role) {
            this.accessListData = _.sortBy(accessList, ["resources_name", "access_name"]);
            this.roleData = role;
            this.groupPermissions();
            this.checkSelectedGroups();
        },

        formatAccesses(accesList, role) {
            return accesList.map(access => {
                if (role) {
                    delete access.resources_id;
                    access.roles_id = role.roles_id;
                    access.allowed = true;
                    access.roles_name = role.name;
                }
                access.allowed = Boolean(Number(access.allowed))
                return access
            })
        },
        groupPermissions() {
            const accessGroup = {};
            this.accessListData.forEach(access => {
                if (access.access_name != "*") {
                    if (!accessGroup[access.resources_name]) {
                        accessGroup[access.resources_name] = { permissions: { [access.access_name]: access } };
                    } else {
                        accessGroup[access.resources_name]["permissions"][access.access_name] = access;
                    }
                }
            });

            this.accessGroup = accessGroup;
        },
        // checkbox related
        isGroupChecked(resourcesName) {
            const group = this.accessGroup[resourcesName].permissions;
            const allowedAccesses = Object.values(group);
            return allowedAccesses.every(access => access.allowed);
        },
        checkGroup(event, resourcesName) {
            const group = this.accessGroup[resourcesName];
            for (const access in group.permissions) {
                if (group.permissions.hasOwnProperty(access)) {
                    group.permissions[access].allowed = event.target.checked;
                }
            }
        },
        checkSelectedGroup(resourcesName) {
            this.accessGroup[resourcesName]["isGroupSelected"] = this.isGroupChecked(resourcesName);
        },
        checkSelectedGroups() {
            for (const resourcesName in this.accessGroup) {
                this.checkSelectedGroup(resourcesName);
            }
        },
        // form related
        save() {
            let url;
            let method;

            if (this.isNewRole) {
                url = "/roles-acceslist/";
                method = "POST";
            } else {
                url = `/roles-acceslist/${this.roleData.id}`;
                method = "PUT";
            }

            const formData = {
                roles: this.roleData,
                access: this.getDisabledPermissions()
            }

            this.sendRequest(url, method, formData);
        },
        sendRequest(url, method, formData) {
            if (!this.isLoading) {
                this.isLoading = true;

                axios({
                    url,
                    method,
                    data: formData
                })
                    .then(this.onSuccess(method))
                    .catch(this.onError)
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        onSuccess(method) {
            let message = method == "POST" ? "created" : "updated";

            this.$notify({
                group: null,
                title: "Confirmation",
                text: `The role has been ${message}!`,
                type: "success"
            });

            this.rolesList();
        },
        onError(error) {
            this.$notify({
                group: null,
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
        },
        // utilities
        getDisabledPermissions() {
            return this.accessListData.map(this.formatAllowedProperty).filter(access => access);
        },
        formatAllowedProperty(access) {
            if (!access.allowed) {
                const accessLocal = _.clone(access);
                accessLocal.roles_name = this.roleData.name;
                accessLocal.allowed = Number(accessLocal.allowed);
                return accessLocal;
            }
        },
        cancel() {
            this.rolesList();
        },
        // events up
        rolesList() {
            this.$router.push({ name: "settingsCompaniesRolesList" });
        },

        cloneRole() {
            axios({
                url:`/roles-acceslist/${this.roleData.id}/copy`,
                method: "POST"
            }).then(({ data }) => {
                this.$router.push({
                    name: "settingsCompaniesRolesFormEdit",
                    params: {
                        id: data.id
                    }
                });
            })
        }

        // setFormFields(formFields) {
        //     this.crudFormFields = formFields;
        // },
    }
}
</script>

<style lang="scss" scoped>
#accordion
    .checkbox,
        .radio{
            margin-top: 0%;
}

.access-group__title {
    display: flex !important;

    label {
        padding-left: 0
    }

    a{
        padding-top: 0
    }
}
</style>
