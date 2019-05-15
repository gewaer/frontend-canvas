<template>
    <auth-container>
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="on"
                @submit.prevent="submitData()">
                <div class="form-group form-group-default required">
                    <label>{{ form.data.email.label }}</label>
                    <div class="controls">
                        <input
                            v-model="data.email"
                            type="text"
                            name="username"
                            autocomplete="on"
                            placeholder="user@example.com"
                            class="form-control"
                            required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10" />
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">{{ form.submitLabel }}</button>
                <div class="m-t-10">
                    Already have an account?
                    <router-link :to="{ name: 'login' }">Log in!</router-link>
                </div>
            </form>
        </template>
    </auth-container>
</template>

<script>
import { authMixins } from "@/utils/mixins";
export default {
    name: "ForgotPassword",
    components: {
        AuthContainer: () => import(/* webpackChunkName: "auth-background" */ "@v/auth/container")
    },
    mixins: [authMixins],
    data() {
        return {
            data: {
                email: ""
            },
            form: {
                data: {
                    email: {
                        label: "Email",
                        validations: "required|email"
                    }
                },
                endpoint: "auth/forgot",
                submitLabel: "Reset Password",
                title: "Reset your Gewaer password"
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

            this.data.email = "";
            this.$router.push({
                name: "login"
            });
        }

    }
}
</script>
