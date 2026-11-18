import type { MetadataRoute } from 'next'
import { COPY } from '@/lib/i18n'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Willian Costa · wcosta.dev',
    short_name: 'wcosta.dev',
    description: COPY.pt.meta.description,
    lang: 'pt-BR',
    start_url: '/',
    display: 'browser',
    background_color: '#0C1211',
    theme_color: '#0C1211',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  }
}
