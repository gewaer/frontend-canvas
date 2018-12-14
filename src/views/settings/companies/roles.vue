<template>
    <div class="row">
        <div class="col">
            <h5>Roles <button class="btn btn-primary">New role</button></h5>
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
            <!-- Create Role -->
            <div class="row">
                <div class="col">
                    <h5>Selecciona los permisos</h5>
                    <div class="test">
                        <!-- Role Form-->
                        <form class="" role="form">
                            <div class="row">
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
                            </div>
                        </form>
                        <!-- Role Select -->
                        <div class="row">
                            <div class="col">
                                <div class="">
                                    <div
                                        id="accordion"
                                        class="card-group horizontal"
                                        role="tablist"
                                        aria-multiselectable="true">

                                        <div class="card card-default m-b-0">
                                            <div id="headingOne" class="card-header " role="tab">
                                                <h4 class="card-title">
                                                    <a
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#collapseOne"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne">
                                                        Report
                                                    </a>
                                                </h4>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                class="collapse show"
                                                role="tabcard"
                                                aria-labelledby="headingOne">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <span>Permiso 1</span>
                                                        </div>
                                                        <div class="col-xs-1">
                                                            <div class="checkbox check-success">
                                                                <input
                                                                    id="checkbox1"
                                                                    type="checkbox"
                                                                    checked="checked"
                                                                    value="1">
                                                                <label for="checkbox1"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">
                                                            <span>Permiso 1</span>
                                                        </div>
                                                        <div class="col-xs-1">
                                                            <div class="checkbox check-success">
                                                                <input
                                                                    id="checkbox1"
                                                                    type="checkbox"
                                                                    checked="checked"
                                                                    value="1">
                                                                <label for="checkbox1"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card card-default m-b-0">
                                            <div id="headingTwo" class="card-header " role="tab">
                                                <h4 class="card-title">
                                                    <a
                                                        class="collapsed"
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#collapseTwo"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwo">
                                                        Bank
                                                    </a>
                                                </h4>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                class="collapse"
                                                role="tabcard"
                                                aria-labelledby="headingTwo">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <span>Permiso 2</span>
                                                        </div>
                                                        <div class="col-xs-1">
                                                            <div class="checkbox check-success">
                                                                <input
                                                                    id="checkbox2"
                                                                    type="checkbox"
                                                                    checked="checked"
                                                                    value="1">
                                                                <label for="checkbox2"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card card-default m-b-0">
                                            <div id="headingThree" class="card-header " role="tab">
                                                <h4 class="card-title">
                                                    <a
                                                        class="collapsed"
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#collapseThree"
                                                        aria-expanded="false"
                                                        aria-controls="collapseThree">
                                                        Accounts
                                                    </a>
                                                </h4>
                                            </div>
                                            <div
                                                id="collapseThree"
                                                class="collapse"
                                                role="tabcard"
                                                aria-labelledby="headingThree">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <span>Permiso 3</span>
                                                        </div>
                                                        <div class="col-xs-1">
                                                            <div class="checkbox check-success">
                                                                <input
                                                                    id="checkbox3"
                                                                    type="checkbox"
                                                                    checked="checked"
                                                                    value="1">
                                                                <label for="checkbox3"></label>
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
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            roles: []
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
    }
}
</style>

