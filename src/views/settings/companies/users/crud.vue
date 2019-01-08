<template>
    <div>
        <h5 class="form-title">{{ title }}</h5>
        <div class="row user-general-information">
            <div class="col-12 m-b-20">
                <div class="row">
                    <div class="col-6 col-md">
                        <div v-if="isEditUser" class="form-group form-group-default required">
                            <label>First name</label>
                            <input
                                v-validate="'required:true|min:2|alpha_spaces'"
                                v-model="userData.firstname"
                                class="form-control"
                                type="text"
                                name="firstname"
                                data-vv-as="First Name"
                                data-vv-name="First Name">
                            <span class="text-danger">{{ errors.first("First Name") }}</span>
                        </div>
                        <div v-if="isEditUser" class="form-group form-group-default required">
                            <label>Last name</label>
                            <input
                                v-validate="'required:true|min:2|alpha_spaces'"
                                v-model="userData.lastname"
                                data-vv-as="Last Name"
                                data-vv-name="Last Name"
                                name="lastname"
                                class="form-control"
                                type="text">
                            <span class="text-danger">{{ errors.first("Last Name") }}</span>
                        </div>
                        <div v-if="isEditUser" class="form-group form-group-default">
                            <label>Cell phone</label>
                            <input
                                v-validate="'min:2|numeric'"
                                v-model="userData.phone"
                                data-vv-as="Cell phone"
                                data-vv-name="Cell phone"
                                class="form-control"
                                name="phone"
                                type="text">
                            <span class="text-danger">{{ errors.first("Cell phone") }}</span>
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Email (username)</label>
                            <input
                                v-validate="'required:true|email'"
                                v-model="userData.email"
                                data-vv-as="Email (username)"
                                data-vv-name="Email (username)"
                                class="form-control"
                                type="text"
                                name="email">
                            <span class="text-danger">{{ errors.first("Email (username)") }}</span>
                        </div>
                    </div>

                    <div class="col-6 m-b-20">
                        <div class="col-12 col-md">
                            <div v-if="isEditUser" class="form-group">
                                <label>Language</label>
                                <multiselect
                                    v-model="selectedLanguage"
                                    :options="languages"
                                    label="name"
                                    track-by="id"
                                    @input="setLanguage"
                                />
                            </div>
                            <div v-if="isEditUser" class="form-group">
                                <label>Timezone</label>
                                <multiselect
                                    v-model="userData.timezone"
                                    :max-height="175"
                                    :options="timezones"
                                />
                            </div>
                            <div class="form-group">
                                <label>Role
                                    <span class="multiseletc-required">*</span>
                                </label>
                                <multiselect
                                    v-validate="'required:true'"
                                    v-model="selectedRole"
                                    :max-height="175"
                                    :options="roles"
                                    data-vv-as="role"
                                    data-vv-name="role"
                                    label="name"
                                    track-by="id"
                                    @input="setRole"
                                />
                                <span class="text-danger">{{ errors.first("role") }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-xl d-flex justify-content-end mt-2">
                <button :disabled="isLoading" class="btn btn-danger m-r-10" @click="triggerCancel">Cancel</button>
                <button :disabled="isLoading" class="btn btn-primary" @click="verifyFields">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { vueCrudMixins } from "@/utils/mixins";

export default {
    name: "UserCrud",
    mixins: [
        vueCrudMixins
    ],
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
            selectedRole: null,
            userData:null
        }
    },
    computed: {
        ...mapState("Application", {
            timezones: state => state.timezones,
            languages: state => state.languages,
            roles: state => state.roles
        }),
        title() {
            let title = "New User"
            if (this.isEditUser) {
                title= "Edit User";
            }
            return title;
        },
        isEditUser(){
            let value = true;
            if (!this.userData.id){
                value = false;
            }
            return value;
        }
    },
    watch: {
        languages() {
            this.selectedLanguage = this.languages.find(language => language.id == this.userData.language);
        },
        user() {
            this.setUser();
        },
        roles(){
            this.selectedRole = this.roles.find(role => role.id == this.userData.roles_id);
        },
        "userData.language"() {
            this.selectedLanguage = this.languages.find(language => language.id == this.userData.language);
        },
        "userData.roles_id"() {
            this.selectedRole = this.roles.find(role => role.id == this.userData.roles_id);
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
        setRole(value) {
            this.userData.roles_id = value.id;
        },
        verifyFields(){
            let dialogProps = {
                title:"Invite User!",
                message:`Did you want to invite a new user to your company?`};

            if (this.userData.id) {
                dialogProps = { title:"Edit User!",
                    message:`Did you want to Edit this user?`};
            }
            if(this.errors.items.length){
                let verificationMessage = this.errors.items[0].msg;
                let verificationTitle = `Please verify the ${this.errors.items[0].field}`;
                this.$notify({
                    title: verificationTitle,
                    text: verificationMessage,
                    type: "warn"
                });
            } else {
                this.validateFields(dialogProps);
            }
        },
        validateFields(modalProps){
            this.$validator.validate().then(result => {
                if (result) {
                    this.$modal.show("basic-modal", {
                        ...modalProps,
                        buttons: [{
                            title: "Accept",
                            class: "btn-primary",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                                this.save();
                            }
                        }, {
                            title: "Cancel",
                            class: "btn-danger",
                            handler: () => {
                                this.$modal.hide("basic-modal");
                            }
                        }]
                    });
                }
            });
        },
        save() {
            let url;
            let method;
            let data;
            if (!this.userData.id) {
                url = "/users/invite";
                method = "POST";
                let form = new FormData();
                form.append("email", this.userData.email);
                form.append("role_id", this.selectedRole.id);
                data = form;
            } else {
                url = `/users/${this.userData.id}`;
                method = "PUT";
                data =  this.userData;
            }

            if (!this.isLoading) {
                this.sendRequest(url, method, data);
            }
        },
        sendRequest(url, method, data) {


            this.isLoading = true;

            axios({
                url,
                method,
                data
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "Your information has been updated!",
                    type: "success"
                });
                this.$emit("changeView", "UsersList");
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
            this.$emit("changeView", "UsersList");
        }
    }
};
</script>

<style lang="scss">
.user-general-information {
    margin: 20px;
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

    .multiseletc-required {
        color: #f55753;
        font-family: arial;
        font-size: 20px;
    }
}
</style>
