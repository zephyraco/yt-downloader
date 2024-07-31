export default [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: require("eslint-plugin-react"),
      prettier: require("eslint-plugin-prettier"),
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      "prettier/prettier": "error",
    },
  },
];
