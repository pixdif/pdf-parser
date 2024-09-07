import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: [
			'coverage/**',
			'dist/**',
			'output/**',
		],
	},
	{
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			indent: [
				'error',
				'tab',
			],
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					caughtErrorsIgnorePattern: 'ignore',
				},
			],
		},
	},
);
