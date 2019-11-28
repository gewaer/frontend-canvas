<template>
    <auth-container
        :app-name="appName"
        :background-src="backgroundSrc"
        :logo-src="logoSrc"
        logo-title="Create your account"
    >
        <template slot="auth-form">
            <form
                class="p-t-15"
                autocomplete="off"
                @submit.prevent="verifyFields(true)"
            >
                <div class="form-group form-group-default required">
                    <label>First Name</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.firstname.value"
                            v-validate="form.fields.firstname.validations"
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
                            v-model="form.fields.lastname.value"
                            v-validate="form.fields.lastname.validations"
                            type="text"
                            name="lastname"
                            placeholder="Smith"
                            class="form-control"
                        >
                        <span class="text-danger">{{ errors.first("lastname") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Email</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.email.value"
                            v-validate="form.fields.email.validations"
                            type="text"
                            name="email"
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
                            ref="password"
                            v-model="form.fields.password.value"
                            v-validate="form.fields.password.validations"
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
                            v-model="form.fields.verifyPassword.value"
                            v-validate="form.fields.verifyPassword.validations"
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
                <div class="form-group form-group-default required">
                    <label>Company Name</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.company.value"
                            v-validate="form.fields.company.validations"
                            type="text"
                            name="company"
                            placeholder="John Smith Co."
                            class="form-control"
                        >
                        <span class="text-danger">{{ errors.first("company") }}</span>
                    </div>
                </div>
                <!-- <div class="form-group form-group-default">
                    <label>Have a promo code?</label>
                    <div class="controls">
                        <input
                            type="text"
                            name="promo-code"
                            class="form-control"
                        >
                    </div>
                </div> -->
                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10" />
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">
                    Sign Up
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
    name: "SignUp",
    mixins: [
        authMixins
    ],
    data() {
        return {
            form: {
                fields: {
                    firstname: {
                        validations: "required",
                        value: ""
                    },
                    lastname: {
                        validations: "required",
                        value: ""
                    },
                    email: {
                        validations: "required|email",
                        value: ""
                    },
                    password: {
                        validations: "required|min:8",
                        value: ""
                    },
                    verifyPassword: {
                        map: "verify_password",
                        validations: "required|confirmed:password",
                        value: ""
                    },
                    company: {
                        map: "default_company",
                        validations: "required",
                        value: ""
                    }
                },
                endpoint: "/users"
            }
        }
    }
}
</script>
