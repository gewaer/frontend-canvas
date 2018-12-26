import { some, pickBy } from "lodash";

export const vueRouterMixins = {
    beforeRouteLeave(to, from, next) {
        if (some(this.formFields, field => field.changed)) {
            this.$modal.show("unsaved-changes", {
                buttons: [{
                    title: "Discard",
                    handler: () => {
                        next();
                        this.$modal.hide("unsaved-changes");
                    }
                }, {
                    title: "Cancel",
                    class: "btn-primary",
                    handler: () => {
                        next(false);
                        this.$modal.hide("unsaved-changes");
                    }
                }],
                fields: pickBy(this.formFields, field => field.changed)
            });
        } else {
            next();
        }
    }
}
