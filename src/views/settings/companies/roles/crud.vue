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
                                        <div class="col-md-6 row">
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
                                        <div class="col-md-6 row">
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
                                        <div class="col-md-6 row">
                                            <div class="col">
                                                <span>Permiso 2</span>
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
                                        <div class="col-md-6 row">
                                            <div class="col">
                                                <span>Permiso 2</span>
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
                                    <div class="row">
                                        <div class="col-md-6 row">
                                            <div class="col">
                                                <span>Permiso 2</span>
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
                                        <div class="col-md-6 row">
                                            <div class="col">
                                                <span>Permiso 2</span>
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
                                                <label for="checkbox3"/>
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
    methods: {
        save() {
            // Place save js logic here
            this.rolesList();
        },
        rolesList() {
            this.$emit("rolesList");
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
</style>
