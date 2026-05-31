'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Instagram, Mail, Terminal } from 'lucide-react'
import { useTypewriter } from '@/hooks/use-typewriter'

const socialLinks = [
  { icon: Github,    href: 'https://github.com/WillianCosta12',              label: 'GitHub'    },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/williancosta-dev/',  label: 'LinkedIn'  },
  { icon: Instagram, href: 'https://instagram.com/wcosta.dev',               label: 'Instagram' },
  { icon: Mail,      href: 'mailto:willacosta873@gmail.com',                 label: 'Email'     },
]

const techBadges = [
  { label: 'React', style: { left: '-15%', top: '8%' }, delay: 2.0, duration: 3.2 },
  { label: 'Spring Boot', style: { right: '-18%', top: '18%' }, delay: 2.2, duration: 3.6 },
  { label: 'PostgreSQL', style: { left: '-12%', bottom: '15%' }, delay: 2.4, duration: 2.8 },
  { label: 'N8N', style: { right: '-12%', bottom: '22%' }, delay: 2.6, duration: 3.4 },
]

const skillData = [
  { key: '"frontend"', value: '"React, Next.js, TypeScript"' },
  { key: '"backend"', value: '"Spring Boot, Node.js"' },
  { key: '"database"', value: '"PostgreSQL"' },
  { key: '"automation"', value: '"N8N, Make"' },
]

function TerminalLine({ delay, command }: { delay: number; command: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="text-xs font-mono"
    >
      <span className="text-[var(--accent)]">$ </span>
      <span className="text-foreground">{command}</span>
    </motion.p>
  )
}

function TerminalOutput({ delay, text, accent = false }: { delay: number; text: string; accent?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`text-xs font-mono ${accent ? 'text-[var(--accent)]' : 'text-muted-foreground'}`}
    >
      {text}
    </motion.p>
  )
}

function TerminalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-xl overflow-hidden shadow-2xl"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          willian@portfolio
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2.5 min-w-[280px]">
        <TerminalLine delay={1.2} command="whoami" />
        <TerminalOutput delay={1.5} text="willian-costa" accent />
        <TerminalLine delay={1.8} command="cat skills.json" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
          className="text-xs font-mono leading-relaxed"
        >
          <span className="text-[var(--accent)]">{'{'}</span>
          {skillData.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 + i * 0.15 }}
              className="ml-3"
            >
              <span className="text-purple-400">{item.key}</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-yellow-400/80">{item.value}</span>
              {i < skillData.length - 1 && (
                <span className="text-muted-foreground">,</span>
              )}
            </motion.div>
          ))}
          <span className="text-[var(--accent)]">{'}'}</span>
        </motion.div>
        <TerminalLine delay={3.2} command="git log --oneline -1" />
        <TerminalOutput delay={3.5} text="a1b2c3d ✓ portfolio redesign" accent />
        <div className="flex items-center gap-1 pt-1">
          <span className="text-[var(--accent)] text-xs font-mono">$</span>
          <span className="cursor" />
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const { displayText, isComplete } = useTypewriter({ text: 'Willian Costa', speed: 80, delay: 600 })
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const orb1Y = useTransform(scrollY, [0, 600], [0, -120])
  const orb2Y = useTransform(scrollY, [0, 600], [0, 60])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center relative overflow-hidden noise-overlay"
    >
      {/* Background orbs */}
      <motion.div
        className="gradient-orb top-1/3 -left-1/4"
        style={{ y: orb1Y }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="gradient-orb-2 bottom-0 right-0 translate-x-1/3 translate-y-1/3"
        style={{ y: orb2Y }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Mouse-tracking gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34,197,94,0.04) 0%, transparent 70%)`,
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="max-w-6xl mx-auto px-6 w-full py-32 relative z-10"
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* Left column — text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-[var(--accent)]"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[var(--accent)] text-sm font-mono font-medium tracking-widest uppercase">
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
              className="mb-6"
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0]">
                <span className="gradient-text">{displayText}</span>
                {!isComplete && <span className="cursor" />}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--accent)] text-primary-foreground font-semibold text-sm glow"
              >
                {t('hero.cta_projects')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-border text-foreground font-semibold text-sm hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-all"
              >
                {t('hero.cta_contact')}
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                  className="p-3 rounded-xl border border-border bg-card/50 text-muted-foreground hover:text-[var(--accent)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-muted)] transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — Terminal card (hidden on mobile via CSS) */}
          <div className="hidden lg:block relative">
            <TerminalCard />

            {/* Floating tech badges */}
            {techBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                className="absolute px-3 py-1.5 rounded-full bg-card/90 border border-border text-xs font-mono text-muted-foreground whitespace-nowrap pointer-events-none backdrop-blur-sm"
                style={badge.style}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: badge.delay, duration: 0.4 },
                  scale: { delay: badge.delay, duration: 0.4, type: 'spring', stiffness: 300 },
                  y: { delay: badge.delay + 0.5, duration: badge.duration, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {badge.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-[var(--accent)]"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
