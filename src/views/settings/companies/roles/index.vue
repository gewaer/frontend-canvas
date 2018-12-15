<template>
    <div class="row">
        <div class="col">
            <component
                :is="currentComponent"
                @rolesCRUD="rolesCRUD"
                @rolesList="rolesList"
            />
        </div>
    </div>

</template>

<script>
import rolesList from './list.vue';
import rolesCRUD from './crud.vue';

export default {
    components: {
        rolesList,
        rolesCRUD,
    },
    data() {
        return {
            roles: [],
            currentComponent: "rolesList"
        }
    },
    mounted() {
        this.getRoles();
    },
    methods: {
        getRoles() {
            axios("/roles").then(({ data }) => {
                this.roles = data;
            })
        },
        rolesCRUD() {
            this.currentComponent = "rolesCRUD";
        },
        rolesList() {
            this.currentComponent = "rolesList";
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

