module.exports = {
    injectGlobals: true,
    setupFilesAfterEnv: ["./jest.setup.js"],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/','<rootDir>/*.js/'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
    "testEnvironment": "jsdom"
};