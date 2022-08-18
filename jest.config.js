module.exports = {
    injectGlobals: true,
    setupFilesAfterEnv: ["./jest.setup.js"],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
    "testEnvironment": "jsdom"
};