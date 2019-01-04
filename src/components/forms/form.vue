<template>
    <form :data-vv-scope="formName" @submit.prevent="beforeSubmit">
        <div v-for="(item, index) in formFields" :key="index">
            <div v-if="Array.isArray(item)" class="field-body">
                <div v-for="x in item" :key="x.label" class="field">
                    <form-label :item="x"/>
                    <form-control ref="control" :item="x"/>
                </div>
            </div>
            <div
                v-else-if="Object.keys(item) == 'html'"
                class="field"
                data-test="htmlContentFromFormFields"
                v-html="Object.values(item)[0]"
            />
            <div v-else class="field">
                <form-label :item="item"/>
                <form-control ref="control" :item="item"/>
            </div>
        </div>
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
    data: () => ({
        formValues: undefined,
        allControls: []
    }),
    computed: {
        isFormValid() {
            const allControlRequire = this.allControls.filter(({ item }) => item.isRequired !== false)
            const isAllControlRequireWithValue = allControlRequire.every(({ value }) => !!value)
            const isFormValuesEmpty = Object.values(this.formValues).every(x => x === undefined)
            const hasError = !!this.$validator.errors.items.length
            return isAllControlRequireWithValue && !isFormValuesEmpty && !hasError
        }
    },
    created() {
        this.formValues = pipe(flatten, map(getLabels), valueToProp)(this.formFields)
    },
    mounted() {
        this.allControls = this.$refs.control
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
            this.$root.$emit("formSubmitted", data)
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

<style lang="scss">
form {
    max-width: 28rem;
}

.field {
    margin-bottom: 0.75rem;
}

.field-body {
    margin-bottom: 0.75rem;
    display: block;
    .field {
        width: 100%;
    }
}

@media (min-width: 496px) {
    .field-body {
        display: flex;
        justify-content: space-between;
    }
}

@media (min-width: 496px) {
    .field-body .field {
        width: 13.625rem;
    }
}

.form-footer .button:not(:last-child) {
    margin-right: 0.75rem;
}

.fieldRequiredLegend {
    margin-top: 1.5rem;
}

.field.is-grouped.is-opposed {
    display: flex;
    justify-content: space-between;
    .control {
        line-height: 36px;
    }
}

.error-title {
    margin-bottom: 0;
}
</style>
