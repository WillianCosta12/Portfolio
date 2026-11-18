// SEO e GEO do wcosta.dev: o endereço, os metadados de cada idioma e os dados estruturados (JSON-LD).
// Fonte única: layout, robots, sitemap, imagem de compartilhamento e llms.txt leem daqui.
// Texto de cada idioma vem de lib/i18n.ts; dados (links, projetos, ferramentas) de lib/content.ts.

import type { Metadata } from 'next'
import { COPY, LANGS, type Lang } from '@/lib/i18n'
import { CONTACT, LIVE_PROJECTS, PORTRAIT, TOOLS } from '@/lib/content'

/**
 * The public address. Set SITE_URL=https://wcosta.dev in Vercel when the domain points here;
 * until then the site lives on the vercel.app address.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://williancosta.vercel.app').replace(/\/+$/, '')

/** When the page's text last changed (sitemap and dateModified). Update it with the copy. */
export const CONTENT_UPDATED = '2026-11-17'

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
        itemListElement: LIVE_PROJECTS.map((p, i) => {
          const item = c.work.items[i]
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
      },
    ],
  }
}
