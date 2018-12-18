<template>
    <div>
        <h5>
            Email Templates
            <button class="btn btn-primary" @click="emailTemplatesCRUD">Add template</button>
        </h5>
        <div class="table-responsive">
            <table class="table table-hover table-condensed">
                <thead>
                    <tr>
                        <th style="width:50%">Template name</th>
                        <th style="width:10%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-align-middle semi-bold">Lorem Ipsum dolor sit</td>
                        <td class="v-align-middle semi-bold">
                            <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                            <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
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
        emailTemplatesCRUD() {
            this.$emit("emailTemplatesCRUD");
        }
    }
}
</script>
