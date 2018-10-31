<template>
    <div class="login-wrapper">
        <!-- START Login Background Pic Wrapper-->
        <div class="bg-pic">
            <!-- START Background Pic-->
            <img src="https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg" data-src="https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg" data-src-retina="https://wallpaper-house.com/data/out/8/wallpaper2you_279811.jpg" alt="" class="lazy">
            <!-- END Background Pic-->
            <!-- START Background Caption-->
            <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
                <h2 class="semi-bold text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
                <p class="small">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <!-- END Background Caption-->
        </div>
        <!-- END Login Background Pic Wrapper-->
        <!-- START Login Right Container-->
        <div class="login-container bg-white">
            <div class="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
                <img src="../../assets/primary-logo.png" alt="logo" data-src="../../assets/primary-logo.png" style="max-height:30px;">
                <p class="p-t-10">{{ form.title }}</p>
                <!-- START Login Form -->
                <form id="form-login" class="p-t-15" role="form" @submit.prevent="submitData()">
                    <template v-if="!isLogin">
                        <!-- START Form Control-->
                        <div class="form-group form-group-default">
                            <label>First Name</label>
                            <div class="controls">
                                <input v-model="data.firstname" type="text" name="firstname" placeholder="John" class="form-control" required>
                            </div>
                        </div>
                        <!-- END Form Control-->
                        <!-- START Form Control-->
                        <div class="form-group form-group-default">
                            <label>Last Name</label>
                            <div class="controls">
                                <input v-model="data.lastname" type="text" name="lastname" placeholder="Smith" class="form-control" required>
                            </div>
                        </div>
                        <!-- END Form Control-->
                    </template>
                    <!-- START Form Control-->
                    <div class="form-group form-group-default">
                        <label>{{ form.data.email.label }}</label>
                        <div class="controls">
                            <input v-model="data.email" type="text" name="username" placeholder="user@example.com" class="form-control" required>
                        </div>
                    </div>
                    <!-- END Form Control-->
                    <!-- START Form Control-->
                    <div class="form-group form-group-default">
                        <label>Password</label>
                        <div class="controls">
                            <input v-model="data.password" type="password" class="form-control" name="password" placeholder="Credentials" required>
                        </div>
                    </div>
                    <!-- END Form Control-->
                    <template v-if="!isLogin">
                        <!-- START Form Control-->
                        <div class="form-group form-group-default">
                            <label>Confirm Password</label>
                            <div class="controls">
                                <input v-model="data.password2" type="password" name="password2" placeholder="Retype Credentials" class="form-control" required>
                            </div>
                        </div>
                        <!-- END Form Control-->
                        <!-- START Form Control-->
                        <div class="form-group form-group-default">
                            <label>Company Name</label>
                            <div class="controls">
                                <input v-model="data.company" type="text" name="company" placeholder="John Smith Co." class="form-control" required>
                            </div>
                        </div>
                        <!-- END Form Control-->
                    </template>
                    <!-- START Form Control-->
                    <div class="row">
                        <div class="col-md-6 no-padding sm-p-l-10">
                            <div v-if="isLogin" class="checkbox">
                                <input type="checkbox" value="1" id="checkbox1">
                                <label for="checkbox1">Keep Me Signed in</label>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-end">
                            <a href="#" class="text-info small">Help? Contact Support</a>
                        </div>
                    </div>
                    <!-- END Form Control-->
                    <button class="btn btn-primary btn-cons m-t-10" type="submit">{{ form.submitLabel }}</button>
                    <div class="row">
                        <div v-if="isLogin" class="col-md-12">
                            Don't have an account?
                            <router-link :to="{ name: 'signup' }">Create one!</router-link>
                        </div>
                        <div v-else class="col-md-12">
                            Already have an account?
                            <router-link :to="{ name: 'login' }">Log in!</router-link>
                        </div>
                    </div>
                </form>
                <!--END Login Form-->
                <div class="pull-bottom sm-pull-bottom">
                    <div class="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
                        <div class="col-sm-3 col-md-2 no-padding">
                            <img alt="" class="m-t-5" data-src="assets/img/demo/pages_icon.png" data-src-retina="assets/img/demo/pages_icon_2x.png" height="60" src="assets/img/demo/pages_icon.png" width="60">
                        </div>
                        <div class="col-sm-9 no-padding m-t-10">
                            <p>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                            </p>
                        </div>
                    </div>
                </div>
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
                email: "sparohawk@gmail.com",
                firstname: "",
                lastname: "",
                password: "Nosen0s3"
            },
            formOptions: {
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
                        password2: {
                            validations: "required|min:8"
                        }
                    },
                    endpoint: "users",
                    submitLabel: "Sign Up",
                    title: "Create your Gewaer account"
                }
            }
        }
    },
    computed: {
        form() {
            return this.formOptions[this.$route.name];
        },
        isLogin() {
            return this.$route.name == "login";
        }
    },
    methods: {
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
                const auth = this.isLogin ? response.data : response.data.session;

                Cookies.set("token", auth.token, { expires: new Date(auth.expires), path: "/", domain: process.env.VUE_APP_DOMAIN });
                this.$store.dispatch("User/setToken", auth.token);
                this.$router.push({ name: "dashboard" });
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>
