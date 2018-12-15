<template>
<div>
    <h5>Roles <button @click="rolesCRUD" class="btn btn-primary">New role</button></h5>
    <div class="table-responsive">
        <table class="table table-hover table-condensed">
            <thead>
                <tr>
                    <th style="width:30%">Name</th>
                    <th style="width:25%">Description</th>
                    <th style="width:20%">Users</th>
                    <th style="width:15%">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="`roles-${role.id}`">
                    <td class="v-align-middle semi-bold"> {{ role.name }} </td>
                    <td class="v-align-middle semi-bold"> {{ role.description }}</td>
                    <td class="v-align-middle semi-bold">{{ role.some }}</td>
                    <td class="v-align-middle semi-bold">
                        <button class="btn btn-primary m-l-5"><i class="fa fa-eye" aria-hidden="true"/></button>
                        <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                        <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true"/></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        rolesCRUD() {
            this.$emit("rolesCRUD");
        }
    }
}
</script>
