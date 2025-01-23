import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    rules: {
      camelcase: 'off',
    },
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    '@rocketseat/eslint-config/next',
  ),
]

export default eslintConfig
