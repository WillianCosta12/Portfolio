import { notFound } from 'next/navigation'
import { isLang } from '@/lib/i18n'
import { homeJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { Site } from '@/components/site/site'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return (
    <>
      {/* the facts about him, as one graph (lib/seo.ts) */}
      <JsonLd data={homeJsonLd(lang)} />
      <Site lang={lang} />
    </>
  )
}
