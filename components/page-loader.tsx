'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('portfolio-loaded')
    if (hasLoaded) {
      setLoading(false)
      return
    }
    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('portfolio-loaded', '1')
    }, 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#030303]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="font-display text-4xl font-bold text-[var(--accent)]">WC</span>
            <div className="w-32 h-[2px] bg-[var(--border)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent)] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
