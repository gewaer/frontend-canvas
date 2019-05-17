<template>
    <auth-container>
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="off"
                @submit.prevent="verifyFields()">
                <div class="form-group form-group-default required">
                    <label>First Name</label>
                    <div class="controls">
                        <input
                            v-validate="validations.firstname"
                            v-model="data.firstname"
                            type="text"
                            name="firstname"
                            placeholder="John"
                            class="form-control"
                        >
                        <span class="text-danger">{{ errors.first("firstname") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Last Name</label>
                    <div class="controls">
                        <input
                            v-validate="validations.lastname"
                            v-model="data.lastname"
                            type="text"
                            name="lastname"
                            placeholder="Smith"
                            class="form-control"
                        >
                        <span class="text-danger">{{ errors.first("lastname") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>{{ form.data.email.label }}</label>
                    <div class="controls">
                        <input
                            v-validate="validations.email"
                            v-model="data.email"
                            type="text"
                            name="email"
                            disabled
                            autocomplete="off"
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
                            autocomplete="off"
                            placeholder="Credentials"
                        >
                        <span class="text-danger">{{ errors.first("password") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Confirm Password</label>
                    <div class="controls">
                        <input
                            v-validate="validations.verifyPassword"
                            v-model="data.verifyPassword"
                            type="password"
                            name="verifyPassword"
                            data-vv-as="password"
                            autocomplete="off"
                            placeholder="Retype Credentials"
                            class="form-control"
                        >
                        <span class="text-danger">{{ errors.first("verifyPassword") }}</span>
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
            </form>
        </template>
    </auth-container>
</template>

<script>
import { authMixins } from "@/utils/mixins";

export default {
    name: "UserInvite",
    components: {
        AuthContainer: () => import(/* webpackChunkName: "auth-background" */ "@v/auth/container")
    },
    mixins: [authMixins],
    data() {
        return {
            data: {
                email: "",
                firstname: "",
                lastname: "",
                password: "",
                verifyPassword:""
            },
            form: {
                data: {
                    email: {
                        label: "Email",
                        validations: "required|email"
                    },
                    firstname: {
                        validations: "required"
                    },
                    lastname: {
                        validations: "required"
                    },
                    password: {
                        validations: "required|min:8"
                    },
                    verifyPassword: {
                        map: "verify_password",
                        validations: "required|min:8"
                    }
                },
                endpoint: `users-invite/${this.$route.params.hash}`,
                submitLabel: "Sign Up",
                title: "Confirm your Gewaer account"
            }
        }
    },
    mounted() {
        this.validateInvitation();
    }
}
</script>
