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
                <div :class="{ 'error' : errors.first('email') }" class="form-group form-group-default required">
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
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("email") }}</span>
                <div :class="{ 'error' : errors.first('password') }" class="form-group form-group-default required">
                    <label>Password</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.password.value"
                            v-validate="form.fields.password.validations"
                            type="password"
                            class="form-control"
                            name="password"
                            autocomplete="on"
                            placeholder="Credentials"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("password") }}</span>
                <!-- <div class="row">
                    <div class="col d-flex align-items-center">
                        <div class="checkbox">
                            <input id="remember-me" type="checkbox" value="1">
                            <label for="remember-me">Keep Me Signed in</label>
                        </div>
                    </div>
                    <div class="col d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div> -->
                <button class="btn btn-primary btn-block my-4" type="submit">
                    Sign In
                </button>
                <div v-if="allowUserRegistration" class="text-center small">
                    Don't have an account?
                    <router-link :to="{ name: 'signup' }" class="text-info">
                        Create one!
                    </router-link>
                </div>
                <div class="text-center small">
                    <router-link :to="{ name: 'forgotPassword' }" class="text-info">
                        Forgot Password?
                    </router-link>
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
