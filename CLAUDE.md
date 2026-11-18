# CLAUDE.md — Portfolio Willian Costa (wcosta.dev)

> Arquivo de contexto para o Claude Code. Leia este arquivo inteiro antes de qualquer alteração no projeto.
> Site final de 17/11/2026: o modelo 5 ("do caos ao sistema") como base, mais os detalhes que o Willian escolheu nos outros modelos. O registro de tudo o que ele quer e não quer está em **`PREFERENCIAS.md`**: leia antes de mudar visual, motion ou texto.
> O site de novembro (campo de blocos, espinha, um capítulo por tela) e os 5 modelos foram retirados; o código deles está em `_arquivo/` (ignorado no git).

---

## Projetos em desenvolvimento (stand by)

Estes dois projetos estão planejados mas só serão iniciados depois que o portfolio estiver publicado.

| Projeto | Tipo | Stack |
|---|---|---|
| **FlowApp** | Landing page de app móvel — hero com mockup 3D, scroll storytelling, animações avançadas | React · TypeScript · Tailwind · Framer Motion |
| **Velour** | E-commerce de moda — lookbook, filtro por cor/tamanho, wishlist, carrinho, checkout, JWT | React · Node.js · PostgreSQL · JWT · Tailwind |

---

## Sobre o Projeto

Portfolio **pessoal** de **Willian Costa**, desenvolvedor full-stack em Natal (RN), com a identidade visual **wcosta.dev**. Mostra o que ele faz (sistemas web, automações e integrações, IA aplicada, sites) para quem quer contratá-lo: projeto (PJ) ou vaga (CLT), remoto ou presencial. **Sem foco em setor**; trabalhos de emprego aparecem anonimizados.

A página conta uma história com o scroll: papéis espalhados (o trabalho manual) se organizam, um documento (`rotina_manual.pdf`) é lido e riscado como "automatizado", e um bloco segue por uma linha teal pelos capítulos 01–07 (ler, entender, processar, validar, entregar, assinar, notificar).

- **Endereço:** `https://williancosta.vercel.app`, e continua assim (decisão de 17/11/2026: sem compra de domínio). `SITE_URL` em `lib/seo.ts` usa esse endereço. "wcosta.dev" é só o nome da marca, não um endereço.
- **Idiomas:** `/` é português e `/en` é inglês, cada um renderizado no servidor no seu idioma (canonical e hreflang em `lib/seo.ts`). Não há troca de idioma no cliente nem detecção pelo navegador.
- **Deploy:** Vercel. **Repositório:** GitHub.
- Produto e marca: **`PRODUCT.md`**. Sistema visual: **`DESIGN.md`** (ambos ainda descrevem parte do site de novembro; atualizar).

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 16.4.6** (App Router) + TypeScript; páginas estáticas por idioma (`app/[lang]`, `generateStaticParams`) |
| Estilização | **CSS Modules** (`components/site/site.module.css`) + `app/globals.css` (só tokens, base e o link de pular) + Tailwind v4 (utilitários pontuais, como no logo) |
| Animações | **GSAP 3 + ScrollTrigger** (palco preso, scrub, cartazes, conector, trilho), **Framer Motion 12** (demonstração e troca do painel), canvas 2D (retrato em blocos), CSS (entrada da abertura, hover, press) |
| i18n | **react-i18next**; o texto fica em `lib/i18n.ts` (só dados, `COPY.pt`/`COPY.en`); cada página monta o seu i18next em `components/site/lang-provider.tsx` |
| SEO/GEO | `lib/seo.ts` (metadados, JSON-LD em `@graph`), `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/llms.txt/route.ts`, imagem OG por idioma |
| Fontes | `app/fonts.ts` (`next/font/google`): Space Grotesk (títulos; 700 só no logo), IBM Plex Sans (corpo), IBM Plex Mono (rótulos). A imagem OG lê TTFs de `app/[lang]/_fonts/` |
| Medição | Vercel Analytics; eventos em `components/site/track.ts` (só registram nos planos Pro/Enterprise) |
| Segurança | Cabeçalhos em `next.config.mjs` (CSP só em produção, HSTS, nosniff, frame DENY, Referrer/Permissions-Policy, COOP); sem `X-Powered-By`. Formulário com limite por campo e campo-armadilha para robôs (`TRAP_FIELD` em `hooks.ts`). Ao usar um serviço externo novo, libere o domínio na CSP |
| Gerenciador | **pnpm** (o `node_modules` é do pnpm 11; lockfile formato 9.0). Na máquina do Willian o pnpm não está no PATH: `npm run dev/build/start/lint` e, para mexer em dependências, `npx pnpm@11 add/remove ...` (nunca `npm install`, que criaria um package-lock) |

