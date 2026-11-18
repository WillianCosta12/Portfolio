'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BrandSymbol } from '@/components/brand/logo'
import { track } from './track'
import s from './site.module.css'

/**
 * Uma automação em miniatura (ideia do modelo 4, casos escolhidos por ele: atendimento com IA e integração
 * entre sistemas). O visitante escolhe o caso, arrasta o item até a caixa (ou usa o botão) e vê as etapas
 * ganharem visto, uma por vez. É uma demonstração e diz isso.
 */

type Case = { tab: string; item: string; drop: string; steps: string[]; done: string }

export function Demo() {
  const { t } = useTranslation()
  const cases = t('site.demo_cases', { returnObjects: true }) as Case[]
  const [which, setWhich] = useState(0)
  const [step, setStep] = useState(-1)
  const [over, setOver] = useState(false)
  const drop = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const c = cases[which] ?? cases[0]
  const running = step >= 0 && step < c.steps.length
  const done = step >= c.steps.length

  const clear = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }
  const run = useCallback(() => {
    if (step >= 0) return
    track('demo_run', { case: which === 0 ? 'ai_support' : 'integration' })
    const fast = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    clear()
    timers.current = Array.from({ length: c.steps.length + 1 }, (_, k) => window.setTimeout(() => setStep(k), fast ? 0 : 220 + k * 650))
  }, [step, c.steps.length, which])
  const reset = () => {
    clear()
    setStep(-1)
  }
  const pick = (i: number) => {
    reset()
    setWhich(i)
  }
  useEffect(() => clear, [])

  const inside = (x: number, y: number) => {
    const r = drop.current?.getBoundingClientRect()
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
  }

  return (
    <div className={s.demo}>
      <div className={s.demoTabs} role="tablist" aria-label={t('site.demo_h')}>
        {cases.map((cs, i) => (
          <button key={cs.tab} type="button" role="tab" aria-selected={which === i} className={s.demoTab} onClick={() => pick(i)}>
            {cs.tab}
          </button>
        ))}
      </div>
      <div className={s.demoRow}>
        {step < 0 ? (
          <motion.div
            key={c.item}
            className={s.demoItem}
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            whileDrag={{ scale: 1.04, rotate: -3 }}
            onDrag={(_, info) => setOver(inside(info.point.x - window.scrollX, info.point.y - window.scrollY))}
            onDragEnd={(_, info) => {
              setOver(false)
              if (inside(info.point.x - window.scrollX, info.point.y - window.scrollY)) run()
            }}
            aria-hidden="true"
          >
            <BrandSymbol className={s.demoMark} />
            {c.item}
          </motion.div>
        ) : (
          <div className={`${s.demoItem} ${s.demoGhost}`} aria-hidden="true">
            {c.item}
          </div>
        )}
        <div ref={drop} className={`${s.drop} ${over ? s.dropOver : ''} ${step >= 0 ? s.dropBusy : ''}`}>
          {step < 0 ? (
            <span>{c.drop}</span>
          ) : (
            <span className={s.dropItem}>
              <BrandSymbol className={s.demoMark} />
              {c.item}
            </span>
          )}
        </div>
      </div>
      <ol className={s.demoSteps} aria-live="polite">
        {c.steps.map((st, k) => (
          <li key={st} data-state={step > k || done ? 'done' : step === k ? 'now' : 'todo'}>
            <span className={s.demoCheck} aria-hidden="true">
              <svg viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {st}
          </li>
        ))}
      </ol>
      <div className={s.demoFoot}>
        {done ? (
          <>
            <p className={s.demoDone}>{c.done}</p>
            <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={reset}>
              {t('site.demo_reset')}
            </button>
          </>
        ) : (
          <button type="button" className={`${s.btn} ${s.btnDark}`} onClick={run} disabled={running}>
            {t('site.demo_run')}
          </button>
        )}
      </div>
    </div>
  )
}
