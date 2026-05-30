'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

const sections = ['hero', 'about', 'projects', 'contact']

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const currentLang = i18n.language === 'pt' ? 'pt' : 'en'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const toggleLang = (lang: 'pt' | 'en') => {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass border-b border-border/50' : ''
        }`}
      >
        <nav className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-base font-semibold tracking-tight text-foreground hover:text-[var(--accent)] transition-colors"
            >
              Willian Costa
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {t(`nav.${link.key}`)}
                  {activeSection === link.key && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--accent)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <div className="hidden sm:flex items-center gap-1 px-1 py-1 rounded-full bg-secondary">
                <button
                  onClick={() => toggleLang('pt')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    currentLang === 'pt'
                      ? 'bg-[var(--accent)] text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => toggleLang('en')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    currentLang === 'en'
                      ? 'bg-[var(--accent)] text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 text-[var(--accent)]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 text-[var(--accent)]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-card border-l border-border p-6 pt-20"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      activeSection === link.key
                        ? 'text-[var(--accent)]'
                        : 'text-foreground hover:text-[var(--accent)]'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                ))}

                {/* Mobile Language Toggle */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => toggleLang('pt')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentLang === 'pt'
                        ? 'bg-[var(--accent)] text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    Portugues
                  </button>
                  <button
                    onClick={() => toggleLang('en')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentLang === 'en'
                        ? 'bg-[var(--accent)] text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
