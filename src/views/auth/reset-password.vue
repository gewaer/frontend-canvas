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
                <div class="form-group form-group-default required">
                    <label>Password</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.password.validations"
                            ref="password"
                            v-model="form.fields.password.value"
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Credentials"
                            autocomplete="off"
                        >
                        <span class="text-danger">{{ errors.first("password") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Confirm Password</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.verifyPassword.validations"
                            v-model="form.fields.verifyPassword.value"
                            type="password"
                            name="verifyPassword"
                            data-vv-as="password"
                            placeholder="Retype Credentials"
                            class="form-control"
                            autocomplete="off"
                        >
                        <span class="text-danger">{{ errors.first("verifyPassword") }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10" />
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">Reset Password</button>
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
        handleResponse(response) {
            this.$notify({
                title: "Confirmation",
                text: response.data,
                type: "success"
            });

            this.$router.push({
                name: "login"
            });
        }
    }
}
</script>