> Tema único claro com faixas grafite. **Não há toggle de tema.** Não reintroduzir `.dark` nem ThemeProvider.
> `components/ui/` (shadcn) fica no repo, fora do CSS (`@source not` em `globals.css`). Não use esses componentes na página.

---

## Estrutura

```
app/
  [lang]/layout.tsx       raiz de cada idioma: <html lang>, metadados, JSON-LD, linha do head que liga html.m-enter, Analytics
  [lang]/page.tsx         → <Site lang />
  [lang]/opengraph-image.tsx  imagem de compartilhamento no idioma (fontes em [lang]/_fonts)
  global-not-found.tsx    404 bilíngue na marca (experimental.globalNotFound)
  fonts.ts, globals.css, icon.svg, apple-icon.tsx, robots.ts, sitemap.ts, manifest.ts, llms.txt/route.ts
components/site/
  site.tsx           menu em pílula (link PT/EN), main (Stage + Flow), rodapé com atalhos, bloco que segue o cursor
  lang-provider.tsx  i18next por idioma + usePageLang
  stage.tsx          abertura + 01: papéis, apresentação, documento lido e riscado, linha teal
  chapters.tsx       conector, 02 tabela presa, 03 cartazes, 04 checagens + demonstração, 05 painel + chamada, 06 Sobre, 07 contato em terminal
  demo.tsx, mosaic.tsx, hooks.ts (formulário EmailJS), track.ts, site.module.css
components/brand/logo.tsx   BrandSymbol + Logo (tone dark|light)
lib/
  i18n.ts            TODO o texto visível, PT e EN (só dados)
  content.ts         links, ferramentas, projetos, retrato — sem texto visível
  seo.ts             SITE_URL, CONTENT_UPDATED, metadados e JSON-LD
next.config.mjs      rewrite / → /pt, redirect /pt → /, globalNotFound
```

---

## Marca wcosta.dev — tokens (`app/globals.css`, `:root`)

| Token | Valor | Uso |
|---|---|---|
| `--grafite` | #0C1211 | fundos escuros (abertura, Sobre, painéis, rodapé) |
| `--tinta` | #17201D | texto principal |
| `--teal` | #0D9488 | ação sobre fundo claro (botão com **texto grafite**, 5,1:1) |
| `--teal-claro` | #2DD4BF | ação sobre fundo escuro |
| `--teal-escuro` | #115E59 | foco e links de texto sobre claro |
| `--realce` | #CCF3EE | seleção, realce suave |
| `--apoio` | #5B6B66 | rótulos e metadados (nunca texto de leitura) |
| `--fundo` / `--superficie` | #F6F8F7 / #FFFFFF | fundo da página / superfícies |
| `--linha` | tinta a 14% | réguas de 1px |
| `--g-tinta`, `--g-apoio`, `--g-linha` | | texto e linhas sobre grafite |

