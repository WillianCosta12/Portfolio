import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Regras oficiais do Next (Core Web Vitals + TypeScript). O kit shadcn guardado em components/ui não entra na
// página e fica fora do lint, como já fica fora do CSS; _arquivo/ é o código retirado (site de novembro e modelos).
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'components/ui/**', 'hooks/**', '_arquivo/**', '.claude/**', '.taste-skill/**', '.impeccable/**']),
])

export default eslintConfig
