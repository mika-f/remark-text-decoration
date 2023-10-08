import js from "@eslint/js";

import ConfigAirBnb from "eslint-config-airbnb-base";
import ConfigAirBnbTypescript from "eslint-config-airbnb-typescript";
import ConfigPrettier from "eslint-config-prettier";
import TypeScriptPlugin from "@typescript-eslint/eslint-plugin";
import TypeScriptParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  ConfigAirBnb.rules,
  ConfigAirBnbTypescript.rules,
  ConfigPrettier,
  {
    plugins: {
      "@typescript-eslint": TypeScriptPlugin,
    },
  },
  {
    files: ["**/*.ts", "**/*.mts"],
    languageOptions: {
      parser: TypeScriptParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...TypeScriptPlugin.configs["eslint-recommended"].rules,
      ...TypeScriptPlugin.configs["recommended-type-checked"].rules,
    },
  },
];
