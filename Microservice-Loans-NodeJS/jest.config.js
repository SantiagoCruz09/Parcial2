module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  transform: { "^.+\\.tsx?$": ["ts-jest", { tsconfig: { module: "commonjs" } }] },
  moduleNameMapper: { "^@faker-js/faker$": "<rootDir>/src/faker.test.mock.ts" },
};
