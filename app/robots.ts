import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Everything is open. The AI crawlers are named one by one so the choice is explicit: search and answer
// engines may read and cite the site, and models may learn it (for a portfolio, being known is the point).
const AI_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AGENTS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
