<template>
    <div>
        <h5>
            Custom Fields
            <button class="btn btn-primary" @click="customFieldsCRUD">Add custom field</button>
        </h5>
        <div class="card card-borderless">
            <ul class="nav nav-tabs nav-tabs-simple" role="tablist" data-init-reponsive-tabs="dropdownfx">
                <li class="nav-item">
                    <a 
                        class="active" 
                        data-toggle="tab" 
                        role="tab" 
                        data-target="#category1" 
                        href="#">Category 1</a>
                </li>
                <li class="nav-item">
                    <a 
                        href="#" 
                        data-toggle="tab" 
                        role="tab" 
                        data-target="#category2">Category 2</a>
                </li>
                <li class="nav-item">
                    <a 
                        href="#" 
                        data-toggle="tab" 
                        role="tab" 
                        data-target="#category3">Category 3</a>
                </li>
            </ul>
            <div class="tab-content">
                <div id="category1" class="tab-pane active">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table table-hover table-condensed">
                                    <thead>
                                        <tr>
                                            <th style="width:50%">Field name</th>
                                            <th style="width:20%">Type</th>
                                            <th style="width:20%">Field API</th>
                                            <th style="width:10%">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Title</td>
                                            <td class="v-align-middle semi-bold">Text</td>
                                            <td class="v-align-middle semi-bold">title</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Creator</td>
                                            <td class="v-align-middle semi-bold">User</td>
                                            <td class="v-align-middle semi-bold">creator_user_id</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Value</td>
                                            <td class="v-align-middle semi-bold">Monetary</td>
                                            <td class="v-align-middle semi-bold">value</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Integer</td>
                                            <td class="v-align-middle semi-bold">Organization</td>
                                            <td class="v-align-middle semi-bold">org_id</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Pipeline</td>
                                            <td class="v-align-middle semi-bold">Numerical</td>
                                            <td class="v-align-middle semi-bold">Pipeline</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Date created</td>
                                            <td class="v-align-middle semi-bold">Date</td>
                                            <td class="v-align-middle semi-bold">add_time</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Title</td>
                                            <td class="v-align-middle semi-bold">Text</td>
                                            <td class="v-align-middle semi-bold">title</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Creator</td>
                                            <td class="v-align-middle semi-bold">User</td>
                                            <td class="v-align-middle semi-bold">creator_user_id</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Value</td>
                                            <td class="v-align-middle semi-bold">Monetary</td>
                                            <td class="v-align-middle semi-bold">value</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Integer</td>
                                            <td class="v-align-middle semi-bold">Organization</td>
                                            <td class="v-align-middle semi-bold">org_id</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Pipeline</td>
                                            <td class="v-align-middle semi-bold">Numerical</td>
                                            <td class="v-align-middle semi-bold">Pipeline</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-middle semi-bold">Date created</td>
                                            <td class="v-align-middle semi-bold">Date</td>
                                            <td class="v-align-middle semi-bold">add_time</td>
                                            <td class="v-align-middle semi-bold">
                                                <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="category2" class="tab-pane ">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3>“ Nothing is
                                <span class="semi-bold">impossible</span>, the word itself says 'I'm
                                <span class="semi-bold">possible</span>'! ”
                            </h3>
                            <p>A style represents visual customizations on top of a layout. By editing a style, you can use Squarespace's visual interface to customize your...</p>
                            <br>
                            <p class="pull-right">
                                <button type="button" class="btn btn-default btn-cons">White</button>
                                <button type="button" class="btn btn-success btn-cons">Success</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div id="category3" class="tab-pane">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3>Follow us &amp; get updated!</h3>
                            <p>Instantly connect to what's most important to you. Follow your friends, experts, favorite celebrities, and breaking news.</p>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        customFieldsCRUD() {
            this.$emit("customFieldsCRUD");
        }
    }
}
</script>
