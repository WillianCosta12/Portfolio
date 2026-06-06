'use client'

import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, Zap, Star } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

type ProjectStatus = 'done' | 'wip' | 'concept'
type StackCategory = 'frontend' | 'backend' | 'tools' | 'infra'

interface Project {
  id: string
  title: string
  subtitle: string
  subtitleEn?: string
  description: string
  descriptionEn?: string
  stack: { name: string; category: StackCategory }[]
  github?: string
  live?: string
  featured?: boolean
  status: ProjectStatus
  isAutomation?: boolean
  cover?: ComponentType
}

// ─── Covers ───────────────────────────────────────────────────────────────────

function JarvisCover() {
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="jr-orb" cx="71%" cy="44%" r="38%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0.22" />
          <stop offset="45%"  stopColor="#0077FF" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#0077FF" stopOpacity="0"    />
        </radialGradient>
        <radialGradient id="jr-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
        </radialGradient>
        <filter id="jr-blur">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      <rect width="380" height="240" fill="#0A0E1A" />
      <rect width="380" height="240" fill="url(#jr-orb)" />

      {/* Grid scan lines */}
      {[30,50,70,90,110,130,150,170,190,210,230].map((y) => (
        <line key={y} x1="0" y1={y} x2="380" y2={y} stroke="#00E5FF" strokeWidth="0.3" strokeOpacity="0.04" />
      ))}
      {[200,240,280,320,360].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="240" stroke="#00E5FF" strokeWidth="0.3" strokeOpacity="0.04" />
      ))}

      {/* HUD concentric rings */}
      <circle cx="272" cy="102" r="38"  fill="none" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.28" />
      <circle cx="272" cy="102" r="62"  fill="none" stroke="#00E5FF" strokeWidth="0.4" strokeOpacity="0.16" />
      <circle cx="272" cy="102" r="88"  fill="none" stroke="#00E5FF" strokeWidth="0.3" strokeOpacity="0.09" />
      <circle cx="272" cy="102" r="115" fill="none" stroke="#00E5FF" strokeWidth="0.2" strokeOpacity="0.06" />

      {/* HUD radial lines */}
      <line x1="272" y1="102" x2="340" y2="42"  stroke="#00E5FF" strokeWidth="0.4" strokeOpacity="0.18" />
      <line x1="272" y1="102" x2="350" y2="130" stroke="#00E5FF" strokeWidth="0.4" strokeOpacity="0.18" />
      <line x1="272" y1="102" x2="200" y2="160" stroke="#00E5FF" strokeWidth="0.4" strokeOpacity="0.12" />

      {/* Crosshair */}
      <line x1="254" y1="102" x2="290" y2="102" stroke="#00E5FF" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="272" y1="84"  x2="272" y2="120" stroke="#00E5FF" strokeWidth="0.7" strokeOpacity="0.5" />
      <circle cx="272" cy="102" r="3" fill="#00E5FF" fillOpacity="0.7" filter="url(#jr-blur)" />
      <circle cx="272" cy="102" r="1.5" fill="#00E5FF" />

      {/* Corner bracket marks */}
      <path d="M249,79 L249,74 L254,74" fill="none" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M295,79 L295,74 L290,74" fill="none" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M249,125 L249,130 L254,130" fill="none" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M295,125 L295,130 L290,130" fill="none" stroke="#00E5FF" strokeWidth="0.8" strokeOpacity="0.5" />

      {/* Top label */}
      <line x1="26" y1="28" x2="90"  y2="28" stroke="#1E4D6B" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#1E6B8A" textAnchor="middle" letterSpacing="3.5">AI · PERSONAL</text>
      <line x1="290" y1="28" x2="354" y2="28" stroke="#1E4D6B" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="160" fontFamily="'Space Grotesk',sans-serif" fontSize="72" fontWeight="900" fill="#D6EEF8" letterSpacing="-2">Jarvis</text>

      {/* Separator */}
      <line x1="26" y1="170" x2="170" y2="170" stroke="#00E5FF" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Subtitle */}
      <text x="26" y="188" fontFamily="'Courier New',monospace" fontSize="7.5" fill="#D6EEF8" letterSpacing="4.5">ASSISTENTE DE IA</text>

      {/* Stack */}
      <text x="26" y="215" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#2A6080" letterSpacing="1.5">Next.js · Supabase · pgvector · AI SDK · TypeScript</text>

      <rect width="380" height="240" fill="url(#jr-vig)" />
    </svg>
  )
}

function AutomacaoCover() {
  const nodes = [
    { cx: 60,  cy: 60  },
    { cx: 160, cy: 40  },
    { cx: 270, cy: 70  },
    { cx: 120, cy: 130 },
    { cx: 230, cy: 140 },
    { cx: 320, cy: 110 },
    { cx: 190, cy: 200 },
  ]
  const edges = [[0,1],[1,2],[0,3],[1,3],[1,4],[2,5],[3,4],[4,5],[4,6]]
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="at-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="at-glow" cx="50%" cy="30%" r="60%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#14B8A6" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0"    />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#080C0A" />
      <rect width="380" height="240" fill="url(#at-glow)" />

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="#14B8A6" strokeWidth="0.6" strokeOpacity="0.18"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="10" fill="#14B8A6" fillOpacity="0.07" stroke="#14B8A6" strokeWidth="0.6" strokeOpacity="0.35" />
          <circle cx={n.cx} cy={n.cy} r="3"  fill="#14B8A6" fillOpacity="0.6" />
        </g>
      ))}

      {/* Top label */}
      <line x1="26" y1="28" x2="80"  y2="28" stroke="#1A3D38" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#1A5C54" textAnchor="middle" letterSpacing="3">CASE REAL · PRODUÇÃO</text>
      <line x1="300" y1="28" x2="354" y2="28" stroke="#1A3D38" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="176" fontFamily="'Space Grotesk',sans-serif" fontSize="56" fontWeight="900" fill="#CBF0EB" letterSpacing="-1.5">Automação</text>

      {/* Separator */}
      <line x1="26" y1="184" x2="220" y2="184" stroke="#14B8A6" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Subtitle */}
      <text x="26" y="200" fontFamily="'Courier New',monospace" fontSize="7.5" fill="#CBF0EB" letterSpacing="3">CONTÁBIL &amp; JURÍDICA</text>

      {/* Stack */}
      <text x="26" y="222" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#1A5C54" letterSpacing="1.5">n8n · Make · integrações · APIs</text>

      <rect width="380" height="240" fill="url(#at-vig)" />
    </svg>
  )
}

