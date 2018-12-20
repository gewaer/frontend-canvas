<template>
    <div class="row">
        <div class="col">
            <component
                :is="currentComponent"
                :access-list="accessList"
                :role="selectedRole"
                @getRole="getRole"
                @changeView="changeView"
            />
        </div>
    </div>

</template>

<script>
import rolesList from "./list.vue";
import rolesCrud from "./crud.vue";

export default {
    components: {
        rolesList,
        rolesCrud
    },
    data() {
        return {
            selectedRole: null,
            accessList: [],
            currentComponent: "rolesList",
            views: {
                crud: "rolesCrud",
                list: "rolesList"
            }
        }
    },
    methods: {
        getRole(role, forCreate) {
            axios(`/roles-acceslist?q=(roles_name:${role.name})`).then(({ data }) => {
                if (forCreate) {
                    data.forEach(access => {
                        access.allowed = "1";
                        access.role_name = "";
                    });
                    role.name = "";
                }

                this.accessList= data;
                this.selectedRole = role;
                this.currentComponent = this.views.crud;
            })
        },

        changeView(view) {
            if (view == this.views.crud) {
                this.getRole({name: "Admins"}, true);
                return
            }
            this.currentComponent = view;
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

