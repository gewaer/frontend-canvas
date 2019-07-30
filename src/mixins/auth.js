import AuthContainer from "@v/auth/container";

export default {
    components: {
        AuthContainer
    },
    props: {
        appSettings: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        backgroundSrc() {
            return this.appSettings.settings && this.appSettings.settings.background_image || "";
        },
        appName() {
            return this.appSettings.name || "";
        },
        logoSrc() {
            return this.appSettings.settings && this.appSettings.settings.logo || "";
        }
    },
    methods: {
        handleResponse({ data }, isSignup = false) {
            Cookies.set("token", data.token, { expires: new Date(data.expires), path: "/", domain: process.env.VUE_APP_DOMAIN });
            this.$store.dispatch("User/setToken", data.token);

            if (isSignup) {
                this.$modal.show("after-signup-wizard");
            }

            // TODO: Redirect to ?redirect URL
            this.$router.replace({ name: "dashboard" });
        },
        prepareData() {
            const data = new FormData();

            Object.keys(this.form.fields).forEach((field) => {
                const apiField = this.form.fields[field].map || field;

                data.append(apiField, this.form.fields[field].value);
            });

            return data;
        },
        submitData(isSignup) {
            const data = this.prepareData();

            axios({
                url: `${this.form.endpoint}`,
                method: "POST",
                data
            }).then((response) => {
                this.handleResponse(response, isSignup);
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });
            });
        },
        validateInvitation() {
            axios({
                url: `/users-invite/validate/${this.$route.params.hash}?relationships=companies`
            }).then(({ data }) => {
                this.form.fields.email.value = data.email;
            }).catch((error) => {
                this.$notify({
                    title: "Error",
                    text: error.response.data.errors.message,
                    type: "error"
                });

                this.$router.replace({ name: "404" });
            });
        },
        verifyFields(isSignup = false) {
            this.$validator.validate().then(result => {
                if (result) {
                    this.submitData(isSignup);
                } else {
                    const message = this.errors.items[0].msg;
                    const title = `Please verify the ${this.errors.items[0].field}`;

                    this.$notify({
                        title,
                        text: message,
                        type: "warn"
                    });
                }
            });
        }
    }
}
