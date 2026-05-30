# Guia — Criação do Repositório GitHub + Deploy Vercel
## Portfolio Willian Costa

---

## Visão geral do fluxo

```
Máquina local
    │
    ├── branch: main      → produção (williancosta.dev)
    └── branch: develop   → desenvolvimento / preview URL
             │
             └── feature/nome-da-feature  → trabalho isolado
```

---

## Parte 1 — Preparar o projeto antes de subir

### 1.1 Corrigir o next.config.mjs

O v0 gerou com `ignoreBuildErrors: true` — isso esconde erros de TypeScript em produção. Corrigir antes do primeiro commit:

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,   // ← corrigir de true para false
  },
  eslint: {
    ignoreDuringBuilds: false,  // ← adicionar
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

### 1.2 Atualizar o .gitignore

O `.gitignore` atual está faltando algumas entradas. Substituir pelo completo:

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

### 1.3 Criar .env.example (vai pro git — template público)

Criar o arquivo `.env.example` na raiz do projeto:

```bash
# .env.example — copie para .env.local e preencha com seus valores reais

# EmailJS — https://emailjs.com
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 1.4 Testar o build antes de subir

```bash
pnpm build
```

Resolver todos os erros de TypeScript/ESLint antes de continuar.

---

## Parte 2 — Criar o repositório no GitHub

### 2.1 Criar via interface

1. Acessar [github.com/new](https://github.com/new)
2. Preencher:
   - **Repository name:** `portfolio`
   - **Description:** `Portfolio pessoal — Full-stack Developer. Next.js + TypeScript + Tailwind CSS`
   - **Visibility:** ✅ **Public** — portfolio deve ser público
   - **Initialize repository:** ❌ Não marcar nada (README, .gitignore, license) — já temos localmente
3. Clicar em **Create repository**

### 2.2 Anotar a URL do repositório

Após criar, copiar a URL:
```
https://github.com/SEU_USERNAME/portfolio.git
```

---

## Parte 3 — Conectar o projeto local ao GitHub

Executar todos os comandos dentro da pasta do projeto.

### 3.1 Inicializar o git (se ainda não tiver)

```bash
# Verificar se já tem git inicializado
git status

# Se retornar "not a git repository":
git init
```

### 3.2 Configurar identidade (se for a primeira vez na máquina)

```bash
git config --global user.name "Willian Costa"
git config --global user.email "willacosta873@gmail.com"
```

### 3.3 Fazer o primeiro commit na branch main

```bash
# Garantir que está na branch main
git checkout -b main

# Adicionar todos os arquivos
git add .

# Verificar o que vai entrar (importante!)
git status

# Commit inicial
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

### 3.4 Conectar ao remoto e fazer push

```bash
# Adicionar o repositório remoto (substituir pela sua URL)
git remote add origin https://github.com/SEU_USERNAME/portfolio.git

# Confirmar que foi adicionado
git remote -v

# Subir para o GitHub
git push -u origin main
```

### 3.5 Criar a branch develop

```bash
# Criar e mudar para a branch develop
git checkout -b develop

# Subir a branch develop para o GitHub
git push -u origin develop
```

---

## Parte 4 — Estratégia de branches

### Como trabalhar no dia a dia

```bash
# 1. Sempre partir da develop atualizada
git checkout develop
git pull origin develop

# 2. Criar uma branch para a feature
git checkout -b feature/bento-about-section

# 3. Trabalhar, commitar (várias vezes ao longo do trabalho)
git add components/about.tsx
git commit -m "feat(about): implement bento grid layout"

git add hooks/use-count-up.ts
git commit -m "feat(hooks): add useCountUp for stats animation"

# 4. Terminou? Voltar para develop e fazer merge
git checkout develop
git merge feature/bento-about-section
git push origin develop

# 5. Develop estável? Mergear na main (vai pra producao)
git checkout main
git merge develop
git push origin main

# 6. Limpar a feature branch (opcional)
git branch -d feature/bento-about-section
git push origin --delete feature/bento-about-section
```

### Convenção de nomes para branches

| Tipo | Prefixo | Exemplo |
|---|---|---|
| Nova funcionalidade | `feature/` | `feature/hero-terminal-card` |
| Correção de bug | `fix/` | `fix/navbar-mobile-menu` |
| Conteúdo real | `content/` | `content/real-projects-data` |
| Melhoria visual | `style/` | `style/bento-about-section` |
| Configuração / infra | `chore/` | `chore/update-dependencies` |

---

## Parte 5 — Padrão de commits (Conventional Commits)

```
tipo(escopo): descrição curta em minúsculas
```

### Tipos

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `style` | Mudanças de CSS/layout sem lógica |
| `refactor` | Refatoração sem mudar comportamento |
| `content` | Dados reais, textos, imagens |
| `chore` | Dependências, configuração, build |
| `perf` | Melhoria de performance |

### Exemplos reais para este projeto

```bash
git commit -m "feat(hero): add asymmetric layout with terminal card"
git commit -m "feat(about): implement bento grid with skill category filter"
git commit -m "feat(projects): add 3D tilt effect and mouse spotlight on cards"
git commit -m "feat(animations): add scroll progress bar and page loader"
git commit -m "content(projects): replace placeholder data with real projects"
git commit -m "fix(navbar): active section indicator not updating on scroll"
git commit -m "style(about): adjust bento card gap on mobile"
git commit -m "chore: integrate EmailJS for contact form"
git commit -m "perf: add will-change to gradient orb animations"
```

---

## Parte 6 — Conectar ao Vercel

### 6.1 Importar o projeto

1. Acessar [vercel.com/new](https://vercel.com/new)
2. Conectar ao GitHub (autorizar acesso ao repositório)
3. Clicar em **Import** no repositório `portfolio`
4. Configurar:
   - **Framework Preset:** Next.js (detectado automaticamente)
   - **Build Command:** `pnpm build`
   - **Install Command:** `pnpm install`
   - **Output Directory:** `.next`

### 6.2 Variáveis de ambiente no Vercel

Antes de dar o primeiro deploy, ir em **Environment Variables** e adicionar:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID     = (preencher quando tiver)
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID    = (preencher quando tiver)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY     = (preencher quando tiver)
```

Marcar como disponível em: **Production + Preview + Development**.

### 6.3 Como os deploys funcionam automaticamente

| Branch | Resultado |
|---|---|
| `main` | Deploy automático → **williancosta.dev** (produção) |
| `develop` | Deploy automático → URL de preview única |
| Qualquer `feature/*` | Deploy automático → URL de preview por branch |

Cada push = novo deploy. Branches de feature ganham URLs individuais para testar antes de mergear — isso é ótimo para revisar antes de subir pra produção.

---

## Parte 7 — Domínio personalizado

### No Vercel

1. **Settings → Domains** do projeto
2. Adicionar `williancosta.dev`
3. Vercel fornece os registros DNS

### No registrador do domínio

Adicionar os registros fornecidos:

```
Tipo    Nome    Valor
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

DNS propaga em 5 min a 48h (geralmente menos de 1h).

---

## Parte 8 — README do repositório

Criar `README.md` na raiz (aparece na página do repo no GitHub):

```markdown
# Willian Costa — Portfolio

Portfolio pessoal desenvolvido com Next.js 16, TypeScript e Tailwind CSS v4.

🌐 **[williancosta.dev](https://williancosta.dev)**

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Estilizacao:** Tailwind CSS v4
- **Animacoes:** Framer Motion v12
- **Componentes:** shadcn/ui + Radix UI
- **i18n:** react-i18next (PT/EN)
- **Deploy:** Vercel

## Rodando localmente

\`\`\`bash
git clone https://github.com/SEU_USERNAME/portfolio.git
cd portfolio
pnpm install
cp .env.example .env.local
pnpm dev
\`\`\`

Abrir http://localhost:3000.

## Variaveis de ambiente

Veja `.env.example` para a lista completa.

## Licenca

MIT
```

---

## Checklist — antes de considerar pronto

- [ ] `pnpm build` roda sem erros
- [ ] `.gitignore` correto (sem `.env.local`, `node_modules`, `.next`)
- [ ] `.env.example` criado com variáveis documentadas
- [ ] `next.config.mjs` com `ignoreBuildErrors: false`
- [ ] `README.md` criado e descritivo
- [ ] Repositório criado no GitHub como **Public**
- [ ] Commit inicial feito com mensagem descritiva
- [ ] Branch `develop` criada e enviada para o GitHub
- [ ] Projeto importado no Vercel
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Primeiro deploy funcionando na URL do Vercel
- [ ] Domínio `williancosta.dev` configurado (quando disponível)

---

## Comandos de referência rápida

```bash
# Status e histórico
git status
git log --oneline
git branch -a

# Atualizar local com remoto
git pull origin develop

# Desfazer último commit (mantém as alterações nos arquivos)
git reset --soft HEAD~1

# Descartar alterações não commitadas em um arquivo
git checkout -- components/hero.tsx

# Ver diferença antes de commitar
git diff

# Guardar trabalho temporariamente sem commitar
git stash
git stash pop

# Ver quais arquivos mudaram entre branches
git diff develop..feature/minha-feature --name-only
```
