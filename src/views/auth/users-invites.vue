<template>
    <auth-container
        :app-name="appName"
        :background-src="backgroundSrc"
        :logo-src="logoSrc"
        logo-title="Confirm your account"
    >
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="off"
                @submit.prevent="verifyFields(true)"
            >
                <div class="form-group form-group-default required">
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
                        <span class="text-danger">{{ errors.first("firstname") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
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
                        <span class="text-danger">{{ errors.first("lastname") }}</span>
                    </div>
                </div>
                <div class="form-group form-group-default required">
                    <label>Email</label>
                    <div class="controls">
                        <input
                            v-validate="form.fields.email.validations"
                            v-model="form.fields.email.value"
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
                            v-validate="form.fields.password.validations"
                            v-model="form.fields.password.value"
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
                            v-validate="form.fields.verifyPassword.validations"
                            v-model="form.fields.verifyPassword.value"
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
                    <div class="col-md-6 no-padding sm-p-l-10" />
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">Sign Up</button>
            </form>
        </template>
    </auth-container>
</template>

<script>
import authMixins from "@/mixins/auth";

export default {
    name: "UserInvite",
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
                    firstname: {
                        validations: "required",
                        value: ""
                    },
                    lastname: {
                        validations: "required",
                        value: ""
                    },
                    password: {
                        validations: "required|min:8",
                        value: ""
                    },
                    verifyPassword: {
                        map: "verify_password",
                        validations: "required|min:8",
                        value: ""
                    }
                },
                endpoint: `/users-invite/${this.$route.params.hash}`
            }
        }
    },
    mounted() {
        this.validateInvitation();
    }
}
</script>
