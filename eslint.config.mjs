import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import prettierPlugin from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import tsEslint from "typescript-eslint"
import globals from "globals"

const lintConfig = [
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        allowDefaultProject: ['*.ts', '*.mjs'],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 5,
      sourceType: "module"
    }
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    ignores: ["dist/*"],
    plugins: {
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "prettier/prettier": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports
            ["^\\u0000"],
            
            // Packages starting with a character
            ["^@[a-z]", "^[a-z]"],

            // RTL packages
            ["^@testing-library"],
            ["^@/[a-z]"],
            ["^@/\\.\\./[a-z]"],

            // Imports starting with `../`
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

            // Imports starting with `./`
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ]
        }
      ],
      "no-undef": "off",
      "no-console": "error",
      semi: ["error", "never"],
      "comma-dangle": ["error", "never"],
      quotes: ["error", "double"],
      "comma-spacing": [
        "error",
        {
          before: false,
          after: true
        }
      ],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/consistent-generic-constructors": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: "[A-Z]",
          caughtErrors: "none"
        }
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "warn"
    }
  }
]

export default lintConfig