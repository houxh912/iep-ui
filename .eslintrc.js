module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "vue/component-name-in-template-casing": [
      "error",
      "kebab-case",
      {
        ignores: []
      }
    ],
    "prettier/prettier": [
      "error",
      {
        // singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: "babel",
        insertPragma: true,
        requirePragma: true
      }
    ],
    semi: ["error", "never"],
    quotes: ["error", "single"],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-function-paren": "error",
    "no-console": "off",
    "no-debugger": "off",
    "no-prototype-builtins": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
