import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// o símbolo wcosta.dev em teal claro sobre o grafite
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0C1211' }}>
        <div style={{ width: 104, height: 104, borderRadius: '28px 0 28px 28px', backgroundColor: '#2DD4BF' }} />
      </div>
    ),
    { ...size },
  )
}
