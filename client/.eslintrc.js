module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "commonjs": true,
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    },
    "project": './tsconfig.json',
  },
  "extends": [
    "taro/react",
    'eslint-config-alloy/react',
    'eslint-config-alloy/typescript',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:taro/all"
  ],
  "plugins": [
    "react",
    "@typescript-eslint/eslint-plugin",
  ],
  "globals": {
    "window": false,
    "document": false,
    "process.env.TARO_ENV": false,
    "wx": false,
    "OLDHOST": true
  },
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-single"]
  }
}
