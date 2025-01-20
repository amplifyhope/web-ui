import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslintJs from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import path from 'path'
import tsEslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintJs.configs.recommended,
  allConfig: eslintJs.configs.all
})

const patchedConfig = fixupConfigRules([
  ...compat.extends('next/core-web-vitals')
])

export default tsEslint.config(
  {
    ignores: ['**/*.test.tsx', '**/public/*', '**/.next/*', '**/.vscode/*']
  },
  ...patchedConfig,
  ...tsEslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@next/next/no-img-element': 'off'
    }
  }
)
