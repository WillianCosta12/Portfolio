'use client'

import { useRef, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTACT } from '@/lib/content'
import { useIsoLayoutEffect } from './hooks'
import { track } from './track'
import s from './site.module.css'

/**
 * Abertura e capítulo 01 (ler = quem sou). Um palco preso por cinco telas de scroll: papéis espalhados
 * (o trabalho manual) se organizam numa grade enquanto "olá." sai e "Eu sou o Willian." entra; um
 * documento é escolhido, a linha teal desce até ele, um feixe o lê e o texto sai grande à esquerda;
 * um bloco segue pela linha até o capítulo seguinte. Antes do script, o CSS já desenha o caos.
 */

type Kind = 'note' | 'sheet' | 'receipt' | 'shot'
// nx/ny: place on a desktop; mx/my: place on a phone (the chaos there fills the upper part, the words sit below)
type Paper = { kind: Kind; nx: number; ny: number; mx: number; my: number; rot: number; s: number }
// short: a phone with little height (iPhone SE and the like); wide: a very wide screen. Both read from the same
// media queries the CSS uses (site.module.css), so the papers sit in the same place before and after the script.
type Geo = { W: number; H: number; mobile: boolean; short: boolean; wide: boolean; shortDesk: boolean }

const COUNT = 16
const MOBILE_COUNT = 9
const DOC = 5 // the paper that gets picked and read
const PAPER_W = 150
const PAPER_H = 190
export const DOC_W = 340
export const DOC_H = 440
const MOBILE_SCALE = 0.66
const SHORT_MQ = '(max-width: 767px) and (max-height: 780px)'
// a laptop with little height: the papers on the left (the words' side) start out of sight (see LEFT)
const SHORT_DESK_MQ = '(min-width: 768px) and (max-height: 820px)'
const WIDE_MQ = '(min-width: 2000px)'
// on a short phone the chaos fits between the menu and the words: rows from 118px down to 380px above the bottom
const SHORT_TOP = 118
const SHORT_BOTTOM = 380
const SHORT_SCALE = 0.82
const WIDE_SCALE = 1.3
const MY_MIN = 0.145 // the phone rows' range (makePapers): 0.18 ± 0.035 to 0.48 ± 0.035
const MY_SPAN = 0.37

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// deterministic, so the server and the browser draw the same chaos
function makePapers(): Paper[] {
  const rand = mulberry32(427)
  const kinds: Kind[] = ['note', 'sheet', 'receipt', 'shot']
  const out: Paper[] = []
  for (let i = 0; i < COUNT; i++) {
    let nx = 0
    let ny = 0
    // keep the lower left free for the words, and the band under the menu free of white paper
    for (let k = 0; k < 40; k++) {
      nx = 0.06 + rand() * 0.88
      ny = 0.21 + rand() * 0.67
      if (!(nx < 0.6 && ny > 0.36)) break
    }
    const mx = 0.2 + ((i % MOBILE_COUNT) % 3) * 0.3 + (rand() - 0.5) * 0.2
    const my = 0.18 + Math.floor((i % MOBILE_COUNT) / 3) * 0.15 + (rand() - 0.5) * 0.07
    out.push({ kind: kinds[i % kinds.length], nx, ny, mx, my, rot: (rand() - 0.5) * 76, s: 0.78 + rand() * 0.4 })
  }
  // the chosen document sits in the middle of the chaos, a little tilted, so the eye finds it
  out[DOC] = { ...out[DOC], nx: 0.7, ny: 0.46, mx: 0.6, my: 0.38, rot: -9, s: 1.05 }
  return out
}
const PAPERS = makePapers()
// the papers on the words' side of the screen (desktop): out of sight on a short laptop until the grid
const LEFT = PAPERS.map((p, i) => i !== DOC && p.nx < 0.6)
const hiddenAtStart = (i: number, g: Geo) => !g.mobile && g.shortDesk && LEFT[i]

const baseScale = (i: number) => (i === DOC ? PAPER_W / DOC_W : 1)

