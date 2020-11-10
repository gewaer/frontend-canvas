<template>
    <auth-container
        :app-name="appName"
        :background-src="backgroundSrc"
        :logo-src="logoSrc"
        logo-title="Reset your password"
    >
        <template slot="auth-form">
            <form
                class="p-t-15"
                autocomplete="off"
                @submit.prevent="verifyFields()"
            >
                <div :class="{ 'error' : errors.first('password') }" class="form-group form-group-default required">
                    <label>Password</label>
                    <div class="controls">
                        <input
                            ref="password"
                            v-model="form.fields.password.value"
                            v-validate="form.fields.password.validations"
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Credentials"
                            autocomplete="off"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("password") }}</span>
                <div :class="{ 'error' : errors.first('verifyPassword') }" class="form-group form-group-default required">
                    <label>Confirm Password</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.verifyPassword.value"
                            v-validate="form.fields.verifyPassword.validations"
                            type="password"
                            name="verifyPassword"
                            data-vv-as="password"
                            placeholder="Retype Credentials"
                            class="form-control"
                            autocomplete="off"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("verifyPassword") }}</span>
                <button class="btn btn-primary btn-block my-4" type="submit">
                    Reset Password
                </button>
            </form>
        </template>
    </auth-container>
</template>

<script>
import authMixins from "@/mixins/auth";

export default {
    name: "ResetPassword",
    mixins: [
        authMixins
    ],
    data() {
        return {
            form: {
                fields: {
                    password: {
                        map: "new_password",
                        validations: "required|min:8",
                        value: ""
                    },
                    verifyPassword: {
                        map: "verify_password",
                        validations: "required|confirmed:password",
                        value: ""
                    }
                },
                endpoint: `/auth/reset/${this.$route.params.resetKey}`
            }
        }
    },
    methods: {
        handleResponse(data) {
            this.$notify({
                title: "Confirmation",
                text: data,
                type: "success"
            });

            this.$router.push({
                name: "login"
            });
        },

        submitData() {
            if (!this.isLoading) {
                this.isLoading = true;
                const data = this.prepareData(true);
                kanvasSDK.auth.resetPassword(data.new_password, data.verify_password,this.$route.params.resetKey)
                    .then((responseData) => {
                        this.handleResponse(responseData)
                    })
                    .catch(error => {
                        this.$notify({
                            title: "Error",
                            text: error.errors.message,
                            type: "error"
                        });
                    }).finally(() => {
                        this.isLoading = false;
                    })
            }
        }
    }
}
</script>
