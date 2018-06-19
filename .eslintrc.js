var ERROR = 'error';
var WARNING = 'warn';
var DISABLED = 0;

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true,
            arrowFunctions: true,
            destructuring: true,
            classes: true,
            defaultParams: true,
            blockBindings: true,
            modules: true,
            objectLiteralComputedProperties: true,
            objectLiteralShorthandMethods: true,
            objectLiteralShorthandProperties: true,
            restParams: true,
            spread: true,
            forOf: true,
            generators: true,
            templateStrings: true,
            superInFunctions: true,
            experimentalObjectRestSpread: true
        },
    },
    rules: {
        'arrow-body-style': ERROR,
        'arrow-parens': [ERROR, 'as-needed'],
        'arrow-spacing': ERROR,
        'array-bracket-spacing': ERROR,
        'block-spacing': ERROR,
        'brace-style': ERROR,
        'indent': [ERROR, 4, { 'SwitchCase': 1 }],
        'computed-property-spacing': ERROR,
        'comma-dangle': [ERROR, 'always-multiline'],
        'comma-spacing': ERROR,
        'comma-style': ERROR,
        'consistent-this': [ERROR, 'self'],
        'curly': ERROR,
        'linebreak-style': [ERROR, 'windows'],
        // 'default-case': ERROR,
        'dot-location': [ERROR, 'property'],
        'dot-notation': ERROR,
        'eol-last': ERROR,
        'eqeqeq': [WARNING, 'smart'],
        'func-call-spacing': ERROR,
        'generator-star-spacing': ERROR,
        'key-spacing': ERROR,
        'keyword-spacing': ERROR,
        'max-nested-callbacks': [WARNING, 4],
        'new-parens': WARNING,
        'no-array-constructor': ERROR,
        'no-constant-condition': [ERROR, { 'checkLoops': false }],
        'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : DISABLED,
        'no-delete-var': ERROR,
        'no-duplicate-imports': ERROR,
        'no-else-return': ERROR,
        'no-eval': ERROR,
        'no-extend-native': ERROR,
        'no-extra-bind': ERROR,
        'no-extra-label': ERROR,
        'no-extra-parens': [ERROR, "all", { "ignoreJSX": "all" }],
        'no-floating-decimal': ERROR,
        'no-implied-eval': ERROR,
        'no-lonely-if': ERROR,
        'no-loop-func': ERROR,
        'no-multiple-empty-lines': [ERROR, {
            'max': 2
        }],
        'no-multi-spaces': ERROR,
        'no-multi-str': ERROR,
        'no-new-object': ERROR,
        'no-new-wrappers': ERROR,
        'no-self-compare': ERROR,
        'no-script-url': ERROR,
        'no-trailing-spaces': ERROR,
        'no-undef-init': ERROR,
        'no-unneeded-ternary': ERROR,
        'no-unused-labels': ERROR,
        'no-useless-computed-key': ERROR,
        'no-useless-rename': ERROR,
        'no-useless-return': ERROR,
        "no-use-before-define": [ERROR, { "functions": false, "classes": false }],
        'no-var': ERROR,
        'no-whitespace-before-property': ERROR,
        'object-curly-spacing': [ERROR, 'always'],
        'object-shorthand': ERROR,
        'one-var': [ERROR, 'never'],
        'one-var-declaration-per-line': [ERROR, 'always'],
        'operator-assignment': ERROR,
        'padded-blocks': [ERROR, 'never'],
        'prefer-arrow-callback': ERROR,
        'prefer-const': ERROR,
        'prefer-numeric-literals': ERROR,
        'prefer-spread': ERROR,
        'prefer-template': ERROR,
        'radix': ERROR,
        'react/display-name': ["off", { "ignoreTranspilerName": true }],
        'react/prop-types': [ERROR, { "skipUndeclared": true }],
        'react/no-typos': ERROR,
        'react/jsx-boolean-value': ERROR,
        'react/jsx-closing-bracket-location': [ERROR, "line-aligned"],
        'react/jsx-curly-spacing': ERROR,
        'react/jsx-equals-spacing': ERROR,
        'react/jsx-first-prop-new-line': [ERROR, "never"],
        'react/jsx-max-props-per-line': [ERROR, { "when": "multiline" }],
        'react/jsx-no-duplicate-props': ERROR,
        'react/jsx-pascal-case': ERROR,
        'react/jsx-tag-spacing': ERROR,
        'react/jsx-wrap-multilines': ERROR,
        'rest-spread-spacing': ERROR,
        'semi': [ERROR, 'always'],
        'semi-spacing': ERROR,
        'semi-style': [ERROR, 'last'],
        'space-before-blocks': ERROR,
        'space-before-function-paren': [ERROR, {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": 'always'
        }],
        'space-in-parens': ERROR,
        'space-infix-ops': ERROR,
        'space-unary-ops': [ERROR, { 'words': true, 'nonwords': false }],
        'spaced-comment': [ERROR, 'always', { 'block': { 'balanced': true } }],
        'switch-colon-spacing': ERROR,
        'template-curly-spacing': ERROR,
        'unicode-bom': ERROR,
        'yoda': ERROR,
        'quote-props': [WARNING, 'as-needed'],
        'quotes': [2, 'single'],
    },

}