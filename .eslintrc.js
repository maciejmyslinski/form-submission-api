module.exports = {
  extends: ['airbnb-base', 'plugin:flowtype/recommended'],
  root: true,
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: 'submitAForm' }],
    'import/prefer-default-export': 'off',
  },
  plugins: ['flowtype', 'eslint-plugin-googleappsscript'],
  env: {
    'googleappsscript/googleappsscript': true,
  },
};
