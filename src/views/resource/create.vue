<template>
    <div class="create-resource">
        <h4 class="section-title p-l-10">
            Create {{ currentResource }}
        </h4>
        <div class="card">
            <div class="card-block">
                <custom-fields-form
                    v-if="formFields"
                    ref="customFields"
                    :form-fields="formFields"
                    :form-options="formOptions"
                    class="d-flex h-100 flex-column"
                    form-name="customFields"
                    @form-cancelled="formCancelled"
                    @form-submitted="formSubmitted"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "CreateResource",
    data() {
        return {
            currentResource: {},
            formFields: null,
            formSchema: null,
            formOptions: {
                actionsWrapperClass: "d-flex justify-content-end mt-auto",
                buttons: {
                    cancel: {
                        class: "btn btn-danger mr-2",
                        text: "Cancel"
                    },
                    submit: {
                        class: "btn btn-primary",
                        text: "Save"
                    }
                }
            },
            isEditing: !!this.$route.params.id,
            resource: this.$route.params.resource,
            trackBys: {}
        };
    },
    computed: {
        ...mapState({
            companyData: state => state.Application.data
        })
    },
    async created() {
        // this.setResource(this.resource);
        this.currentResource = this.resource;
        await this.getFormSchema();

        if (!this.isEditing) {
            this.formFields = this.formSchema;
        } else {
            this.getResourceData();
        }
    },
    methods: {
        createResource(data) {
            axios({
                url: `/${this.resource}`,
                method: "POST",
                data
            }).then(() => {
                this.formCancelled();
            });
        },
        formCancelled() {
            this.$router.push({
                name: "browse",
                params: {
                    resource: this.resource
                }
            });
        },
        formSubmitted(data) {
            const formData = this.prepareData(data.values);

            if (!this.isEditing) {
                this.createResource(formData);
            } else {
                this.updateResource(formData);
            }
        },
        getFormSchema() {
            return axios({
                url: `/custom-forms/${this.resource}`
            }).then(response => {
                this.formSchema = JSON.parse(response.data.form_schema);
            });
        },
        getResourceData() {
            axios({
                url: `/${this.resource}/${this.$route.params.id}`
            }).then(response => {
                const fieldsData = response.data;

                this.formSchema.forEach(fields => {
                    if (Array.isArray(fields)) {
                        fields.forEach(field => {
                            this.setFieldValue(field, fieldsData);
                        });
                    } else {
                        this.setFieldValue(fields, fieldsData);
                    }
                });

                this.formFields = this.formSchema;
            });
        },
        prepareData(data) {
            const formData = {};

            Object.keys(data).forEach(field => {
                if (!["string", "number"].includes(typeof data[field])) {
                    formData[field] = data[field][this.trackBys[field]];
                } else {
                    formData[field] = data[field];
                }
            });

            return formData;
        },
        setFieldValue(field, fieldsData) {
            if (field.type == "select") {
                field.value = field.options.find(option => {
                    if (["string", "number"].includes(typeof option)) {
                        return option == fieldsData[field.field];
                    } else {
                        this.trackBys[field.field] = field.attributes["track-by"];
                        return option[field.attributes["track-by"]] == fieldsData[field.field];
                    }
                });
            } else {
                field.value = fieldsData[field.field];
            }
        },
        updateResource(data) {
            axios({
                url: `/${this.resource}/${this.$route.params.id}`,
                method: "PUT",
                data
            }).then(() => {
                this.formCancelled();
            });
        }
        // setResource(resourceName) {
        //     const resourceIndex = this.companyData.resources.findIndex(resource => {
        //         return resource.name == resourceName;
        //     });

        //     this.currentResource = this.companyData.resources[resourceIndex];
        // }
    }
}
</script>