function RivalRadarCover() {
  const cx = 290; const cy = 100
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="rr-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        {/* Sweep sector gradient */}
        <radialGradient id="rr-sweep" cx="76%" cy="42%" r="35%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#C6F24E" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C6F24E" stopOpacity="0"    />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#070A04" />

      {/* Radar rings */}
      {[30, 55, 80, 108, 138].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#C6F24E" strokeWidth="0.4" strokeOpacity={0.35 - r * 0.002} />
      ))}

      {/* Radial lines */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line key={deg}
            x1={cx} y1={cy}
            x2={cx + Math.cos(rad) * 138} y2={cy + Math.sin(rad) * 138}
            stroke="#C6F24E" strokeWidth="0.3" strokeOpacity="0.12"
          />
        )
      })}

      {/* Sweep sector */}
      <rect width="380" height="240" fill="url(#rr-sweep)" />

      {/* Sweep line */}
      <line x1={cx} y1={cy} x2={cx + 130} y2={cy - 50} stroke="#C6F24E" strokeWidth="0.8" strokeOpacity="0.55" />

      {/* Blip dots */}
      <circle cx={cx + 60} cy={cy - 28} r="2.5" fill="#C6F24E" fillOpacity="0.9" />
      <circle cx={cx - 40} cy={cy + 50} r="1.8" fill="#C6F24E" fillOpacity="0.6" />
      <circle cx={cx + 95} cy={cy + 35} r="2"   fill="#C6F24E" fillOpacity="0.75" />

      {/* Top label */}
      <line x1="26" y1="28" x2="80"  y2="28" stroke="#2D3B1A" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#4A6024" textAnchor="middle" letterSpacing="3">COMPETITIVE INTEL</text>
      <line x1="300" y1="28" x2="354" y2="28" stroke="#2D3B1A" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="152" fontFamily="'Space Grotesk',sans-serif" fontSize="54" fontWeight="900" fill="#EAF8C0" letterSpacing="-1.5">Rival</text>
      <text x="26" y="200" fontFamily="'Space Grotesk',sans-serif" fontSize="54" fontWeight="900" fill="#C6F24E" letterSpacing="-1.5">Radar</text>

      {/* Separator */}
      <line x1="26" y1="208" x2="140" y2="208" stroke="#C6F24E" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Stack */}
      <text x="26" y="226" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#4A6024" letterSpacing="1.5">Next.js · Supabase · agentes · automação</text>

      <rect width="380" height="240" fill="url(#rr-vig)" />
    </svg>
  )
}

function RivalRadarLPCover() {
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="rl-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="rl-glow" cx="70%" cy="40%" r="45%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#C6F24E" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#C6F24E" stopOpacity="0"    />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#070A04" />
      <rect width="380" height="240" fill="url(#rl-glow)" />

      {/* Browser frame */}
      <rect x="196" y="18" width="162" height="115" rx="5" fill="#0D1106" stroke="#C6F24E" strokeWidth="0.5" strokeOpacity="0.22" />
      <rect x="196" y="18" width="162" height="15" rx="5" fill="#C6F24E" fillOpacity="0.06" />
      <line x1="196" y1="33" x2="358" y2="33" stroke="#C6F24E" strokeWidth="0.4" strokeOpacity="0.18" />
      {/* Traffic lights */}
      <circle cx="207" cy="25.5" r="2.5" fill="#C6F24E" fillOpacity="0.3" />
      <circle cx="215" cy="25.5" r="2.5" fill="#C6F24E" fillOpacity="0.18" />
      <circle cx="223" cy="25.5" r="2.5" fill="#C6F24E" fillOpacity="0.1" />
      {/* URL bar */}
      <rect x="233" y="21" width="115" height="9" rx="2" fill="#C6F24E" fillOpacity="0.07" stroke="#C6F24E" strokeWidth="0.3" strokeOpacity="0.15" />
      <text x="290" y="27.5" fontFamily="'Courier New',monospace" fontSize="4.8" fill="#C6F24E" fillOpacity="0.35" textAnchor="middle">rival-radar-lp.vercel.app</text>

      {/* LP content — hero headline */}
      <rect x="208" y="42" width="130" height="9"  rx="2" fill="#C6F24E" fillOpacity="0.28" />
      <rect x="208" y="55" width="100" height="6"  rx="2" fill="#C6F24E" fillOpacity="0.12" />
      <rect x="208" y="64" width="114" height="6"  rx="2" fill="#C6F24E" fillOpacity="0.08" />
      {/* Email input + CTA button */}
      <rect x="208" y="80" width="84"  height="13" rx="3" fill="none" stroke="#C6F24E" strokeWidth="0.5" strokeOpacity="0.25" />
      <rect x="297" y="80" width="51"  height="13" rx="3" fill="#C6F24E" fillOpacity="0.2" stroke="#C6F24E" strokeWidth="0.5" strokeOpacity="0.4" />
      <text x="322" y="88.5" fontFamily="'Courier New',monospace" fontSize="5" fill="#C6F24E" fillOpacity="0.7" textAnchor="middle">ENTRAR</text>
      {/* Social proof bar */}
      <line x1="208" y1="105" x2="348" y2="105" stroke="#C6F24E" strokeWidth="0.3" strokeOpacity="0.12" />
      <rect x="208" y="109" width="62" height="5" rx="1.5" fill="#C6F24E" fillOpacity="0.1" />
      <rect x="278" y="109" width="50" height="5" rx="1.5" fill="#C6F24E" fillOpacity="0.07" />

      {/* Top label */}
      <line x1="26" y1="28" x2="80"  y2="28" stroke="#2D3B1A" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#4A6024" textAnchor="middle" letterSpacing="3">LANDING PAGE · LIVE</text>
      <line x1="300" y1="28" x2="354" y2="28" stroke="#2D3B1A" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="158" fontFamily="'Space Grotesk',sans-serif" fontSize="40" fontWeight="900" fill="#EAF8C0" letterSpacing="-1">Rival</text>
      <text x="26" y="194" fontFamily="'Space Grotesk',sans-serif" fontSize="40" fontWeight="900" fill="#C6F24E" letterSpacing="-1">Radar</text>
      <text x="26" y="212" fontFamily="'Courier New',monospace" fontSize="7" fill="#C6F24E" fillOpacity="0.55" letterSpacing="3">/ LANDING PAGE</text>

      {/* Separator */}
      <line x1="26" y1="220" x2="148" y2="220" stroke="#C6F24E" strokeWidth="0.4" strokeOpacity="0.35" />

      {/* Stack */}
      <text x="26" y="233" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#4A6024" letterSpacing="1.5">Next.js 15 · Supabase · Resend · Vercel</text>

      <rect width="380" height="240" fill="url(#rl-vig)" />
    </svg>
  )
}

