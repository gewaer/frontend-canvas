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
                <div :class="{ 'error' : errors.first('firstname') }" class="form-group form-group-default required">
                    <label>First Name</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.firstname.validations"
                            v-model="form.fields.firstname.value"
                            type="text"
                            name="firstname"
                            placeholder="John"
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("firstname") }}</span>
                <div :class="{ 'error' : errors.first('lastname') }" class="form-group form-group-default required">
                    <label>Last Name</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.lastname.validations"
                            v-model="form.fields.lastname.value"
                            type="text"
                            name="lastname"
                            placeholder="Smith"
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("lastname") }}</span>
                <div :class="{ 'error' : errors.first('email') }" class="form-group form-group-default required">
                    <label>Email</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.email.validations"
                            v-model="form.fields.email.value"
                            type="text"
                            name="email"
                            autocomplete="off"
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
                            v-validate="form.fields.password.validations"
                            ref="password"
                            v-model="form.fields.password.value"
                            type="password"
                            class="form-control"
                            name="password"
                            autocomplete="off"
                            placeholder="Credentials"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("password") }}</span>
                <div :class="{ 'error' : errors.first('verifyPassword') }" class="form-group form-group-default required">
                    <label>Confirm Password</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.verifyPassword.validations"
                            v-model="form.fields.verifyPassword.value"
                            type="password"
                            name="verifyPassword"
                            data-vv-as="password"
                            autocomplete="off"
                            placeholder="Retype Credentials"
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("verifyPassword") }}</span>
                <div :class="{ 'error' : errors.first('company') }" class="form-group form-group-default required">
                    <label>Company Name</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.company.validations"
                            v-model="form.fields.company.value"
                            type="text"
                            name="company"
                            placeholder="John Smith Co."
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("company") }}</span>
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
                <!-- <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10" />
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div> -->
                <button class="btn btn-primary btn-block my-4" type="submit">Sign Up</button>
                <div class="text-center small">
                    Already have an account?
                    <router-link :to="{ name: 'login' }" class="text-info">Log in!</router-link>
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
