import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      prettier,
    },
  },
];
