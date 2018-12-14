<template>
<div>
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
    <div class="row">
        <div class="col-12 col-xl d-flex justify-content-end mt-2">
            <button class="btn btn-danger m-r-10" @click="webhooksList">Cancel</button>
            <button class="btn btn-primary" @click="save">Save</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        save() {
            // Save code and then show the webhooks list
            this.webhooksList();
        },
        webhooksList() {
            this.$emit("webhooksList");
        }
    }
}
</script>