function ClubeCafeCover() {
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="cc-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="cc-glow" cx="70%" cy="40%" r="50%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#D97706" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0"    />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#100806" />
      <rect width="380" height="240" fill="url(#cc-glow)" />

      {/* Coffee bean (right side) — two ellipses forming the bean shape */}
      <ellipse cx="285" cy="110" rx="52" ry="72" fill="none" stroke="#D97706" strokeWidth="0.7" strokeOpacity="0.22" />
      <ellipse cx="285" cy="110" rx="35" ry="52" fill="none" stroke="#D97706" strokeWidth="0.5" strokeOpacity="0.14" />
      {/* Center groove */}
      <path d="M285,40 C268,60 268,90 285,110 C302,130 302,160 285,180" fill="none" stroke="#D97706" strokeWidth="0.6" strokeOpacity="0.28" />

      {/* Steam wisps */}
      <path d="M260,32 C258,22 264,16 262,6" fill="none" stroke="#E8D5B0" strokeWidth="0.8" strokeOpacity="0.2" strokeLinecap="round" />
      <path d="M285,28 C283,18 289,12 287,2"  fill="none" stroke="#E8D5B0" strokeWidth="0.8" strokeOpacity="0.2" strokeLinecap="round" />
      <path d="M310,34 C308,24 314,18 312,8"  fill="none" stroke="#E8D5B0" strokeWidth="0.8" strokeOpacity="0.2" strokeLinecap="round" />

      {/* Top label */}
      <line x1="26" y1="28" x2="70"  y2="28" stroke="#3D2010" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#7A4820" textAnchor="middle" letterSpacing="3">CAFÉ ESPECIAL · ASSINATURA</text>
      <line x1="310" y1="28" x2="354" y2="28" stroke="#3D2010" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="130" fontFamily="'Space Grotesk',sans-serif" fontSize="38" fontWeight="900" fill="#E8D5B0" letterSpacing="-0.5">Clube de</text>
      <text x="26" y="178" fontFamily="'Space Grotesk',sans-serif" fontSize="52" fontWeight="900" fill="#D97706" letterSpacing="-1">Café</text>

      {/* Separator */}
      <line x1="26" y1="187" x2="140" y2="187" stroke="#D97706" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Subtitle */}
      <text x="26" y="203" fontFamily="'Courier New',monospace" fontSize="7.5" fill="#E8D5B0" letterSpacing="3.5">CAFÉ DE ORIGEM</text>

      {/* Stack */}
      <text x="26" y="224" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#7A4820" letterSpacing="1.5">Next.js · Supabase · Stripe · Pix</text>

      <rect width="380" height="240" fill="url(#cc-vig)" />
    </svg>
  )
}

