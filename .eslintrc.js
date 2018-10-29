module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    rules: {
        "array-bracket-newline": ["error", "consistent"],
        "array-bracket-spacing": ["error", "never"],
        "brace-style": ["error", "1tbs", {
            allowSingleLine: false
        }],
        camelcase: ["error"],
        "comma-dangle": ["error", "never"],
        "comma-spacing": ["error"],
        curly: ["error", "all"],
        eqeqeq: 0,
        "handle-callback-err": 0,
        indent: ["error", 4, {
            SwitchCase: 1,
            flatTernaryExpressions: true
        }],
        "new-cap": "error",
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
        "space-before-function-paren": ["error", "never"]
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
