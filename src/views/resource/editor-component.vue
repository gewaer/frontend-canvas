<template>
    <quill-editor
        ref="quillEditor"
        :value="value"
        :options="quillOptions"
        @input="emitNewValue"
    />
</template>

<script>
export default {
    name: "EditorComponent",
    props: {
        value: {
            type: null,
            required: true
        }
    },
    data() {
        return {
            quillOptions: {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],        // toggled buttons
                        ["blockquote"],

                        // [{ "header": 1 }, { "header": 2 }],               // custom button values
                        [{ "list": "ordered"}, { "list": "bullet" }],
                        // [{ "script": "sub"}, { "script": "super" }],      // superscript/subscript
                        [{ "indent": "-1"}, { "indent": "+1" }],          // outdent/indent
                        // [{ "direction": "rtl" }],                         // text direction

                        [{ "size": ["small", false, "large", "huge"] }],
                        [{ "header": [1, 2, 3, 4, 5, 6, false] }],

                        [{ "color": [] }, { "background": [] }],          // dropdown with defaults from theme
                        [{ "font": [] }],
                        [{ "align": [] }],

                        ["clean"]
                    ]
                }
            }
        };
    },
    computed: {
        quillEditor() {
            return this.$refs.quillEditor.quill;
        }
    },
    methods: {
        emitNewValue(event) {
            this.$emit("input", event);
        }
    }
}
</script>
