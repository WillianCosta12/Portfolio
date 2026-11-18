import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLang } from '@/lib/i18n'
import { caseAt, caseParams } from '@/lib/content'
import { caseJsonLd, caseMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { CaseSite } from '@/components/site/site'

// Os estudos de caso: /projetos/<slug> (português, reescrito para /pt/projetos/<slug>) e /en/projects/<slug>.
// Só esses endereços existem; qualquer outro vira 404.
export const dynamicParams = false
export function generateStaticParams({ params }: { params: { lang: string } }) {
  return isLang(params.lang) ? caseParams(params.lang) : []
}

type Props = { params: Promise<{ lang: string; section: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, section, slug } = await params
  const id = isLang(lang) ? caseAt(lang, section, slug) : undefined
  return isLang(lang) && id ? caseMetadata(lang, id) : {}
}

export default async function CasePage({ params }: Props) {
  const { lang, section, slug } = await params
  if (!isLang(lang)) notFound()
  const id = caseAt(lang, section, slug)
  if (!id) notFound()
  return (
    <>
      <JsonLd data={caseJsonLd(lang, id)} />
      <CaseSite lang={lang} id={id} />
    </>
  )
}
