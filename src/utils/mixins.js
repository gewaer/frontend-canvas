import isEmpty from "lodash/isEmpty";
import some from "lodash/some";
import pickBy from "lodash/pickBy";

import { mapGetters } from "vuex";

export const vueRouterMixins = {
    computed: {
        hasChanged() {
            return some(this.vvFields, field => field.changed);
        }
    },
    beforeRouteLeave(to, from, next) {
        const formFields = pickBy(this.vvFields, field => field.changed);

        if (!isEmpty(formFields)) {
            this.$modal.show(() => import(/* webpackChunkName: "components-modals-unsaved-changes" */ "@/components/modals/unsaved-changes"), {
                buttons: [{
                    title: "Discard",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next();
                    }
                }, {
                    title: "Cancel",
                    class: "btn-primary",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next(false);
                    }
                }],
                fields: formFields
            }, {
                adaptive: true,
                clickToClose: false,
                height: "auto",
                name: "unsaved-changes",
                scrollable: true
            });
        } else {
            next();
        }
    }
}

export const vueCrudMixins = {
    methods: {
        triggerCancel() {
            if (some(this.formFields, field => field.changed)) {
                this.$modal.show("unsaved-changes", {
                    buttons: [{
                        title: "Discard",
                        handler: () => {
                            this.$modal.hide("unsaved-changes");
                            this.cancel();
                        }
                    }, {
                        title: "Cancel",
                        class: "btn-primary",
                        handler: () => {
                            this.cancel();
                            this.$modal.hide("unsaved-changes");
                        }
                    }],
                    fields: pickBy(this.formFields, field => field.changed)
                });
            } else {
                this.cancel();
            }
        }
    },
    watch: {
        formFields: {
            handler(formFields) {
                this.$emit("form-fields", formFields)
            },
            deep: true
        }
    }
}

export const vuexMixins = {
    computed: {
        ...mapGetters("Company", ["currentCompanyId"])
    },
    watch: {
        currentCompanyId() {
            if (this.hasOwnProperty("initialize")) {
                this.initialize();
            } else {
                console.warn("Component expects a defined initialize() method to respond properly to a currentCompanyId change");
            }
        }
    }
}

export const listMixins = {
    methods: {
        initialize() {
            this.$refs.Vuetable.refresh();
        }
    }
}

export const authMixins = {
    beforeRouteLeave(to, from, next) {
        for (const prop in this.data) {
            this.data[prop] = "";
        }
        next();
    },
    computed: {
        validations() {
            const validations = {};
            for (const key in this.form.data) {
                validations[key] = this.form.data[key].validations || "";
            }
            return validations
        }
    },
    methods: {
        handleResponse({ data }, isSignup = false) {
            const auth = isSignup ? data.session : data ;

            Cookies.set("token", auth.token, { expires: new Date(auth.expires), path: "/", domain: process.env.VUE_APP_DOMAIN });
            this.$store.dispatch("User/setToken", auth.token);
            if (isSignup) {
                this.$modal.show("after-signup-wizard")
            }
            // TODO: Redirect to ?redirect URL
            this.$router.replace({ name: "dashboard" });
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
        validateInvitation() {
            axios({
                url:`users-invite/validate/${this.$route.params.hash}?relationships=companies`
            }).then(({ data }) => this.data.email = data.email)
                .catch((error) => {
                    this.$notify({
                        title: "Error",
                        text: error.response.data.errors.message,
                        type: "error"
                    });
                    this.$router.replace({ name: "404" });
                });
        },
        verifyFields() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.submitData();
                } else {
                    const verificationMessage = this.errors.items[0].msg;
                    const verificationTitle = `Please verify the ${this.errors.items[0].field}`;
                    this.$notify({
                        title: verificationTitle,
                        text: verificationMessage,
                        type: "warn"
                    });
                }
            });
        }
    }
}