- Teal nunca passa de ~10% da composição. Sem gradientes nem glow; a única sombra é a do menu em pílula (funcional, aprovada).
- O **canto superior direito reto** é a assinatura do símbolo: `border-radius: 16px 0 16px 16px` em molduras e painéis.
- Tipo: títulos Space Grotesk 500, tracking −0.02 a −0.04em; corpo IBM Plex Sans; rótulos em IBM Plex Mono com estética de código (`02 · entender o-que-faco/`).

---

## Padrões de Código

### Layout
- Coluna de conteúdo de no máximo 1120px (`--gx`/`--wx` em `.page`); o trilho teal corre à esquerda da coluna.
- `.page` tem `overflow-x: clip` (não quebra o sticky): nada de rolagem lateral, conferido com a barra de rolagem visível.

### Motion
- A história é contada pelo scroll (GSAP com scrub). Hover só em `(hover: hover) and (pointer: fine)`; curva `--ease-out` cubic-bezier(.23,1,.32,1); press `scale(.98)` + 1px.
- O nome na abertura nunca começa invisível (é o maior texto da página, o LCP): só sobe; selo e botões fazem fade.
- Medidas de layout para o GSAP: uma vez por refresh (`refreshInit`), nunca dentro de valores de tween ou de `onUpdate` (cada leitura entre escritas força um recálculo de estilo).
- `prefers-reduced-motion`: nada preso nem com scrub; cada cena no estado final, todo o texto visível.

### i18n
- Todo texto visível em `lib/i18n.ts` (pt e en). Inglês simples (B1). Voz: formal, técnica e próxima; números reais, sem "soluções", "sinergia", exclamação. Nada de texto que se vende (exceção aprovada: "Eu transformo trabalho manual em sistema").

### Texto e fatos
- Não inventar números, clientes ou depoimentos. Fatos confirmados: mais de 30 automações no total (mais de 20 num dos trabalhos); extração de documentos de uma semana para 2–3 horas; 2–3 dias → ~1 hora (CV); 80–90% menos trabalho manual; sistemas para ~30 pessoas; chatbot e agente de auditoria para 50 pessoas; resposta em até 24 horas.
- **Empregadores nunca pelo nome** no site: "Empresa de serviços profissionais" / "Escritório de serviços profissionais".

---

## Integração EmailJS (formulário de contato)

`components/site/hooks.ts` (`useContactForm`) envia por `fetch` à API do EmailJS com as chaves de `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```
Sem as chaves o formulário diz que está indisponível — **nunca simula sucesso**. O assunto (projeto ou vaga) vai no topo da mensagem.

---

## Comandos

```bash
npm run dev       # localhost:3000
npm run build     # build de produção (checa tipos)
npm run start     # serve o build
npm run lint      # ESLint (regras do Next: Core Web Vitals + TypeScript); components/ui e _arquivo ficam fora
```
Se o build der `EPERM`/`EBUSY` em `.next`, é o OneDrive (ou um terminal aberto dentro de `.next`) travando arquivos: `rm -rf .next` e rode de novo. Erro de fonte do Google no build costuma ser passageiro: rode de novo.

### Skills de design instaladas (`.claude/skills/`)
- **impeccable** — direção e revisão (`PRODUCT.md`, `DESIGN.md`, `impeccable detect`).
- **design-taste-frontend** — estrutura, texto e checagens no Chrome. Estado local em `.taste-skill/` (ignorado no git).
- **emil-design-eng** — decisões de motion.

---

## Pendências

1. Deploy (auditoria de 17/11 feita: ver `PREFERENCIAS.md`). Depois: Search Console + Bing com o endereço vercel.app (plano de SEO/GEO, fases 5 e 6).
2. Página de CV em HTML (`/cv`, `/en/cv`) e, quando chegarem os estudos de caso, uma página por caso.
3. No EmailJS: restringir as origens permitidas a williancosta.vercel.app (painel do EmailJS, segurança da conta).
4. Atualizar `PRODUCT.md` e `DESIGN.md` para o site final.
5. Testes cross-browser reais (Safari e Firefox) do palco e dos cartazes.
