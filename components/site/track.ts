'use client'

import { track as vercelTrack } from '@vercel/analytics'

/**
 * Eventos de conversão (cliques em contato, CV, projetos; mensagem enviada) para o Vercel Web Analytics.
 * Os eventos personalizados só aparecem no painel em planos que os suportam; fora da Vercel, não fazem nada.
 */
export function track(name: string, props?: Record<string, string | number | boolean | null>) {
  try {
    vercelTrack(name, props)
  } catch {
    /* analytics is never allowed to break the page */
  }
}
