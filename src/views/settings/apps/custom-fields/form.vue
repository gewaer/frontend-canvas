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
                        <div class="col-md-3">
                            <fields-text @schema="setSchema"/>
                            <fields-select @schema="setSchema"/>
                        </div>
                        <div class="col-md-9">
                            <custom-fields-form
                                :form-fields="fieldsSchema"
                                :form-name="'customFields'"
                                @formSubmitted="formSubmitted"
                            />
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
        FieldsSelect: () => import("./fields/select"),
        FieldsText: () => import("./fields/text"),
        CustomFieldsForm: () => import("@/components/forms/form"),
        SettingsTemplate: () => import("../tab-container")
    },
    data() {
        return {
            formData: {
                name: ""
            },
            fieldsSchema: [],
            fieldsType: null,
            modules: [],
            selectedCustomField: "text-field",
            selectedModules: []
        };
    },
    created() {
        this.getModules();
    },
    methods: {
        formSubmitted(values) {
            console.log(values);
        },
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
        save() {},
        setSchema(schema, type) {
            this.fieldsSchema = schema;
            this.fieldsType = type;
        }
    }
};
</script>

<style lang="scss" scoped>
.custom-fields {
    .custom-fields-container /deep/ {
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
