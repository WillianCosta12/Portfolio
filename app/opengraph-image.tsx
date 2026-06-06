import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Willian Costa — Full-stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#030303',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(38,38,38,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(38,38,38,0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '-200px',
            left: '-100px',
          }}
        />

        {/* Top — label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22C55E',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#22C55E',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Full-stack Developer · Natal, RN
          </span>
        </div>

        {/* Middle — name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          <div
            style={{
              fontSize: '96px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Willian
            <br />
            <span style={{ color: '#22C55E' }}>Costa</span>
          </div>
          <p
            style={{
              fontSize: '24px',
              color: '#A3A3A3',
              maxWidth: '600px',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Automações, integrações e desenvolvimento web para empresas que precisam sair do operacional manual.
          </p>
        </div>

        {/* Bottom — stack pills + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {['React', 'Spring Boot', 'Node.js', 'n8n', 'TypeScript'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: '14px',
                  padding: '6px 16px',
                  borderRadius: '99px',
                  border: '1px solid rgba(34,197,94,0.4)',
                  color: '#22C55E',
                  backgroundColor: 'rgba(34,197,94,0.12)',
                  fontFamily: 'monospace',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <span
            style={{
              fontSize: '18px',
              color: '#525252',
              fontFamily: 'monospace',
            }}
          >
            williancosta.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