function chaosOf(i: number, g: Geo) {
  if (hiddenAtStart(i, g)) {
    const at = gridOf(i, g)
    return { x: at.x, y: at.y + 36, rotation: PAPERS[i].rot * 0.4, scale: at.scale }
  }
  const p = PAPERS[i]
  return {
    x: (g.mobile ? p.mx : p.nx) * g.W,
    y: !g.mobile
      ? p.ny * g.H
      : g.short
        ? SHORT_TOP + ((p.my - MY_MIN) / MY_SPAN) * (g.H - SHORT_TOP - SHORT_BOTTOM)
        : p.my * g.H,
    rotation: p.rot,
    scale: baseScale(i) * p.s * (g.mobile ? MOBILE_SCALE * (g.short ? SHORT_SCALE : 1) : g.wide ? WIDE_SCALE : 1),
  }
}

// the content column (1120px at most, centred): the grid and the read document sit in its right part
const column = (g: Geo) => {
  const width = Math.min(g.W - 48, 1120)
  return { left: (g.W - width) / 2, width }
}

function gridOf(i: number, g: Geo) {
  const cols = g.mobile ? 3 : 4
  const rows = g.mobile ? 3 : 4
  const col = column(g)
  const x0 = g.mobile ? 0.06 * g.W : col.left + col.width * 0.56
  const x1 = g.mobile ? 0.94 * g.W : col.left + col.width
  const y0 = g.mobile ? 96 : 0.16 * g.H
  // on a phone the grid ends above the words (the badge sits ~320px from the bottom on a short screen)
  const y1 = g.mobile ? Math.min(0.56 * g.H, g.H - 320) : 0.88 * g.H
  const idx = i % (cols * rows)
  const c = idx % cols
  const r = Math.floor(idx / cols)
  const cw = (x1 - x0) / cols
  const ch = (y1 - y0) / rows
  const fit = Math.min(cw / (PAPER_W + 24), ch / (PAPER_H + 24))
  return { x: x0 + cw * (c + 0.5), y: y0 + ch * (r + 0.5), rotation: 0, scale: baseScale(i) * fit }
}

function readOf(g: Geo) {
  if (g.mobile) {
    const scale = Math.min(1, (g.W * 0.76) / DOC_W, (g.H * 0.38) / DOC_H)
    return { x: 0.5 * g.W, y: g.H - 64 - (DOC_H * scale) / 2, scale }
  }
  const scale = Math.min(1, (g.H * 0.64) / DOC_H)
  const col = column(g)
  return { x: col.left + col.width * 0.8, y: 0.57 * g.H, scale }
}
// where the flow line runs: through the document's middle on a desktop, near its right edge on a phone
const lineX = (g: Geo) => {
  const r = readOf(g)
  return g.mobile ? r.x + (DOC_W * r.scale) / 2 - 22 : r.x
}
/** The line's x on a stage of this size, for the connector that takes it on. */
export const stageLineX = (W: number, H: number) => lineX({ W, H, mobile: W < 768, short: false, wide: false, shortDesk: false })
const docTop = (g: Geo) => readOf(g).y - (DOC_H * readOf(g).scale) / 2
const docBottom = (g: Geo) => readOf(g).y + (DOC_H * readOf(g).scale) / 2
// where the line (and the chapter's node) starts: below the menu on a desktop, below the words on a phone
const lineStart = (g: Geo) => (g.mobile ? docTop(g) - 72 : 116)

function PaperFace({ kind }: { kind: Kind }) {
  if (kind === 'sheet')
    return (
      <>
        <span className={`${s.bar6} ${s.strong}`} style={{ width: '60%' }} />
        <span className={s.sheet}>
          {Array.from({ length: 20 }, (_, k) => (
            <span key={k} />
          ))}
        </span>
      </>
    )
  if (kind === 'shot')
    return (
      <>
        <span className={s.shotBlock} />
        <span className={s.bar6} style={{ width: '90%' }} />
        <span className={s.bar6} style={{ width: '70%' }} />
        <span className={s.bar6} style={{ width: '80%' }} />
      </>
    )
  if (kind === 'receipt')
    return (
      <>
        <span className={`${s.bar6} ${s.strong}`} style={{ width: '50%' }} />
        {[80, 64, 72, 58, 76, 40].map((w, k) => (
          <span key={k} className={s.bar6} style={{ width: `${w}%` }} />
        ))}
        <span className={`${s.bar6} ${s.strong}`} style={{ width: '100%', marginTop: 'auto' }} />
      </>
    )
  return (
    <>
      <span className={`${s.bar6} ${s.strong}`} style={{ width: '70%' }} />
      {[92, 84, 96, 70, 88, 64, 90].map((w, k) => (
        <span key={k} className={s.bar6} style={{ width: `${w}%` }} />
      ))}
    </>
  )
}

