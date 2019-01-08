<template>
    <form :data-vv-scope="formName" role="form" @submit.prevent="beforeSubmit">
        <template v-for="(item, index) in formFields">
            <div v-if="Array.isArray(item)" :key="index" class="row">
                <div v-for="x in item" :key="x.label" class="col-md-6">
                    <div
                        :class="{ required: x.validations && x.validations.required }"
                        class="form-group form-group-default"
                    >
                        <form-label :item="x"/>
                        <form-control ref="control" :item="x"/>
                    </div>
                </div>
            </div>
            <div
                v-else-if="Object.keys(item) == 'html'"
                :key="index"
                class="field"
                data-test="htmlContentFromFormFields"
                v-html="Object.values(item)[0]"
            />
            <div
                v-else
                :key="index"
                :class="{ required: item.validations && item.validations.required }"
                class="form-group form-group-default"
                style="overflow: visible;"
            >
                <form-label :item="item"/>
                <form-control ref="control" :item="item"/>
            </div>
        </template>
        <template v-if="$children.length">
            <div class="field form-footer is-grouped is-opposed">
                <input
                    :value="btnResetText"
                    class="button"
                    type="reset"
                    @click="resetForm"
                >
                <input
                    :value="btnSubmitText"
                    :disabled="!isFormValid"
                    class="button is-primary"
                    type="submit"
                >
            </div>
            <p class="is-size-7 fieldRequiredLegend">{{ mandatoryAsteriskLegend }}</p>
        </template>
    </form>
</template>

<script>
import { flatten, pickAll, pipe, map } from "ramda";

import Label from "./fields/label";
import Control from "./fields/control";

const getLabels = ({ label }) => label;
const valueToProp = (object) => pickAll(object, {});

export default {
    name: "Form",
    components: {
        FormLabel: Label,
        FormControl: Control
    },
    inject: ["$validator"],
    props: {
        btnResetText: {
            type: String,
            default: "Reset"
        },
        btnSubmitText: {
            type: String,
            default: "Submit"
        },
        formFields: {
            type: Array,
            required: true
        },
        hasIcon: {
            type: Boolean,
            default: true
        },
        formName: {
            type: String,
            required: true
        },
        mandatoryAsteriskLegend: {
            type: String,
            default: "* field required"
        },
        resetFormAfterSubmit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formValues: undefined,
            allControls: []
        }
    },
    computed: {
        isFormValid() {
            const allControlRequire = this.allControls.filter(({ item }) => item.validations && item.validations.required)
            const isAllControlRequireWithValue = allControlRequire.every(({ value }) => !!value)
            const isFormValuesEmpty = Object.values(this.formValues).every(x => x === undefined)
            const hasError = !!this.$validator.errors.items.length
            return isAllControlRequireWithValue && !isFormValuesEmpty && !hasError
        }
    },
    created() {
        this.formValues = pipe(flatten, map(getLabels), valueToProp)(this.formFields);
    },
    mounted() {
        this.allControls = this.$refs.control || []
    },
    methods: {
        async beforeSubmit(ev) {
            let isValidated = false
            await this.$validator.validateAll(this.formName)
                .then(result => {
                    isValidated = result
                });

            isValidated && this.isFormValid && this.emitValues({
                formName: this.formName,
                values: this.formValues
            })
            isValidated && this.resetFormAfterSubmit && this.resetForm(ev)
        },
        emitValues(data) {
            this.$emit("formSubmitted", data);
        },
        clearValues() {
            this.allControls.map(x => {
                x.value = "";
            });

            const subValues = this.allControls.filter(x => x.$children[0].value)
            subValues.map(x => {
                x.$children[0].value = [];
            });
        },
        clearPrefillValues() {
            const inputsPrefilled = this.allControls.filter(x => x.item.value)
            inputsPrefilled.map(x => {
                x.item.value = undefined;
            });

            const selects = this.allControls.filter(x => x.item.options)
            selects.map(select => {
                select.item.options.map(option => {
                    option.selected && (option.selected = false)
                })
            })
        },
        resetFormValues() {
            this.clearValues()
            this.clearPrefillValues()
        },
        resetForm(ev) {
            this.resetFormValues()
            this.errors.clear(this.formName)

            try {
                ev.target.reset()
            } catch (err) {
                // eslint-disable-next-line
                ev && ev.target.reset
            }

            this.$validator.reset()
        }
    }
}
</script>
