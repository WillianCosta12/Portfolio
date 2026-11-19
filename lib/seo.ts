// SEO e GEO do wcosta.dev: o endereço, os metadados de cada idioma e os dados estruturados (JSON-LD).
// Fonte única: layout, robots, sitemap, imagem de compartilhamento e llms.txt leem daqui.
// Texto de cada idioma vem de lib/i18n.ts; dados (links, projetos, ferramentas) de lib/content.ts.

import type { Metadata } from 'next'
import { COPY, LANGS, type Lang } from '@/lib/i18n'
import { CASES, CONTACT, LIVE_PROJECTS, PORTRAIT, TOOLS, casePath, type CaseId } from '@/lib/content'

/**
 * The public address: the site lives on the vercel.app address (no own domain, a decision of 17/11/2026).
 * SITE_URL in the environment would override it, should that ever change.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://williancosta.vercel.app').replace(/\/+$/, '')

/**
 * Ownership checks for the search engines (the "HTML tag" method of Google Search Console and Bing Webmaster
 * Tools): the content of each meta tag. Kept here, or set in the environment without a code change.
 */
// Google Search Console, property https://williancosta.vercel.app/ (also verified by public/google0ce34917bdb2d59a.html)
const GOOGLE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION || 'wFJeikJiTZB-yrdPsq6Szdp8-aLxQCtDTN5p5OndeSE'
const BING_VERIFICATION = process.env.BING_SITE_VERIFICATION || ''

/**
 * When the page's text last changed (sitemap and dateModified). Update it with the copy.
 * A full ISO 8601 date-time with the offset (Natal, UTC−3): Google rejects a bare date in ProfilePage.
 */
export const CONTENT_UPDATED = '2026-11-18T12:00:00-03:00'
/** When the case studies went up. */
const CASES_PUBLISHED = '2026-11-18T12:00:00-03:00'

export const NAME = 'Willian Costa'
export const BRAND = 'wcosta.dev'

export const LANG_TAG: Record<Lang, string> = { pt: 'pt-BR', en: 'en' }
const OG_LOCALE: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US' }

/** The path of the home page in each language. */
export const homePath = (lang: Lang) => (lang === 'en' ? '/en' : '/')
export const abs = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

/** hreflang alternates for a page that exists in both languages. */
export function languageAlternates(paths: Record<Lang, string>) {
  return {
    'pt-BR': abs(paths.pt),
    en: abs(paths.en),
    'x-default': abs(paths.pt),
  }
}

export const SAME_AS = [CONTACT.linkedin, CONTACT.github, CONTACT.instagram]

/** Title, description, canonical, alternates and social cards of the home page in one language. */
export function homeMetadata(lang: Lang): Metadata {
  const m = COPY[lang].meta
  const url = abs(homePath(lang))
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    applicationName: BRAND,
    authors: [{ name: NAME, url: abs('/') }],
    creator: NAME,
    alternates: {
      canonical: url,
      languages: languageAlternates({ pt: homePath('pt'), en: homePath('en') }),
    },
    openGraph: {
      type: 'profile',
      firstName: 'Willian',
      lastName: 'Costa',
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      url,
      siteName: BRAND,
      title: m.title,
      description: m.description,
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: {
      ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
      ...(BING_VERIFICATION ? { other: { 'msvalidate.01': BING_VERIFICATION } } : {}),
    },
    // page type for the Taste skill checkers (consistency.mjs, copy-lint)
    other: { 'page-type': 'software', 'site-kind': 'software' },
  }
}

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * Who he is, as a graph: the person, the site, this profile page and the published projects.
 * The same @id everywhere, so search engines and AI models join the facts into one entity.
 * Employers stay anonymous on the site, so the jobs are not in the schema.
 */
