import Vue from "vue";
import VeeValidate from "vee-validate";

VeeValidate.Validator.extend("step", {
    getMessage: (field, [step]) => `The ${field} must be a multiple of ${step}.`,
    validate: (value, [step]) => !(value % step)
});

Vue.use(VeeValidate, { fieldsBagName: "vvFields" });
