import type { MetadataRoute } from 'next'
import { CONTENT_UPDATED, abs, homePath, languageAlternates } from '@/lib/seo'

// Each page in both languages, with its alternate; the date moves only when the text changes (lib/seo.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = { languages: languageAlternates({ pt: homePath('pt'), en: homePath('en') }) }
  return (['pt', 'en'] as const).map((lang) => ({
    url: abs(homePath(lang)),
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: lang === 'pt' ? 1 : 0.9,
    alternates,
  }))
}
