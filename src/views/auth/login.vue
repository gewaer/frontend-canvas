<template>
    <auth-container
        :app-name="appName"
        :background-src="backgroundSrc"
        :logo-src="logoSrc"
        logo-title="Sign into your account"
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
                            v-validate="form.fields.email.validations"
                            v-model="form.fields.email.value"
                            type="text"
                            name="email"
                            autocomplete="on"
                            placeholder="user@example.com"
                            class="form-control"
                        >
                        <span class="text-danger">{{ errors.first("email") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Password</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.password.validations"
                            v-model="form.fields.password.value"
                            type="password"
                            class="form-control"
                            name="password"
                            autocomplete="on"
                            placeholder="Credentials"
                        >
                        <span class="text-danger">{{ errors.first("password") }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10">
                        <div class="checkbox">
                            <input id="remember-me" type="checkbox" value="1">
                            <label for="remember-me">Keep Me Signed in</label>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">Sign In</button>
                <div v-if="allowUserRegistration" class="m-t-10">
                    Don't have an account?
                    <router-link :to="{ name: 'signup' }">Create one!</router-link>
                </div>
                <div class="m-t-10">
                    <router-link :to="{ name: 'forgotPassword' }">Forgot Password?</router-link>
                </div>
            </form>
        </template>
    </auth-container>
</template>

<script>
import authMixins from "@/mixins/auth";

export default {
    name: "Login",
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
                    },
                    password: {
                        validations: "required|min:8",
                        value: ""
                    }
                },
                endpoint: "/auth"
            }
        }
    }
}
</script>
