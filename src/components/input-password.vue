<template>
    <div class="controls input-group">
        <input
            :id="$attrs.id"
            ref="input"
            :class="customClass"
            :placeholder="placeholder"
            :type="type"
            :value="value"
            autocomplete="off"
            @input="emitInput"
        >
        <div class="input-group-prepend">
            <span
                id="inputGroupPrepend"
                class="input-group-text"
                :title="title"
                @click="toggleVisibility"
            >
                <i :class="icon" />
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ""
        },
        customClass: {
            type: String,
            default: "form-control"
        },
        placeholder: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isVisible: false
        }
    },
    computed: {
        type() {
            return this.isVisible ? "text" : "password";
        },
        icon() {
            return this.isVisible ? "far fa-eye" : "far fa-eye-slash";
        },
        title() {
            return this.isVisible ? "hide password" : "show password";
        }
    },
    methods: {
        emitInput() {
            this.$emit("input", this.$refs.input.value);
        },
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        }
    }
}
</script>

<style lang="scss" scoped>
.form-group {
    .input-group-text {
        border: none;
        background: transparent;
    }
}
</style>
