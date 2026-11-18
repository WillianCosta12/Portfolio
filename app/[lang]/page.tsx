import { notFound } from 'next/navigation'
import { isLang } from '@/lib/i18n'
import { Site } from '@/components/site/site'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return <Site lang={lang} />
}
