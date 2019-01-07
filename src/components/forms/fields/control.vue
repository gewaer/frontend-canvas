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
        <span v-if="fieldError" class="text-danger">
            {{ fieldError.msg }}
        </span>
    </div>
</template>

<script>
import { FORMS } from "@/config/constants";
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
            const { min, max, min_value: minValue, max_value: maxValue } = this.item.validations || {};
            const isNormalInputOrTextarea = this.isNormalInput || type === "textarea";
            const isInputNumber = type === "number";

            return isNormalInputOrTextarea && {
                min: !isInputNumber && min || false,
                max: !isInputNumber && max || type === "textarea" ? FORMS.DEFAULT_MAX_LENGTH_TEXTAREA : FORMS.DEFAULT_MAX_LENGTH_INPUT,
                min_value: isInputNumber && minValue || false,
                max_value: isInputNumber && maxValue || false,
                ...(this.item.validations || {})
            }
        }
    },
    watch: {
        value(val) {
            this.$parent.formValues[this.item.label] = val;
        }
    }
}
</script>
