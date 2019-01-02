<template>
    <settings-template>
        <div class="row custom-fields-settings">
            <div class="col">
                <div class="custom-fields">
                    <h5>
                        Add Custom Field
                    </h5>
                    <div class="row">
                        <div class="col">
                            <div class="form-group required">
                                <label>Field name</label>
                                <input
                                    v-validate="'required'"
                                    v-model="formData.name"
                                    name="field-name"
                                    type="text"
                                    class="form-control"
                                    placeholder="Field Name"
                                >
                                <span class="error">{{ errors.first("field-name") }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group required">
                                <label>Category</label>
                                <multiselect
                                    v-validate="'required'"
                                    v-model="selectedModules"
                                    :multiple="true"
                                    :show-labels="false"
                                    :options="modules"
                                    label="name"
                                    name="modules"
                                    track-by="id"
                                />
                                <span class="error">{{ errors.first("modules") }}</span>
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
                            <router-link :to="{ name: 'settingsAppsCustomFieldsList' }" class="btn btn-danger m-r-10">Cancel</router-link>
                            <button class="btn btn-primary" @click="save()">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </settings-template>
</template>

<script>
export default {
    name: "Form",
    components: {
        SettingsTemplate: () => import("../tab-container")
    },
    data() {
        return {
            formData: {
                name: ""
            },
            modules: [],
            selectedCustomField: "text-field",
            selectedModules: []
        };
    },
    created() {
        this.getModules();
    },
    methods: {
        getModules() {
            axios({
                url: "/custom-fields-modules"
            }).then(({ data }) => {
                if (data) {
                    let preSelectedModule = null;
                    this.modules = data;

                    if (this.$route.params.module) {
                        preSelectedModule = data.find(module => module.name == this.$route.params.module);

                        if (preSelectedModule) {
                            this.selectedModules.push(preSelectedModule);
                        }
                    }
                }
            });
        },
        save() {}
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
