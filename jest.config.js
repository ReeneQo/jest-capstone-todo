export default {
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.js", "!src/**/*.test.js"],
  coverageThreshold: {
    global: { statements: 90, branches: 90, functions: 90, lines: 90 },
  },
};
