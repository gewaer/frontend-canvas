<template>
    <tab-container>
        <div class="row">
            <div class="col">
                <component
                    :is="currentComponent"
                    :access-list="accessList"
                    :role="selectedRole"
                    @getRole="getRole"
                    @cloneRole="cloneRole"
                    @changeView="changeView"
                    @form-fields="setFormFields"
                />
            </div>
        </div>
    </tab-container>
</template>

<script>
import { vueRouterMixins } from "@/utils/mixins";
import TabContainer from "../tab-container";
import rolesList from "./list.vue";
import rolesCrud from "./crud.vue";

export default {
    name: "SettingsCompaniesRoles",
    components: {
        rolesList,
        rolesCrud,
        TabContainer
    },
    mixins: [
        vueRouterMixins
    ],
    data() {
        return {
            selectedRole: null,
            accessList: [],
            currentComponent: "rolesList",
            views: {
                crud: "rolesCrud",
                list: "rolesList"
            },
            crudFormFields: {}
        }
    },
    methods: {
        getRole(role, forCreate) {
            const roleId = role.id || 1;
            axios(`/roles-acceslist?q=(roles_id:${roleId})`).then(async({ data }) => {
                if (forCreate) {
                    data.forEach(access => {
                        access.allowed = "1";
                        access.role_name = "";
                    });
                    role = {name: "", description: ""}
                }

                let accessesTemplate = await this.getAccess(role);
                let accessList = this.mergeAccesses(data, accessesTemplate);
                accessList = this.formatAccesses(accessList);
                this.setRole(accessList, role);
            })
        },

        cloneRole(role) {
            axios.post(`/roles-acceslist/${role.id}/copy`).then(({ data }) => {
                this.getRole(data);
            })
        },

        getAccess(role) {
            return axios.get("/permissions-resources-access").then(({data}) => {
                const accessList = this.formatAccesses(data, role);
                return accessList;
            })
        },

        changeView(view) {
            if (view == this.views.crud) {
                this.getRole({name: "Admins"}, true);
                return
            }
            this.crudFormFields = {};
            this.currentComponent = view;
        },
        setFormFields(formFields) {
            this.crudFormFields = formFields;
        },

        setRole(accessList, role) {
            this.accessList =  _.sortBy(accessList, ["resources_name", "access_name"]);
            this.selectedRole = role;
            this.currentComponent = this.views.crud;
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
            return  accessList.find(permission => access.access_name == permission.access_name &&  access.resources_name == permission.resources_name);
        },

        formatAccesses(accesList, role ) {
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
        }
    }
};
</script>
<style lang="scss" scoped>
.card-header {
    border-bottom: 1px solid #eeeeee;
}
#accordion {
    .card{
        margin-bottom: 15px;

        .card-header {
            padding: 11px 20px 7px 20px;
        }
    }
}
</style>

