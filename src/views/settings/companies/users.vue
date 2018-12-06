<template>
    <div class="row">
        <div class="col">
            <h5>Users <button class="btn btn-primary">New user</button></h5>
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
                        <tr>
                            <td class="v-align-middle semi-bold">Jonh Doe</td>
                            <td class="v-align-middle semi-bold">Administrador</td>
                            <td class="v-align-middle semi-bold">17-03-2017 9:47 am</td>
                            <td class="v-align-middle semi-bold">Active</td>
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
    </div>
</template>

<script>
export default {
    data() {
       users: []
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            axios('/users').then(({data}) => {
                this.users = data;
            })
        }
    }
};
</script>
