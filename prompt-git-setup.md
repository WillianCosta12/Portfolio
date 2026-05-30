# Prompt — Git Setup + Push para o GitHub

Cole este prompt no Claude Code com o projeto aberto.

---

Execute as seguintes tarefas em ordem. Pare e me avise se qualquer passo falhar.

## Contexto

Projeto: portfolio pessoal em Next.js 16 + pnpm, localizado na pasta atual.
Já existe código. Preciso inicializar o git, corrigir dois arquivos, e subir para o GitHub.

---

## Passo 1 — Corrigir next.config.mjs

Edite o arquivo `next.config.mjs` e altere `ignoreBuildErrors` de `true` para `false`. Adicione também `eslint: { ignoreDuringBuilds: false }`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

## Passo 2 — Substituir o .gitignore

Substitua o conteúdo do `.gitignore` por este:

```gitignore
# v0 / sandbox
__v0_runtime_loader.js
__v0_devtools.tsx
__v0_jsx-dev-runtime.ts
.snowflake/
.v0-trash/

# Next.js
.next/
out/

# Dependências
node_modules/

# Ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# Vercel
.vercel/

# Debug
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Sistema operacional
.DS_Store
Thumbs.db

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

## Passo 3 — Criar .env.example

Crie o arquivo `.env.example` na raiz:

```
# EmailJS — https://emailjs.com
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Passo 4 — Rodar o build

Execute `pnpm build` e me mostre o output completo. Se houver erros de TypeScript ou ESLint, corrija-os antes de continuar.

## Passo 5 — Inicializar o git e fazer o primeiro commit

Execute em sequência:

```bash
git init
git checkout -b main
git add .
git status
git commit -m "feat: initial portfolio setup

- Next.js 16 + TypeScript + Tailwind CSS v4
- Dark/light mode com ThemeContext
- i18n PT/EN com react-i18next
- Secoes: Hero, Sobre, Projetos, Contato, Footer
- Animacoes com Framer Motion v12
- shadcn/ui + Radix UI primitives
- SEO e metadata configurados
- Deploy configurado para Vercel"
```

## Passo 6 — Conectar ao GitHub e fazer push

**Antes de executar, me diga qual é a URL do repositório que você criou no GitHub.**
Vou aguardar para substituir `URL_DO_REPO` pelo valor correto.

```bash
git remote add origin URL_DO_REPO
git remote -v
git push -u origin main
```

## Passo 7 — Criar branch develop

```bash
git checkout -b develop
git push -u origin develop
git checkout main
```

## Passo 8 — Confirmar

Mostre o resultado de:

```bash
git log --oneline
git branch -a
git remote -v
```
