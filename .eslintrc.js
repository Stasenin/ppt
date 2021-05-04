module.exports = {
    root: true,
    extends: [
        'eslint:recommended'
    ],
    env: {
        jest: true,
    },
    rules: {
        'no-undef': 'off'
    },
    globals: {
        page: true,
        browser: true,
        context: true,
        jestPuppeteer: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
}
