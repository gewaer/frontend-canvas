<template>
    <div class="row user-general-information">
        <div class="col-12 col-xl m-b-20">
            <h5>General Information</h5>
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
                        <input class="form-control" type="text" name="firstname" v-model="userData.firstname">
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Last name</label>
                        <input name='lastname' class="form-control" type="text" v-model="userData.lastname">
                    </div>
                    <div class="form-group form-group-default">
                        <label>Cell phone</label>
                        <input class="form-control" name='phone' type="text" v-model="userData.phone">
                    </div>
                    <div class="form-group form-group-default required">
                        <label>Email (username)</label>
                        <input class="form-control" type="text" name="email" v-model="userData.email">
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-2">
                <button class="btn btn-primary" :disabled="isLoading" @click="update()">Save</button>
            </div>
        </div>
        <div class="col-12 col-xl m-b-20">
            <h5>&nbsp;</h5>
            <div class="row">
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
                            :maxHeight="175"
                            :options="timezones"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "UserInfo",
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
        })
    },
    watch: {
        languages() {
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
            if (this.isLoading) {
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
