import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import { LANGS, isLang } from '@/lib/i18n'
import { LANG_TAG, homeJsonLd, homeMetadata } from '@/lib/seo'
import { fontVars } from '../fonts'
import '../globals.css'

// Uma raiz por idioma: / é português (reescrito para /pt em next.config.mjs) e /en é inglês.
// Cada página sai do servidor já no seu idioma, com <html lang> certo, canonical e hreflang.
export const dynamicParams = false
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }))

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return isLang(lang) ? homeMetadata(lang) : {}
}

export const viewport: Viewport = {
  // the top of the page is the grafite opening
  themeColor: '#0C1211',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

// A entrada da abertura espera por esta classe; sem script, nada fica escondido.
// m-entered marca o fim da entrada (uma vez por visita).
const ENTER_SCRIPT =
  "document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-entered')},1600)"

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode } & Props>) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return (
    <html
      lang={LANG_TAG[lang]}
      data-type="software"
      className={fontVars}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ENTER_SCRIPT }} />
        <script
          type="application/ld+json"
          // the facts about him, as one graph (lib/seo.ts); '<' escaped so the JSON can never close the tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        {children}
        {/* the analytics script exists only on Vercel; locally it would 404 */}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
