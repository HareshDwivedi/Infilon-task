module.exports = {
  "root": true,
  "extends": [
    "react-app",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    // "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "rules": {
    "quotes": [ "error", "double" ],
    "array-bracket-spacing": [ "error", "always" ],
    "object-curly-spacing": [ "error", "always" ],
    "semi": "error",
    "max-len": [ "error", { "code": 300 } ],
    // "no-console": ["error"],
    "no-await-in-loop": "warn",
    "prettier/prettier": "off",
    "arrow-spacing": [ "error", {
      "before": true,
      "after": true
    } ],
    "jsx-quotes": 0,
    "react/prop-types": 0,
    "no-return-await": "warn",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/button-has-type": "error",
    "react/react-in-jsx-scope": "off",
    "react/no-access-state-in-setstate": 2,
    "no-inline-styles/no-inline-styles": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "plugins": [ "prettier", "react", "react-hooks", "import", "eslint-plugin-no-inline-styles" ],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "es2021": true,
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};

