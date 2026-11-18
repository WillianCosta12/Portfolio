import type { Metadata } from 'next'
import Link from 'next/link'
import { COPY } from '@/lib/i18n'
import { Logo } from '@/components/brand/logo'
import { fontVars } from './fonts'
import './globals.css'

// The 404 for any address that matches nothing (next.config: experimental.globalNotFound). It is its own
// document, outside the language layouts, so it brings the styles and fonts and speaks both languages.
export const metadata: Metadata = {
  title: `${COPY.pt.meta.not_found_title} · wcosta.dev`,
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVars}>
      <body>
        <main
          style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 64,
            padding: 'clamp(24px, 6vw, 80px)',
            background: 'var(--grafite)',
            color: 'var(--g-tinta)',
          }}
        >
          <Link href="/" aria-label={COPY.pt.nav.home} style={{ alignSelf: 'flex-start' }}>
            <Logo tone="dark" />
          </Link>
          <div style={{ display: 'grid', gap: 48 }}>
            {(['pt', 'en'] as const).map((lang) => {
              const m = COPY[lang].meta
              return (
                <section key={lang} lang={lang === 'en' ? 'en' : 'pt-BR'} style={{ display: 'grid', gap: 14, maxWidth: '40ch' }}>
                  <p style={{ font: '500 12px/1 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--teal-claro)' }}>404</p>
                  <h1 style={{ font: '500 clamp(36px, 5vw, 64px)/1 var(--font-display)', letterSpacing: '-0.04em' }}>{m.not_found_title}</h1>
                  <p style={{ fontSize: 18, color: 'var(--g-apoio)' }}>{m.not_found_text}</p>
                  <Link
                    href={lang === 'en' ? '/en' : '/'}
                    style={{ color: 'var(--teal-claro)', textDecoration: 'underline', textUnderlineOffset: 4 }}
                  >
                    {m.not_found_link}
                  </Link>
                </section>
              )
            })}
          </div>
        </main>
      </body>
    </html>
  )
}
