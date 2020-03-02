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
                <button class="btn btn-primary btn-block my-4" type="submit">
                    Sign In
                </button>
                <social-auth />
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
import socialAuth from "@c/social-auth.vue";

export default {
    name: "Login",
    components: {
        socialAuth
    },
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
