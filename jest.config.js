module.exports = {
    roots: [
        "<rootDir>/src/tests"
    ],
    verbose: true,
    bail: false,
    transform: {
        '^.+\\.(ts)$': 'ts-jest'
    },
    testRegex: "(.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    preset: "jest-puppeteer",
    setupFilesAfterEnv: ['jest-expect-message'],
    globalSetup: './global-setup.js',
    globalTeardown: './global-teardown.js',
    testTimeout: 90000,
}
