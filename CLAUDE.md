# CLAUDE.md — Portfolio Willian Costa

> Arquivo de contexto para o Claude Code. Leia este arquivo inteiro antes de qualquer alteração no projeto.

---

## Projetos em desenvolvimento (stand by)

Estes dois projetos estão planejados mas só serão iniciados após o portfolio estar finalizado visualmente (redesign + animações completas, faltando apenas os dados reais dos projetos).

| Projeto | Tipo | Stack |
|---|---|---|
| **FlowApp** | Landing page de app móvel — hero com mockup 3D, scroll storytelling, animações avançadas | React · TypeScript · Tailwind · Framer Motion |
| **Velour** | E-commerce de moda — lookbook, filtro por cor/tamanho, wishlist, carrinho, checkout, JWT | React · Node.js · PostgreSQL · JWT · Tailwind |

Quando o portfolio estiver pronto para receber projetos reais, retomar o desenvolvimento destes dois.

---

## Sobre o Projeto

Portfolio pessoal de **Willian Costa**, desenvolvedor Full-stack Junior. O objetivo é mostrar capacidade técnica em full-stack + automações, com storytelling de desenvolvimento (processo Figma → código). O site é bilíngue (PT/EN), suporta dark/light mode e será publicado até **27 de julho de 2026**.

**URL de produção planejada:** `https://williancosta.dev`  
**Deploy:** Vercel  
**Repositório:** GitHub

---

## Stack Técnica (como está no código)

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 16** (App Router) + TypeScript |
| Estilização | **Tailwind CSS v4** (via `@tailwindcss/postcss`) |
| Componentes UI | **shadcn/ui** (Radix UI primitives) |
| Animações | **Framer Motion v12** |
| i18n | **react-i18next** (recursos inline em `lib/i18n.ts`) |
| Tema | Context API customizado (`contexts/theme-context.tsx`) |
| Ícones | **lucide-react** |
| Gerenciador de pacotes | **pnpm** |

> ⚠️ O plano original era Vite + React + Tailwind v3. O v0 gerou Next.js + Tailwind v4. **Mantenha o que está — não migre.**

---

## Estrutura de Arquivos

```
portfolio-willian-costa/
├── app/
│   ├── globals.css          # CSS global: tokens, animações, utilitários
│   ├── layout.tsx           # Root layout: fonts (Inter, Space Grotesk, JetBrains Mono), metadata, OG
│   └── page.tsx             # Entry point → <Portfolio />
├── components/
│   ├── portfolio.tsx        # Shell: ThemeProvider + Navbar + seções + Footer
│   ├── navbar.tsx           # Navbar fixa: links, toggle dark/light, toggle PT/EN, menu mobile
│   ├── hero.tsx             # Hero 100vh: typewriter, gradient orbs, CTAs, social links
│   ├── about.tsx            # Sobre: bio, skills, experience timeline, social links, stats
│   ├── projects.tsx         # Projetos: grid + filtro por stack (dados placeholder)
│   ├── contact.tsx          # Contato: form com validação (envio ainda mock)
│   ├── footer.tsx           # Footer simples
│   ├── back-to-top.tsx      # Botão flutuante de voltar ao topo
│   └── ui/                  # Componentes shadcn/ui (não editar diretamente)
├── contexts/
│   └── theme-context.tsx    # ThemeProvider: dark/light via classList + localStorage
├── hooks/
│   ├── use-typewriter.ts    # Hook do efeito typewriter do hero
│   ├── use-intersection-observer.ts  # Hook para animações on scroll
│   ├── use-mobile.ts        # Hook de detecção mobile
│   └── use-toast.ts         # Hook de toast notifications
├── lib/
│   ├── i18n.ts              # Configuração i18next + todas as traduções PT/EN
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
└── public/                  # Assets estáticos (imagens placeholder por enquanto)
```

---

## Design System — Tokens de Cor

As cores estão definidas como CSS custom properties em `app/globals.css`.

### Dark Mode (`.dark`)
```css
--bg: #030303
--surface: #0A0A0A
--surface-elevated: #141414
--border: #262626
--text: #FFFFFF
--text-secondary: #E5E5E5
--text-muted: #A3A3A3
--accent: #22C55E          /* verde principal */
--accent-hover: #4ADE80
--accent-light: #86EFAC
--accent-muted: rgba(34, 197, 94, 0.2)
--accent-border: rgba(34, 197, 94, 0.5)
```

### Light Mode (`:root`)
```css
--bg: #FAFAFA
--surface: #FFFFFF
--surface-elevated: #F4F4F5
--border: #E4E4E7
--text: #18181B
--text-secondary: #3F3F46
--text-muted: #52525B
--accent: #059669
--accent-hover: #047857
--accent-muted: rgba(5, 150, 105, 0.12)
--accent-border: rgba(5, 150, 105, 0.3)
```

