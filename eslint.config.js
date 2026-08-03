// =============================================================================
// De la Parra Couture — ESLint Flat Config
// =============================================================================
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**'],
  },

  js.configs.recommended,

  {
    files: ['src/**/*.{ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-undef': 'off',
    },
  },

  ...astro.configs['flat/recommended'],
];
