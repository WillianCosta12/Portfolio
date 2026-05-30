'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  isInView: boolean
}

export function AnimatedText({ text, className, delay = 0, isInView }: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