function MEIfaturaCover() {
  const qx = 244; const qy = 30; const s = 8
  const pattern = [
    [0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2],
    [5,0],[6,0],[7,0],[5,1],[7,1],[5,2],[6,2],[7,2],
    [0,5],[1,5],[2,5],[0,6],[2,6],[0,7],[1,7],[2,7],
    [4,4],[5,4],[4,5],[6,6],[7,6],[6,7],
    [3,2],[3,3],[4,3],[5,3],[4,1],
  ]
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="mf-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="mf-glow" cx="75%" cy="45%" r="45%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#32BCAD" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#32BCAD" stopOpacity="0"    />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#060D09" />
      <rect width="380" height="240" fill="url(#mf-glow)" />

      {/* QR code pattern (decorative) */}
      {pattern.map(([col, row], i) => (
        <rect key={i}
          x={qx + col * s} y={qy + row * s}
          width={s - 0.8} height={s - 0.8}
          fill="#32BCAD" fillOpacity="0.22"
          rx="0.5"
        />
      ))}
      {/* QR outer border */}
      <rect x={qx} y={qy} width={s * 8} height={s * 8} fill="none" stroke="#32BCAD" strokeWidth="0.5" strokeOpacity="0.2" />

      {/* Top label */}
      <line x1="26" y1="28" x2="70"  y2="28" stroke="#0E3028" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#185C4A" textAnchor="middle" letterSpacing="3">MEI · AUTÔNOMO · FREELANCER</text>
      <line x1="310" y1="28" x2="354" y2="28" stroke="#0E3028" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="145" fontFamily="'Space Grotesk',sans-serif" fontSize="78" fontWeight="900" fill="#D0F5F1" letterSpacing="-2">MEI</text>
      <text x="28" y="190" fontFamily="'Space Grotesk',sans-serif" fontSize="38" fontWeight="700" fill="#32BCAD" letterSpacing="-0.5">fatura</text>

      {/* Separator */}
      <line x1="26" y1="197" x2="130" y2="197" stroke="#32BCAD" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Stack */}
      <text x="26" y="218" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#185C4A" letterSpacing="1.5">Next.js · Supabase · Pix API · TypeScript</text>

      <rect width="380" height="240" fill="url(#mf-vig)" />
    </svg>
  )
}

function RuleSyncCover() {
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="rs-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#050505" />

      {/* Large background brackets */}
      <text x="200" y="220" fontFamily="'Courier New',monospace" fontSize="230" fontWeight="900" fill="#22C55E" fillOpacity="0.04" textAnchor="middle">{'{}'}</text>

      {/* Diff lines (code diff aesthetic) */}
      <rect x="26" y="52" width="140" height="8" rx="2" fill="#22C55E" fillOpacity="0.12" />
      <text x="30" y="59" fontFamily="'Courier New',monospace" fontSize="6" fill="#22C55E" fillOpacity="0.5">+ CLAUDE.md synced</text>
      <rect x="26" y="66" width="120" height="8" rx="2" fill="#ef4444" fillOpacity="0.08" />
      <text x="30" y="73" fontFamily="'Courier New',monospace" fontSize="6" fill="#ef4444" fillOpacity="0.4">- AGENTS.md drift detected</text>
      <rect x="26" y="80" width="130" height="8" rx="2" fill="#22C55E" fillOpacity="0.12" />
      <text x="30" y="87" fontFamily="'Courier New',monospace" fontSize="6" fill="#22C55E" fillOpacity="0.5">+ .cursor/rules updated</text>
      <rect x="26" y="94" width="100" height="8" rx="2" fill="#3b82f6" fillOpacity="0.08" />
      <text x="30" y="101" fontFamily="'Courier New',monospace" fontSize="6" fill="#3b82f6" fillOpacity="0.4">~ AGENTS.md re-synced</text>

      {/* Top label */}
      <line x1="26" y1="28" x2="70"  y2="28" stroke="#1a3a1a" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#2d5e2d" textAnchor="middle" letterSpacing="3">DEV TOOLS · OPEN-CORE</text>
      <line x1="310" y1="28" x2="354" y2="28" stroke="#1a3a1a" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="162" fontFamily="'Space Grotesk',sans-serif" fontSize="48" fontWeight="900" fill="#D4F5D4" letterSpacing="-1">rule</text>
      <text x="26" y="208" fontFamily="'Space Grotesk',sans-serif" fontSize="48" fontWeight="900" fill="#22C55E" letterSpacing="-1">sync</text>

      {/* Separator */}
      <line x1="26" y1="216" x2="110" y2="216" stroke="#22C55E" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Stack */}
      <text x="26" y="232" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#2d5e2d" letterSpacing="1.5">Node.js · TypeScript · CLI</text>

      <rect width="380" height="240" fill="url(#rs-vig)" />
    </svg>
  )
}

function EditalFlashCover() {
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="ef-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="ef-glow" cx="72%" cy="38%" r="50%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#F59E0B" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"   />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#050A14" />
      <rect width="380" height="240" fill="url(#ef-glow)" />

      {/* Stacked flashcard shapes */}
      <rect x="218" y="42" width="120" height="80" rx="6" fill="none" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.12"
        transform="rotate(-8 278 82)" />
      <rect x="218" y="42" width="120" height="80" rx="6" fill="none" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.18"
        transform="rotate(-3 278 82)" />
      <rect x="218" y="42" width="120" height="80" rx="6" fill="#F59E0B" fillOpacity="0.05" stroke="#F59E0B" strokeWidth="0.7" strokeOpacity="0.3" />
      {/* Lines on top card */}
      <line x1="232" y1="65" x2="322" y2="65" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.25" />
      <line x1="232" y1="75" x2="310" y2="75" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.18" />
      <line x1="232" y1="85" x2="295" y2="85" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Lightning bolt */}
      <path d="M298,36 L286,62 L296,62 L284,88 L310,56 L298,56 Z"
        fill="#F59E0B" fillOpacity="0.6" stroke="#F59E0B" strokeWidth="0.5" />

      {/* Top label */}
      <line x1="26" y1="28" x2="70"  y2="28" stroke="#3B2E08" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#6B5218" textAnchor="middle" letterSpacing="3">REPETIÇÃO ESPAÇADA · EDITAL</text>
      <line x1="310" y1="28" x2="354" y2="28" stroke="#3B2E08" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="156" fontFamily="'Space Grotesk',sans-serif" fontSize="52" fontWeight="900" fill="#FEF3C7" letterSpacing="-1.2">Edital</text>
      <text x="26" y="204" fontFamily="'Space Grotesk',sans-serif" fontSize="52" fontWeight="900" fill="#F59E0B" letterSpacing="-1.2">Flash</text>

      {/* Separator */}
      <line x1="26" y1="212" x2="130" y2="212" stroke="#F59E0B" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Stack */}
      <text x="26" y="230" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#6B5218" letterSpacing="1.5">Next.js · Supabase · embeddings · RAG</text>

      <rect width="380" height="240" fill="url(#ef-vig)" />
    </svg>
  )
}

