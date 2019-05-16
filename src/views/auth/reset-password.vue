<template>
    <auth-container>
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="on"
                @submit.prevent="verifyFields()">
                <div class="form-group form-group-default required">
                    <label>Password</label>
                    <div class="controls">
                        <input
                            v-model="data.password"
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Credentials"
                            required
                        >
                    </div>
                </div>

                <div class="form-group form-group-default required">
                    <label>Confirm Password</label>
                    <div class="controls">
                        <input
                            v-model="data.verifyPassword"
                            type="password"
                            name="verifyPassword"
                            placeholder="Retype Credentials"
                            class="form-control"
                            required
                        >
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10"/>
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">{{ form.submitLabel }}</button>
            </form>
        </template>
    </auth-container>
</template>

<script>
import { authMixins } from "@/utils/mixins";
export default {
    name: "ResetPassword",
    components: {
        AuthContainer: () => import(/* webpackChunkName: "auth-background" */ "@v/auth/container")
    },
    mixins: [authMixins],
    data() {
        return {
            data: {
                verifyPassword: "",
                password: ""
            },
            form: {
                data: {
                    password: {
                        map: "new_password",
                        validations: "required|min:8"
                    },
                    verifyPassword: {
                        map: "verify_password",
                        validations: "required|min:8"
                    }
                },
                endpoint: `auth/reset/${this.$route.params.resetKey}`,
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

            this.$router.push({
                name: "login"
            });
        }
    }
}
</script>
