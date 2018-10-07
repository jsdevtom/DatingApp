module.exports = {
  preset: "jest-preset-angular",
  roots: ['src'],
  testMatch: [
    "**/__tests__/**/*.+(ts)",
    "**/+(*.)+(spec).+(ts)"
  ],
  setupTestFrameworkScriptFile: "<rootDir>/src/setup-jest.ts",
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@env/(.*)": "<rootDir>/src/environments/$1",
    "@testing/(.*)": "<rootDir>/src/testing/$1"
  }
};
