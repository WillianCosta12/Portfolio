'use client'

import { Fragment, useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandSymbol } from '@/components/brand/logo'
import { CONTACT, CONTACT_LINKS, LIVE_PROJECTS, PORTRAIT, SERVICE_TOOLS, TOOLS } from '@/lib/content'
import { TRAP_FIELD, useContactForm, useIsoLayoutEffect } from './hooks'
import { DocCard, stageLineX } from './stage'
import { Demo } from './demo'
import { Mosaic, type MosaicApi } from './mosaic'
import { track } from './track'
import s from './site.module.css'

/**
 * Capítulos 02 a 07. A linha que desceu pelo documento dobra até a margem (conector) e vira o trilho do
 * resto da página; um bloco desce por ele na altura de 60% da tela e acende cada nó e cada checkpoint ao
 * passar. 02 prende a tela e abre o documento em quatro campos; 03 empilha cartazes de projeto; 04 valida
 * as etapas e traz a automação em miniatura; 05 é o painel com os números (com a chave manual/automatizado);
 * 06 assina, com o retrato em blocos que vira foto; 07 é o contato em forma de terminal, fim do fluxo.
 */

type Item = { title: string; text: string }
type Kinded = Item & { kind: string }
type Service = Item & { key: string }
type Kpi = { before?: string; after?: string; value?: string; label: string }

const STEP_KEYS = ['understand', 'process', 'validate', 'deliver', 'sign', 'notify'] as const
const RAIL_END = 127 // the rail stops on the last node: .notify's bottom padding plus half the node
const HEAD = 0.6 // where the moving block rides, as a share of the screen's height

