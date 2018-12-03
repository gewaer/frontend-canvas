<template>
<div class="row company-general-information">
    <div class="col">
        <h5>Company Information</h5>
        <div class="row">
            <div class="col-12 col-xl-7">
                <div class="row">
                    <div class="col-12 col-md-auto">
                        <div class="profile-image-container">
                            <div class="profile-image">
                                <img class="img-fluid" src="http://logok.org/wp-content/uploads/2014/11/NZXT-Logo-880x660.png">
                            </div>
                            <div class="upload-profile-image">
                                <label for="upload-image" class="btn btn-primary">Upload image</label>
                                <input id="upload-image" type="file">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group form-group-default required">
                            <label>Name</label>
                            <input class="form-control" type="text" name='name' v-model="formData.name">
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Address</label>
                            <input class="form-control" type="text" name="email" v-model="formData.address">
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Zip Code</label>
                            <input class="form-control" type="text" name="email" v-model="formData.zipcode">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-5">
                <div class="form-group form-group-default">
                    <label>Email</label>
                    <input class="form-control" name='phone' type="email" v-model="formData.email">
                </div>
                <div class="form-group form-group-default required">
                    <label>Phone</label>
                    <input name='lastname' class="form-control" type="tel">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Language </label>
                 <multiselect :options="settings.languages" v-model="formData.language"/>
            </div>
            <div class="col">
                <label>Timezone</label>
                <multiselect :options="settings.timezones" v-model="formData.timezone"/>
            </div>
        </div>
        <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-primary" :disabled="isLoading" @click="updateCompany"> Save </button>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "CompanyInfo",
    props: {
        company: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isLoading: false,
            formData: {},
            companySchema: {
                createFields: ["name", "timezone", "language"]
            }
        }
    },

    computed:{
        ...mapState("Settings", {
            settings: (state) => {
                return {
                    timezones: state.timezones,
                    languages: state.languages
                }
            }
        })
    },

    watch: {
        company(value) {
            this.formData = value;
        }
    },

    mounted() {
        this.formData = this.company;
    },

    methods: {
        prepareForm(data, fields) {
            const form = {};
            fields.forEach(field => {
                form[field] = data[field]
            })
            return form;
        },
        updateCompany() {
            this.isLoading = true;
            const form = this.prepareForm(this.company, this.companySchema.createFields);

            axios.put(`/companies/${this.formData.id}`, form)
                .then(({data}) => {
                    this.isLoading = false;
                    this.onCompanyUpdate(data)
                })
                .catch(() => {
                    this.isLoading = false;
                })
        },

        readChange(event) {
            console.log(event)
        },

        onCompanyUpdate(company) {
            this.$notify({
                group: null,
                title: "Confirmation",
                text: "the company information has been changed",
                type: "success"
            });
            this.$store.dispatch("Company/setData", company);
        }
    }
};
</script>

<style lang="scss">
.company-general-information {
    .profile-image-container {
        display: flex;
        flex-direction: column;
        width: 160px;
        margin: 0 auto;
        margin-bottom: 15px;

        .profile-image {
            width: 160px;
            height: 160px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(230, 230, 230, 0.7);
        }

        label {
            width: 100%;
            border-radius: 0;
        }

        input[type='file'] {
            display: none;
        }
    }
}
</style>
