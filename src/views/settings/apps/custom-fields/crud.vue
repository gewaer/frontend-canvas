<template>
    <div class="custom-fields">
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
                <div class="form-group required">
                    <label>Category</label>
                    <multiselect
                        :multiple="true"
                        :show-labels="false"
                        :options="['Category 1', 'Category 2', 'Category 3']"
                    />
                </div>
            </div>
        </div>
        <div class="row custom-fields-container">
            <div class="col-12 col-sm-3">
                <div :class="{ 'selected' : selectedCustomField == 'text-field' }" class="custom-field" @click="selectedCustomField = 'text-field'">
                    <div class="custom-field__image">
                        <img src="/img/settings/custom-fields/text-field.png" class="img-fluid">
                    </div>
                    <span>Text</span>
                </div>
            </div>
            <div class="col-12 col-sm-3">
                <div :class="{ 'selected' : selectedCustomField == 'autocomplete' }" class="custom-field" @click="selectedCustomField = 'autocomplete'">
                    <div class="custom-field__image">
                        <img src="/img/settings/custom-fields/autocomplete.png" class="img-fluid">
                    </div>
                    <span>Autocomplete</span>
                </div>
            </div>
            <div class="col-12 col-sm-3">
                <div :class="{ 'selected' : selectedCustomField == 'large-text' }" class="custom-field" @click="selectedCustomField = 'large-text'">
                    <div class="custom-field__image">
                        <img src="/img/settings/custom-fields/large-text.png" class="img-fluid">
                    </div>
                    <span>Large text</span>
                </div>
            </div>
            <div class="col-12 col-sm-3">
                <div :class="{ 'selected' : selectedCustomField == 'numerical' }" class="custom-field" @click="selectedCustomField = 'numerical'">
                    <div class="custom-field__image">
                        <img src="/img/settings/custom-fields/numerical.png" class="img-fluid">
                    </div>
                    <span>Numerical</span>
                </div>
            </div>
            <div class="col-12 col-sm-3">
                <div :class="{ 'selected' : selectedCustomField == 'monetary' }" class="custom-field" @click="selectedCustomField = 'monetary'">
                    <div class="custom-field__image">
                        <img src="/img/settings/custom-fields/monetary.png" class="img-fluid">
                    </div>
                    <span>Monetary</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-xl d-flex justify-content-end mt-2">
                <button class="btn btn-danger m-r-10" @click="customFieldsList">Cancel</button>
                <button class="btn btn-primary" @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedCustomField: "text-field"
        };
    },
    methods: {
        save() {
            // Place save logic here
            this.customFieldsList();
        },
        customFieldsList() {
            this.$emit("customFieldsList");
        }
    }
};
</script>

<style lang="scss" scoped>
.custom-fields {
    .custom-fields-container {
        max-width: 850px;
        margin: 0 auto !important;
        padding-top: 40px;

        .col-3 {
            padding-left: 20px;
            padding-right: 20px;
        }

        .custom-field {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            margin-bottom: 20px;
            padding: 15px;

            &__image {
                width: 120px;
            }

            span {
                margin-top: 10px;
                font-size: 15px;
                font-weight: bold;
            }

            &.selected {
                outline: 1px solid #e5e5e5;
                box-shadow: 2px 2px 2px #e5e5e5;
            }
        }
    }

    .form-control {
        height: 43px;
    }
}
</style>
