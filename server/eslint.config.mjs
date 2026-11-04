import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["node_modules/**", "dist/**", "coverage/**"] },
  {
    files: ["src/**/*.ts", "scripts/**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
);
