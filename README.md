<div align="center">

# Willian Costa — Portfolio

**Full-stack Developer · Natal, RN · Brazil**

[![Deploy](https://img.shields.io/badge/deploy-vercel-000000?style=flat&logo=vercel)](https://williancosta.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat&logo=framer)](https://framer.com/motion)
[![License](https://img.shields.io/badge/license-MIT-22C55E?style=flat)](LICENSE)

**[williancosta.vercel.app](https://williancosta.vercel.app)** · [LinkedIn](https://www.linkedin.com/in/williancosta-dev/) · [GitHub](https://github.com/WillianCosta12) · [@wcosta.dev](https://instagram.com/wcosta.dev)

</div>

---

## Sobre

Portfolio pessoal desenvolvido do zero com Next.js 16, TypeScript e Tailwind CSS v4. Apresenta minha trajetória como desenvolvedor full-stack, com foco em automações, integrações e desenvolvimento web para PMEs.

O site é **bilíngue (PT/EN)**, suporta **dark e light mode**, é completamente **responsivo** e conta com animações construídas com Framer Motion.

---

## Funcionalidades

- **Bilíngue** — toggle PT/EN com react-i18next, todos os textos traduzidos incluindo projetos e experiências
- **Dark / Light mode** — via Context API + CSS custom properties + localStorage
- **Hero assimétrico** — typewriter do nome com terminal card animado e badges flutuantes
- **Seção Sobre em Bento Grid** — cards modulares com bio, localização, status, skills filtráveis por categoria e timeline de experiência
- **Seção Projetos** — card featured com mockup de interface + grid de projetos com tilt 3D e spotlight de glow no hover
- **Formulário de contato** — layout split com validação client-side
- **Animações** — scroll progress bar, parallax no hero, reveal com clip-path, contador animado nas stats, spring nas skill tags
- **SEO completo** — metadata, OpenGraph e Twitter Card configurados
- **Responsivo** — mobile-first, breakpoints sm/md/lg

---

## Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Linguagem | TypeScript | 5.7.3 |
| Estilização | Tailwind CSS | v4 |
| Animações | Framer Motion | 12 |
| Componentes | shadcn/ui + Radix UI | — |
| i18n | react-i18next | 17 |
| Ícones | Lucide React | 0.564 |
| Package manager | pnpm | — |
| Deploy | Vercel | — |

---

## Estrutura do Projeto

```
portfolio-willian-costa/
├── app/
│   ├── globals.css          # Tokens de cor, animações, classes utilitárias
│   ├── layout.tsx           # Root layout com fontes, metadata e OG tags
│   └── page.tsx             # Entry point → <Portfolio />
│
├── components/
│   ├── portfolio.tsx        # Shell: ThemeProvider + Navbar + seções + Footer
│   ├── navbar.tsx           # Navbar fixa: links, dark/light toggle, PT/EN toggle, menu mobile
│   ├── hero.tsx             # Hero: typewriter, terminal card, gradient mouse-tracking, parallax
│   ├── about.tsx            # Sobre: bento grid, skills, timeline de experiência
│   ├── projects.tsx         # Projetos: card featured + grid com tilt 3D e spotlight
│   ├── contact.tsx          # Contato: layout split, formulário com validação
│   ├── footer.tsx           # Footer com links e navegação
│   ├── back-to-top.tsx      # Botão flutuante voltar ao topo
│   ├── scroll-progress.tsx  # Barra de progresso de scroll no topo
│   ├── page-loader.tsx      # Loading screen na primeira visita da sessão
│   └── ui/                  # Componentes shadcn/ui
│
├── contexts/
│   └── theme-context.tsx    # ThemeProvider: dark/light via classList + localStorage
│
├── hooks/
│   ├── use-typewriter.ts           # Efeito de digitação do hero
│   ├── use-intersection-observer.ts # Animações on-scroll
│   ├── use-count-up.ts             # Contador animado das stats
│   ├── use-mobile.ts               # Detecção de dispositivo mobile
│   └── use-toast.ts                # Toast notifications
│
├── lib/
│   ├── i18n.ts              # Configuração i18next + traduções PT/EN completas
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│
└── public/                  # Assets estáticos
```

---

## Design System

### Tokens de Cor

O sistema de cores usa CSS custom properties definidas em `app/globals.css`, com variantes para dark e light mode.

**Dark Mode (`.dark`)**

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#030303` | Background principal |
| `--surface` | `#0A0A0A` | Cards, superfícies |
| `--border` | `#262626` | Bordas |
| `--accent` | `#22C55E` | Verde principal (CTAs, destaque) |
| `--accent-muted` | `rgba(34,197,94,0.2)` | Backgrounds sutis |
| `--text` | `#FFFFFF` | Texto principal |
| `--text-muted` | `#A3A3A3` | Texto secundário |

**Light Mode (`:root`)**

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#FAFAFA` | Background principal |
| `--surface` | `#FFFFFF` | Cards, superfícies |
| `--accent` | `#059669` | Verde principal |
| `--text` | `#18181B` | Texto principal |

### Tipografia

| Classe | Fonte | Uso |
|---|---|---|
| `font-display` | Space Grotesk | Headings, títulos |
| `font-sans` | Inter | Body text |
| `font-mono` | JetBrains Mono | Código, labels técnicos |

### Classes Utilitárias

| Classe | Efeito |
|---|---|
| `.glow` | Box-shadow verde no elemento |
| `.text-glow` | Text-shadow verde |
| `.glass` | Glassmorphism com backdrop-blur |
| `.grid-pattern` | Grid de linhas sutis no background |
| `.gradient-text` | Gradiente animado em loop no texto |
| `.card-hover` | `translateY(-6px)` + shadow no hover |
| `.project-card` | Spotlight de glow seguindo o cursor |
| `.animate-float` | Float suave infinito |
| `.cursor` | Cursor piscante do typewriter |

---

## Rodando Localmente

### Pré-requisitos

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/WillianCosta12/portfolio.git
cd portfolio

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas chaves

# 4. Iniciar o servidor de desenvolvimento
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Para contato | ID do serviço no EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Para contato | ID do template no EmailJS |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Para contato | Chave pública do EmailJS |

> Sem essas variáveis o formulário de contato funciona em modo mockado (sem envio real).

---

## Scripts

```bash
pnpm dev      # Servidor de desenvolvimento em localhost:3000
pnpm build    # Build de produção
pnpm start    # Iniciar o servidor de produção
pnpm lint     # ESLint
```

---

## Deploy

O projeto está configurado para deploy automático na **Vercel**.

Qualquer push na branch `main` dispara um novo deploy automaticamente.

```
git push origin main  →  Vercel detecta  →  build  →  deploy  →  williancosta.vercel.app
```

### Estratégia de branches

| Branch | Comportamento |
|---|---|
| `main` | Deploy automático em produção |
| `develop` | Deploy automático em URL de preview |
| `feature/*` | Deploy automático em URL única por branch |

---

## Projetos no Portfolio

| Projeto | Tipo | Status |
|---|---|---|
| **FlowApp** | Landing page de app móvel com scroll storytelling | Em progresso |
| **Velour** | E-commerce de moda com JWT e painel admin | Em progresso |
| **FlowMoney** | Dashboard financeiro — React + Spring Boot | Em progresso |
| **SpaceNow** | Explorador de dados NASA em tempo real | Em progresso |
| **Automação** | Case study anonimizado de automações com n8n | Concluído |

---

## Contribuição

Este é um projeto pessoal, mas sugestões são bem-vindas. Abra uma issue para reportar bugs ou propor melhorias.

---

## Licença

MIT © [Willian Costa](https://williancosta.vercel.app)
