<template>
    <auth-container>
        <template slot="auth-form">
            <form
                id="form-login"
                class="p-t-15"
                autocomplete="off"
                @submit.prevent="submitData()">
                <div class="form-group form-group-default required">
                    <label>{{ form.data.email.label }}</label>
                    <div class="controls">
                        <input
                            v-model="data.email"
                            type="text"
                            name="username"
                            disabled
                            autocomplete="off"
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
                            autocomplete="off"
                            placeholder="Credentials"
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
                <router-link
                    :to="{ name: 'login' }"
                    tag="button"
                    class="btn btn-danger btn-cons m-t-10">Cancel</router-link>
            </form>
        </template>
    </auth-container>
</template>

<script>
import { authMixins } from "@/utils/mixins";

export default {
    name: "Login",
    components: {
        AuthContainer: () => import(/* webpackChunkName: "auth-background" */ "@v/auth/container")
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
                endpoint: `users-invite/${this.$route.params.hash}`,
                submitLabel: "Acept",
                title: "Link to your Gewaer account"
            }
        }
    },
    mounted() {
        this.validateInvitation();
    }
}
</script>
