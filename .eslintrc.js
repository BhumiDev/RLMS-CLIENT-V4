module.exports = {
    env: {
        browser: false,
        es2021: false,
        es6: false,
        jest: false
    },
    extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: 'module'
    },
    plugins: ['react', 'prettier'],
    rules: {
        camelcase: 'off',
        // 'no-unused-vars': 'off',
        'prefer-template': 'off',
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-vars': 'off',
        'import/no-unresolved': 'off',
        'no-unused-expressions': 'off',
        'react/function-component-definition': 'off',
        'arrow-body-style': 'off',
        'prettier/prettier': [
            1,
            {
                endOfLine: 'auto',
                printWidth: 80,
                trailingComma: 'none',
                semi: true,
                doubleQuote: false,
                jsxSingleQuote: false,
                singleQuote: true,
                useTabs: false,
                tabWidth: 4,
                bracketSameLine: false
            }
        ],
        'react/no-array-index-key': 'off',
        'react/react-in-jsx-scope': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-props-no-spreading': 0,
        'no-plusplus': 'off',
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }]
    }
};
