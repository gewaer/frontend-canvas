<template>
    <div class="row company-general-information">
        <div class="col-12 m-b-20">
            <h5> {{ title }}</h5>
            <div class="row">
                <div class="col-6 col-md">
                    <div class="form-group form-group-default required">
                        <label>Name</label>
                        <input
                            v-validate="'required:true|min:2|alpha_spaces'"
                            v-model="companyData.name"
                            class="form-control"
                            type="text"
                            name="name">
                        <span class="text-danger"> {{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Address</label>
                        <input
                            v-validate="'required:true|min:2'"
                            v-model="companyData.address"
                            class="form-control"
                            type="text"
                            data-vv-as="company address"
                            name="company-address">
                        <span class="text-danger"> {{ errors.first('company-address') }}</span>
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Zip Code</label>
                        <input
                            v-validate="'required:true|numeric|min:2'"
                            v-model="companyData.zipcode"
                            class="form-control"
                            type="text"
                            data-vv-as="zip code"
                            name="zipcode">
                        <span class="text-danger"> {{ errors.first('zipcode') }}</span>
                    </div>

                    <div class="form-group form-group-default">
                        <label>Email</label>
                        <input
                            v-validate="'required|email'"
                            v-model="companyData.email"
                            class="form-control"
                            name="email"
                            type="email">
                        <span class="text-danger"> {{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Phone</label>
                        <input
                            v-validate="'required|numeric'"
                            v-model="companyData.phone"
                            class="form-control"
                            data-vv-as="phone number"
                            name="phone"
                            type="tel">
                        <span class="text-danger"> {{ errors.first('phone') }}</span>
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
            <button :disabled="isLoading" class="btn btn-danger m-r-10" @click="triggerCancel">Cancel</button>
            <button :disabled="isLoading || !hasChanged" class="btn btn-primary" @click="save()"> Save </button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import { vueCrudMixins } from "@/utils/mixins";

export default {
    name: "CompanyCrud",
    mixins: [
        vueCrudMixins
    ],
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
        },
        hasChanged() {
            return !_.isEqual(this.companyData, this.company);
        }
    },

    watch: {
        "companyData.language"() {
            this.setInitialLanguage();
        },
        company() {
            this.setCompany();
        }
    },

    mounted() {
        this.setInitialLanguage();
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

        setInitialLanguage() {
            this.selectedLanguage = this.languages.find(language => language.id == this.companyData.language);
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

            this.$validator.validate().then((result) => {
                if (result) {
                    this.sendRequest(url, method);
                }
            })

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
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "The company information has been changed",
                    type: "success"
                });
                this.$emit("changeView", "companiesList");
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

        cancel() {
            this.$emit("changeView", "companiesList");
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
