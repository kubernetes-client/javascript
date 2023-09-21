module.exports = {
    env: {
      es6: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:import/errors",
      "plugin:import/warnings",
      //"plugin:unicorn/recommended",
      //"prettier",
      //"prettier/@typescript-eslint",
      //"prettier/standard",
      //"prettier/unicorn"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["tsconfig.eslint.json"],
      // Allows for the parsing of modern ECMAScript features if you're using modern node.js or frontend bundling
      // this will be inferred from tsconfig if left commented
      // ecmaVersion: 2020,
      sourceType: "module", // Allows for the use of imports
      // Allows for the parsing of JSX if you are linting React
      // ecmaFeatures: {
      //  jsx: true
      // }
    },
    rules: {
      "unicorn/filename-case": [
        "warn",
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
    },
    plugins: ["@typescript-eslint", "import", "prefer-arrow", "unicorn"],
  };