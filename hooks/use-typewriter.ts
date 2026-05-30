'use client'

import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function useTypewriter({
  text,
  speed = 100,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayText('')
    setIsComplete(false)
    setIsTyping(false)

    const delayTimeout = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsTyping(false)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(delayTimeout)
  }, [text, speed, delay, onComplete])

  return { displayText, isTyping, isComplete }
}
