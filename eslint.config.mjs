import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
    },
  },
  {
    ignores: [
      "webpack.common.js",
      "webpack.dev.js",
      "webpack.prod.js",
      ".prettierrc",
      "eslint.config.mjs",
    ],
  },
  eslintConfigPrettier,
];
