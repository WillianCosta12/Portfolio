import { COPY, isLang } from '@/lib/i18n'
import { CASES, caseAt, caseParams } from '@/lib/content'
import { OG_SIZE, shareImage } from '@/lib/og'

// the share image of a case study, in its language: the case's name and its two main numbers
export function generateStaticParams({ params }: { params: { lang: string } }) {
  return isLang(params.lang) ? caseParams(params.lang) : []
}
export const alt = 'Willian Costa · wcosta.dev'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ lang: string; section: string; slug: string }> }) {
  const { lang, section, slug } = await params
  const l = isLang(lang) ? lang : 'pt'
  const id = caseAt(l, section, slug) ?? CASES[0].id
  const cs = COPY[l].cases
  const item = cs.items[CASES.findIndex((c) => c.id === id)]
  const [a, b] = item.stats
  return shareImage({
    kicker: cs.label,
    title: item.short,
    titleSize: 72,
    muted: `${a.value} ${a.label}`,
    strong: `${b.value} ${b.label}`,
  })
}
