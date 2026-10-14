import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // `vercel build` writes a compiled copy of the app here. It is build
    // output like .next, it is gitignored, and linting it reports 1900
    // problems that belong to the compiler rather than to this codebase.
    ".vercel/**",
  ]),
]);

export default eslintConfig;
