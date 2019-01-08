<template>
    <div class="add-custom-filter-modal">
        <div class="row modal-header">
            <div class="col d-flex align-items-center">
                <h5>Add custom filter</h5>
                <a class="ml-auto" href="#" @click="$modal.hide('add-custom-filter')">x</a>
            </div>
        </div>
        <div class="row modal-body">
            <div class="col">
                <div class="row align-items-center m-b-20">
                    <div class="col-auto">
                        <div class="step-number">1</div>
                    </div>
                    <div class="col">
                        <div class="form-group required">
                            <input
                                v-validate="'required'"
                                v-model="filterData.name"
                                class="form-control"
                                type="text"
                                data-vv-as="filter name"
                                name="filter-name"
                                placeholder="Filter name">
                            <span>{{ errors.first("filter-name") }}</span>
                        </div>
                    </div>
                </div>

                <div class="row m-b-20">
                    <div class="col-auto">
                        <div class="step-number">2</div>
                    </div>
                    <div class="col">
                        <label>Add a condition</label>
                        <div v-for="(filter, index) in filters" :key="filter.indexId" class="row filters-conditions-row align-items-center">
                            <div class="col-12 col-sm">
                                <div class="row filter-row">
                                    <div class="form-group filters-conditions col-12">
                                        <multiselect
                                            v-validate="'required'"
                                            :allow-empty="false"
                                            v-model="filter.field"
                                            :data-vv-name="`filter-field-${index}`"
                                            :show-labels="false"
                                            :options="fields"
                                            data-vv-as="name"/>
                                        <span class="text-danger">{{ errors.first(`filter-field-${index}`) }}</span>
                                    </div>

                                    <div class="form-group filters-conditions col-12 col-sm-auto">
                                        <multiselect
                                            v-validate="'required'"
                                            :allow-empty="false"
                                            v-model="filter.condition"
                                            :data-vv-name="`filter-condition-${index}`"
                                            :show-labels="false"
                                            :options="conditions"
                                            data-vv-as="condition"/>
                                        <span class="text-danger">{{ errors.first(`filter-condition-${index}`) }}</span>
                                    </div>

                                    <div class="form-group required col-12 col-sm">
                                        <input
                                            v-validate="'required'"
                                            v-model="filter.value"
                                            :name="`filter-value-${index}`"
                                            type="text"
                                            data-vv-as="filter value"
                                            class="form-control"
                                            placeholder="value">
                                        <span class="text-danger">{{ errors.first(`filter-value-${index}`) }}</span>
                                    </div>

                                    <div class="form-group filters-conditions col-12 col-sm-auto">
                                        <multiselect
                                            v-validate="'required'"
                                            :allow-empty="false"
                                            v-model="filter.conector"
                                            :data-vv-name="`filter-condition-${index}`"
                                            :show-labels="false"
                                            :options="['and', 'or']"
                                            data-vv-as="condition"/>
                                        <span class="text-danger">{{ errors.first(`filter-condition-${index}`) }}</span>
                                    </div>


                                </div>
                            </div>
                            <div class="col-auto">
                                <a class="d-flex flex-column" href="#" @click="removeFilter(index)">
                                    <i class="fa fa-minus-circle d-flex justify-content-center"/> remove
                                </a>
                            </div>
                        </div>
                        <a class="d-flex align-items-center justify-content-center" href="#" @click="addFilter()"><i class="fa fa-plus-circle"/> Add a condition</a>
                    </div>
                </div>

            </div>
        </div>
        <div class="row modal-footer">
            <div class="col">
                <button class="btn btn-block" @click="$modal.hide('add-custom-filter')">Cancel</button>
            </div>
            <div class="col">
                <button class="btn btn-block btn-primary" @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        fields: {
            type: Array,
            required: true
        },
        resourceName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            filterData: {
                name: ""
            },
            filters: [],
            conditions: ["=", "like", "<>", ">", "<"]
        }
    },
    mounted() {
        this.addFilter();
    },
    methods: {
        addFilter() {
            this.filters.push({
                indexId:  Math.random().toString(16).replace(".", ""),
                field: "",
                condition: "like",
                conector: "or",
                value: ""
            })
        },

        removeFilter(index) {
            if (this.filters.length > 1) {
                this.filters.splice(index, 1);
            }
        },

        save() {
            let url;
            let method;

            if (!this.filterData.id) {
                url = "/custom-filters/";
                method = "POST";
            } else {
                url = `/custom-filters/${this.filterData.id}`;
                method = "PUT";
            }

            const formData = {
                data: {
                    resource_name: this.resourceName,
                    ...this.filterData
                },
                filters: this.getFilters()
            }

            this.$validator.validate().then( result => {
                if (result) {
                    this.sendRequest(url, method, formData);
                }
            })
        },
        sendRequest(url, method = "POST", formData) {
            if (!this.isLoading) {
                this.isLoading = true;

                axios({
                    url,
                    method,
                    data: formData
                }).then(() => {
                    this.isLoading = false;
                    let message = method == "POST" ? "created" : "updated";

                    this.$notify({
                        group: null,
                        title: "Confirmation",
                        text: `The filter has been ${message}!`,
                        type: "success"
                    });

                    this.$emit("saved");
                }).catch((error) => {
                    this.isLoading = false;

                    this.$notify({
                        group: null,
                        title: "Error",
                        text: error.response.data.errors.message,
                        type: "error"
                    });
                })
            }
        },

        getFilters() {
            return this.filters.map(filter => {
                const filterClone = _.clone(filter);
                delete filterClone.indexId
                return filterClone;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.add-custom-filter-modal {
    .step-number {
        background-color: #eaeaea;
        width: 25px;
        height: 25px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form-group {
        margin-bottom: 0;

        input {
            height: 40px;
        }
    }

    .filters-conditions-row {
        padding: 15px 15px 0;
        margin-bottom: 10px;
        background-color: #f1f1f1;

        .filters-conditions {
            margin-bottom: 10px;

            select {
                height: 34px;
                color: #999;

                option {
                    color: black;
                }
            }
        }
    }


    .radio label {
        margin-bottom: 0;
    }
}

.filter-row {
    margin-bottom: 5px;

}
</style>
