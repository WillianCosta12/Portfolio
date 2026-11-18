import type { MetadataRoute } from 'next'
import { CASES, casePath } from '@/lib/content'
import { CONTENT_UPDATED, abs, homePath, languageAlternates } from '@/lib/seo'

// Each page in both languages, with its alternate; the date moves only when the text changes (lib/seo.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ['pt', 'en'] as const
  const home = { languages: languageAlternates({ pt: homePath('pt'), en: homePath('en') }) }
  const pages: MetadataRoute.Sitemap = langs.map((lang) => ({
    url: abs(homePath(lang)),
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: lang === 'pt' ? 1 : 0.9,
    alternates: home,
  }))
  for (const c of CASES) {
    const alternates = { languages: languageAlternates({ pt: casePath('pt', c.id), en: casePath('en', c.id) }) }
    for (const lang of langs) {
      pages.push({ url: abs(casePath(lang, c.id)), lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.8, alternates })
    }
  }
  return pages
}
