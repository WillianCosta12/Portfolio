'use client'

import { useTranslation } from 'react-i18next'
import type { Lang } from '@/lib/i18n'
import { CASES, casePath, type CaseId } from '@/lib/content'
import { FlowDiagram } from './flow-diagram'
import { track } from './track'
import s from './site.module.css'

/** The copy of one case (cases.items in lib/i18n.ts). */
export type CaseCopy = {
  id: string
  file: string
  short: string
  title: string
  kind: string
  description: string
  summary: string
  stats: { value: string; label: string }[]
  diagram: string[]
  context: string
  before: string
  built_intro: string
  steps: string[]
  built_note: string
  hard: string
  result: string
  after: string
  tools: string
  period: string
  role: string
}

function Arrow() {
  return (
    <svg className={s.btnArrow} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * A case study, top to bottom: what it is and its numbers on the grafite band; then the flow and the facts
 * (period, role, tools) beside the story (context, before, what I built, the hardest part, result, after).
 * Static: no scroll scenes here, the page is for reading.
 */
export function CaseView({ lang, id }: { lang: Lang; id: CaseId }) {
  const { t } = useTranslation()
  const items = t('cases.items', { returnObjects: true }) as CaseCopy[]
  const i = CASES.findIndex((c) => c.id === id)
  const c = items[i]
  const next = CASES[(i + 1) % CASES.length]
  const nextCopy = items[(i + 1) % CASES.length]
  const home = lang === 'en' ? '/en' : '/'
  const sec = (k: string) => t(`cases.sections.${k}`)

  return (
    <article className={s.casePage} aria-labelledby="case-title">
      <header className={s.caseHero}>
        <p className={s.caseCrumb}>
          <a href={`${home}#projetos`} onClick={() => track('case_back', { case: id })}>
            ← {t('cases.back')}
          </a>
          <span aria-hidden="true">·</span>
          <span>{t('cases.label')}</span>
        </p>
        <p className={s.caseKind}>{c.kind}</p>
        <h1 id="case-title" className={s.caseTitle}>
          {c.title}
        </h1>
        <p className={s.caseSummary}>{c.summary}</p>
        <ul className={s.caseStats}>
          {c.stats.map((st) => (
            <li key={st.value}>
              <span className={s.caseStatValue}>{st.value}</span>
              <span className={s.caseStatLabel}>{st.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className={s.caseBody}>
        <aside className={s.caseAside}>
          <FlowDiagram file={c.file} status={t('status.production')} steps={c.diagram} label={`${t('cases.flow')}: ${c.short}`} />
          <dl className={s.caseFacts}>
            <div>
              <dt>{sec('period')}</dt>
              <dd>{c.period}</dd>
            </div>
            <div>
              <dt>{sec('role')}</dt>
              <dd>{c.role}</dd>
            </div>
            <div>
              <dt>{sec('tools')}</dt>
              <dd>{c.tools}</dd>
            </div>
          </dl>
        </aside>

        <div className={s.caseText}>
          <section>
            <h2>{sec('context')}</h2>
            <p>{c.context}</p>
          </section>
          <section>
            <h2>{sec('before')}</h2>
            <p>{c.before}</p>
          </section>
          <section>
            <h2>{sec('built')}</h2>
            {c.built_intro && <p>{c.built_intro}</p>}
            <ol className={s.caseSteps}>
              {c.steps.map((step, k) => (
                <li key={k}>
                  <span className={s.caseStepIdx} aria-hidden="true">
                    {String(k + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p>{c.built_note}</p>
          </section>
          <section>
            <h2>{sec('hard')}</h2>
            <p>{c.hard}</p>
          </section>
          <section>
            <h2>{sec('result')}</h2>
            <p>{c.result}</p>
          </section>
          {c.after && (
            <section>
              <h2>{sec('after')}</h2>
              <p>{c.after}</p>
            </section>
          )}

          <div className={s.caseEnd}>
            <p className={s.ctaText}>{t('site.cta_text')}</p>
            <div className={s.ctaButtons}>
              <a className={`${s.btn} ${s.btnDark}`} href={`${home}#contato`} onClick={() => track('cta_click', { where: `case_${id}`, topic: 'project' })}>
                {t('site.cta_project')}
                <Arrow />
              </a>
              <a className={`${s.btn} ${s.btnGhost}`} href={`${home}#contato`} onClick={() => track('cta_click', { where: `case_${id}`, topic: 'role' })}>
                {t('site.cta_job')}
              </a>
            </div>
            <a className={s.caseNext} href={casePath(lang, next.id)} onClick={() => track('case_open', { case: next.id, where: `case_${id}` })}>
              <span className={s.caseNextLabel}>{t('cases.next')}</span>
              <span className={s.caseNextTitle}>
                {nextCopy.short} <Arrow />
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
