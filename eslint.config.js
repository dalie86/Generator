import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import ds from "./eslint/plugin-ds.js";

export default tseslint.config(
  { ignores: ["dist", "storybook-static", "eval/tools/fixtures", "node_modules"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { ecmaVersion: 2022, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "react-hooks": reactHooks, ds },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "ds/no-raw-values": "error",
      "ds/no-raw-interactive": "error",
      "ds/no-foreign-ui": "error",
      "ds/radio-for-few": "warn",
    },
  },
  {
    // Каркас приложения и stories не проверяем правилами DS.
    // В stories хуки вызываются внутри render — штатный приём Storybook.
    files: ["src/app/**", "src/**/*.stories.tsx"],
    rules: { "ds/no-raw-values": "off", "ds/no-raw-interactive": "off", "react-hooks/rules-of-hooks": "off" },
  },
);
