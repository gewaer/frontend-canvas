<template>
    <div :class="{ 'has-icons-left': item.iconLeft, 'has-icons-right': shouldShowErrorIcon }" class="control">
        <component
            v-validate.immediate="getValidation"
            v-if="item.value"
            v-model.lazy.trim="value"
            :data-vv-name="item.label"
            :error="fieldError"
            :is="`app-${getComponent}`"
            :item="item"
        />
        <component
            v-validate="getValidation"
            v-else
            v-model.lazy.trim="value"
            :data-vv-name="item.label"
            :error="fieldError"
            :is="`app-${getComponent}`"
            :item="item"
        />
        <span v-if="item.iconLeft" class="icon is-small is-left">
            <i :class="`fa-${item.iconLeft} fas`"/>
        </span>
        <span v-if="shouldShowErrorIcon" class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"/>
        </span>
        <p v-if="fieldError" class="help is-danger">
            {{ fieldError.msg }}
        </p>
    </div>
</template>

<script>
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";
import Checkbox from "./checkbox";
import Radio from "./radio";

const NOT_NORMAL_INPUT = ["textarea", "select", "checkbox", "radio"];

export default {
    name: "Control",
    components: {
        AppInput: Input,
        AppSelect: Select,
        AppTextarea: Textarea,
        AppCheckbox: Checkbox,
        AppRadio: Radio
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            value: undefined
        }
    },
    computed: {
        hasIcon() {
            return this.$parent.hasIcon;
        },
        shouldShowErrorIcon() {
            return this.fieldError && this.item.type !== "select" && this.hasIcon;
        },
        fieldError() {
            return this.errors.items.find(
                ({ field }) => field === this.item.label
            );
        },
        isRequired() {
            return this.item.isRequired !== false;
        },
        isNormalInput() {
            return !NOT_NORMAL_INPUT.includes(this.item.type);
        },
        getComponent() {
            return this.isNormalInput ? "input" : this.item.type;
        },
        getValidation() {
            const { type } = this.item;
            const { minLength, maxLength, min, max } = this.item.attributes || {};
            const { regex } = this.item.validations || {};
            const { defaultMinLength, defaultMaxLength, defaultMin, defaultMax } = this.$parent;
            const isNormalInputOrTextarea = this.isNormalInput || type === "textarea";
            const isInputNumber = type === "number";
            const pattern = regex;

            return isNormalInputOrTextarea && ({
                ...(this.item.validations || {}),
                regex: this.isNormalInput && !isInputNumber && pattern && new RegExp(pattern) || false,
                email: type === "email",
                min: !isInputNumber ? minLength || defaultMinLength : false,
                max: !isInputNumber ? maxLength || defaultMaxLength : false,
                min_value: isInputNumber ? min || defaultMin : false,
                max_value: isInputNumber ? max || defaultMax : false,
                numeric: isInputNumber
            });
        }
    },
    watch: {
        value(val) {
            this.$parent.formValues[this.item.label] = val;
        }
    }
}
</script>
