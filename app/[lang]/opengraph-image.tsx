import { COPY, LANGS, isLang } from '@/lib/i18n'
import { OG_SIZE, shareImage } from '@/lib/og'

// one image per language, made at build time (the layout lists the languages)
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }))
export const alt = 'Willian Costa · wcosta.dev'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = COPY[isLang(lang) ? lang : 'pt'].site
  return shareImage({ title: site.intro, muted: site.tagline_role, strong: site.tagline })
}
