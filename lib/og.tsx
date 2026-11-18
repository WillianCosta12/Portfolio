import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// A imagem de compartilhamento do site (1200×630), usada pela página inicial e pelos estudos de caso:
// fundo grafite, os papéis da abertura à direita (um deles lido e riscado) e o texto à esquerda.

export const OG_SIZE = { width: 1200, height: 630 }

const GRAFITE = '#0C1211'
const PAPEL = '#F6F8F7'
const RISCO = '#C9D2CF'
const TEAL = '#0D9488'
const TEAL_CLARO = '#2DD4BF'
const TINTA_CLARA = '#E8EEEC'
const APOIO = '#9AA6A2'

// the opening of the site, still: loose papers on the left of the pile, the rest already in order,
// and one sheet read and struck through (the manual routine, automated)
function Papers() {
  const cards = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const seed = Math.sin((r + 1) * 12.9898 + (c + 1) * 78.233) * 43758.5453
      const rand = seed - Math.floor(seed)
      const loose = c === 0 ? 1 : c === 1 && r === 0 ? 0.45 : 0
      const read = r === 1 && c === 2
      const lines = []
      for (let k = 0; k < 5; k++) {
        lines.push(
          <div
            key={k}
            style={{
              display: 'flex',
              height: 5,
              width: k === 0 ? '55%' : `${88 - ((k * 13) % 30)}%`,
              marginTop: k === 0 ? 0 : 11,
              borderRadius: 2,
              backgroundColor: read && k > 0 ? TEAL : RISCO,
              opacity: read && k > 0 ? 0.85 : 1,
            }}
          />,
        )
      }
      cards.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            left: 812 + c * 116 + (rand - 0.5) * 70 * loose,
            top: 64 + r * 146 + (rand - 0.5) * 50 * loose,
            width: 96,
            height: 124,
            padding: '14px 12px',
            borderRadius: '10px 0 10px 10px',
            backgroundColor: PAPEL,
            transform: `rotate(${(rand - 0.5) * 36 * loose}deg)`,
          }}
        >
          {lines}
        </div>,
      )
    }
  }
  return <div style={{ position: 'absolute', left: 0, top: 0, width: 1200, height: 630, display: 'flex' }}>{cards}</div>
}

// the brand fonts, read from the repo at build time (app/[lang]/_fonts, OFL): no network needed to build
const fontFile = (name: string) => readFile(join(process.cwd(), 'app', '[lang]', '_fonts', name)).catch(() => null)

/**
 * kicker: a short line above the title (a case study's label); title: the big line; muted and strong: the two
 * lines under it (the first quieter). titleSize shrinks for longer titles.
 */
export async function shareImage({
  kicker,
  title,
  titleSize = 84,
  muted,
  strong,
}: {
  kicker?: string
  title: string
  titleSize?: number
  muted: string
  strong: string
}) {
  const [display, sans] = await Promise.all([fontFile('SpaceGrotesk-Medium.ttf'), fontFile('IBMPlexSans-Regular.ttf')])
  const fonts = [
    ...(display ? [{ name: 'Display', data: display, weight: 500 as const, style: 'normal' as const }] : []),
    ...(sans ? [{ name: 'Sans', data: sans, weight: 400 as const, style: 'normal' as const }] : []),
  ]
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: GRAFITE,
          padding: '64px 72px',
          fontFamily: 'Sans, sans-serif',
          position: 'relative',
        }}
      >
        <Papers />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <div style={{ width: 26, height: 26, borderRadius: '7px 0 7px 7px', backgroundColor: TEAL_CLARO }} />
          <div style={{ display: 'flex', fontFamily: 'Display, sans-serif', fontSize: 26, fontWeight: 500, color: TINTA_CLARA, letterSpacing: '-0.02em' }}>
            wcosta<span style={{ color: TEAL_CLARO }}>.dev</span>
          </div>
          {kicker && <div style={{ display: 'flex', marginLeft: 16, fontSize: 24, color: TEAL_CLARO }}>{kicker}</div>}
        </div>
        <div
          style={{
            display: 'flex',
            maxWidth: 700,
            fontFamily: 'Display, sans-serif',
            fontSize: titleSize,
            fontWeight: 500,
            color: TINTA_CLARA,
            letterSpacing: '-0.04em',
            lineHeight: 1.02,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 700, marginTop: 26, fontSize: 32, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
          <div style={{ display: 'flex', color: APOIO }}>{muted}</div>
          <div style={{ display: 'flex', color: TINTA_CLARA }}>{strong}</div>
        </div>
      </div>
    ),
    // with no font file, next/og falls back to its own font (an empty list would leave it with none)
    { ...OG_SIZE, ...(fonts.length ? { fonts } : {}) },
  )
}
