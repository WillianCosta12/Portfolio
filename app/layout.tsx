import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Willian Costa | Desenvolvedor Full Stack · Automação e IA',
  description:
    'Desenvolvedor full-stack disponível para vaga CLT e projetos freelance. Especialista em automação com n8n/Make, integrações REST, Supabase, RAG com pgvector e desenvolvimento web com Next.js e React. Natal, RN.',
  keywords: [
    'Willian Costa',
    'Desenvolvedor Full Stack',
    'Full-stack Developer',
    'Automação',
    'n8n',
    'Make',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Supabase',
    'RAG',
    'pgvector',
    'LLM',
    'Natal RN',
    'Portfolio',
  ],
  authors: [{ name: 'Willian Costa', url: 'https://williancosta.vercel.app' }],
  creator: 'Willian Costa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://williancosta.vercel.app',
    title: 'Willian Costa | Desenvolvedor Full Stack · Automação e IA',
    description:
      'Desenvolvedor full-stack disponível para CLT e freelance. Automação com n8n/Make, integrações REST, Supabase, RAG e Next.js. Natal, RN.',
    siteName: 'Willian Costa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Willian Costa | Desenvolvedor Full Stack · Automação e IA',
    description:
      'Desenvolvedor full-stack disponível para CLT e freelance. Automação com n8n/Make, integrações REST, Supabase, RAG e Next.js.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL('https://williancosta.vercel.app'),
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Willian Costa',
  url: 'https://williancosta.vercel.app',
  jobTitle: 'Desenvolvedor Full Stack',
  description: 'Desenvolvedor full-stack especializado em automação, integrações e IA. Disponível para vaga CLT e projetos freelance.',
  address: { '@type': 'PostalAddress', addressLocality: 'Natal', addressRegion: 'RN', addressCountry: 'BR' },
  sameAs: [
    'https://linkedin.com/in/williancosta-dev',
    'https://github.com/WillianCosta12',
  ],
  knowsAbout: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase', 'n8n', 'Make', 'RAG', 'pgvector', 'REST APIs'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