> ⚠️ **Divergência do design spec original:** O Figma especificou `#3DDBA0` (mint) como accent e `#3B1E54` (purple) como brand accent. O v0 implementou verde Tailwind (#22C55E/#059669). Antes de trocar, pergunte ao Willian se quer corrigir para o spec ou manter o verde atual.

### Tipografia
- **Display/Headings:** `font-display` → Space Grotesk (variável `--font-space-grotesk`)
- **Body:** `font-sans` → Inter (variável `--font-inter`)
- **Mono:** `font-mono` → JetBrains Mono (variável `--font-jetbrains`)

> ⚠️ **Divergência:** O spec do Figma define Unbounded como display font. O v0 usou Space Grotesk. Pergunte antes de trocar.

### Classes CSS utilitárias disponíveis (definidas em globals.css)
```
.glow            → box-shadow verde (light/dark aware)
.text-glow       → text-shadow verde
.glass           → glassmorphism backdrop-blur
.grid-pattern    → grid de linhas sutis no background
.card-hover      → translateY(-6px) + shadow no hover
.link-underline  → underline animado da esquerda
.shimmer         → shimmer effect animado
.gradient-orb    → orb de gradiente (hero background)
.gradient-orb-2  → orb secundário
.noise-overlay   → textura de ruído sutil
.cursor          → cursor piscante do typewriter
.animate-float   → float suave infinito
```

---

## O que já está implementado ✅

- [x] Setup completo (Next.js + Tailwind v4 + TypeScript + pnpm)
- [x] Dark/Light mode (ThemeContext + CSS variables + localStorage)
- [x] i18n PT/EN completo (react-i18next, todos os textos traduzidos)
- [x] Navbar responsiva (links, toggle dark/light, toggle PT/EN, menu mobile com slide)
- [x] Hero (typewriter do nome, gradient orbs animados, partículas flutuantes, grid pattern, CTAs, social links, scroll indicator)
- [x] Seção Sobre (bio, skills tags, experience timeline, social links, stats)
- [x] Seção Projetos (grid 2 colunas, filtro por stack, cards com hover)
- [x] Seção Contato (form com validação client-side, estados de loading/sucesso/erro)
- [x] Footer
- [x] BackToTop button
- [x] Hooks: `useTypewriter`, `useIntersectionObserver`, `useMobile`, `useToast`
- [x] Metadata SEO completa em `layout.tsx` (title, description, OG, Twitter card)
- [x] Acessibilidade: skip link, aria-labels, focus-visible

---

## O que FALTA fazer ❌

### Prioridade Alta — Conteúdo Real
1. **Dados reais dos projetos** — `components/projects.tsx` está com 4 projetos placeholder. Substituir pelos 6 projetos reais:
   - **Nexus** (Star Project ⭐) — Kanban full-stack, React + Spring Boot + PostgreSQL + JWT
   - **DevCard** — GitHub Profile Generator, React + Node.js + GitHub API
   - **Lumis** — Landing SaaS fictícia, React + Framer Motion (Lighthouse 100)
   - **FlowMoney** — Controle financeiro, React + Spring Boot + PostgreSQL + Recharts
   - **Automação 01** — Case Study anonimizado (emprego atual)
   - **Automação 02** — Content Pipeline N8N (Notion → PT/EN → Buffer → Telegram)

2. **URLs reais** — GitHub e LinkedIn em `components/hero.tsx` e `components/about.tsx` ainda apontam para `https://github.com` e `https://linkedin.com`. Substituir pelos links reais do Willian.

3. **Email real** — `contato@williancosta.dev` em `contact.tsx` e `about.tsx`.

4. **Experience real** — `components/about.tsx` tem apenas "Full-stack Developer / Freelancer / 2024–Presente". Pode detalhar mais se o Willian quiser.

5. **Stats reais** — "2+ Anos de Experiência" e "15+ Projetos Completos" em `about.tsx`. Ajustar para refletir a realidade.

### Prioridade Alta — Funcionalidades
6. **Envio real do formulário de contato** — `components/contact.tsx` ainda usa `setTimeout` mockado. Integrar **EmailJS** ou **Formspree**. EmailJS não requer backend.

7. **Download CV** — O hero no design spec tem um botão "Download CV". Não implementado ainda. Adicionar botão no Hero e na seção Sobre. O CV deve ser um PDF em `/public/willian-costa-cv.pdf`.

### Prioridade Média — Seções Faltantes
8. **Seção Case Studies** — Não existe no código. Criar `components/case-studies.tsx` com o formato: Contexto → Problema → Solução → Diagrama → Resultado. Pelo menos as 2 automações documentadas.

9. **Imagens nos cards de projeto** — Os cards em `projects.tsx` não têm imagem/cover. Adicionar imagem de capa (screenshot ou mockup) para cada projeto.

### Prioridade Média — Design
10. **Variação de background entre seções** — O spec define backgrounds diferentes por seção no dark mode:
    - Hero: `#030303` (atual ✓)
    - Sobre: `#0A0A14` (toque de roxo) — atualmente é padrão
    - Projetos: `#040D08` (toque de verde) — atualmente usa `bg-card/30`
    - Contato: `#030303` (atual ✓)

11. **Badge de status nos cards** — Spec define badges: Concluído / Em Progresso / Conceito. Não implementado.

12. **Tags de stack coloridas** — O spec define tags mint (verde), purple e neutral. Atualmente todas são `bg-secondary` neutras.

### Prioridade Baixa — Melhorias
13. **SEO — OG Image** — Criar uma imagem Open Graph real e referenciar no `layout.tsx`.
14. **Lighthouse ≥ 90** — Rodar Lighthouse e corrigir issues antes do deploy.
15. **Testes cross-browser** — Chrome, Firefox, Safari (mobile e desktop).
16. **Vercel Analytics** — `@vercel/analytics` já está no package.json, só falta adicionar `<Analytics />` no layout.

---

## Padrões de Código a Seguir

### Componentes
- Todos são `'use client'` (Next.js App Router com Framer Motion)
- Animações de entrada: sempre use `useIntersectionObserver` + `motion.div` com `animate={isInView ? 'visible' : 'hidden'}`
- Para animações de hover: use `whileHover` e `whileTap` do Framer Motion
- Stagger em listas: use `containerVariants` + `itemVariants` (padrão já no código)

### Estilização
- Sempre use CSS variables via `var(--token)` para cores do design system
- Use `bg-[var(--accent)]`, `text-[var(--accent)]`, etc. para o accent color
- Não hardcode cores hex no JSX — use os tokens definidos em globals.css
- Para bordas de hover: `hover:border-[var(--accent-border)]`
- Para background sutil: `hover:bg-[var(--accent-muted)]`
- Breakpoints mobile-first: `sm:` (640px), `md:` (768px), `lg:` (1024px)

### i18n
- Todos os textos visíveis ao usuário devem usar `const { t } = useTranslation()`
- Adicionar sempre as chaves nos dois idiomas em `lib/i18n.ts` (pt e en)
- Nunca hardcode strings em PT ou EN diretamente no JSX

### Fontes
- Headings/títulos: `className="font-display"` → Space Grotesk
- Body text: `className="font-sans"` → Inter (padrão do body)
- Código/mono: `className="font-mono"` → JetBrains Mono

### Animações — Timing padrão
```
hover rápido:   duration: 0.18s
cards/médio:    duration: 0.25s
seções/entrada: duration: 0.6s, ease: [0.22, 1, 0.36, 1]
stagger delay:  0.08–0.12s por item
```

---

## Integração EmailJS (para o formulário de contato)

Quando for implementar o envio real, usar EmailJS:

```bash
pnpm add @emailjs/browser
```

```typescript
// Em components/contact.tsx, substituir o setTimeout por:
import emailjs from '@emailjs/browser'

await emailjs.send(
  'SERVICE_ID',    // do painel EmailJS
  'TEMPLATE_ID',   // do painel EmailJS
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  'PUBLIC_KEY'     // do painel EmailJS
)
```

As chaves devem ir em variáveis de ambiente (`.env.local`):
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

---

## Comandos Úteis

```bash
pnpm dev          # servidor de desenvolvimento em localhost:3000
pnpm build        # build de produção
pnpm lint         # ESLint
```

---

## Próximos Passos Recomendados (em ordem)

1. Substituir dados placeholder dos projetos pelos projetos reais em `components/projects.tsx`
2. Adicionar URLs reais (GitHub, LinkedIn, email) nos componentes
3. Integrar EmailJS no formulário de contato
4. Adicionar botão de Download CV no Hero e no Sobre
5. Criar a seção Case Studies (`components/case-studies.tsx`)
6. Adicionar imagens de capa nos cards de projeto
7. Implementar variação de background entre seções
8. Adicionar `<Analytics />` do Vercel no `layout.tsx`
9. Rodar Lighthouse e corrigir issues
10. Deploy Vercel + configurar domínio

---

## Observações Importantes

- **Willian está empregado** — o portfólio é projeto pessoal, não está buscando vagas. Tom: vitrine de capacidade técnica, não CV de hunting.
- **Inglês B1** — os textos em inglês devem ser simples e diretos. Nada muito idiomático.
- **Automações do emprego** — devem ser documentadas como case studies **anonimizados**. Nunca citar empresa, cliente ou dados reais.
- **Prazo:** 27 de julho de 2026.
- **Deploy:** Vercel (já configurado com `vercel.json` na raiz).
- **pnpm** é o gerenciador de pacotes — não use npm ou yarn.