function NormaWatchCover() {
  const pulsePoints = "80,108 100,108 112,88 124,128 136,98 148,118 160,108 180,108"
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="nw-vig" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="nw-glow" cx="65%" cy="42%" r="45%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#F97316" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0"    />
        </radialGradient>
      </defs>

      <rect width="380" height="240" fill="#0A0B0E" />
      <rect width="380" height="240" fill="url(#nw-glow)" />

      {/* Document outline (right side) */}
      <rect x="240" y="28" width="106" height="140" rx="4" fill="none" stroke="#F97316" strokeWidth="0.6" strokeOpacity="0.2" />
      {/* Dog-ear fold */}
      <path d="M318,28 L346,56 L318,56 Z" fill="#F97316" fillOpacity="0.06" stroke="#F97316" strokeWidth="0.4" strokeOpacity="0.2" />
      <path d="M318,28 L346,56" fill="none" stroke="#F97316" strokeWidth="0.5" strokeOpacity="0.25" />
      {/* Document lines */}
      {[72, 86, 100, 114, 128, 142].map((y) => (
        <line key={y} x1="256" y1={y} x2={y === 72 ? 328 : y < 120 ? 340 : 310} y2={y}
          stroke="#F97316" strokeWidth="0.5" strokeOpacity="0.18" />
      ))}
      {/* Alert badge */}
      <circle cx="346" cy="158" r="12" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="0.6" strokeOpacity="0.4" />
      <text x="346" y="162" fontFamily="'Courier New',monospace" fontSize="10" fontWeight="900" fill="#F97316" textAnchor="middle">!</text>

      {/* Pulse wave */}
      <polyline points={pulsePoints} fill="none" stroke="#F97316" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80"  cy="108" r="2" fill="#F97316" fillOpacity="0.5" />
      <circle cx="180" cy="108" r="2" fill="#F97316" fillOpacity="0.5" />

      {/* Top label */}
      <line x1="26" y1="28" x2="70"  y2="28" stroke="#3B2010" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="#6B3A14" textAnchor="middle" letterSpacing="3">MONITORAMENTO REGULATÓRIO</text>
      <line x1="310" y1="28" x2="354" y2="28" stroke="#3B2010" strokeWidth="0.5" />

      {/* Title */}
      <text x="26" y="160" fontFamily="'Space Grotesk',sans-serif" fontSize="52" fontWeight="900" fill="#FDE8D8" letterSpacing="-1.2">Norma</text>
      <text x="26" y="206" fontFamily="'Space Grotesk',sans-serif" fontSize="52" fontWeight="900" fill="#F97316" letterSpacing="-1.2">Watch</text>

      {/* Separator */}
      <line x1="26" y1="214" x2="148" y2="214" stroke="#F97316" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Stack */}
      <text x="26" y="232" fontFamily="'Courier New',monospace" fontSize="5.5" fill="#6B3A14" letterSpacing="1.5">Next.js · RAG · scraping · n8n</text>

      <rect width="380" height="240" fill="url(#nw-vig)" />
    </svg>
  )
}

function StephenKingCover() {
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="sk-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" seed="7" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" />
        </filter>
        <radialGradient id="sk-vignette" cx="50%" cy="50%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="35%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="sk-glow" cx="50%" cy="0%" r="60%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="rgb(139,28,28)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="rgb(139,28,28)" stopOpacity="0"    />
        </radialGradient>
      </defs>
      <rect width="380" height="240" fill="#0C0C0C" />
      <rect width="380" height="240" fill="url(#sk-glow)" />
      <text x="356" y="232" fontFamily="Georgia,serif" fontSize="196" fontWeight="900" fill="rgb(22,22,22)" textAnchor="end">85</text>
      <line x1="26" y1="28" x2="104" y2="28" stroke="rgb(110,104,95)" strokeWidth="0.5" />
      <text x="190" y="32" fontFamily="'Courier New',monospace" fontSize="6" fill="rgb(110,104,95)" textAnchor="middle" letterSpacing="3.5">CONSTANT READER</text>
      <line x1="276" y1="28" x2="354" y2="28" stroke="rgb(110,104,95)" strokeWidth="0.5" />
      <text x="28" y="108" fontFamily="Georgia,'Times New Roman',serif" fontSize="52" fontWeight="900" fontStyle="italic" fill="rgb(226,222,213)" letterSpacing="-0.5">Stephen</text>
      <text x="26" y="168" fontFamily="Georgia,'Times New Roman',serif" fontSize="70" fontWeight="900" fontStyle="italic" fill="rgb(180,44,44)" letterSpacing="-1">King</text>
      <line x1="26" y1="177" x2="180" y2="177" stroke="rgb(139,28,28)" strokeWidth="0.7" strokeOpacity="0.6" />
      <text x="26" y="197" fontFamily="'Courier New',monospace" fontSize="8" fill="rgb(226,222,213)" letterSpacing="5">CHECKLIST DO LEITOR</text>
      <text x="26" y="219" fontFamily="'Courier New',monospace" fontSize="5.5" fill="rgb(110,104,95)" letterSpacing="1.5">Next.js · Supabase · TypeScript · Framer Motion</text>
      <rect width="380" height="240" filter="url(#sk-noise)" opacity="0.05" />
      <rect width="380" height="240" fill="url(#sk-vignette)" />
    </svg>
  )
}

