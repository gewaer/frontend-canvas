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
                                <profile-upload
                                    :avatar-url="avatarUrl"
                                    endpoint="/filesystem"
                                    @uploaded="updateProfile"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-xl">
                            <custom-fields-form
                                :form-fields="fieldsSchema"
                                :form-name="'generalInformation'"
                                :form-options="formOptions"
                                @formSubmitted="formSubmitted"
                            />
                        </div>
                    </div>
                </div>
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
        ContainerTemplate: () => import(/* webpackChunkName: "settings-container" */ "@v/settings/container"),
        CustomFieldsForm: () => import(/* webpackChunkName: "components-forms-form" */ "@/components/forms/form"),
        ProfileUpload: () => import(/* webpackChunkName: "profile-upload" */ "@/components/profileUpload/profile-upload"),
        TabsMenu: () => import(/* webpackChunkName: "settings-users-tabs" */ "@v/settings/users/tabs")
    },
    mixins: [
        vueRouterMixins,
        vuexMixins
    ],
    data() {
        return {
            avatarUrl: "http://img2.thejournal.ie/inline/2470754/original?width=428&version=2470754",
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
            fieldsSchema: [],
            formOptions: {
                buttons: {
                    submit: {
                        text: "Save",
                        class: "btn btn-primary"
                    }
                },
                actionsWrapperClass: "d-flex justify-content-end mt-2"
            }
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
            this.generateFieldsSchema();
            this.setAvatarUrl();
        },
        generateFieldsSchema() {
            this.fieldsSchema = [
                [
                    {
                        field: "firstname",
                        label: "First name",
                        type: "text",
                        value: this.userData.firstname,
                        attributes: {
                            class: {
                                "form-control": true
                            }
                        },
                        wrapperAttributes: {
                            class: {
                                "form-group": true,
                                "form-group-default": true,
                                required: true
                            }
                        },
                        validations: {
                            required: true
                        }
                    },
                    {
                        field: "language",
                        label: "Language",
                        type: "select",
                        options: this.languages,
                        value: this.selectedLanguage,
                        attributes: {
                            allowEmpty: false,
                            label: "name",
                            "show-labels": false,
                            "track-by": "id"
                        },
                        wrapperAttributes: {
                            class: {
                                "form-group": true,
                                required: true
                            }
                        }
                    }
                ],
                [
                    {
                        field: "lastname",
                        label: "Last name",
                        type: "text",
                        value: this.userData.lastname,
                        attributes: {
                            class: {
                                "form-control": true
                            }
                        },
                        wrapperAttributes: {
                            class: {
                                "form-group": true,
                                "form-group-default": true,
                                required: true
                            }
                        },
                        validations: {
                            required: true
                        }
                    },
                    {
                        field: "timezone",
                        label: "Timezone",
                        type: "select",
                        options: this.timezones,
                        value: this.userData.timezone,
                        attributes: {
                            allowEmpty: false,
                            "show-labels": false
                        },
                        wrapperAttributes: {
                            class: {
                                "form-group": true,
                                required: true
                            }
                        }
                    }
                ],
                [
                    {
                        field: "phone",
                        label: "Phone",
                        type: "text",
                        value: this.userData.cell_phone_number,
                        attributes: {
                            class: {
                                "form-control": true
                            }
                        },
                        wrapperAttributes: {
                            class: {
                                "form-group": true,
                                "form-group-default": true
                            }
                        },
                        validations: {
                            numeric: true
                        }
                    },
                    {
                        field: "locale",
                        label: "Location",
                        type: "select",
                        options: this.locales,
                        value: this.selectedLocale,
                        attributes: {
                            allowEmpty: false,
                            label: "name",
                            "show-labels": false,
                            "track-by": "id"
                        },
                        wrapperAttributes: {
                            class: {
                                "form-group": true,
                                required: true
                            }
                        }
                    }
                ],
                [
                    {
                        field: "email",
                        label: "Email",
                        type: "text",
                        value: this.userData.email,
                        attributes: {
                            class: {
                                "form-control": true
                            }
                        },
                        wrapperAttributes: {
                            class: {
                                "form-group": true,
                                "form-group-default": true,
                                required: true
                            }
                        },
                        validations: {
                            email: true,
                            required: true
                        }
                    }
                ]
            ]
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
        setAvatarUrl() {
            if (this.userData.filesystem && this.userData.filesystem.length) {
                this.avatarUrl = this.userData.filesystem[0].url
            }
        },
        formSubmitted(data) {
            data.values.language = data.values.language.id;
            data.values.locale = data.values.locale.id;

            Object.keys(data.values).forEach((field) => {
                this.userData[field] = data.values[field];
            });

            this.update();
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
