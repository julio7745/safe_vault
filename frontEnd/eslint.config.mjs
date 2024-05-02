import { globals } from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default {
  languageOptions: {
    globals: globals.browser
  },
  extends: [
    pluginJs.configs.recommended,
    tseslint.configs.recommended,
    pluginReactConfig,
    'plugin:prettier/recommended'
  ],
  settings: {
    "import/resolver": {
      alias: [
        ["@/*", "./src"]
      ]
    }
  }
};
