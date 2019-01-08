<template>
    <settings-template>
        <div class="row user-general-information">
            <div class="col-12 col-xl m-b-20">
                <h5>Security</h5>
                <div class="row">
                    <div class="col-12 col-md">
                        <div class="form-group form-group-default required">
                            <label>Current password</label>
                            <input
                                v-validate="'required'"
                                v-model="currentPassword"
                                autocomplete="off"
                                class="form-control"
                                type="password"
                                data-vv-as="password"
                                name="password"
                            >
                            <span class="text-danger">{{ errors.first("password") }}</span>
                        </div>
                        <div class="form-group form-group-default required">
                            <label>New password</label>
                            <input
                                v-validate="'required'"
                                v-model="newPassword"
                                autocomplete="off"
                                class="form-control"
                                type="password"
                                data-vv-as="new password"
                                name="new-password"
                            >
                            <span class="text-danger">{{ errors.first("new-password") }}</span>
                        </div>
                        <div class="form-group form-group-default required">
                            <label>Confirm new password</label>
                            <input
                                v-validate="'required'"
                                v-model="confirmNewPassword"
                                autocomplete="off"
                                class="form-control"
                                type="password"
                                data-vv-as="confirm new password"
                                name="confirm-new-password"
                            >
                            <span class="text-danger">{{ errors.first("confirm-new-password") }}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-2">
                    <button :disabled="isLoading" class="btn btn-primary" @click="update()">Change</button>
                </div>
            </div>
            <div class="col-12 col-xl m-b-20"/>
        </div>
    </settings-template>
</template>

<script>
export default {
    name: "Security",
    components: {
        SettingsTemplate: () => import("./tab-container")
    },
    data() {
        return {
            confirmNewPassword: "",
            currentPassword: "",
            isLoading: false,
            newPassword: "",
            userData: null
        }
    },
    created() {
        this.userData = _.clone(this.$store.state.User.data);
    },
    methods: {
        update() {
            if (this.isLoading || this.errors.items.length) {
                return;
            }

            this.isLoading = true;

            axios({
                url: `/users/${this.userData.id}`,
                method: "PUT",
                data: {
                    "confirm_new_password": this.confirmNewPassword,
                    "current_password": this.currentPassword,
                    "new_password": this.newPassword
                }
            }).then(() => {
                this.$notify({
                    group: null,
                    title: "Confirmation",
                    text: "Your password has been changed!",
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
