import { sxzz } from "@sxzz/eslint-config";
import oxlint from "eslint-plugin-oxlint";

export default sxzz()
  .removeRules("import/no-duplicates", "vue/no-unused-refs", "vue/require-default-prop")
  .append(oxlint.configs["flat/recommended"])
  .overrideRules({
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      { registeredComponentsOnly: false },
    ],
  })
  .append({
    ignores: ["**/dist/**", "**/assets/**", "**/*.js", "**/*.d.ts", "**/*.mjs"],
  });
