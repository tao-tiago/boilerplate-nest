import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest"

import { compilerOptions } from "./tsconfig.json"

const jestConfig: JestConfigWithTsJest = {
  testMatch: ["**/*.spec.ts"],
  preset: "ts-jest",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/"
  }),
  globalSetup: "<rootDir>/test/globalSetup.ts",
  setupFiles: ["<rootDir>/test/setupFiles.ts"],
  setupFilesAfterEnv: [],
  coverageReporters: ["lcov", "html"],
  coverageDirectory: "./coverage",
  clearMocks: true,
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "coverage",
        outputName: "junit.xml",
        suiteName: "jest tests",
        classNameTemplate: "{classname} - {title}",
        titleTemplate: "{classname} - {title}",
        ancestorSeparator: " > ",
        usePathForSuiteName: "true"
      }
    ]
  ],
  coverageThreshold: {
    global: {
      // statements: 80,
      // branches: 80,
      // functions: 80,
      // lines: 80
    }
  },
  collectCoverage: false,
  collectCoverageFrom: ["src/core/shared/**/*.ts", "src/services/**/*service.ts"],
  coveragePathIgnorePatterns: ["helpers"],
  globals: {}
}

export default jestConfig
