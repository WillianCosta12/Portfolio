'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

const navLinks = ['about', 'projects', 'contact']

export function Footer() {
  const { t } = useTranslation()
  const { ref, isInView } = useIntersectionObserver<HTMLElement>()
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <a
              href="#"
              className="font-display text-lg font-bold text-foreground hover:text-[var(--accent)] transition-colors"
            >
              Willian Costa
            </a>
            <p className="text-xs text-muted-foreground mt-1">{t('footer.made_with')}</p>
          </div>

          {/* Nav links */}
          <div className="flex gap-6">
            {navLinks.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-sm text-muted-foreground hover:text-[var(--accent)] transition-colors link-underline"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} {t('footer.rights')}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