/**
 * The document being read: the manual routine itself, one step per line. The beam crosses each step out
 * and tags it "automated" (`done` shows it already processed). It never repeats the words on the left.
 */
export function DocCard({
  lineRefs,
  beamRef,
  done = false,
}: {
  lineRefs?: React.RefObject<(HTMLParagraphElement | null)[]>
  beamRef?: React.RefObject<HTMLDivElement | null>
  done?: boolean
}) {
  const { t } = useTranslation()
  const steps = t('site.doc_lines', { returnObjects: true }) as string[]
  return (
    <div className={`${s.doc} ${done ? s.docProcessed : ''}`}>
      <div className={s.docHead}>
        <span>{t('site.file')}</span>
        <span className={s.docTag} />
      </div>
      {steps.map((step, j) => (
        <p
          key={j}
          className={s.docLine}
          ref={
            lineRefs
              ? (el) => {
                  lineRefs.current[j] = el
                }
              : undefined
          }
        >
          <span className={s.docText}>
            {step}
            <span className={s.docStrike} aria-hidden="true" />
          </span>
          <span className={s.docDone}>{t('site.doc_done')}</span>
        </p>
      ))}
      <div className={s.docRows}>
        <span className={s.bar6} style={{ width: '86%' }} />
        <span className={s.bar6} style={{ width: '64%' }} />
        <span className={s.bar6} style={{ width: '74%' }} />
      </div>
      {beamRef && <div ref={beamRef} className={s.beam} />}
    </div>
  )
}

