'use client'

import { useEffect, useState } from 'react'

export function useCountUp(end: number, duration: number = 1500, isActive: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    let startTime: number | undefined
    const step = (timestamp: number) => {
      if (startTime === undefined) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, isActive])

  return count
}
