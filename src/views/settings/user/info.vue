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
                    <input class="form-control" type="text" name="firstname" v-model="user.firstname">
                </div>
                <div class="form-group form-group-default required">
                    <label>Last name</label>
                    <input name="lastname" class="form-control" type="text" v-model="user.lastname">
                </div>
                <div class="form-group form-group-default">
                    <label>Cell phone</label>
                    <input class="form-control" name="phone" type="text" v-model="user.phone">
                </div>
                <div class="form-group form-group-default required">
                    <label>Email (username)</label>
                    <input class="form-control" type="text" name="email" v-model="user.email">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Language </label>
                <multiselect :options="settings.languages" v-model="user.language"/>
            </div>
            <div class="col">
                <label>Timezone</label>
                <multiselect :options="settings.timezones" v-model="user.timezone"/>
            </div>
        </div>
        <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-primary" :disabled="isLoading" @click="updateUser"> Save </button>
        </div>
    </div>

    <div class="col-12 col-xl m-b-20">
        <h5>Security</h5>
        <div class="row">
            <div class="col">
                <div class="form-group form-group-default required">
                    <label>Current password</label>
                    <input  name="old_password" class="form-control" type="password" autocomplete="off" v-model="security.current_password">
                </div>
                <div class="form-group form-group-default required">
                    <label>New password</label>
                    <input name="password" class="form-control" type="password">
                </div>
                <div class="form-group form-group-default required">
                    <label>Confirm new password</label>
                    <input name="confirmPassword" class="form-control" type="password">
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary"> Change password</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "UserInfo",
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isLoading: false,
            security: {
                currentPassword: "",
                password: "",
                password2: ""
            }
        }
    },
    computed: {
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
        user(value) {
            this.formData = value;
        }
    },
    mounted() {
        this.formData = this.user;
    },
    methods: {
        prepareForm() {
            return {
                email: this.user.email,
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                phone: this.user.phone,
                timezones: this.user.timezone,
                languages: this.user.languages
            }
        },
        updateUser() {
            this.isLoading = true;
            const form = this.prepareForm();
            axios.put(`/users/${this.user.id}`, form)
                .then(({data}) => {
                    this.isLoading = false;
                    this.onUserUpdate(data)
                })
                .catch(() => {
                    this.isLoading = false;
                })
        },

        onUserUpdate(user) {
            this.$notify({
                group: null,
                title: "Confirmation",
                text: "the user information has been changed",
                type: "success"
            });
            this.$store.dispatch("User/setData", user);
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
