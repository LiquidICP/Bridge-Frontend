module.exports = {
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  plugins: [
    'jsx-a11y',
    'import',
    '@typescript-eslint',
    'react-hooks'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
    Reactotron: true,
  },
  ignorePatterns: '*.js',
  rules: {
    'no-plusplus': 0,
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
    'no-trailing-spaces': 'error',
    "react/jsx-max-props-per-line": [2, { "maximum": { "single": 1, "multi": 1 } }],
    'no-underscore-dangle': 0,
    'jsx-a11y/label-has-associated-control': [ 2, {
      "depth": 1,
    }],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    'max-len': ["error", { 
      code: 100, 
      "ignoreUrls": true, 
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
    }],
    'consistent-return': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'react/button-has-type': 0,
  }
};