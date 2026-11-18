'use client'

import { Suspense, useEffect, useRef, useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'
import { MotionConfig } from 'framer-motion'
import type { Lang } from '@/lib/i18n'
import { Logo } from '@/components/brand/logo'
import { CONTACT, CONTACT_LINKS } from '@/lib/content'
import { track } from './track'
import { LangProvider } from './lang-provider'
import { Stage } from './stage'
import { Flow } from './chapters'
import s from './site.module.css'

/**
 * O site (17/11): a página como um fluxo que processa um documento (modelo 5), com os detalhes que o
 * Willian escolheu nos outros modelos (PREFERENCIAS.md): menu em pílula, a apresentação desde o primeiro
 * quadro, rótulos em estética de código, cartazes de projeto, a automação em miniatura, a chave manual/automatizado,
 * o retrato em blocos que vira foto, o contato em terminal e o bloco que segue o cursor.
 */

const FOLLOW_KEY = 'wcosta-follow'

/**
 * The visitor's choice about the following block, kept on this browser. Read as an external store, so the
 * server and the first render agree (on) and the saved choice comes in without an extra render pass.
 * If storage is blocked, the choice lasts this visit.
 */
const followListeners = new Set<() => void>()
let followMemory: boolean | null = null
const followStore = {
  subscribe(cb: () => void) {
    followListeners.add(cb)
    window.addEventListener('storage', cb)
    return () => {
      followListeners.delete(cb)
      window.removeEventListener('storage', cb)
    }
  },
  get(): boolean {
    if (followMemory !== null) return followMemory
    try {
      return localStorage.getItem(FOLLOW_KEY) !== 'off'
    } catch {
      return true
    }
  },
  set(on: boolean) {
    try {
      localStorage.setItem(FOLLOW_KEY, on ? 'on' : 'off')
      followMemory = null
    } catch {
      followMemory = on
    }
    followListeners.forEach((cb) => cb())
  },
}
const followOnServer = () => true

/** A brand block that follows the pointer at a little distance; it rests when the pointer rests. */
function Follower({ on }: { on: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !on) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let tx = -100
    let ty = -100
    let x = -100
    let y = -100
    let raf = 0
    const tick = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      el.style.transform = `translate(${x}px, ${y}px) rotate(${Math.max(-18, Math.min(18, (tx - x) * 0.4))}deg)`
      raf = Math.hypot(tx - x, ty - y) > 0.4 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e: PointerEvent) => {
      tx = e.clientX + 18
      ty = e.clientY + 18
      el.style.opacity = '1'
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => (el.style.opacity = '0')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
      el.style.opacity = '0'
    }
  }, [on])
  return <div ref={ref} className={s.follower} aria-hidden="true" />
}

/** The page in one language: / is Portuguese, /en is English (each rendered on the server in its language). */
export function Site({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <Page lang={lang} />
    </LangProvider>
  )
}

function Page({ lang }: { lang: Lang }) {
  const { t } = useTranslation()
  const isEn = lang === 'en'
  const follow = useSyncExternalStore(followStore.subscribe, followStore.get, followOnServer)
  const toggleFollow = (on: boolean) => followStore.set(on)

  return (
    <MotionConfig reducedMotion="user">
      <div className={s.page}>
        <a href="#conteudo" className="skip-link">
          {t('meta.skip')}
        </a>
        <Follower on={follow} />

        <header className={s.pill}>
          <a href="#inicio" className={s.pillLogo} aria-label={t('nav.home')}>
            <Logo tone="light" />
          </a>
          <nav className={s.pillLinks} aria-label={t('site.nav_label')}>
            <a href="#o-que-faco" onClick={() => track('nav_click', { to: 'services' })}>
              {t('site.nav.services')}
            </a>
            <a href="#projetos" onClick={() => track('nav_click', { to: 'projects' })}>
              {t('site.nav.work')}
            </a>
            <a href="#sobre" onClick={() => track('nav_click', { to: 'about' })}>
              {t('site.nav.about')}
            </a>
          </nav>
          {/* the other language is another page: a plain link that crawlers follow too */}
          <a
            className={s.lang}
            href={isEn ? '/' : '/en'}
            hrefLang={isEn ? 'pt-BR' : 'en'}
            onClick={() => track('lang_switch', { to: isEn ? 'pt' : 'en' })}
            aria-label={t('nav.lang_switch')}
          >
            {isEn ? 'PT' : 'EN'}
          </a>
          <a href="#contato" className={s.pillCta} onClick={() => track('nav_click', { to: 'contact' })}>
            {t('site.nav.contact')}
          </a>
        </header>

        <main id="conteudo">
          {/* a wrapper, so the old global main > section sizing does not reach these chapters */}
          <div>
            <Stage />
            {/* a hydration boundary: React wakes the opening first and the chapters below it in a second
                step, so the main thread gets a break between the two (the HTML is the same either way) */}
            <Suspense>
              <Flow />
            </Suspense>
          </div>
        </main>

        <footer className={s.foot}>
          <p className={s.footBig}>{t('site.thanks')}</p>
          {/* the last shortcuts, so whoever reads to the end does not have to scroll back */}
          <ul className={s.footLinks} aria-label={t('contact.direct_title')}>
            {CONTACT_LINKS.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => track('contact_link', { channel: c.id, where: 'footer' })}
                >
                  {c.id === 'email' ? CONTACT.email : c.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href={CONTACT.cv} download onClick={() => track('cv_download', { where: 'footer' })}>
                {t('about.cv')} ↓
              </a>
            </li>
          </ul>
          <div className={s.footRow}>
            <Logo tone="dark" />
            <p>{t('footer.rights')}</p>
            <label className={s.followToggle}>
              <input type="checkbox" checked={follow} onChange={(e) => toggleFollow(e.target.checked)} />
              {t('site.follower')}
            </label>
            <p>{t('footer.logos')}</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}
