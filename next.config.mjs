// Segurança: o que a página pode carregar e de onde. Ela só usa o próprio site, a API do EmailJS (formulário)
// e o Vercel Analytics (servido no mesmo endereço, em /_vercel/insights). 'unsafe-inline' em scripts é o preço
// das páginas estáticas: o Next e a linha de entrada do <head> são scripts inline, e um nonce exigiria
// renderizar cada visita no servidor. Em desenvolvimento a CSP fica de fora (o modo dev do React usa eval).
const isProd = process.env.NODE_ENV === 'production'

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.emailjs.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  ...(isProd ? [{ key: 'Content-Security-Policy', value: csp }] : []),
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // the server doesn't announce what it runs on
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // a 404 page for addresses that match no route (the root layout lives under app/[lang])
  experimental: {
    globalNotFound: true,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  // Cada idioma é uma página: o português mora em app/[lang] como "pt", mas o endereço público é "/".
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/pt' }],
    }
  },
  // /pt nunca aparece como endereço da página: quem chegar por ele vai para "/" (um endereço só por página).
  // Só o exato: os arquivos da página (como /pt/opengraph-image) continuam servidos onde estão.
  async redirects() {
    return [{ source: '/pt', destination: '/', permanent: true }]
  },
}

export default nextConfig
