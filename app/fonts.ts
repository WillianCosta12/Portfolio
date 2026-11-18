import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

// Fontes do guia wcosta.dev: Space Grotesk (títulos; 700 só no logo), IBM Plex Sans (corpo), IBM Plex Mono (rótulos e dados).
// Num arquivo só, para o layout de cada idioma e a página 404 global usarem as mesmas.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '700'],
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-plex-sans',
  weight: ['400', '500'],
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const fontVars = `${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`
