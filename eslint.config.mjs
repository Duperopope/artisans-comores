import nextConfig from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // French text uses apostrophes for grammatical contractions (l'ensemble, d'un…)
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
