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
                autocomplete="on"
                @submit.prevent="verifyFields()"
            >
                <div class="form-group form-group-default required">
                    <label>Email</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.email.value"
                            v-validate="form.fields.email.validations"
                            type="text"
                            name="email"
                            autocomplete="on"
                            placeholder="user@example.com"
                            class="form-control"
                        >
                        <span class="text-danger">{{ errors.first("email") }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10" />
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">
                    Reset Password
                </button>
                <div class="m-t-10">
                    Already have an account?
                    <router-link :to="{ name: 'login' }">
                        Log in!
                    </router-link>
                </div>
            </form>
        </template>
    </auth-container>
</template>

<script>
import authMixins from "@/mixins/auth";

export default {
    name: "ForgotPassword",
    mixins: [
        authMixins
    ],
    data() {
        return {
            form: {
                fields: {
                    email: {
                        validations: "required|email",
                        value: ""
                    }
                },
                endpoint: "/auth/forgot"
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

            this.email = "";

            this.$router.push({
                name: "login"
            });
        }
    }
}
</script>
