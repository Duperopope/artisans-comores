import nextConfig from "eslint-config-next";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // French text uses apostrophes for grammatical contractions (l'ensemble, d'un…)
      "react/no-unescaped-entities": "off",
      // Reading localStorage/sessionStorage on mount is a valid external-state sync pattern
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
