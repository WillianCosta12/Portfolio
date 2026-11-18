// Dados estruturados do portfolio. Nenhum texto visível aqui: o texto fica em lib/i18n.ts.

export const CONTACT = {
  email: 'willacosta873@gmail.com',
  github: 'https://github.com/WillianCosta12',
  linkedin: 'https://www.linkedin.com/in/williancosta-dev/',
  instagram: 'https://www.instagram.com/wcosta.dev/',
  cv: '/willian-costa-cv.pdf',
} as const

export const CONTACT_LINKS = [
  { id: 'email', label: 'willacosta873@gmail.com', href: `mailto:${CONTACT.email}`, icon: null },
  { id: 'linkedin', label: 'LinkedIn', href: CONTACT.linkedin, icon: null },
  { id: 'github', label: 'GitHub', href: CONTACT.github, icon: '/icons/github-icon.svg' },
  { id: 'instagram', label: 'Instagram @wcosta.dev', href: CONTACT.instagram, icon: null },
] as const

export type Tool = { id: string; name: string; src: string; w: number; h: number; mono?: string }

// Ícones reais (Taste icons.mjs). src: a marca em cor (public/icons); mono: a marca de uma cor do Simple Icons
// (public/icons/mono), que a página usa num só tom para manter o único acento teal do guia.
export const TOOLS: Record<string, Tool> = {
  nextjs: { id: 'nextjs', name: 'Next.js', src: '/icons/nextjs.svg', w: 40, h: 40, mono: '/icons/mono/nextdotjs.svg' },
  react: { id: 'react', name: 'React', src: '/icons/react.svg', w: 40, h: 36, mono: '/icons/mono/react.svg' },
  typescript: { id: 'typescript', name: 'TypeScript', src: '/icons/typescript.svg', w: 40, h: 40 },
  nodejs: { id: 'nodejs', name: 'Node.js', src: '/icons/nodejs.svg', w: 35, h: 40, mono: '/icons/mono/nodedotjs.svg' },
  supabase: { id: 'supabase', name: 'Supabase', src: '/icons/supabase.svg', w: 39, h: 40, mono: '/icons/mono/supabase.svg' },
  postgres: { id: 'postgres', name: 'PostgreSQL', src: '/icons/postgres.svg', w: 39, h: 40, mono: '/icons/mono/postgresql.svg' },
  python: { id: 'python', name: 'Python', src: '/icons/python.svg', w: 40, h: 40, mono: '/icons/mono/python.svg' },
  n8n: { id: 'n8n', name: 'n8n', src: '/icons/n8n.svg', w: 40, h: 21, mono: '/icons/mono/n8n.svg' },
  make: { id: 'make', name: 'Make', src: '/icons/make.svg', w: 40, h: 29, mono: '/icons/mono/make.svg' },
  gemini: { id: 'gemini', name: 'Gemini', src: '/icons/gemini.svg', w: 40, h: 40, mono: '/icons/mono/googlegemini.svg' },
  vercel: { id: 'vercel', name: 'Vercel', src: '/icons/vercel.svg', w: 40, h: 35, mono: '/icons/mono/vercel.svg' },
  tailwind: { id: 'tailwind', name: 'Tailwind CSS', src: '/icons/tailwindcss.svg', w: 40, h: 24 },
}

// Ferramentas de cada área de "O que faço", na mesma ordem de site.services no i18n
export const SERVICE_TOOLS: string[][] = [
  ['nextjs', 'supabase', 'postgres'],
  ['n8n', 'make', 'nodejs'],
  ['gemini', 'python', 'postgres'],
  ['nextjs', 'react', 'vercel'],
]

export type Status = 'live' | 'production' | 'wip'

// Projetos publicados: mesma ordem de work.items no i18n
export const LIVE_PROJECTS = [
  {
    id: 'rivalradar',
    image: '/work/rivalradar.webp',
    site: 'https://rival-radar-lp.vercel.app',
    code: 'https://github.com/WillianCosta12/Landing-Page---Rival-Radar',
    stack: ['nextjs', 'typescript', 'supabase', 'vercel'],
  },
  {
    id: 'checklist',
    image: '/work/checklist.webp',
    site: 'https://stephenking-checklist.vercel.app',
    code: 'https://github.com/WillianCosta12/StephenKing-CheckList',
    stack: ['nextjs', 'typescript', 'supabase', 'tailwind'],
  },
  {
    id: 'ferrari',
    image: '/work/ferrari.webp',
    site: 'https://portfolio-site-ferrari.vercel.app',
    code: 'https://github.com/WillianCosta12/Portfolio-Site-Ferrari',
    stack: ['nextjs', 'typescript', 'tailwind'],
  },
] as const

export const PORTRAIT = {
  src: '/willian-costa-4x5.webp',
  width: 776,
  height: 970,
} as const

// Estudos de caso: mesma ordem de cases.items no i18n. Cada um tem um endereço por idioma, a área de
// "O que faço" que ele comprova (índice em site.services) e o trabalho de "Em produção" (índice em site.jobs).
export const CASES = [
  { id: 'auditoria', slug: { pt: 'auditoria-de-conversas-com-ia', en: 'ai-conversation-audit' }, service: 2, job: 1, stack: ['make', 'n8n', 'gemini'] },
  { id: 'dds', slug: { pt: 'automacao-dds-iss', en: 'iss-declaration-automation' }, service: 1, job: 0, stack: ['python'] },
] as const

export type CaseId = (typeof CASES)[number]['id']
/** The folder each language keeps its cases in: /projetos/<slug> and /en/projects/<slug>. */
export const CASE_SECTION = { pt: 'projetos', en: 'projects' } as const
export const casePath = (lang: 'pt' | 'en', id: CaseId) => {
  const c = CASES.find((x) => x.id === id)!
  return lang === 'en' ? `/en/${CASE_SECTION.en}/${c.slug.en}` : `/${CASE_SECTION.pt}/${c.slug.pt}`
}
/** The case behind a route (app/[lang]/[section]/[slug]); undefined when the address is not a case. */
export const caseAt = (lang: 'pt' | 'en', section: string, slug: string) =>
  section === CASE_SECTION[lang] ? CASES.find((c) => c.slug[lang] === slug)?.id : undefined
/** Every case route, for the static build of one language. */
export const caseParams = (lang: 'pt' | 'en') => CASES.map((c) => ({ section: CASE_SECTION[lang], slug: c.slug[lang] }))
