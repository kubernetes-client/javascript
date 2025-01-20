import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/', 'docs/', 'node_modules/', 'src/gen/'],
    },
    eslint.configs.recommended,
    tseslint.configs.strict,
    {
        languageOptions: {
            globals: {
                Buffer: true,
                console: true,
                process: true,
                setTimeout: true,
            },
        },
        rules: {
            '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': false }],
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        },
    },
);
