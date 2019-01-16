<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <div slot="tab-content" class="row company-general-information">
            <div class="col-12 col-xl m-b-20">
                <h5>Company Profile</h5>
                <div class="row">
                    <div class="col-12 col-md-auto">
                        <div class="profile-image-container">
                            <profile-upload
                                :avatar-url="avatarUrl"
                                endpoint="/filesystem"
                                @uploaded="updateProfile"
                            />
                        </div>
                    </div>
                    <div class="col-12 col-md">
                        <div class="form-group form-group-default required">
                            <label>Name</label>
                            <input
                                v-validate="'required'"
                                v-model="companyData.name"
                                name="name"
                                type="text"
                                class="form-control"
                            >
                            <span class="text-danger">{{ errors.first('name') }}</span>
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Address</label>
                            <input
                                v-validate="'required'"
                                v-model="companyData.address"
                                data-vv-as="company address"
                                name="company-address"
                                type="text"
                                class="form-control"
                            >
                            <span class="text-danger">{{ errors.first('company-address') }}</span>
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Zip Code</label>
                            <input
                                v-validate="'required|numeric'"
                                v-model="companyData.zipcode"
                                class="form-control"
                                type="number"
                                data-vv-as="zip code"
                                name="zipcode"
                            >
                            <span class="text-danger">{{ errors.first('zipcode') }}</span>
                        </div>
                        <div class="form-group form-group-default">
                            <label>Email</label>
                            <input
                                v-validate="'required|email'"
                                v-model="companyData.email"
                                class="form-control"
                                name="email"
                                type="email"
                            >
                            <span class="text-danger">{{ errors.first('email') }}</span>
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Phone</label>
                            <input
                                v-validate="'required|numeric'"
                                v-model="companyData.phone"
                                data-vv-as="phone number"
                                name="phone"
                                type="tel"
                                class="form-control"
                            >
                            <span class="text-danger">{{ errors.first('phone') }}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-2">
                    <button :disabled="isLoading || !hasChanged" class="btn btn-primary" @click="processUpdate()">
                        Save
                    </button>
                </div>
            </div>
            <div class="col-12 col-xl m-b-20">
                <h5>&nbsp;</h5>
                <div class="row">
                    <div class="col-12 col-md">
                        <label>Language</label>
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
    </container-template>
</template>

<script>
import { mapState } from "vuex";
import { vueRouterMixins } from "@/utils/mixins";
import clone from "lodash/clone";
import some from "lodash/some";

export default {
    name: "CompanyProfile",
    components: {
        ProfileUpload: () => import(/* webpackChunkName: "profile-upload" */ "@/components/profileUpload/profile-upload"),
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-apps-tabs" */ "@v/settings/companies/tabs")
    },
    mixins: [
        vueRouterMixins
    ],
    data() {
        return {
            isLoading: false,
            companyData: {
                language: null
            },
            avatarUrl: "http://logok.org/wp-content/uploads/2014/11/NZXT-Logo-880x660.png",
            selectedLanguage: null
        }
    },
    computed:{
        ...mapState({
            company: state => state.Company.data,
            languages: state => state.Application.languages,
            timezones: state => state.Application.timezones
        }),
        hasChanged() {
            return some(this.vvFields, field => field.changed);
        }
    },
    watch: {
        languages() {
            this.setInitialLanguage()
        },
        "companyData.languages"() {
            this.setInitialLanguage()
        },
        company(company) {
            this.companyData = _.clone(company);
        }
    },

    async created() {
        await this.$store.dispatch("Application/getSettingsLists");
        this.companyData = clone(this.company);
        this.setInitialLanguage()
        this.setAvatarUrl();
    },
    methods: {
        setLanguage(value) {
            this.companyData.language = value.id;
        },

        setInitialLanguage() {
            this.selectedLanguage = this.languages.find(language => language.id == this.companyData.language);
        },

        updateProfile(profile) {
            if (typeof profile == "string") {
                this.avatarUrl = profile;
            } else {
                const formData = {
                    filesystem_files: profile.map(profile => profile.id)
                };
                this.avatarUrl = profile[0].url;

                this.update(formData);
            }
        },

        async processUpdate() {
            await this.$validator.validateAll();
            if (!this.isLoading && !this.errors.any()) {
                this.isLoading = true;
                this.update();
            }
        },
        async update(formData) {
            formData = formData || this.companyData;

            axios({
                url: `/companies/${this.companyData.id}`,
                method: "PUT",
                data: formData
            })
                .then(this.onSuccess)
                .catch(this.onError)
                .finally(() => {
                    this.isLoading = false;
                })
        },

        onError() {
            this.$notify({
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
        },

        onSuccess({data}) {
            this.$store.dispatch("Company/setData", data);

            this.$notify({
                title: "Confirmation",
                text: "Company information has been updated successfully!",
                type: "success"
            });
        },

        setAvatarUrl() {
            if (this.companyData.filesystem && this.companyData.filesystem.length) {
                this.avatarUrl = this.companyData.filesystem[0].url
            }
        }
    }
};
</script>

<style lang="scss" scoped>
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