export function homeJsonLd(lang: Lang) {
  const c = COPY[lang]
  const url = abs(homePath(lang))
  const portrait = abs(PORTRAIT.src)
  const knowsAbout = [
    ...Object.values(TOOLS).map((tool) => tool.name),
    ...(lang === 'en'
      ? ['Process automation', 'Systems integration', 'Applied AI', 'RAG', 'AI agents', 'REST APIs', 'Web development']
      : ['Automação de processos', 'Integração de sistemas', 'IA aplicada', 'RAG', 'Agentes de IA', 'APIs REST', 'Desenvolvimento web']),
  ]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: NAME,
        givenName: 'Willian',
        familyName: 'Costa',
        alternateName: BRAND,
        jobTitle: c.meta.job_title,
        description: c.meta.description,
        url: abs('/'),
        image: { '@type': 'ImageObject', url: portrait, width: PORTRAIT.width, height: PORTRAIT.height, caption: c.about.photo_alt },
        email: CONTACT.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Natal', addressRegion: 'RN', addressCountry: 'BR' },
        knowsLanguage: [
          { '@type': 'Language', name: lang === 'en' ? 'Portuguese' : 'Português', alternateName: 'pt-BR' },
          { '@type': 'Language', name: lang === 'en' ? 'English' : 'Inglês', alternateName: 'en' },
        ],
        knowsAbout,
        hasOccupation: {
          '@type': 'Occupation',
          name: c.meta.job_title,
          occupationLocation: { '@type': 'Country', name: lang === 'en' ? 'Brazil' : 'Brasil' },
          skills: knowsAbout.join(', '),
        },
        sameAs: SAME_AS,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: BRAND,
        url: abs('/'),
        inLanguage: LANGS.map((l) => LANG_TAG[l]),
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: LANG_TAG[lang],
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        about: { '@id': PERSON_ID },
        dateModified: CONTENT_UPDATED,
        primaryImageOfPage: { '@type': 'ImageObject', url: portrait },
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#projects`,
        name: c.site.work_h,
        itemListElement: [
          // the two case studies first (as on the page), each pointing to its own article
          ...CASES.map((cs, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: abs(casePath(lang, cs.id)),
            name: c.cases.items[i].title,
          })),
          ...LIVE_PROJECTS.map((p, j) => {
          const i = CASES.length + j
          const item = c.work.items[j]
          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CreativeWork',
              name: item.title,
              genre: item.kind,
              description: item.text,
              url: p.site,
              image: abs(p.image),
              creator: { '@id': PERSON_ID },
              keywords: p.stack.map((id) => TOOLS[id]?.name).filter(Boolean).join(', '),
              isBasedOn: { '@type': 'SoftwareSourceCode', codeRepository: p.code, author: { '@id': PERSON_ID } },
            },
          }
        }),
        ],
      },
    ],
  }
}

/** A case study's paths in both languages (for canonical and hreflang). */
const casePaths = (id: CaseId) => ({ pt: casePath('pt', id), en: casePath('en', id) })

/** Title, description, canonical, alternates and social cards of a case study page. */
export function caseMetadata(lang: Lang, id: CaseId): Metadata {
  const i = CASES.findIndex((c) => c.id === id)
  const cs = COPY[lang].cases
  const item = cs.items[i]
  const url = abs(casePath(lang, id))
  const title = `${item.title} — ${cs.meta_suffix}`
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: item.description,
    applicationName: BRAND,
    authors: [{ name: NAME, url: abs(homePath(lang)) }],
    creator: NAME,
    alternates: { canonical: url, languages: languageAlternates(casePaths(id)) },
    openGraph: {
      type: 'article',
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      url,
      siteName: BRAND,
      title,
      description: item.description,
      authors: [abs(homePath(lang))],
    },
    twitter: { card: 'summary_large_image', title, description: item.description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}

/**
 * A case study as an Article written by the same Person (@id), inside the same WebSite, with a breadcrumb
 * (home › projects › case). Search engines and AI models tie the work to him through the shared @id.
 */
export function caseJsonLd(lang: Lang, id: CaseId) {
  const i = CASES.findIndex((c) => c.id === id)
  const c = COPY[lang]
  const item = c.cases.items[i]
  const url = abs(casePath(lang, id))
  const home = abs(homePath(lang))
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: item.title,
        description: item.description,
        url,
        inLanguage: LANG_TAG[lang],
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        mainEntityOfPage: url,
        datePublished: CASES_PUBLISHED,
        dateModified: CONTENT_UPDATED,
        image: `${url}/opengraph-image`,
        articleSection: c.cases.label,
        keywords: [...CASES[i].stack.map((tool) => TOOLS[tool]?.name).filter(Boolean), ...item.diagram.slice(0, 2)].join(', '),
        about: item.kind,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: NAME, item: home },
          { '@type': 'ListItem', position: 2, name: c.site.work_h, item: `${home}#projetos` },
          { '@type': 'ListItem', position: 3, name: item.short, item: url },
        ],
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: NAME,
        url: abs('/'),
        jobTitle: c.meta.job_title,
        sameAs: SAME_AS,
      },
    ],
  }
}
