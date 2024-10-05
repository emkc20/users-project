module.exports = {
  // diğer ayarlar...
  rules: {
    'no-unused-vars': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-unused-components': 'off',
  },
  extends: ['plugin:vue/base', 'eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2021,
  },
  plugins: ['vue', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
};
