<template>
<div class="row company-general-information">
    <div class="col-12 col-xl m-b-20">
        <h5>Company Information</h5>
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
            <div class="col-12 col-md">
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

        <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-primary" :disabled="isLoading" @click="updateCompany"> Save </button>
        </div>
    </div>
    <div class="col-12 col-xl m-b-20">
        <h5>&nbsp;</h5>
         <div class="row">
            <div class="col-12 col-md">
                <label>Language </label>
                <multiselect
                    v-model="selectedLanguage"
                    :options="languages"
                    label="name"
                    track-by="id"
                    @input="setLanguage"
                />
            </div>
            <div class="col-12 col-md">
                <label>Timezone</label>
                <multiselect
                    v-model="formData.timezone"
                    :maxHeight="175"
                    :options="timezones"
                />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "CompanyInfo",
    data() {
        return {
            isLoading: false,
            formData: {},
            selectedLanguage: null,
            companySchema: {
                createFields: ["name", "timezone", "language"]
            }
        }
    },

    computed:{
        ...mapState("Application", {
            timezones: state => state.timezones,
            languages: state => state.languages
        })
    },

    watch: {
        languages() {
            this.selectedLanguage = this.languages.find(language => language.id == this.userData.language);
        }
    },

    created() {
        this.$store.dispatch("Application/getSettingsLists");
        this.formData = _.clone(this.$store.state.Company.data);
    },

    methods: {
        prepareForm(data, fields) {
            const form = {};
            fields.forEach(field => {
                form[field] = data[field]
            })
            return form;
        },

        setLanguage(value) {
            this.formData.language = value.id;
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
