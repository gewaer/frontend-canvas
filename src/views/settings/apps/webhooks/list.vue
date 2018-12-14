<template>
<div>
    <h5>
        Webhooks
        <button class="btn btn-primary" @click="webhooksCRUD">Add webhook</button>
    </h5>
    <div class="table-responsive">
        <table class="table table-hover table-condensed">
            <thead>
                <tr>
                    <th style="width:50%">Event</th>
                    <th style="width:20%">Format</th>
                    <th style="width:20%">URL</th>
                    <th style="width:10%">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="v-align-middle semi-bold">Cart creation</td>
                    <td class="v-align-middle semi-bold">JSON</td>
                    <td class="v-align-middle semi-bold">www.google.com</td>
                    <td class="v-align-middle semi-bold">
                        <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                        <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                    </td>
                </tr>
                <tr>
                    <td class="v-align-middle semi-bold">Cart creation</td>
                    <td class="v-align-middle semi-bold">JSON</td>
                    <td class="v-align-middle semi-bold">www.google.com</td>
                    <td class="v-align-middle semi-bold">
                        <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                        <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                    </td>
                </tr>
                <tr>
                    <td class="v-align-middle semi-bold">Cart creation</td>
                    <td class="v-align-middle semi-bold">JSON</td>
                    <td class="v-align-middle semi-bold">www.google.com</td>
                    <td class="v-align-middle semi-bold">
                        <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                        <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                    </td>
                </tr>
                <tr>
                    <td class="v-align-middle semi-bold">Cart creation</td>
                    <td class="v-align-middle semi-bold">JSON</td>
                    <td class="v-align-middle semi-bold">www.google.com</td>
                    <td class="v-align-middle semi-bold">
                        <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                        <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                    </td>
                </tr>
                <tr>
                    <td class="v-align-middle semi-bold">Cart creation</td>
                    <td class="v-align-middle semi-bold">JSON</td>
                    <td class="v-align-middle semi-bold">www.google.com</td>
                    <td class="v-align-middle semi-bold">
                        <button class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                        <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
                    </td>
                </tr>
                <tr>
                    <td class="v-align-middle semi-bold">Cart creation</td>
                    <td class="v-align-middle semi-bold">JSON</td>
                    <td class="v-align-middle semi-bold">www.google.com</td>
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
        webhooksCRUD() {
            this.$emit("webhooksCRUD");
        }
    }
};
</script>
