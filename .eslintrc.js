module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    "@typescript-eslint",
    "promise",
    'jsx-a11y',
    'import',
    'react-hooks'
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    "plugin:promise/recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: '.',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'react/jsx-props-no-spreading': 0,
    'func-call-spacing': 2, // instead of no-spaced-func
    'import/extensions': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'no-spaced-func': 0, // deprecated
    'import/prefer-default-export': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/label-has-associated-control': [ 2, {
      "depth": 1,
    }],
    'consistent-return': 0,
    'no-trailing-spaces': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'react/button-has-type': 0,
    'semi': 2,
    'comma-dangle': 2,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/keyword-spacing': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'object-curly-spacing': 2,
    'no-console': 2,
    '@typescript-eslint/no-unused-vars': 2,
    'func-names': 0,
    "linebreak-style": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  }
};
