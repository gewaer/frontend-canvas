<template>
    <auth-container>
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="on"
                @submit.prevent="verifyFields()">
                <div class="form-group form-group-default required">
                    <label>{{ form.data.email.label }}</label>
                    <div class="controls">
                        <input
                            v-validate="validations.email"
                            v-model="data.email"
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
                            v-validate="validations.password"
                            v-model="data.password"
                            type="password"
                            class="form-control"
                            name="password"
                            autocomplete="on"
                            placeholder="Credentials"
                        >
                        <span class="text-danger">{{ errors.first('password') }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10">
                        <div class="checkbox">
                            <input id="checkbox1" type="checkbox" value="1">
                            <label for="checkbox1">Keep Me Signed in</label>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">{{ form.submitLabel }}</button>
                <div class="m-t-10">
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
import { authMixins } from "@/utils/mixins";
export default {
    name: "Login",
    components: {
        AuthContainer: () => import(/* webpackChunkName: "auth-container" */ "@v/auth/container")
    },
    mixins: [authMixins],
    data() {
        return {
            data: {
                email: "",
                password: ""
            },
            form: {
                data: {
                    email: {
                        label: "Email",
                        validations: "required|email"
                    },
                    password: {
                        validations: "required|min:8"
                    }
                },
                endpoint: "auth",
                submitLabel: "Sign In",
                title: "Sign into your Gewaer account"
            }
        }
    }

}
</script>
