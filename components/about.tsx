'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, MapPin, Zap, Code2, Briefcase, TrendingUp } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { useCountUp } from '@/hooks/use-count-up'

const skills = [
  { name: 'React',         category: 'frontend' },
  { name: 'TypeScript',    category: 'frontend' },
  { name: 'Next.js',       category: 'frontend' },
  { name: 'Tailwind CSS',  category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Node.js',       category: 'backend'  },
  { name: 'Spring Boot',   category: 'backend'  },
  { name: 'PostgreSQL',    category: 'backend'  },
  { name: 'REST APIs',     category: 'backend'  },
  { name: 'JavaScript',    category: 'backend'  },
  { name: 'n8n',           category: 'tools'    },
  { name: 'Make',          category: 'tools'    },
  { name: 'Figma',         category: 'tools'    },
]

const categoryColors: Record<string, string> = {
  frontend: 'bg-[var(--accent-muted)] text-[var(--accent)] border-[var(--accent-border)]',
  backend: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  tools: 'bg-secondary text-muted-foreground border-border',
}

const experiencePt = [
  {
    period: 'mai 2026 – presente',
    role: 'Desenvolvedor',
    company: 'Kron Tecnologia',
    type: 'Autônomo',
    description:
      'Automações e integrações sob medida para PMEs. Atuo do mapeamento do processo do cliente até a entrega da solução — n8n, Make, integrações via API e desenvolvimento web quando a solução de prateleira não resolve.',
  },
  {
    period: 'abr 2026 – presente',
    role: 'Desenvolvedor',
    company: 'DM Contabilidade',
    type: 'Tempo integral',
    description:
      'Automações e sistemas internos para o ecossistema contábil. Integrações entre ERPs, planilhas e ferramentas fiscais. Redução de retrabalho manual em processos repetitivos do escritório.',
  },
  {
    period: 'set 2025 – mar 2026',
    role: 'Assistente de TI',
    company: 'Escritório Duarte e Almeida',
    type: 'Tempo integral',
    description:
      'Dashboards de inteligência de negócio, análise de dados internos e externos, integrações e automações de apoio às demandas jurídicas. Elaboração de relatórios estratégicos e acompanhamento de métricas.',
  },
  {
    period: 'jan 2025 – set 2025',
    role: 'Estagiário de TI',
    company: 'Escritório Duarte e Almeida',
    type: 'Estágio',
    description:
      'Suporte técnico, criação de relatórios, organização e visualização de dados. Primeiros projetos de automação e consumo de APIs externas.',
  },
]

const experienceEn = [
  {
    period: 'May 2026 – present',
    role: 'Developer',
    company: 'Kron Tecnologia',
    type: 'Freelance',
    description:
      'Custom automations and integrations for SMBs. I work end-to-end from mapping the client\'s process to delivering the solution — n8n, Make, API integrations and web development when off-the-shelf tools don\'t fit.',
  },
  {
    period: 'Apr 2026 – present',
    role: 'Developer',
    company: 'DM Contabilidade',
    type: 'Full-time',
    description:
      'Automations and internal systems for the accounting ecosystem. Integrations between ERPs, spreadsheets and fiscal tools. Reduction of manual rework in repetitive back-office processes.',
  },
  {
    period: 'Sep 2025 – Mar 2026',
    role: 'IT Assistant',
    company: 'Escritório Duarte e Almeida',
    type: 'Full-time',
    description:
      'Business intelligence dashboards, internal and external data analysis, integrations and automations supporting legal demands. Strategic report writing and metrics tracking.',
  },
  {
    period: 'Jan 2025 – Sep 2025',
    role: 'IT Intern',
    company: 'Escritório Duarte e Almeida',
    type: 'Internship',
    description:
      'Technical support, report creation, data organization and visualization. First automation projects and external API consumption.',
  },
]

const socialLinks = [
  { icon: Github,    href: 'https://github.com/WillianCosta12',              label: 'GitHub'    },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/williancosta-dev/',  label: 'LinkedIn'  },
  { icon: Instagram, href: 'https://instagram.com/wcosta.dev',               label: 'Instagram' },
  { icon: Mail,      href: 'mailto:willacosta873@gmail.com',                 label: 'Email'     },
]

function BentoCard({
  children,
  className = '',
  delay = 0,
  isInView,
  onMouseMove,
  onMouseLeave,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  isInView: boolean
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`bento-card rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[var(--accent-border)] ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function About() {
  const { t, i18n } = useTranslation()
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const yearsCount = useCountUp(1, 1200, isInView)
  const projectsCount = useCountUp(12, 1500, isInView)
  const experience = i18n.language === 'en' ? experienceEn : experiencePt

  const handleBentoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const filteredSkills = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 md:py-36 relative overflow-hidden section-about-bg"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--accent)]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-[2px] bg-[var(--accent)] rounded-full"
            />
            <p className="text-[var(--accent)] text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              {t('about.label')}
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            {t('about.title')}
          </h2>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Card 1 — Bio (2 cols × 2 rows on lg) */}
          <BentoCard
            className="lg:col-span-2 lg:row-span-2"
            delay={0.05}
            isInView={isInView}
            onMouseMove={handleBentoMouseMove}
          >
            <div className="h-full flex flex-col justify-between gap-6 min-h-[260px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-border)] flex items-center justify-center mb-5">
                  <Code2 className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  {t('about.bio')}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-[var(--accent)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-muted)] transition-all"
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 2 — Localização */}
          <BentoCard delay={0.1} isInView={isInView} onMouseMove={handleBentoMouseMove}>
            <MapPin className="w-5 h-5 text-[var(--accent)] mb-3" />
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">
              {t('about.location_label')}
            </p>
            <p className="font-display text-xl font-semibold text-foreground">Natal, RN 🇧🇷</p>
          </BentoCard>

          {/* Card 3 — Status */}
          <BentoCard delay={0.15} isInView={isInView} onMouseMove={handleBentoMouseMove}>
            <Zap className="w-5 h-5 text-[var(--accent)] mb-3" />
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-medium">
              {t('about.status_label')}
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-foreground font-medium">{t('about.available')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent-border)] px-2 py-0.5 rounded-full font-mono font-semibold">
                  B1
                </span>
                <span className="text-sm text-foreground">{t('about.english_level')}</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 4 — Stats */}
          <BentoCard delay={0.2} isInView={isInView} onMouseMove={handleBentoMouseMove}>
            <TrendingUp className="w-5 h-5 text-[var(--accent)] mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-[var(--accent)] text-glow">
                  {yearsCount}+
                </p>
                <p className="text-xs text-muted-foreground mt-1">{t('about.stats_years')}</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-[var(--accent)] text-glow">
                  {projectsCount}+
                </p>
                <p className="text-xs text-muted-foreground mt-1">{t('about.stats_projects')}</p>
              </div>
            </div>
          </BentoCard>

          {/* Card 5 — Skills (2 cols on md+) */}
          <BentoCard
            className="md:col-span-2"
            delay={0.25}
            isInView={isInView}
            onMouseMove={handleBentoMouseMove}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[var(--accent)]" />
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {t('about.stack')}
              </p>
            </div>
            {/* Category filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[t('about.skills_all'), 'frontend', 'backend', 'tools'].map((cat, i) => {
                const isAll = i === 0
                const isActive = isAll ? !activeCategory : activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(isAll ? null : cat)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--accent)] text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isAll ? cat : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                    delay: isInView ? i * 0.04 : 0,
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-default transition-all ${categoryColors[skill.category]}`}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </BentoCard>

          {/* Card 6 — Experience Timeline (full width) */}
          <BentoCard
            className="md:col-span-2 lg:col-span-3"
            delay={0.3}
            isInView={isInView}
            onMouseMove={handleBentoMouseMove}
          >
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-4 h-4 text-[var(--accent)]" />
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {t('about.experience')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 relative">
              {/* Vertical divider line on desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className="relative pl-5 border-l-2 border-[var(--accent)] hover:border-[var(--accent-hover)] transition-colors"
                >
                  <div className="absolute left-0 top-1 w-3 h-3 -translate-x-[7px] rounded-full bg-card border-2 border-[var(--accent)]" />
                  <span className="inline-block text-xs font-mono text-[var(--accent)] bg-[var(--accent-muted)] px-2 py-0.5 rounded-full border border-[var(--accent-border)] mb-2">
                    {exp.period}
                  </span>
                  <h4 className="font-semibold text-foreground">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exp.company} · <span className="text-xs text-[var(--accent)]">{exp.type}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  )
}
