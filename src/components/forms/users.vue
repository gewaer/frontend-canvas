<template>
    <div class="row user-general-information">
        <div class="col-12 m-b-20">
            <h5 class="form-title">{{ title }}</h5>
            <div class="row">
                <div class="col-6 col-md">
                    <div class="form-group form-group-default required">
                        <label>First name</label>
                        <input
                            v-model="userData.firstname"
                            class="form-control"
                            type="text"
                            name="firstname">
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Last name</label>
                        <input
                            v-model="userData.lastname"
                            name="lastname"
                            class="form-control"
                            type="text">
                    </div>
                    <div class="form-group form-group-default">
                        <label>Cell phone</label>
                        <input
                            v-model="userData.phone"
                            class="form-control"
                            name="phone"
                            type="text">
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Email (username)</label>
                        <input
                            v-model="userData.email"
                            class="form-control"
                            type="text"
                            name="email">
                    </div>
                </div>

                <div class="col-6 m-b-20">
                    <div class="col-12 col-md">
                        <div class="form-group">
                            <label>Language</label>
                            <multiselect
                                v-model="selectedLanguage"
                                :options="languages"
                                label="name"
                                track-by="id"
                                @input="setLanguage"
                            />
                        </div>
                        <div class="form-group">
                            <label>Timezone</label>
                            <multiselect
                                v-model="userData.timezone"
                                :max-height="175"
                                :options="timezones"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 col-xl d-flex justify-content-end mt-2">
            <button :disabled="isLoading" class="btn btn-primary" @click="save()">Save</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "UserInfo",
    props: {
        user: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            isLoading: false,
            selectedLanguage: null,
            userData: null
        }
    },
    computed: {
        ...mapState("Application", {
            timezones: state => state.timezones,
            languages: state => state.languages
        }),
        title() {
            if (!this.userData.id) {
                return "New User";
            }
            return "Edit User";
        }
    },
    watch: {
        languages() {
            this.selectedLanguage = this.languages.find(language => language.id == this.userData.language);
        },
        user() {
            this.setUser();
        }
    },
    created() {
        this.$store.dispatch("Application/getSettingsLists");
        this.setUser();
    },
    methods: {
        setUser() {
            this.userData = _.clone(this.user);
        },

        setLanguage(value) {
            this.userData.language = value.id;
        },

        save() {
            let url;
            let method;

            if (!this.userData.id) {
                url = "/users";
                method = "POST";
            } else {
                url = `/users/${this.userData.id}`;
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
                data: this.userData
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "Your information has been updated!",
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
        }
    }
};
</script>

<style lang="scss">
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
