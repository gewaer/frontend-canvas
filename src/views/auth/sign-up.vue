<template>
    <auth-container>
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="on"
                @submit.prevent="verifyFields()">
                <div class="form-group form-group-default required">
                    <label>First Name</label>
                    <div class="controls">
                        <input
                            v-model="data.firstname"
                            type="text"
                            name="firstname"
                            placeholder="John"
                            class="form-control"
                            required
                        >
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Last Name</label>
                    <div class="controls">
                        <input
                            v-model="data.lastname"
                            type="text"
                            name="lastname"
                            placeholder="Smith"
                            class="form-control"
                            required
                        >
                    </div>
                </div>
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
                            required
                        >
                    </div>
                </div>

                <div class="form-group form-group-default required">
                    <label>Password</label>
                    <div class="controls">
                        <input
                            v-model="data.password"
                            type="password"
                            class="form-control"
                            name="password"
                            autocomplete="on"
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
                            autocomplete="on"
                            placeholder="Retype Credentials"
                            class="form-control"
                            required
                        >
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Company Name</label>
                    <div class="controls">
                        <input
                            v-model="data.company"
                            type="text"
                            name="company"
                            placeholder="John Smith Co."
                            class="form-control"
                            required
                        >
                    </div>
                </div>
                <div class="form-group form-group-default">
                    <label>Have a promo code?</label>
                    <div class="controls">
                        <input
                            type="text"
                            name="company"
                            class="form-control"
                        >
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
    name: "SignUp",
    components: {
        AuthContainer: () => import(/* webpackChunkName: "auth-background" */ "@v/auth/container")
    },
    mixins: [authMixins],
    data() {
        return {
            data: {
                company: "",
                email: "",
                firstname: "",
                lastname: "",
                password: ""
            },
            form: {
                data: {
                    firstname: {
                        validations: "required"
                    },
                    lastname: {
                        validations: "required"
                    },
                    company: {
                        map: "default_company",
                        validations: "required"
                    },
                    email: {
                        label: "Email",
                        validations: "required|email"
                    },

                    password: {
                        validations: "required|min:8"
                    },
                    verifyPassword: {
                        map: "verify_password",
                        validations: "required|confirmed:password"
                    }
                },
                endpoint: "users",
                submitLabel: "Sign Up",
                title: "Create your Gewaer account"
            }
        }
    },
    methods: {
        submitData() {
            const data = this.prepareData();
            axios({
                url: `/${this.form.endpoint}`,
                method: "POST",
                data
            }).then((response) => {
                this.handleResponse(response, true);
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        }
    }
}
</script>
