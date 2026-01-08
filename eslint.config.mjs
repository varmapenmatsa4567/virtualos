import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

const eslintConfig = [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ...nextPlugin.configs.recommended,
    ...nextPlugin.configs["core-web-vitals"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [".next/", "node_modules/"],
  },
];

export default eslintConfig;
