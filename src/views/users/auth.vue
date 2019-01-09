<template>
    <div class="login-wrapper">
        <!-- START Login Background Pic Wrapper-->
        <div class="bg-pic">
            <!-- START Background Pic-->
            <img
                src="https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg"
                data-src="https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg"
                data-src-retina="https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg"
                class="lazy"
            >
            <!-- END Background Pic-->
            <!-- START Background Caption-->
            <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
                <h2 class="semi-bold text-white">Some title.</h2>
                <p class="small">Some title text.</p>
            </div>
            <!-- END Background Caption-->
        </div>
        <!-- END Login Background Pic Wrapper-->
        <!-- START Login Right Container-->
        <div class="login-container bg-white">
            <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
                <img
                    src="/img/primary-logo.png"
                    alt="logo"
                    data-src="/img/primary-logo.png"
                    style="max-height:30px;"
                >
                <p class="p-t-10">{{ form.title }}</p>
                <!-- START Login Form -->
                <form id="form-login" class="p-t-15" @submit.prevent="submitData()">
                    <template v-if="isSignup || isInvite">
                        <!-- START Form Control-->
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
                        <!-- END Form Control-->
                        <!-- START Form Control-->
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
                        <!-- END Form Control-->
                    </template>
                    <!-- START Form Control-->
                    <div v-if="!isResetPassword || !isInvite" class="form-group form-group-default required">
                        <label>{{ form.data.email.label }}</label>
                        <div class="controls">
                            <input
                                v-model="data.email"
                                :disabled="isInvite"
                                type="text"
                                name="username"
                                placeholder="user@example.com"
                                class="form-control"
                                required
                            >
                        </div>
                    </div>
                    <!-- END Form Control-->
                    <!-- START Form Control-->
                    <div v-if="!isForgotPassword || isInvite" class="form-group form-group-default required">
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
                    <!-- END Form Control-->
                    <!-- START Form Control-->
                    <div v-if="isSignup || isResetPassword || isInvite" class="form-group form-group-default required">
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
                    <!-- END Form Control-->
                    <!-- START Form Control-->
                    <div v-if="isSignup" class="form-group form-group-default required">
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
                    <div v-if="isSignup" class="form-group form-group-default">
                        <label>Have a promo code?</label>
                        <div class="controls">
                            <input
                                type="text"
                                name="company"
                                class="form-control"
                            >
                        </div>
                    </div>
                    <!-- END Form Control-->
                    <!-- START Form Control-->
                    <div class="row">
                        <div class="col-md-6 no-padding sm-p-l-10">
                            <div v-if="isLogin" class="checkbox">
                                <input id="checkbox1" type="checkbox" value="1">
                                <label for="checkbox1">Keep Me Signed in</label>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-end">
                            <a href="#" class="text-info small">Help? Contact Support</a>
                        </div>
                    </div>
                    <!-- END Form Control-->
                    <button class="btn btn-primary btn-cons m-t-10" type="submit">{{ form.submitLabel }}</button>
                    <div v-if="isLogin" class="m-t-10">
                        Don't have an account?
                        <router-link :to="{ name: 'signup' }">Create one!</router-link>
                    </div>
                    <div v-if="isLogin" class="m-t-10">
                        <router-link :to="{ name: 'forgotPassword' }">Forgot Password?</router-link>
                    </div>
                    <div v-if="isSignup" class="m-t-10">
                        Already have an account?
                        <router-link :to="{ name: 'login' }">Log in!</router-link>
                    </div>
                </form>
                <!--END Login Form-->
            </div>
        </div>
        <!-- END Login Right Container-->
    </div>
</template>

<script>
export default {
    name: "Auth",
    data() {
        return {
            data: {
                company: "",
                email: "",
                firstname: "",
                lastname: "",
                password: ""
            },
            formOptions: {
                forgotPassword: {
                    data: {
                        email: {
                            label: "Email",
                            validations: "required|email"
                        }
                    },
                    endpoint: "auth/forgot",
                    submitLabel: "Reset Password",
                    title: "Reset your Gewaer password"
                },
                login: {
                    data: {
                        email: {
                            label: "Login",
                            validations: "required|email"
                        },
                        password: {
                            validations: "required|min:8"
                        }
                    },
                    endpoint: "auth",
                    submitLabel: "Sign In",
                    title: "Sign into your Gewaer account"
                },
                resetPassword: {
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
                },
                signup: {
                    data: {
                        company: {
                            map: "default_company",
                            validations: "required"
                        },
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
                    endpoint: "users",
                    submitLabel: "Sign Up",
                    title: "Create your Gewaer account"
                },
                usersInvites: {
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
        }
    },
    computed: {
        form() {
            return this.formOptions[this.$route.name];
        },
        isForgotPassword() {
            return this.$route.name == "forgotPassword";
        },
        isLogin() {
            return this.$route.name == "login";
        },
        isResetPassword() {
            return this.$route.name == "resetPassword";
        },
        isSignup() {
            return this.$route.name == "signup";
        },
        isInvite(){
            return this.$route.name == "usersInvites";
        },
        isTypeOfSignIn(){
            return this.isLogin || this.isSignup || this.isInvite;
        }
    },
    beforeRouteLeave(to, from, next) {
        this.data.email = "";
        this.data.password = "";
        next();
    },
    mounted(){
        if(this.isInvite){
            this.validateInvitation();
        }
    },
    methods: {
        handleForgotPassword(response) {
            this.$notify({
                title: "Confirmation",
                text: response.data,
                type: "success"
            });

            this.data.email = "";
            this.$router.push({ name: "login" });
        },
        handleLoginSignupInvite(response) {
            const auth = this.isSignup ? response.data.session : response.data ;

            Cookies.set("token", auth.token, { expires: new Date(auth.expires), path: "/", domain: process.env.VUE_APP_DOMAIN });
            this.$store.dispatch("User/setToken", auth.token);

            if (this.isSignup) {
                this.$modal.show("after-signup-wizard")
            }

            this.$router.push({ name: "dashboard" });
        },
        handleResetPassword(response) {
            this.$notify({
                title: "Confirmation",
                text: response.data,
                type: "success"
            });

            this.data.password = "";
            this.data.verifyPassword = "";
            this.$router.push({ name: "login" });
        },
        handleResponse(response) {
            if (this.isTypeOfSignIn) {
                this.handleLoginSignupInvite(response);
            }
            if (this.isForgotPassword) {
                this.handleForgotPassword(response);
            }
            if (this.isResetPassword) {
                this.handleResetPassword(response);
            }
        },
        prepareData() {
            const data = new FormData();

            Object.keys(this.form.data).forEach((field) => {
                let apiField = field;

                if (this.form.data[field].map) {
                    apiField = this.form.data[field].map;
                }

                data.append(apiField, this.data[field]);
            });

            return data;
        },
        submitData() {
            const data = this.prepareData();

            axios({
                url: `/${this.form.endpoint}`,
                method: "POST",
                data
            }).then((response) => {
                this.handleResponse(response);
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        validateInvitation(){
            let url = `users-invite/validate/${this.$route.params.hash}`;
            axios({
                url
            }).then((response) => this.data.email = response.data.email)
                .catch((error) => {
                    this.$notify({
                        title: "Error",
                        text: error.response.data.errors.message,
                        type: "error"
                    });
                    this.$router.push({ name: "404" });
                });
        }
    }
}
</script>
