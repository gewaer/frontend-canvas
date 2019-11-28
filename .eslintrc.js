module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended"
    ],
    rules: {
        "array-bracket-newline": ["error", "consistent"],
        "array-bracket-spacing": "error",
        "array-element-newline": ["error", "consistent"],
        "brace-style": "error",
        camelcase: ["error", {
            properties: "never"
        }],
        "comma-dangle": "error",
        "comma-spacing": "error",
        "comma-style": "error",
        "computed-property-spacing": "error",
        "consistent-this": ["error", "self"],
        curly: ["error", "all"],
        "eol-last": "error",
        eqeqeq: 0,
        "func-call-spacing": "error",
        "func-name-matching": ["error", {
            considerPropertyDescriptor: true,
            includeCommonJSModuleExports: true
        }],
        "func-names": ["error", "as-needed", {
            "generators": "as-needed"
        }],
        "handle-callback-err": 0,
        "implicit-arrow-linebreak": ["error", "beside"],
        indent: ["error", 4, {
            SwitchCase: 1,
            flatTernaryExpressions: true
        }],
        "linebreak-style": ["error"],
        "new-cap": ["error", {
            capIsNew: false
        }],
        "newline-per-chained-call": 0,
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-multi-str": 0,
        "no-fallthrough": 0,
        "no-return-assign": 0,
        "no-undef": 0,
        quotes: ["error", "double", {
            avoidEscape: true,
            allowTemplateLiterals: true
        }],
        semi: 0,
        "space-infix-ops": "error",
        "no-multi-spaces": ["error", { exceptions: { "Property": false } }],
        "space-before-blocks": "error",
        "keyword-spacing": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": "error",
        "object-curly-spacing": ["error", "always"],
        "arrow-spacing": "error",
        "no-useless-escape": 0,
        "vue/no-v-html": 0,
        "prefer-const": "error",
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true
        }],
        "vue/max-attributes-per-line": ["warn", {
            "singleline": 3,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }]
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    globals: {
        _: true,
        accounting: true,
        axios: true,
        moment: true,
        window: true
    }
}
