module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "quotes": [ "error", "single", { "avoidEscape": true, "allowTemplateLiterals": true } ],
        "semi": [ "error" ]
    }
};