<template>
    <div class="row">
        <div class="col">
            <h5>Selecciona los permisos</h5>
            <!-- Role Form-->
            <form class="row" role="form">
                <div class="col-md-6">
                    <div class="form-group form-group-default required">
                        <label>Name role</label>
                        <input type="text" class="form-control" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group form-group-default">
                        <label>Description</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
            </form>
            <!-- Role Select -->
            <div class="row">
                <div class="col">
                    <div
                        id="accordion"
                        class="card-group horizontal"
                        role="tablist"
                        aria-multiselectable="true">

                        <div v-for="(group, groupName) in roleGroups" :key="groupName" class="card card-default m-b-0">
                            <div id="headingOne" class="card-header " role="tab">
                                <h4 class="card-title permission-group__title">
                                    <div class="checkbox check-success">
                                        <input
                                            id="checkbox1"
                                            type="checkbox"
                                            checked="checked"
                                            value="1">
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

                                        <div v-for="(permission, permissionName) in group" :key="`${groupName}-${permissionName}`" class="col-md-6 row">
                                            <div class="col">
                                                <span>{{ permissionName }} {{ permission.allowed }}</span>
                                            </div>
                                            <div class="col-xs-1">
                                                <div class="checkbox check-success">
                                                    <input
                                                        :id="`checkbox1-${groupName}-${permissionName}`"
                                                        v-model="permission.allowed"
                                                        type="checkbox">
                                                    <label :for="`checkbox1-${groupName}-${permissionName}`"/>
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
                    <button class="btn btn-danger m-r-10" @click="rolesList">Cancel</button>
                    <button class="btn btn-primary" @click="save">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        role: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            roleData: null,
            roleGroups: {}
        }
    },
    watch: {
        role() {
            this.setRole();
        }
    },
    created() {
        this.setRole();
    },
    methods: {
        save() {
            let url;
            let method;

            if (!this.userData.id) {
                url = "/roles-accesslist";
                method = "POST";
            } else {
                url = `/roles-accesslist/`;
                method = "PUT";
            }

            this.sendRequest(url, method, this.getFalsePermissions());
        },

        setRole() {
            this.roleData = _.clone(this.role);
            this.groupRoles()
        },

        rolesList() {
            this.$emit("changeView", "rolesList");
        },

        groupRoles() {
            this.roleData.forEach(role => {
                if (role.access_name == "*") {
                    return
                }

                role.allowed = Boolean(Number(role.allowed));

                if (!this.roleGroups[role.resources_name]) {
                    this.roleGroups[role.resources_name] = {[role.access_name]: role};
                } else {
                    this.roleGroups[role.resources_name][role.access_name] = role;
                }
            });
        },
        getFalsePermissions() {
            return this.roleData.map(role => {
                if (!role.allowed) {
                    role.allowed = Number(role.allowed);
                    return role;
                }
            }).filter(role => role);
        },

        sendRequest(url, method, formData) {
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            axios({
                url,
                method,
                data: formData
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "The permissions has been updated!",
                    type: "success"
                });

                this.rolesList();
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
#accordion
    .checkbox,
        .radio{
            margin-top: 0%;
}

.permission-group__title {
    display: flex !important;

    label {
        padding-left: 0
    }

    a{
        padding-top: 0
    }
}
</style>
