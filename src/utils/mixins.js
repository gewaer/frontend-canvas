import { some, pickBy } from "lodash";

export const vueRouterMixins = {
    beforeRouteLeave(to, from, next) {
        const formFields = _.isObject(this.crudFormFields) ?  this.crudFormFields : this.formFields ;

        if (some(formFields, field => field.changed)) {
            this.$modal.show("unsaved-changes", {
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
                        next(false);
                        this.$modal.hide("unsaved-changes");
                    }
                }],
                fields: pickBy(formFields, field => field.changed)
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
