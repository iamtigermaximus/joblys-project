module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["<rootDir>/jest.setup.ts"],
    setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
    testMatch: [
        "**/*.test.ts"
      ]
  }