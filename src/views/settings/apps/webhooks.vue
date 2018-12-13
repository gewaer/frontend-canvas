<template>
    <div class="row webhooks-section">
        <modal
            :draggable="true"
            :adaptive="true"
            :scrollable="true"
            name="unsaved-changes-modal"
            height="auto">
            <unsaved-changes mode="form"/>
        </modal>
        <div class="col-12 col-xl m-b-20">
            <h5>Add a webhook</h5>
            <div class="row">
                <div class="col">
                    <label>Event</label>
                    <multiselect
                        :show-labels="false"
                        :options="[
                            'Cart creation',
                            'Cart update',
                            'Checkout creation',
                            'Checkout deletion',
                            'Checkout update',
                            'Collection creation',
                            'Collection deletion',
                            'Collection update',
                            'Customer group creation',
                            'Customer group deletion',
                            'Customer group update',
                            'Customer creation',
                            'Customer deletion',
                            'Customer update',
                            'Customer disable',
                            'Customer enable'
                        ]"
                    />
                </div>
                <div class="col">
                    <label>Format</label>
                    <multiselect
                        :show-labels="false"
                        :options="[
                            'JSON',
                            'XML'
                        ]"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group  required">
                        <label>URL</label>
                        <input
                            class="form-control"
                            type="text"
                            name="url">
                    </div>
                </div>
            </div>
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
                                <button @click="editWebook" class="btn btn-complete m-l-5"><i class="fa fa-edit" aria-hidden="true"/></button>
                                <button class="btn btn-danger m-l-5"><i class="fa fa-trash" aria-hidden="true" /></button>
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
    name: "Webhooks",
    methods: {
        editWebhook() {

        }
    }
};
</script>
