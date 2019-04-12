<template>
    <container-template>
        <tabs-menu slot="tab-menu"/>
        <template slot="tab-content">
            <h5>General Information</h5>
            <div class="row user-general-information">
                <div class="col-12 col-xl">
                    <div class="row">
                        <div class="col-12 col-md-auto">
                            <div class="profile-image-container">
                                <profile-uploader
                                    :avatar-url="avatarUrl"
                                    endpoint="/filesystem"
                                    @uploaded="updateProfile"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="form-group form-group-default required">
                                <label>First name</label>
                                <input
                                    v-validate="'required'"
                                    v-model="userData.firstname"
                                    class="form-control"
                                    data-vv-as="first name"
                                    data-vv-name="first name"
                                    type="text"
                                    name="firstname"
                                >
                                <span class="text-danger">{{ errors.first("first name") }}</span>
                            </div>
                            <div class="form-group form-group-default required">
                                <label>Last name</label>
                                <input
                                    v-validate="'required'"
                                    v-model="userData.lastname"
                                    class="form-control"
                                    data-vv-as="last name"
                                    data-vv-name="last name"
                                    name="lastname"
                                    type="text"
                                >
                                <span class="text-danger">{{ errors.first("last name") }}</span>
                            </div>
                            <div class="form-group form-group-default">
                                <label>Phone</label>
                                <input
                                    v-validate="'numeric'"
                                    v-model="userData.cell_phone_number"
                                    class="form-control"
                                    name="phone"
                                    type="text"
                                >
                                <span class="text-danger">{{ errors.first('phone') }}</span>
                            </div>
                            <div class="form-group form-group-default required">
                                <label>Email (username)</label>
                                <input
                                    v-validate="'required|email'"
                                    v-model="userData.email"
                                    class="form-control"
                                    type="text"
                                    name="email"
                                >
                                <span class="text-danger">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl">
                    <div class="row">
                        <div class="col-12 col-md">
                            <div class="form-group">
                                <label>Language</label>
                                <multiselect
                                    v-model="selectedLanguage"
                                    :allow-empty="false"
                                    :options="languages"
                                    deselect-label=""
                                    label="name"
                                    select-label=""
                                    track-by="id"
                                    @input="setSelectValue($event, 'language')"
                                />
                            </div>
                            <div class="form-group">
                                <label>Timezone</label>
                                <multiselect
                                    v-model="userData.timezone"
                                    :allow-empty="false"
                                    :max-height="175"
                                    :options="timezones"
                                    deselect-label=""
                                    select-label=""
                                />
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <multiselect
                                    v-model="selectedLocale"
                                    :allow-empty="false"
                                    :max-height="175"
                                    :options="locales"
                                    label="name"
                                    track-by="id"
                                    deselect-label=""
                                    select-label=""
                                    @input="setSelectValue($event, 'country_id')"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-2">
                <button :disabled="isLoading" class="btn btn-primary" @click="processUpdate()">Save</button>
            </div>
        </template>
    </container-template>
</template>

<script>
import { mapState } from "vuex";
import { vueRouterMixins, vuexMixins } from "@/utils/mixins";

export default {
    name: "Profile",
    components: {
        // ProfileUpload: () => import(/* webpackChunkName: "profile-upload" */ "@/components/profileUpload/profile-upload"),
        FileUploader: () => import(/* webpackChunkName: "profile-upload" */ "@c/uploaders/file-uploader"),
        ProfileUploader: () => import(/* webpackChunkName: "profile-upload" */ "@c/uploaders/profile-uploader"),
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        TabsMenu: () => import(/* webpackChunkName: "settings-users-tabs" */ "@v/settings/users/tabs")
    },
    mixins: [
        vueRouterMixins,
        vuexMixins
    ],
    data() {
        return {
            isLoading: false,
            selectedLanguage: null,
            selectedLocale: null,
            userData: {
                firstname: "",
                language: null,
                lastname: "",
                email: "",
                phone: "",
                timezone: "",
                country_id:""
            },
            avatarUrl: ""
        }
    },
    computed: {
        ...mapState("Application", {
            timezones: state => state.timezones,
            languages: state => state.languages,
            locales: state => state.locales
        })
    },
    created() {
        this.initialize();
    },
    methods: {
        async initialize() {
            await this.$store.dispatch("Application/getSettingsLists");
            this.userData = _.clone(this.$store.state.User.data);
            this.setInitialSelects();
            this.setAvatarUrl();
        },
        setSelectValue(value, formField, idName = "id") {
            this.userData[formField] = value[idName];
        },

        async processUpdate() {
            await this.$validator.validateAll();
            if (!this.errors.items.length && !this.isLoading) {
                this.update();
            }
        },

        update(formData) {
            formData = formData || this.userData
            this.isLoading = true;

            axios({
                url: `/users/${this.userData.id}`,
                method: "PUT",
                data: formData
            }).then((response) => {
                this.$store.dispatch("User/setData", response.data);

                this.$notify({
                    title: "Confirmation",
                    text: "Your information has been updated successfully!",
                    type: "success"
                });
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },
        setInitialSelects() {
            this.selectedLanguage = this.languages.find(language => language.id == this.userData.language);
            this.selectedLocale = this.locales.find(locale => locale.id == this.userData.country_id);
        },

        updateProfile(profile, data) {
            const formData = {
                filesystem_files: data.map(profile => profile.id)
            };
            /* axios({
                url: `/filesystem/${this.userData.id}`,
                method: "PUT",
                data: formData
            }).then((response) => {
            }).catch((error) => {

            }).finally(() => {
            });*/
            this.avatarUrl = profile.url;
            this.update(formData);
        },

        setAvatarUrl() {
            if (this.userData.filesystem && this.userData.filesystem.length) {
                this.avatarUrl = this.userData.filesystem[0].url
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.user-general-information {
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