export function Stage() {
  const { t } = useTranslation()
  const lines = t('site.lines', { returnObjects: true }) as string[]

  const stageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const paperRefs = useRef<(HTMLDivElement | null)[]>([])
  const innerRefs = useRef<(HTMLDivElement | null)[]>([])
  const docLineRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const stmtRefs = useRef<(HTMLSpanElement | null)[]>([])
  const beamRef = useRef<HTMLDivElement>(null)
  const segTopRef = useRef<HTMLDivElement>(null)
  const segBottomRef = useRef<HTMLDivElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)
  const tokenRef = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    gsap.registerPlugin(ScrollTrigger)
    // the stage is measured once per refresh, not once per tween value: reading its size between GSAP's
    // style writes forced a style recalculation each time (about 145 of them on load)
    let measured: Geo | null = null
    const geo = (): Geo => {
      if (!measured) {
        const W = stage.clientWidth
        measured = {
          W,
          H: stage.clientHeight,
          mobile: W < 768,
          short: matchMedia(SHORT_MQ).matches,
          wide: matchMedia(WIDE_MQ).matches,
          shortDesk: matchMedia(SHORT_DESK_MQ).matches,
        }
      }
      return measured
    }
    // registered first, so every refresh (resize, rotation, fonts) starts from a fresh measure
    const remeasure = () => {
      measured = null
    }
    ScrollTrigger.addEventListener('refreshInit', remeasure)
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const papers = paperRefs.current.filter(Boolean) as HTMLDivElement[]
      const docLines = docLineRefs.current.filter(Boolean) as HTMLElement[]
      const stmt = stmtRefs.current.filter(Boolean) as HTMLElement[]

      // from here GSAP owns the papers' place: the CSS place goes, the transform takes over
      gsap.set(papers, { left: 0, top: 0, xPercent: -50, yPercent: -50 })
      gsap.set(docLines, { filter: 'blur(5px)', opacity: 0.32 })
      gsap.set(stmt, { yPercent: 105, autoAlpha: 0 })

      // the things that only sit somewhere: placed again on every refresh (resize, rotation, fonts)
      const layout = () => {
        const g = geo()
        const x = lineX(g)
        gsap.set(segTopRef.current, { x, y: lineStart(g), height: Math.max(0, docTop(g) - lineStart(g)) })
        gsap.set(segBottomRef.current, { x, y: docBottom(g), height: Math.max(0, g.H - docBottom(g)) })
        gsap.set(nodeRef.current, { x: x + 6, y: lineStart(g) - 6, xPercent: -100 })
      }
      layout()
      ScrollTrigger.addEventListener('refreshInit', layout)

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          // shorter on a phone, where people arrive from Instagram with less patience
          end: () => `+=${Math.round(window.innerHeight * (geo().mobile ? 3 : 3.5))}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // ── 0. the introduction is there from the first screen; only the hint leaves as the scroll starts
      tl.to(hintRef.current, { autoAlpha: 0, duration: 0.2 }, 0.05)

      // ── 1. chaos → order: every paper straightens into a grid, one after another
      papers.forEach((el, i) => {
        tl.fromTo(
          el,
          {
            autoAlpha: () => (hiddenAtStart(i, geo()) ? 0 : 1),
            x: () => chaosOf(i, geo()).x,
            y: () => chaosOf(i, geo()).y,
            rotation: () => chaosOf(i, geo()).rotation,
            scale: () => chaosOf(i, geo()).scale,
          },
          {
            autoAlpha: 1,
            x: () => gridOf(i, geo()).x,
            y: () => gridOf(i, geo()).y,
            rotation: 0,
            scale: () => gridOf(i, geo()).scale,
            ease: 'power2.inOut',
            duration: 2,
          },
          0.2 + i * 0.03,
        )
      })

      // ── 2. the others gather into the chosen document and leave; the introduction goes up and out
      papers.forEach((el, i) => {
        if (i === DOC) return
        tl.to(
          el,
          {
            x: () => gridOf(DOC, geo()).x,
            y: () => gridOf(DOC, geo()).y,
            scale: () => gridOf(i, geo()).scale * 0.55,
            autoAlpha: 0,
            ease: 'power2.in',
            duration: 0.9,
          },
          2.8 + ((i * 7) % COUNT) * 0.03,
        )
      })
      tl.to(heroRef.current, { y: -48, autoAlpha: 0, ease: 'power1.in', duration: 0.8 }, 2.7)

      // ── 3. the document comes to reading size; the flow line comes down to it
      tl.to(
        papers[DOC],
        {
          x: () => readOf(geo()).x,
          y: () => readOf(geo()).y,
          scale: () => readOf(geo()).scale,
          rotation: 0,
          ease: 'power3.inOut',
          duration: 1.1,
        },
        3.6,
      )
      tl.fromTo(segTopRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'power2.out', duration: 0.7 }, 4.4)
      tl.fromTo(nodeRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 4.4)

      // ── 4. read: the beam reads the routine; each manual step comes clear, is crossed out and tagged
      //       "automated", while the sentence about who does it rises on the left
      tl.fromTo(beamRef.current, { autoAlpha: 0, y: 52 }, { autoAlpha: 1, duration: 0.15 }, 5)
      tl.to(beamRef.current, { y: DOC_H - 30, duration: 3.6 }, 5.05)
      docLines.forEach((el, j) => {
        const at = 5.05 + (3.6 * (j + 0.6)) / (docLines.length + 1.4)
        tl.to(el, { filter: 'blur(0px)', opacity: 1, duration: 0.3 }, at)
        tl.fromTo(el.querySelector(`.${s.docStrike}`), { scaleX: 0 }, { scaleX: 1, ease: 'power2.out', duration: 0.3 }, at + 0.18)
        tl.fromTo(el.querySelector(`.${s.docDone}`), { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.25 }, at + 0.32)
        if (stmt[j]) tl.to(stmt[j], { yPercent: 0, autoAlpha: 1, ease: 'power2.out', duration: 0.55 }, at + 0.08)
      })
      tl.to(beamRef.current, { autoAlpha: 0, duration: 0.2 }, 8.7)

      // ── 5. the result leaves the document and goes on down the line (the connector takes it from the edge)
      tl.fromTo(segBottomRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'power1.inOut', duration: 1 }, 8.9)
      tl.fromTo(
        tokenRef.current,
        { autoAlpha: 0, x: () => lineX(geo()) - 7, y: () => docBottom(geo()) - 7 },
        { autoAlpha: 1, duration: 0.15 },
        8.9,
      )
      tl.to(tokenRef.current, { y: () => geo().H + 24, ease: 'power1.in', duration: 1.1 }, 9.05)

      // ── the pointer brings order: papers near it straighten, before the scroll does it for them
      let detach = () => {}
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const inners = innerRefs.current.filter(Boolean) as HTMLDivElement[]
        const turn = inners.map((el) => gsap.quickTo(el, 'rotation', { duration: 0.6, ease: 'power3.out' }))
        let raf = 0
        let px = 0
        let py = 0
        const apply = () => {
          raf = 0
          const atRest = (tl.scrollTrigger?.progress ?? 0) < 0.015
          papers.forEach((el, i) => {
            if (!atRest) return turn[i](0)
            const r = el.getBoundingClientRect()
            const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2))
            const k = d < 240 ? 1 - d / 240 : 0
            turn[i](-PAPERS[i].rot * 0.95 * k)
          })
        }
        const onMove = (e: PointerEvent) => {
          px = e.clientX
          py = e.clientY
          if (!raf) raf = requestAnimationFrame(apply)
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        detach = () => {
          window.removeEventListener('pointermove', onMove)
          if (raf) cancelAnimationFrame(raf)
        }
      }

      return () => {
        detach()
        ScrollTrigger.removeEventListener('refreshInit', layout)
      }
    })

    return () => {
      mm.revert()
      ScrollTrigger.removeEventListener('refreshInit', remeasure)
    }
  }, [])

  const statement = (withRefs: boolean) => (
    <>
      <p>
        {lines.map((line, j) => (
          <span key={j} className={s.stmtLine}>
            <span
              ref={
                withRefs
                  ? (el) => {
                      stmtRefs.current[j] = el
                    }
                  : undefined
              }
            >
              {line}
            </span>
          </span>
        ))}
      </p>
    </>
  )

  return (
    <>
      <div ref={stageRef} className={s.stage} id="inicio">
        {/* the papers: decoration, the manual work before it becomes a system */}
        {PAPERS.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              paperRefs.current[i] = el
            }}
            className={s.paper}
            aria-hidden="true"
            data-mobile-hidden={i >= MOBILE_COUNT && i !== DOC ? 'true' : undefined}
            data-left={LEFT[i] ? 'true' : undefined}
            style={
              {
                zIndex: i === DOC ? 2 : 1,
                '--nx': p.nx,
                '--ny': p.ny,
                '--mx': p.mx,
                '--my': p.my,
                '--r': `${p.rot}deg`,
                '--sc': baseScale(i) * p.s,
              } as CSSProperties
            }
          >
            <div
              ref={(el) => {
                innerRefs.current[i] = el
              }}
            >
              {i === DOC ? (
                <DocCard lineRefs={docLineRefs} beamRef={beamRef} />
              ) : (
                <div className={`${s.paperInner} ${p.kind === 'receipt' ? s.receipt : ''}`}>
                  <PaperFace kind={p.kind} />
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={heroRef} className={s.hero}>
          <p className={s.badge}>{t('site.badge')}</p>
          {/* the heading carries the role too, for search engines and screen readers */}
          <h1 className={s.name}>
            {/* the space keeps the two sentences apart in the extracted text (snippets, AI answers) */}
            {t('site.intro')}{' '}
            <span className={s.tagline}>
              <span className={s.taglineRole}>{t('site.tagline_role')}</span> {t('site.tagline')}
            </span>
          </h1>
          <div className={s.heroActions}>
            <a className={`${s.btn} ${s.btnOnDark}`} href="#projetos" onClick={() => track('hero_cta', { action: 'projects' })}>
              {t('site.hero_work')}
            </a>
            <a className={`${s.btn} ${s.btnGhostDark}`} href={CONTACT.cv} download onClick={() => track('cv_download', { where: 'hero' })}>
              {t('about.cv')}
            </a>
          </div>
        </div>
        <p ref={hintRef} className={s.hint} aria-hidden="true">
          {t('site.hint')}
        </p>

        {/* one heading for the reading scene, whichever copy of it shows (animated or still) */}
        <h2 className="sr-only">{t('site.read_title')}</h2>
        <section className={`${s.stmt} ${s.stmtLive}`} aria-label={t('site.read_title')}>
          {statement(true)}
        </section>

        <div ref={segTopRef} className={s.seg} aria-hidden="true" />
        <div ref={segBottomRef} className={s.seg} aria-hidden="true" />
        <div ref={nodeRef} className={s.node} aria-hidden="true">
          <span className={s.nodeLabel}>
            {t('site.steps.read')} <span className={s.nodeFile}>{t('site.files.read')}</span>
          </span>
        </div>
        <div ref={tokenRef} className={s.token} aria-hidden="true" />
      </div>

      {/* reduced motion: the reading scene as its own screen (hidden by CSS otherwise) */}
      <div className={s.staticRead}>
        <section className={s.stmt} aria-label={t('site.read_title')}>
          {statement(false)}
        </section>
        <div className={s.staticDoc} aria-hidden="true">
          <DocCard done />
        </div>
      </div>
    </>
  )
}
