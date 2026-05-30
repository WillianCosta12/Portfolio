import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
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
  title: 'Willian Costa | Full-stack Developer',
  description:
    'Full-stack developer especializado em React, Spring Boot, Node.js e automacao. Construo produtos web completos, do design ao deploy.',
  keywords: [
    'Willian Costa',
    'Full-stack Developer',
    'React',
    'Spring Boot',
    'Node.js',
    'Portfolio',
  ],
  authors: [{ name: 'Willian Costa' }],
  creator: 'Willian Costa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://williancosta.dev',
    title: 'Willian Costa | Full-stack Developer',
    description:
      'Full-stack developer especializado em React, Spring Boot, Node.js e automacao.',
    siteName: 'Willian Costa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Willian Costa | Full-stack Developer',
    description:
      'Full-stack developer especializado em React, Spring Boot, Node.js e automacao.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
