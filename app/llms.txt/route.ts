import { COPY } from '@/lib/i18n'
import { CONTACT, LIVE_PROJECTS, SERVICE_TOOLS, TOOLS } from '@/lib/content'
import { BRAND, NAME, abs, homePath } from '@/lib/seo'

// /llms.txt: the site in plain Markdown for AI models (llmstxt.org proposal). It is built from the same
// copy as the page (lib/i18n.ts, lib/content.ts), so it never says anything the page doesn't.
export const dynamic = 'force-static'

type Kpi = { value?: string; before?: string; after?: string; label: string }

function build() {
  const pt = COPY.pt
  const en = COPY.en
  const s = pt.site
  const tools = (ids: readonly string[]) => ids.map((id) => TOOLS[id]?.name).filter(Boolean).join(', ')
  const kpi = (k: Kpi) => `${k.value ?? `${k.before} → ${k.after}`}: ${k.label}`

  const lines = [
    `# ${NAME} (${BRAND})`,
    '',
    `> ${pt.meta.description}`,
    '',
    `${s.tagline_role} ${s.tagline} ${s.available} Natal, RN, Brasil. ${pt.about.languages_title}: ${pt.about.languages}.`,
    '',
    `## ${s.sign_h}`,
    '',
    `- ${s.bio}`,
    `- ${s.colleague}`,
    `- ${s.likes}`,
    ...pt.about.experience.map((e) => `- ${e.period}: ${e.role}, ${e.company}`),
    '',
    `## ${s.services_h}`,
    '',
    ...s.services.map((sv, i) => `- **${sv.title}**: ${sv.text} (${s.tools_label}: ${tools(SERVICE_TOOLS[i] ?? [])})`),
    '',
    `## ${s.work_h}`,
    '',
    s.work_intro,
    '',
    ...LIVE_PROJECTS.map((p, i) => {
      const w = pt.work.items[i]
      return `- [${w.title}](${p.site}): ${w.kind}. ${w.text} ${tools(p.stack)}. Código: ${p.code}`
    }),
    '',
    `## ${s.deliver_h}`,
    '',
    s.deliver_intro,
    '',
    ...s.jobs.map((j) => `- **${j.title}** (${j.kind}): ${j.text}`),
    ...(s.kpis as Kpi[]).map((k) => `- ${kpi(k)}`),
    '',
    `## ${s.process_h}`,
    '',
    ...s.process_steps.map((p, i) => `${i + 1}. **${p.title}**: ${p.text}`),
    '',
    `## ${s.contact_h}`,
    '',
    s.contact_intro,
    '',
    `- E-mail: ${CONTACT.email}`,
    `- LinkedIn: ${CONTACT.linkedin}`,
    `- GitHub: ${CONTACT.github}`,
    `- Instagram: ${CONTACT.instagram}`,
    `- CV (PDF): ${abs(CONTACT.cv)}`,
    '',
    '## English',
    '',
    `> ${en.meta.description}`,
    '',
    `${en.site.tagline_role} ${en.site.tagline} ${en.site.available} Natal, RN, Brazil. ${en.about.languages_title}: ${en.about.languages}.`,
    '',
    `## Pages`,
    '',
    `- [Português](${abs(homePath('pt'))}): ${pt.meta.title}`,
    `- [English](${abs(homePath('en'))}): ${en.meta.title}`,
    '',
  ]
  return lines.join('\n')
}

export function GET() {
  return new Response(build(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