// ─── Projects Data ────────────────────────────────────────────────────────────

const projects: Project[] = [
  // ── DESTAQUE ──────────────────────────────────────────────────────────────
  {
    id: 'jarvis',
    title: 'Jarvis',
    subtitle: 'Assistente de IA pessoal',
    subtitleEn: 'Personal AI assistant',
    description:
      'Web app de assistente pessoal com IA. Centraliza e-mail, agenda, tarefas, finanças e estudo num painel inteligente. Arquitetura com RAG (pgvector), human-in-the-loop em ações sensíveis e RLS por usuário para garantir que zero PII chega ao LLM.',
    descriptionEn:
      'Personal AI assistant web app. Centralizes email, calendar, tasks, finances and study in one smart dashboard. Architecture with RAG (pgvector), human-in-the-loop on sensitive actions and row-level security so zero PII reaches the LLM.',
    stack: [
      { name: 'Next.js 15',     category: 'frontend' },
      { name: 'TypeScript',     category: 'frontend' },
      { name: 'Tailwind CSS',   category: 'frontend' },
      { name: 'Vercel AI SDK',  category: 'frontend' },
      { name: 'Supabase',       category: 'backend'  },
      { name: 'pgvector',       category: 'backend'  },
      { name: 'RAG',            category: 'tools'    },
    ],
    github: '#',
    live: '#',
    featured: true,
    status: 'wip',
    cover: JarvisCover,
  },

  // ── GRID ──────────────────────────────────────────────────────────────────
  {
    id: 'automacao-contabil',
    title: 'Automação Contábil & Jurídica',
    subtitle: 'Case real em produção',
    subtitleEn: 'Real case in production',
    description:
      'Projeto e deploy de automações n8n/Make em dois escritórios — contabilidade e direito. Integração entre ERPs, planilhas e ferramentas fiscais; eliminação de work manual recorrente. Resultados: processos que levavam horas reduzidos a minutos.',
    descriptionEn:
      'Design and deployment of n8n/Make automations across two offices — accounting and law. Integration between ERPs, spreadsheets and fiscal tools; elimination of recurring manual work. Outcome: multi-hour processes cut to minutes.',
    stack: [
      { name: 'n8n',         category: 'tools'   },
      { name: 'Make',        category: 'tools'   },
      { name: 'APIs REST',   category: 'backend' },
      { name: 'Automação',   category: 'tools'   },
    ],
    github: undefined,
    live: undefined,
    featured: false,
    status: 'done',
    isAutomation: true,
    cover: AutomacaoCover,
  },
  {
    id: 'rival-radar-lp',
    title: 'RivalRadar — Landing Page',
    subtitle: 'Landing page de validação de produto',
    subtitleEn: 'Product validation landing page',
    description:
      'Landing page de captação de leads com 13 seções construída do zero: radar animado (requestAnimationFrame), spotlight cards com mouse tracking, dashboard admin protegido com export CSV, notificações Resend + Slack a cada cadastro, A/B test de headline via Plausible e OG image dinâmica com next/og. Backend com validação Zod e Supabase RLS.',
    descriptionEn:
      'Lead-capture landing page with 13 sections built from scratch: animated radar (requestAnimationFrame), spotlight cards with mouse tracking, protected admin dashboard with CSV export, Resend + Slack notifications per signup, headline A/B test via Plausible and dynamic OG image with next/og. Backend with Zod validation and Supabase RLS.',
    stack: [
      { name: 'Next.js 15',   category: 'frontend' },
      { name: 'TypeScript',   category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Supabase',     category: 'backend'  },
      { name: 'Resend',       category: 'backend'  },
      { name: 'Vercel',       category: 'infra'    },
    ],
    github: 'https://github.com/WillianCosta12/Landing-Page---Rival-Radar',
    live: 'https://rival-radar-lp.vercel.app',
    featured: false,
    status: 'done',
    cover: RivalRadarLPCover,
  },
  {
    id: 'rival-radar',
    title: 'RivalRadar',
    subtitle: 'Inteligência competitiva automática',
    subtitleEn: 'Automated competitive intelligence',
    description:
      'Agente que varre changelog, Product Hunt e preços dos concorrentes toda semana e entrega um diff acionável por e-mail/Slack. Landing já no ar como smoke test de demanda.',
    descriptionEn:
      'Agent that scans changelogs, Product Hunt and competitor pricing weekly, delivering an actionable diff via email/Slack. Landing page live as demand smoke test.',
    stack: [
      { name: 'Next.js',     category: 'frontend' },
      { name: 'TypeScript',  category: 'frontend' },
      { name: 'Supabase',    category: 'backend'  },
      { name: 'Agentes',     category: 'tools'    },
      { name: 'Automação',   category: 'tools'    },
    ],
    github: '#',
    live: '#',
    featured: false,
    status: 'wip',
    cover: RivalRadarCover,
  },
  {
    id: 'clube-cafe',
    title: 'Clube de Café',
    subtitle: 'E-commerce de café especial',
    subtitleEn: 'Specialty coffee e-commerce',
    description:
      'E-commerce completo com catálogo, carrinho, checkout (Pix + Stripe), painel admin e billing recorrente para clube de assinatura de cafés especiais brasileiros.',
    descriptionEn:
      'Full e-commerce with catalog, cart, checkout (Pix + Stripe), admin panel and recurring billing for a Brazilian specialty coffee subscription club.',
    stack: [
      { name: 'Next.js',     category: 'frontend' },
      { name: 'TypeScript',  category: 'frontend' },
      { name: 'Tailwind CSS',category: 'frontend' },
      { name: 'Supabase',    category: 'backend'  },
      { name: 'Stripe',      category: 'backend'  },
      { name: 'Pix',         category: 'backend'  },
    ],
    github: '#',
    live: '#',
    featured: false,
    status: 'wip',
    cover: ClubeCafeCover,
  },
  {
    id: 'stephen-king',
    title: 'Stephen King',
    subtitle: 'Checklist do Leitor',
    subtitleEn: 'Reader Checklist',
    description:
      'Aplicação full-stack para fãs acompanharem sua leitura da obra completa do Stephen King. 85 títulos, progresso por usuário, sistema de badges de conquistas e animações detalhadas.',
    descriptionEn:
      "Full-stack app for fans to track their reading of Stephen King's complete works. 85 titles, per-user progress, achievement badge system and detailed animations.",
    stack: [
      { name: 'Next.js 15',    category: 'frontend' },
      { name: 'TypeScript',    category: 'frontend' },
      { name: 'Tailwind CSS',  category: 'frontend' },
      { name: 'Framer Motion', category: 'frontend' },
      { name: 'Supabase',      category: 'backend'  },
    ],
    github: '#',
    live: '#',
    featured: false,
    status: 'wip',
    cover: StephenKingCover,
  },
  {
    id: 'meifatura',
    title: 'MEIfatura',
    subtitle: 'Cobrança com Pix em segundos',
    subtitleEn: 'Pix invoicing in seconds',
    description:
      'Gera fatura com QR de Pix, envia por WhatsApp e acompanha pagamento em tempo real. Pensado para a realidade do MEI e autônomo brasileiro — sem burocracia.',
    descriptionEn:
      'Generates an invoice with Pix QR code, sends via WhatsApp and tracks payment in real time. Designed for Brazilian freelancers and solo founders — zero red tape.',
    stack: [
      { name: 'Next.js',    category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Supabase',   category: 'backend'  },
      { name: 'API Pix',    category: 'backend'  },
    ],
    github: '#',
    live: '#',
    featured: false,
    status: 'concept',
    cover: MEIfaturaCover,
  },
  {
    id: 'rulesync',
    title: 'rulesync',
    subtitle: 'Uma fonte de verdade para configs de agentes',
    subtitleEn: 'Single source of truth for agent configs',
    description:
      'CLI que gera, sincroniza e faz lint dos arquivos de regra de agentes (CLAUDE.md, AGENTS.md, .cursor/rules), detectando drift entre eles antes que quebre o contexto dos seus agentes.',
    descriptionEn:
      'CLI that generates, syncs and lints agent rule files (CLAUDE.md, AGENTS.md, .cursor/rules), detecting drift before it breaks your agent context.',
    stack: [
      { name: 'Node.js',    category: 'backend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'CLI',        category: 'tools'   },
    ],
    github: '#',
    live: '#',
    featured: false,
    status: 'concept',
    cover: RuleSyncCover,
  },
  {
    id: 'editalflash',
    title: 'EditalFlash',
    subtitle: 'Flashcards de concurso com repetição espaçada',
    subtitleEn: 'Exam flashcards with spaced repetition',
    description:
      'Transforma PDF/aula/edital em flashcards e quizzes organizados pelos tópicos do edital, com agendamento de revisão espaçada baseado em embeddings.',
    descriptionEn:
      'Converts PDFs, lectures and exam notices into flashcards and quizzes organized by topic, with spaced review scheduling powered by embeddings.',
    stack: [
      { name: 'Next.js',    category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Supabase',   category: 'backend'  },
      { name: 'Embeddings', category: 'tools'    },
      { name: 'RAG',        category: 'tools'    },
    ],
    github: '#',
    live: '#',
    featured: false,
    status: 'concept',
    cover: EditalFlashCover,
  },
  {
    id: 'normawatch',
    title: 'NormaWatch',
    subtitle: 'Vigia de mudanças regulatórias',
    subtitleEn: 'Regulatory change monitor',
    description:
      'Monitora fontes oficiais de nicho (contabilidade, direito), detecta o que mudou e alerta com um resumo acionável de "o que mudou e o que fazer".',
    descriptionEn:
      'Monitors official niche sources (accounting, law), detects what changed and sends an actionable alert summarizing "what changed and what to do".',
    stack: [
      { name: 'Next.js',   category: 'frontend' },
      { name: 'Python',    category: 'backend'  },
      { name: 'RAG',       category: 'tools'    },
      { name: 'n8n',       category: 'tools'    },
      { name: 'Scraping',  category: 'tools'    },
    ],
    github: '#',
    live: '#',
    featured: false,
    status: 'concept',
    cover: NormaWatchCover,
  },
]

// ─── Styles ───────────────────────────────────────────────────────────────────

const stackColors: Record<StackCategory, string> = {
  frontend: 'bg-[var(--accent-muted)] text-[var(--accent)] border-[var(--accent-border)]',
  backend:  'bg-purple-500/10 text-purple-400 border-purple-500/30',
  tools:    'bg-amber-500/10 text-amber-400 border-amber-500/30',
  infra:    'bg-secondary text-muted-foreground border-border',
}

const statusConfig: Record<ProjectStatus, { key: string; className: string }> = {
  done:    { key: 'projects.done',    className: 'bg-[var(--accent-muted)] text-[var(--accent)] border-[var(--accent-border)]'      },
  wip:     { key: 'projects.wip',     className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'                           },
  concept: { key: 'projects.concept', className: 'bg-secondary text-muted-foreground border-border'                                },
}

// ─── KanbanMockup (generic fallback) ─────────────────────────────────────────

function KanbanMockup() {
  const cols = [
    { label: 'To Do',       items: 2 },
    { label: 'In Progress', items: 3, accent: true },
    { label: 'Done',        items: 2 },
  ]
  return (
    <div className="grid grid-cols-3 gap-2 p-4 h-full min-h-[180px] rounded-xl bg-card/50">
      {cols.map((col) => (
        <div key={col.label} className="flex flex-col gap-2">
          <div className="text-[10px] font-mono text-muted-foreground px-2 pb-1.5 border-b border-border truncate">
            {col.label}
          </div>
          {[...Array(col.items)].map((_, j) => (
            <div
              key={j}
              className={`h-7 rounded-md border ${
                j === 0 && col.accent
                  ? 'bg-[var(--accent-muted)] border-[var(--accent-border)]'
                  : 'bg-secondary border-border'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── FeaturedCard ─────────────────────────────────────────────────────────────

function FeaturedCard({ project, isInView }: { project: Project; isInView: boolean }) {
  const { t, i18n } = useTranslation()
  const isEn    = i18n.language === 'en'
  const desc    = isEn && project.descriptionEn ? project.descriptionEn : project.description
  const sub     = isEn && project.subtitleEn    ? project.subtitleEn    : project.subtitle
  const Cover   = project.cover

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), { stiffness: 300, damping: 30 })

  const isClickable = project.status === 'done' && !!project.live && project.live !== '#'
  const handleCardClick = () => {
    if (isClickable && project.live) window.open(project.live, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onClick={isClickable ? handleCardClick : undefined}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`project-card group rounded-2xl border border-border bg-card hover:border-[var(--accent-border)] transition-all duration-300 overflow-hidden ${isClickable ? 'cursor-pointer' : ''}`}
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
        {/* Cover side */}
        <div className={`lg:border-r border-border overflow-hidden min-h-[240px] bg-black ${Cover ? '' : 'p-6'}`}>
          {Cover ? <Cover /> : <KanbanMockup />}
        </div>

        {/* Content side */}
        <div className="p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent-border)] text-xs font-semibold">
                <Star className="w-3 h-3 fill-current" />
                {t('projects.featured_badge')}
              </span>
              <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusConfig[project.status].className}`}>
                {t(statusConfig[project.status].key)}
              </span>
            </div>

            <p className="text-[var(--accent)] text-xs font-mono font-medium mb-1">{sub}</p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5">{desc}</p>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech.name} className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${stackColors[tech.category]}`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border/50">
            {project.github && project.github !== '#' && (
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[var(--accent)] transition-colors">
                <Github className="w-4 h-4" />{t('projects.github')}
              </motion.a>
            )}
            {project.live && project.live !== '#' && (
              <motion.a href={project.live} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[var(--accent)] transition-colors">
                <ExternalLink className="w-4 h-4" />{t('projects.live')}
              </motion.a>
            )}
            <ArrowUpRight className="w-4 h-4 text-[var(--accent)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const { t, i18n } = useTranslation()
  const isEn  = i18n.language === 'en'
  const desc  = isEn && project.descriptionEn ? project.descriptionEn : project.description
  const sub   = isEn && project.subtitleEn    ? project.subtitleEn    : project.subtitle
  const Cover = project.cover

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 })

  const isAuto = !!project.isAutomation
  const isClickable = project.status === 'done' && !!project.live && project.live !== '#'
  const handleCardClick = () => {
    if (isClickable && project.live) window.open(project.live, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onClick={isClickable ? handleCardClick : undefined}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`project-card group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
        isAuto
          ? 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40'
          : 'border-border bg-card hover:border-[var(--accent-border)]'
      } ${isClickable ? 'cursor-pointer' : ''}`}
    >
      {/* Cover thumbnail */}
      {Cover && (
        <div className="border-b border-border/50 overflow-hidden bg-black" style={{ height: 180 }}>
          <Cover />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 gap-0">
        {/* Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {isAuto && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-medium">
                <Zap className="w-3 h-3" />{t('projects.case_study_label')}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${statusConfig[project.status].className}`}>
              {t(statusConfig[project.status].key)}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </div>

        <p className="text-[var(--accent)] text-xs font-mono mb-1">{sub}</p>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{desc}</p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech.name} className={`px-2 py-0.5 rounded-md border text-xs font-medium ${stackColors[tech.category]}`}>
              {tech.name}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md border text-xs font-medium bg-secondary text-muted-foreground border-border">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          {project.github && project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[var(--accent)] transition-colors">
              <Github className="w-3.5 h-3.5" />{t('projects.github')}
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[var(--accent)] transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />{t('projects.live')}
            </a>
          )}
          {isAuto && (
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <Zap className="w-3.5 h-3.5" />{t('projects.view_case')}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Projects() {
  const { t } = useTranslation()
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({ threshold: 0.05 })

  const featuredProject = projects.find((p) => p.featured)
  const gridProjects    = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 relative section-projects-bg">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[var(--accent)] text-sm font-medium mb-3">{t('projects.label')}</p>
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground"
          >
            {t('projects.title')}
          </motion.h2>
        </motion.div>

        {/* Featured */}
        {featuredProject && (
          <div className="mb-6">
            <FeaturedCard project={featuredProject} isInView={isInView} />
          </div>
        )}

        {/* Grid */}
        {gridProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
