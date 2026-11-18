'use client'

import { useEffect, useRef } from 'react'
import { PORTRAIT } from '@/lib/content'

/**
 * Sobre: o retrato real redesenhado com o bloco da marca (canto superior direito reto).
 * Cada célula amostra o brilho da foto: claro = bloco maior. No modo "hero", os blocos perto do
 * ponteiro viram teal e se alinham (redesenha só quando o ponteiro mexe, nada roda sozinho).
 * No modo "reveal", quem chama controla o tamanho da célula (do grosso ao fino) com setProgress.
 */

export type MosaicApi = { setProgress: (p: number) => void }

const INK = [232, 238, 236] // --g-tinta
const TEAL = [45, 212, 191] // --teal-claro

export function Mosaic({
  mode,
  label,
  className,
  onReady,
}: {
  mode: 'hero' | 'reveal'
  label: string
  className?: string
  onReady?: (api: MosaicApi) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.src = PORTRAIT.src
    const sampler = document.createElement('canvas')
    const sctx = sampler.getContext('2d', { willReadFrequently: true })
    let W = 0
    let H = 0
    let dpr = 1
    let cell = mode === 'hero' ? 9 : 26
    let cols = 0
    let rows = 0
    let lum: Float32Array = new Float32Array(0)
    let pointer: { x: number; y: number } | null = null
    let raf = 0
    let ready = false

    const sample = () => {
      if (!sctx || !img.complete || !img.naturalWidth || !W) return
      cols = Math.max(4, Math.floor(W / cell))
      rows = Math.max(5, Math.floor(H / cell))
      sampler.width = cols
      sampler.height = rows
      // cover: crop the photo to the canvas's shape
      const ir = img.naturalWidth / img.naturalHeight
      const cr = W / H
      let sw = img.naturalWidth
      let sh = img.naturalHeight
      if (ir > cr) sw = sh * cr
      else sh = sw / cr
      sctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, cols, rows)
      const data = sctx.getImageData(0, 0, cols, rows).data
      lum = new Float32Array(cols * rows)
      for (let i = 0; i < cols * rows; i++) {
        const l = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255
        lum[i] = Math.pow(l, 0.9)
      }
    }

    const draw = () => {
      raf = 0
      if (!ready) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const cw = W / cols
      const ch = H / rows
      const reach = Math.min(W, H) * 0.22
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const b = lum[r * cols + c]
          if (b < 0.06) continue
          const cx = (c + 0.5) * cw
          const cy = (r + 0.5) * ch
          let k = 0
          if (pointer) {
            const d = Math.hypot(cx - pointer.x, cy - pointer.y)
            k = d < reach ? 1 - d / reach : 0
          }
          const size = Math.min(cw, ch) * (0.16 + 0.6 * b + 0.22 * k)
          const a = 0.14 + 0.7 * b
          const col = k > 0.05 ? TEAL.map((v, i) => Math.round(INK[i] + (v - INK[i]) * Math.min(1, k * 1.6))) : INK
          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${Math.min(1, a + k * 0.4)})`
          const s = Math.max(1, size)
          const rad = s * 0.26
          ctx.beginPath()
          // roundRect is missing on older browsers (Safari < 16, Firefox < 112): plain blocks there, never a crash
          if (typeof ctx.roundRect === 'function') ctx.roundRect(cx - s / 2, cy - s / 2, s, s, [rad, 0, rad, rad])
          else ctx.rect(cx - s / 2, cy - s / 2, s, s)
          ctx.fill()
        }
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      sample()
      schedule()
    }

    const onLoad = () => {
      ready = true
      resize()
    }
    if (img.complete && img.naturalWidth) onLoad()
    else img.addEventListener('load', onLoad, { once: true })
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      pointer = x > -80 && y > -80 && x < W + 80 && y < H + 80 ? { x, y } : null
      schedule()
    }
    if (mode === 'hero' && fine) window.addEventListener('pointermove', onMove, { passive: true })

    onReady?.({
      setProgress: (p) => {
        // coarse blocks to fine ones: 26px → 4px
        const next = Math.round(26 - 22 * Math.min(1, Math.max(0, p)))
        if (next === cell) return
        cell = next
        sample()
        schedule()
      },
    })

    return () => {
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [mode, onReady])

  return <canvas ref={canvasRef} className={className} role="img" aria-label={label} />
}