function Arrow() {
  return (
    <svg className={s.btnArrow} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const external = (href: string) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export function Flow() {
  const { t } = useTranslation()
  const services = t('site.services', { returnObjects: true }) as Service[]
  const work = t('work.items', { returnObjects: true }) as Kinded[]
  const steps = t('site.process_steps', { returnObjects: true }) as Item[]
  const kpis = t('site.kpis', { returnObjects: true }) as Kpi[]
  const jobs = t('site.jobs', { returnObjects: true }) as Kinded[]
  const experience = t('about.experience', { returnObjects: true }) as { period: string; role: string; company: string }[]
  const form = useContactForm()
  const [auto, setAuto] = useState(false)

  const connRef = useRef<HTMLDivElement>(null)
  const connPathRef = useRef<SVGPathElement>(null)
  const connTrackRef = useRef<SVGPathElement>(null)
  const connTokenRef = useRef<HTMLDivElement>(null)
  const connPaperRef = useRef<HTMLDivElement>(null)
  const connPaperPathRef = useRef<SVGPathElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const railFillRef = useRef<HTMLDivElement>(null)
  const railTokenRef = useRef<HTMLDivElement>(null)
  const understandRef = useRef<HTMLElement>(null) // the chapter that pins (02)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const tableRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const miniDocRef = useRef<HTMLDivElement>(null)
  const posterRefs = useRef<(HTMLElement | null)[]>([])
  const markerRefs = useRef<(HTMLDivElement | null)[]>([])
  const dimRefs = useRef<(HTMLDivElement | null)[]>([])
  const checkRefs = useRef<(HTMLLIElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const manualFillRef = useRef<HTMLSpanElement>(null)
  const blocks30Ref = useRef<HTMLSpanElement>(null)
  const blocks50Ref = useRef<HTMLSpanElement>(null)
  const stampRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const mosaicApi = useRef<MosaicApi | null>(null)
  const onMosaic = useCallback((api: MosaicApi) => {
    mosaicApi.current = api
  }, [])

  // where each tool was used: the services and the projects that list it
  const usedIn = (tool: string) => [
    ...services.filter((_, i) => SERVICE_TOOLS[i]?.includes(tool)).map((x) => x.title),
    ...LIVE_PROJECTS.filter((p) => (p.stack as readonly string[]).includes(tool)).map((p) => work[LIVE_PROJECTS.indexOf(p)]?.title),
  ]

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const flow = flowRef.current
    const conn = connRef.current
    // the page root's ref belongs to a parent: find it from here
    const page = flow?.closest(`.${s.page}`) as HTMLDivElement | null
    if (!page || !flow || !conn) return
    const css = getComputedStyle(document.documentElement)
    const tone = (name: string) => css.getPropertyValue(name).trim()
    const mm = gsap.matchMedia()

    // ── the connector's shape: from the stage's line to the rail (drawn whole when there is no motion)
    const path = connPathRef.current!
    const track = connTrackRef.current!
    const paperPath = connPaperPathRef.current!
    let len = 0
    let connH = 0 // measured here (on refresh), never in the scroll handlers: no layout read per frame
    const drawConn = () => {
      const W = conn.clientWidth
      const H = conn.clientHeight
      connH = H
      const lx = stageLineX(W, window.innerHeight)
      const rail = railRef.current!.getBoundingClientRect()
      const gx = rail.left + rail.width / 2 - flow.getBoundingClientRect().left
      // down from the document's line, a rounded turn, across to the rail, another turn, down the rail
      const y = H * 0.4
      const r = Math.max(0, Math.min(28, (lx - gx) / 2, y))
      const d = `M ${lx} 0 V ${y - r} A ${r} ${r} 0 0 1 ${lx - r} ${y} H ${gx + r} A ${r} ${r} 0 0 0 ${gx} ${y + r} V ${H}`
      ;[path, track, paperPath].forEach((p) => p.setAttribute('d', d))
      len = path.getTotalLength()
    }
    drawConn()
    ScrollTrigger.addEventListener('refreshInit', drawConn)

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        pin: '(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 800px)',
        wide: '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
      },
      (ctx) => {
        const { motion, pin, wide } = ctx.conditions as { motion: boolean; pin: boolean; wide: boolean }
        if (!motion) return
        page.classList.add(s.live)
        if (pin) page.classList.add(s.pinMode)

        // ── the connector: the line is drawn down to the block while a paper sheet rises from below with a
        //    crisp edge (no colour mixing). Above the edge the line is light teal, below it is teal.
        const ctoken = connTokenRef.current!
        const darkTeal = tone('--teal')
        const lightTeal = tone('--teal-claro')
        let lineP = 0
        let edgeP = 0
        const moveConn = () => {
          const l = lineP * len
          ;[path, paperPath].forEach((p) => {
            p.style.strokeDasharray = `${len}`
            p.style.strokeDashoffset = `${len - l}`
          })
          const pt = path.getPointAtLength(l)
          const onPaper = pt.y > connH * (1 - edgeP)
          gsap.set(ctoken, { x: pt.x - 7, y: pt.y - 7, autoAlpha: lineP < 1 ? 1 : 0, backgroundColor: onPaper ? darkTeal : lightTeal })
        }
        gsap.fromTo(
          connPaperRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: conn,
              start: 'top 65%',
              end: `bottom ${HEAD * 100}%`,
              scrub: true,
              onUpdate: (self) => {
                edgeP = self.progress
                moveConn()
              },
            },
          },
        )
        const connST = ScrollTrigger.create({
          trigger: conn,
          start: `top ${HEAD * 100}%`,
          end: `bottom ${HEAD * 100}%`,
          onUpdate: (self) => {
            lineP = self.progress
            moveConn()
          },
          onRefresh: (self) => {
            lineP = self.progress
            moveConn()
          },
        })
        lineP = connST.progress
        moveConn()

        // ── 02: pinned, the read document lies on a closed table that opens into four fields
        if (pin) {
          const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[]
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: understandRef.current,
              start: 'top top',
              end: () => `+=${Math.round(window.innerHeight * 1)}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })
          tl.fromTo(
            tableRef.current,
            { clipPath: 'inset(0% 70% 0% 0% round 16px 0px 16px 16px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 16px 0px 16px 16px)', ease: 'power2.inOut', duration: 1 },
            0.15,
          )
          tl.fromTo(miniDocRef.current, { autoAlpha: 1, scale: 0.6, yPercent: -50, transformOrigin: 'left center' }, { autoAlpha: 0, scale: 0.5, duration: 0.45 }, 0.75)
          rows.forEach((row, i) => {
            tl.fromTo(row, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.5 }, 0.95 + i * 0.32)
          })
          // once whole, the table stops clipping, so the tool tips can show above the first row
          tl.set(tableRef.current, { clipPath: "none" })
          tl.to({}, { duration: 0.35 }) // a beat with the table whole before the page moves on
        }

        // ── 03: each poster steps back into the dark as the next one comes over it (where they stack)
        if (wide) {
          const posters = posterRefs.current.filter(Boolean) as HTMLElement[]
          posters.forEach((poster, i) => {
            const marker = markerRefs.current[i + 1]
            if (!marker) return
            // it stays bright while the next one covers its first half; then it steps back into the dark
            const range = { trigger: marker, start: 'top 55%', end: 'top top', scrub: true }
            gsap.fromTo(poster, { scale: 1 }, { scale: 0.92, ease: 'power1.in', scrollTrigger: range })
            gsap.fromTo(dimRefs.current[i], { opacity: 0 }, { opacity: 0.6, ease: 'power1.in', scrollTrigger: { ...range } })
          })
        }

        // ── 05: the numbers fill in as the panel comes up
        const tl5 = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: panelRef.current, start: 'top 80%', end: 'top 25%', scrub: 0.5 } })
        tl5.fromTo(manualFillRef.current, { scaleX: 1 }, { scaleX: 0.15, duration: 0.7 }, 0)
        tl5.fromTo(blocks30Ref.current!.children, { opacity: 0.14 }, { opacity: 1, duration: 0.1, stagger: 0.02 }, 0)
        tl5.fromTo(blocks50Ref.current!.children, { opacity: 0.14 }, { opacity: 1, duration: 0.1, stagger: 0.012 }, 0)

        // ── 06: the block portrait gets finer until it is the photo; the stamp presses down once
        const reveal = (p: number) => {
          mosaicApi.current?.setProgress(p)
          if (photoRef.current) photoRef.current.style.opacity = String(Math.max(0, (p - 0.82) / 0.18))
        }
        ScrollTrigger.create({
          trigger: frameRef.current,
          start: 'top 85%',
          end: 'top 20%',
          scrub: true,
          onUpdate: (self) => reveal(self.progress),
          onRefresh: (self) => reveal(self.progress),
        })
        gsap.fromTo(
          stampRef.current,
          { scale: 1.7, rotation: -26, autoAlpha: 0 },
          {
            scale: 1,
            rotation: -8,
            autoAlpha: 1,
            duration: 0.42,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: stampRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
          },
        )

        // ── the rail: filled down to the block, which rides at 60% of the screen. Measured after the pins.
        const fill = railFillRef.current!
        const rtoken = railTokenRef.current!
        let flowH = 0 // the flow's height with the pins in, measured on refresh only (not per scroll frame)
        const moveRail = (p: number) => {
          const h = p * Math.max(0, flowH - RAIL_END)
          fill.style.height = `${h}px`
          gsap.set(rtoken, { y: h, autoAlpha: p > 0 ? 1 : 0 })
        }
        ScrollTrigger.create({
          trigger: flow,
          start: `top ${HEAD * 100}%`,
          end: `bottom-=${RAIL_END} ${HEAD * 100}%`,
          refreshPriority: -1,
          onUpdate: (self) => moveRail(self.progress),
          onRefresh: (self) => {
            flowH = flow.offsetHeight
            moveRail(self.progress)
          },
        })

        // nodes and checkpoints light up when the block reaches them
        const lights = [...(nodeRefs.current.filter(Boolean) as HTMLElement[]), ...(checkRefs.current.filter(Boolean) as HTMLElement[])]
        lights.forEach((el) =>
          ScrollTrigger.create({
            trigger: el,
            start: `top ${HEAD * 100}%`,
            refreshPriority: -1,
            onEnter: () => el.classList.add(s.on),
            onLeaveBack: () => el.classList.remove(s.on),
            onRefresh: (self) => el.classList.toggle(s.on, self.progress > 0),
          }),
        )

        return () => {
          page.classList.remove(s.live, s.pinMode)
          lights.forEach((el) => el.classList.remove(s.on))
          fill.style.removeProperty('height')
          ;[path, paperPath].forEach((p) => {
            p.style.removeProperty('stroke-dasharray')
            p.style.removeProperty('stroke-dashoffset')
          })
          if (photoRef.current) photoRef.current.style.removeProperty('opacity')
        }
      },
    )

    // the fonts change the boxes: measure again once they are in (only if they were still loading)
    if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', drawConn)
      mm.revert()
    }
  }, [])

  const node = (i: number) => (
    <div
      className={s.chNode}
      aria-hidden="true"
      ref={(el) => {
        nodeRefs.current[i] = el
      }}
    >
      <span className={s.chNodeLabel}>
        {t(`site.steps.${STEP_KEYS[i]}`)} <span className={s.nodeFile}>{t(`site.files.${STEP_KEYS[i]}`)}</span>
      </span>
    </div>
  )

  const kpi0 = kpis[0]
  const topics = t('site.topics', { returnObjects: true }) as string[]
  // a call to action: set the message's subject (0 = a project, 1 = a role) and measure where it came from
  const talk = (topic: number, where: string) => () => {
    form.setTopic(topic)
    track('cta_click', { where, topic: topic === 0 ? 'project' : 'role' })
  }
  const ctaRow = (where: string) => (
    <div className={s.ctaRow}>
      <p className={s.ctaText}>{t('site.cta_text')}</p>
      <div className={s.ctaButtons}>
        <a className={`${s.btn} ${s.btnDark}`} href="#contato" onClick={talk(0, where)}>
          {t('site.cta_project')}
          <Arrow />
        </a>
        <a className={`${s.btn} ${s.btnGhost}`} href="#contato" onClick={talk(1, where)}>
          {t('site.cta_job')}
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* the line bends from the document to the rail */}
      <div ref={connRef} className={s.connector} aria-hidden="true">
        <svg className={s.connSvg}>
          <path ref={connTrackRef} className={s.connTrack} />
          <path ref={connPathRef} className={s.connPath} />
        </svg>
        <div ref={connPaperRef} className={s.connPaper}>
          <svg className={s.connSvg}>
            <path ref={connPaperPathRef} className={s.connPathPaper} />
          </svg>
        </div>
        <div ref={connTokenRef} className={s.connToken} />
      </div>

      <div ref={flowRef} className={s.flow}>
        <div ref={railRef} className={s.rail} aria-hidden="true" />
        <div ref={railFillRef} className={s.railFill} aria-hidden="true" />
        <div ref={railTokenRef} className={s.railToken} aria-hidden="true" />

        {/* 02 · entender — what I do */}
        <section id="o-que-faco" ref={understandRef} className={`${s.ch} ${s.understand}`} aria-labelledby="h-understand">
          {node(0)}
          <div className={s.chHead}>
            <h2 id="h-understand" className={s.h2}>
              {t('site.services_h')}
            </h2>
            <p className={s.lead}>{t('site.services_intro')}</p>
          </div>
          <div className={s.tableWrap}>
            <div ref={tableRef} className={s.table}>
              <div className={s.tableHead}>
                <span>{t('site.fields_file')}</span>
                <span>{t('site.fields_shape', { count: services.length })}</span>
              </div>
              {services.map((item, i) => (
                <div
                  key={item.key}
                  className={s.row}
                  ref={(el) => {
                    rowRefs.current[i] = el
                  }}
                >
                  <span className={s.rowKey}>
                    {String(i + 1).padStart(2, '0')} · {item.key}
                  </span>
                  <div>
                    <h3 className={s.rowTitle}>{item.title}</h3>
                    <p className={s.rowText}>{item.text}</p>
                  </div>
                  <ul className={s.tools} aria-label={t('site.tools_label')}>
                    {(SERVICE_TOOLS[i] ?? []).map((id) => {
                      const tool = TOOLS[id]
                      return (
                        <li key={id} className={s.tool}>
                          <button type="button" className={s.toolBtn}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={tool.mono ?? tool.src} alt="" width={16} height={16} />
                            {tool.name}
                          </button>
                          <span className={s.tip} role="tooltip">
                            {t('site.used_in')}: {usedIn(id).join(', ')}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div ref={miniDocRef} className={s.miniDoc} aria-hidden="true">
              <DocCard done />
            </div>
          </div>
        </section>

        {/* 03 · processar — projects as posters that stack */}
        <section id="projetos" className={`${s.ch} ${s.work}`} aria-labelledby="h-process">
          {node(1)}
          <div className={s.chHead}>
            <h2 id="h-process" className={s.h2}>
              {t('site.work_h')}
            </h2>
            <p className={s.lead}>{t('site.work_intro')}</p>
          </div>
          <div className={s.posters}>
            {LIVE_PROJECTS.map((p, i) => {
              const item = work[i]
              return (
                <Fragment key={p.id}>
                  <div
                    aria-hidden="true"
                    ref={(el) => {
                      markerRefs.current[i] = el
                    }}
                  />
                  <article
                    className={s.poster}
                    aria-labelledby={`p-${p.id}`}
                    ref={(el) => {
                      posterRefs.current[i] = el
                    }}
                  >
                    <div className={s.posterInner}>
                      <p className={s.posterMeta}>
                        <span>{t('site.project_of', { n: i + 1, total: LIVE_PROJECTS.length })}</span>
                        <span className={s.liveTag}>{t('status.live')}</span>
                      </p>
                      <h3 id={`p-${p.id}`} className={s.posterTitle}>
                        {item.title}
                      </h3>
                      <figure className={s.posterShot}>
                        <Image src={p.image} alt={`${item.title}, ${t('work.shot')}`} width={1440} height={900} sizes="(min-width: 1024px) 55vw, 100vw" />
                      </figure>
                      <div className={s.posterText}>
                        <p className={s.kind}>{item.kind}</p>
                        <p className={s.posterP}>{item.text}</p>
                        <p className={s.stack}>{p.stack.map((id) => TOOLS[id].name).join(' · ')}</p>
                        <div className={s.links}>
                          <a className={`${s.btn} ${s.btnDark}`} href={p.site} {...external(p.site)} onClick={() => track('project_link', { project: p.id, kind: 'site' })}>
                            {t('work.site')}
                            <Arrow />
                          </a>
                          <a className={`${s.btn} ${s.btnGhost}`} href={p.code} {...external(p.code)} onClick={() => track('project_link', { project: p.id, kind: 'code' })}>
                            {t('work.code')}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className={s.dim}
                      aria-hidden="true"
                      ref={(el) => {
                        dimRefs.current[i] = el
                      }}
                    />
                  </article>
                </Fragment>
              )
            })}
          </div>
        </section>

        {/* 04 · validar — how I work, and an automation in miniature */}
        <section id="como-trabalho" className={s.ch} aria-labelledby="h-validate">
          {node(2)}
          <div className={s.chHead}>
            <h2 id="h-validate" className={s.h2}>
              {t('site.process_h')}
            </h2>
            <p className={s.lead}>{t('site.process_intro')}</p>
          </div>
          <ol className={s.checks}>
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={`${s.grid} ${s.check}`}
                ref={(el) => {
                  checkRefs.current[i] = el
                }}
              >
                <span className={s.checkBox} aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={s.checkStatus} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')} · <span className={s.stDone}>{t('site.checked')}</span>
                  <span className={s.stPending}>{t('site.pending')}</span>
                </span>
                <h3 className={s.checkTitle}>{step.title}</h3>
                <p className={s.checkText}>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className={s.demoBlock}>
            <h3 className={s.demoH}>
              <span className={s.comment}>{'// '}</span>
              {t('site.demo_h')}
            </h3>
            <p className={s.demoNote}>{t('site.demo_note')}</p>
            <Demo />
          </div>
        </section>

        {/* 05 · entregar — the clean panel: real numbers and the work in production */}
        <section id="resultados" className={s.ch} aria-labelledby="h-deliver">
          {node(3)}
          <div className={s.chHead}>
            <h2 id="h-deliver" className={s.h2}>
              {t('site.deliver_h')}
            </h2>
            <p className={s.lead}>{t('site.deliver_intro')}</p>
          </div>
          <div ref={panelRef} className={s.panel}>
            <div className={s.panelHead}>
              <span>{t('site.panel_file')}</span>
              <span className={s.panelLive}>{t('status.production')}</span>
            </div>
            <div className={s.kpis}>
              <div className={`${s.kpi} ${s.kpiMain}`}>
                <div className={s.kpiValueBox} aria-live="polite">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={auto ? 'after' : 'before'}
                      className={s.kpiValue}
                      initial={{ y: 26, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -26, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {auto ? kpi0.after : kpi0.before}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <span className={s.barTrack} aria-hidden="true">
                  <span className={`${s.barFill} ${s.barFillTeal}`} style={{ transform: `scaleX(${auto ? 0.06 : 1})` }} />
                </span>
                <button type="button" role="switch" aria-checked={auto} className={s.switch} onClick={() => setAuto((a) => !a)}>
                  <span className={s.track} aria-hidden="true">
                    <span className={s.knob} />
                  </span>
                  {auto ? t('site.toggle_on') : t('site.toggle_off')}
                </button>
                <p className={s.kpiLabel}>{kpi0.label}</p>
              </div>
              {kpis.slice(1).map((k, i) => (
                <div key={k.label} className={s.kpi}>
                  <p className={s.kpiValue}>{k.value}</p>
                  <div className={s.meter} aria-hidden="true">
                    {i === 0 && (
                      <span ref={blocks30Ref} className={s.blocks}>
                        {Array.from({ length: 30 }, (_, b) => (
                          <span key={b} />
                        ))}
                      </span>
                    )}
                    {i === 1 && (
                      <span className={s.barTrack}>
                        <span ref={manualFillRef} className={s.barFill} style={{ transform: 'scaleX(0.15)' }} />
                      </span>
                    )}
                    {i === 2 && (
                      <span ref={blocks50Ref} className={s.blocks}>
                        {Array.from({ length: 50 }, (_, b) => (
                          <span key={b} />
                        ))}
                      </span>
                    )}
                  </div>
                  <p className={s.kpiLabel}>{k.label}</p>
                </div>
              ))}
            </div>
            <ul className={s.jobs}>
              {jobs.map((job) => (
                <li key={job.title} className={s.job}>
                  <span className={s.jobKind}>{job.kind}</span>
                  <div>
                    <h3 className={s.jobTitle}>{job.title}</h3>
                    <p className={s.jobText}>{job.text}</p>
                  </div>
                  <span className={`${s.panelLive} ${s.jobStatus}`}>{t('status.production')}</span>
                </li>
              ))}
            </ul>
          </div>
          {ctaRow('results')}
        </section>

        {/* 06 · assinar — about me, on the dark band; the block portrait sharpens into the photo */}
        <section id="sobre" className={`${s.ch} ${s.chDark}`} aria-labelledby="h-sign">
          {node(4)}
          <div className={s.grid}>
            <div ref={frameRef} className={s.portraitFrame}>
              <Mosaic mode="reveal" label={t('site.portrait_label')} className={s.mosaic} onReady={onMosaic} />
              <div ref={photoRef} className={s.portraitPhoto}>
                <Image src={PORTRAIT.src} alt={t('about.photo_alt')} width={PORTRAIT.width} height={PORTRAIT.height} sizes="(min-width: 768px) 40vw, 100vw" />
              </div>
            </div>
            <div className={s.aboutText}>
              <h2 id="h-sign" className={s.h2}>
                {t('site.sign_h')}
              </h2>
              <p className={s.bio}>{t('site.bio')}</p>
              <p className={s.bio}>{t('site.colleague')}</p>
              <p className={s.bio}>{t('site.likes')}</p>
              <p className={s.avail}>{t('site.available')}</p>
              <h3 className={s.trailTitle}>{t('about.experience_title')}</h3>
              <dl className={s.trail}>
                {experience.map((e) => (
                  <div key={e.period} className={s.trailRow}>
                    <dt>{e.period}</dt>
                    <dd>
                      {e.role}
                      <span>{e.company}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className={s.langs}>
                {t('about.languages_title')}: {t('about.languages')}
              </p>
              <div className={s.links}>
                <a className={`${s.btn} ${s.btnOnDark}`} href={CONTACT.cv} download onClick={() => track('cv_download', { where: 'about' })}>
                  {t('about.cv')}
                  <Arrow />
                </a>
                <a className={`${s.btn} ${s.btnGhostDark}`} href="#contato" onClick={() => track('cta_click', { where: 'about', topic: 'none' })}>
                  {t('nav.contact')}
                </a>
              </div>
            </div>
          </div>
          <div className={s.signature}>
            <span ref={stampRef} className={s.stamp}>
              <BrandSymbol className={s.stampSvg} />
            </span>
            <div>
              <p className={s.sigBy}>{t('site.signed_by')}</p>
              <p className={s.sigName}>{t('site.signed_place')}</p>
            </div>
          </div>
        </section>

        {/* 07 · notificar — the form as a terminal; the rail ends on its node */}
        <section id="contato" className={`${s.ch} ${s.notify}`} aria-labelledby="h-notify">
          {node(5)}
          <div className={s.chHead}>
            <h2 id="h-notify" className={s.h2}>
              {t('site.contact_h')}
            </h2>
            <p className={s.lead}>{t('site.contact_intro')}</p>
          </div>
          <div className={s.terminal}>
            <div className={s.termBar}>
              <span className={s.termMark} aria-hidden="true" />
              {t('site.files.notify')}
            </div>
            <div className={s.termBody}>
              <form className={s.termForm} noValidate onSubmit={form.onSubmit}>
                <p className={s.prompt} aria-hidden="true">
                  <span className={s.path}>~/wcosta</span> <span className={s.dollar}>$</span> ./{t('site.files.notify')}
                </p>
                {/* a field people never see or reach: only a bot fills it in, and then nothing is sent (hooks.ts) */}
                <div className={s.trap} aria-hidden="true">
                  <input type="text" name={TRAP_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
                </div>
                <div className={s.field}>
                  <span id="c-topic-label" className={s.label}>
                    {t('site.topic_label')} <span aria-hidden="true">›</span>
                  </span>
                  <div className={s.topics} role="group" aria-labelledby="c-topic-label">
                    {topics.map((tp, i) => (
                      <button
                        key={tp}
                        type="button"
                        className={s.topic}
                        aria-pressed={form.topic === i}
                        onClick={() => form.setTopic(form.topic === i ? null : i)}
                      >
                        {tp}
                      </button>
                    ))}
                  </div>
                </div>
                {(['name', 'email', 'message'] as const).map((f) => (
                  <div key={f} className={s.field}>
                    <label htmlFor={`c-${f}`} className={s.label}>
                      {t(`contact.${f}`).toLowerCase()} <span aria-hidden="true">›</span>
                    </label>
                    {f === 'message' ? (
                      <textarea ref={form.refs.message} rows={4} className={s.input} {...form.fieldProps('message', 'c')} />
                    ) : (
                      <input
                        ref={f === 'name' ? form.refs.name : form.refs.email}
                        type={f === 'email' ? 'email' : 'text'}
                        autoComplete={f}
                        className={s.input}
                        {...form.fieldProps(f, 'c')}
                      />
                    )}
                    {form.errors[f] && (
                      <p id={`c-${f}-error`} className={s.error}>
                        ✗ {form.errors[f]}
                      </p>
                    )}
                  </div>
                ))}
                <div className={s.formFoot}>
                  <button type="submit" className={`${s.btn} ${s.btnOnDark}`} disabled={form.status === 'sending'}>
                    [ {t('site.send')} ↵ ]
                  </button>
                  <p className={s.status} role="status" aria-live="polite">
                    {form.statusText && (
                      <>
                        <span aria-hidden="true">{form.status === 'sent' ? '✓ ' : form.status === 'failed' || form.status === 'unavailable' ? '✗ ' : '> '}</span>
                        {form.statusText}
                      </>
                    )}
                  </p>
                </div>
              </form>
              <div className={s.termLinks}>
                <p className={s.termFile}>{t('site.links_file')}</p>
                <h3 className="sr-only">{t('contact.direct_title')}</h3>
                <ul>
                  {CONTACT_LINKS.map((c) => (
                    <li key={c.id}>
                      <span className={s.key}>{c.id}</span>
                      <span className={s.punct}>:</span>
                      <a href={c.href} {...external(c.href)} onClick={() => track('contact_link', { channel: c.id })}>
                        {c.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <span className={s.key}>cv</span>
                    <span className={s.punct}>:</span>
                    <a href={CONTACT.cv} download onClick={() => track('cv_download', { where: 'contact' })}>
                      {t('about.cv')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={s.endNode} data-done={form.status === 'sent' ? 'true' : 'false'} aria-hidden="true">
            <span className={s.endLabel}>{form.status === 'sent' ? t('site.delivered') : t('site.end')}</span>
          </div>
        </section>
      </div>
    </>
  )
}
