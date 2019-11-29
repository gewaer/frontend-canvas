<template>
    <auth-container
        :app-name="appName"
        :background-src="backgroundSrc"
        :logo-src="logoSrc"
        logo-title="Link to your account"
    >
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="off"
                @submit.prevent="verifyFields()"
            >
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
                            autocomplete="on"
                            placeholder="Credentials"
                        >
                        <span class="text-danger">{{ errors.first("password") }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 no-padding sm-p-l-10" />
                    <div class="col-md-6 d-flex align-items-center justify-content-end">
                        <a href="#" class="text-info small">Help? Contact Support</a>
                    </div>
                </div>
                <button class="btn btn-primary btn-cons m-t-10" type="submit">
                    Accept
                </button>
                <router-link
                    :to="{ name: 'login' }"
                    tag="button"
                    class="btn btn-danger btn-cons m-t-10"
                >
                    Cancel
                </router-link>
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
                endpoint: `/users-invite/${this.$route.params.hash}`
            }
        }
    },
    mounted() {
        this.validateInvitation();
    }
}
</script>
