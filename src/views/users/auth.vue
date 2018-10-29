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
                    <!-- START Form Control-->
                    <div class="form-group form-group-default">
                        <label>{{ form.data.email.label }}</label>
                        <div class="controls">
                            <input v-model="data.email" type="text" name="username" :placeholder="form.data.email.placeholder" class="form-control" required>
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
                    <!-- START Form Control-->
                    <div class="row">
                        <div class="col-md-6 no-padding sm-p-l-10">
                            <div v-if="$route.name == 'login'" class="checkbox">
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
                email: "",
                password: ""
            },
            formOptions: {
                login: {
                    data: {
                        email: {
                            label: "Login",
                            placeholder: "Email"
                        }
                    },
                    endpoint: "auth",
                    submitLabel: "Sign In",
                    title: "Sign into your Gewaer account"
                },
                signup: {
                    data: {
                        email: {
                            label: "Email",
                            placeholder: "user@example.com"
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
        }
    },
    methods: {
        fetchUserData() {
            axios({
                url: "/users"
            }).then((response) => {
                this.$store.dispatch("User/saveData", response.data[0]);
                this.$router.push({ name: "dashboard" });
            });
        },
        submitData() {
            const data = new FormData();
            data.append("email", this.data.email);
            data.append("password", this.data.password);

            axios({
                url: `/${this.form.endpoint}`,
                method: "POST",
                data
            }).then((response) => {
                this.$store.dispatch("User/saveToken", response.data);
                this.fetchUserData();
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>
