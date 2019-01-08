<template>
    <settings-template>
        <h5>General Information</h5>
        <div class="row user-general-information">
            <div class="col-12 col-xl">
                <div class="row">
                    <div class="col-12 col-md-auto">
                        <div class="profile-image-container">
                            <div class="profile-image">
                                <img class="img-fluid" src="http://img2.thejournal.ie/inline/2470754/original?width=428&version=2470754">
                            </div>
                            <div class="upload-profile-image">
                                <label for="upload-image" class="btn btn-primary">Upload image</label>
                                <input id="upload-image" type="file">
                            </div>
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
                                v-model="userData.phone"
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
                                @input="setLanguage"
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
                            <label>Locale</label>
                            <multiselect
                                :allow-empty="false"
                                :max-height="175"
                                :options="[ 'Guatemala', 'Honduras', 'Mexico', 'Panama', 'Nicaragua' ]"
                                deselect-label=""
                                select-label=""
                            />
                        </div>
                        <div class="form-group">
                            <label>Default Currency</label>
                            <multiselect
                                :allow-empty="false"
                                :max-height="175"
                                :options="[ 'Dominican Peso (DOP)', 'US DOllar (USD)', 'Venezuelan Bolivar (VEB)' ]"
                                deselect-label=""
                                select-label=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end mt-2">
            <button :disabled="isLoading" class="btn btn-primary" @click="update()">Save</button>
        </div>
    </settings-template>
</template>

<script>
import { mapState } from "vuex";
import { vueRouterMixins } from "@/utils/mixins";

export default {
    name: "Profile",
    components: {
        SettingsTemplate: () => import("./tab-container")
    },
    mixins: [
        vueRouterMixins
    ],
    data() {
        return {
            isLoading: false,
            selectedLanguage: null,
            userData: {
                firstname: "",
                languages: null,
                lastname: "",
                email: "",
                phone: "",
                timezone: ""
            }
        }
    },
    computed: {
        ...mapState("Application", {
            timezones: state => state.timezones,
            languages: state => state.languages
        })
    },
    watch: {
        "userData.languages"() {
            this.selectedLanguage = this.languages.find(language => language.id == this.userData.language);
        }
    },
    created() {
        this.$store.dispatch("Application/getSettingsLists");
        this.userData = _.clone(this.$store.state.User.data);
    },
    methods: {
        setLanguage(value) {
            this.userData.language = value.id;
        },
        update() {
            if (this.errors.items.length || this.isLoading) {
                return;
            }

            this.isLoading = true;

            axios({
                url: `/users/${this.userData.id}`,
                method: "PUT",
                data: this.userData
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
