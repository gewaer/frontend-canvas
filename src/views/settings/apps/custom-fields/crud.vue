<template>
    <div>
        <h5>
            Add custom field
        </h5>
        <div class="row">
            <div class="col">
                <div class="form-group required">
                    <label>Field name</label>
                    <input
                        class="form-control"
                        type="text"
                        name="field-name"
                        placeholder="Field Name">
                </div>
            </div>
            <div class="col">
                <label>Category</label>
                <multiselect
                    :multiple="true"
                    :show-labels="false"
                    :options="['Category 1', 'Category 2', 'Category 3']"
                />
            </div>
        </div>
    </div>
</template>
