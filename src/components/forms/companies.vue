<template>
    <div class="row company-general-information">
        <div class="col-12 m-b-20">
            <h5> {{ title }}</h5>
            <div class="row">
                <!-- <div class="col-12 col-md-auto">
                    <div class="profile-image-container">
                        <div class="profile-image">
                            <img class="img-fluid" src="http://logok.org/wp-content/uploads/2014/11/NZXT-Logo-880x660.png">
                        </div>
                        <div class="upload-profile-image">
                            <label for="upload-image" class="btn btn-primary">Upload image</label>
                            <input id="upload-image" type="file">
                        </div>
                    </div>
                </div> -->
                <div class="col-6 col-md">
                    <div class="form-group form-group-default required">
                        <label>Name</label>
                        <input
                            v-model="companyData.name"
                            class="form-control"
                            type="text"
                            name="name">
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Address</label>
                        <input
                            v-model="companyData.address"
                            class="form-control"
                            type="text"
                            name="email">
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Zip Code</label>
                        <input
                            v-model="companyData.zipcode"
                            class="form-control"
                            type="text"
                            name="email">
                    </div>

                    <div class="form-group form-group-default">
                        <label>Email</label>
                        <input
                            v-model="companyData.email"
                            class="form-control"
                            name="phone"
                            type="email">
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Phone</label>
                        <input name="lastname" class="form-control" type="tel">
                    </div>
                </div>

                <div class="col-6 m-b-20">
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
                                v-model="companyData.timezone"
                                :max-height="175"
                                :options="timezones"
                            />
                        </div>
                </div>

            </div>

        </div>

        <div class="col-12 col-xl d-flex justify-content-end mt-2">
            <button :disabled="isLoading" class="btn btn-primary" @click="save()"> Save </button>
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
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            isLoading: false,
            companyData: null,
            selectedLanguage: null
        }
    },

    computed:{
        ...mapState("Application", {
            timezones: state => state.timezones,
            languages: state => state.languages
        }),
        title() {
            if (!this.company.id) {
                return "Add company";
            } else {
                return "Edit company";
            }
        }
    },

    watch: {
        languages() {
            this.selectedLanguage = this.languages.find(language => language.id == this.companyData.language);
        },
        company() {
            this.setCompany();
        }
    },

    created() {
        this.$store.dispatch("Application/getSettingsLists");
        this.setCompany();
    },

    methods: {
        setCompany() {
            this.companyData = _.clone(this.company);
        },
        setLanguage(value) {
            this.companyData.language = value.id;
        },

        save() {
            let url;
            let method;

            if (!this.companyData.id) {
                url = "/companies";
                method = "POST";
            } else {
                url = `/companies/${this.companyData.id}`;
                method = "PUT";
            }

            this.sendRequest(url, method);
        },
        sendRequest(url, method) {
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;

            axios({
                url,
                method,
                data: this.companyData
            }).then(({data}) => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "The company information has been changed",
                    type: "success"
                });
            }).catch((error) => {
                this.$notify({
                    group: null,
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                 this.isLoading = false;
            });
        },
    }
};
</script>

<style lang="scss">
.company-general-information {
    margin: 20px 15px;
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
