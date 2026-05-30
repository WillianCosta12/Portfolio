'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, Zap, Star } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

type ProjectStatus = 'done' | 'progress' | 'concept'
type StackCategory = 'frontend' | 'backend' | 'tools'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  stack: { name: string; category: StackCategory }[]
  github?: string
  live?: string
  caseStudy?: boolean
  featured?: boolean
  status: ProjectStatus
}

const projects: Project[] = [
  {
    id: 'nexus',
    title: 'Nexus',
    subtitle: 'Kanban Full-stack',
    description: 'Board Kanban completo com autenticacao JWT, drag & drop, gestao de projetos e tarefas em tempo real. Backend em Spring Boot com PostgreSQL, frontend em React com estado global e animacoes fluidas.',
    stack: [
      { name: 'React', category: 'frontend' },
      { name: 'Spring Boot', category: 'backend' },
      { name: 'PostgreSQL', category: 'backend' },
      { name: 'JWT', category: 'backend' },
    ],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    status: 'done',
  },
  {
    id: 'devcard',
    title: 'DevCard',
    subtitle: 'GitHub Profile Generator',
    description: 'Gerador de card de perfil GitHub com temas customizaveis, visualizacao de linguagens e export PNG/SVG.',
    stack: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'GitHub API', category: 'tools' },
    ],
    github: 'https://github.com',
    live: 'https://example.com',
    status: 'done',
  },
  {
    id: 'lumis',
    title: 'Lumis',
    subtitle: 'Landing SaaS',
    description: 'Landing page SaaS ficticia com animacoes cinematograficas, Lighthouse score 100 em Performance e Acessibilidade.',
    stack: [
      { name: 'React', category: 'frontend' },
      { name: 'Framer Motion', category: 'frontend' },
      { name: 'Tailwind', category: 'frontend' },
    ],
    github: 'https://github.com',
    live: 'https://example.com',
    status: 'done',
  },
  {
    id: 'flowmoney',
    title: 'FlowMoney',
    subtitle: 'Controle Financeiro',
    description: 'Dashboard de controle financeiro com graficos interativos, categorias personalizaveis e relatorios mensais em PDF.',
    stack: [
      { name: 'React', category: 'frontend' },
      { name: 'Recharts', category: 'frontend' },
      { name: 'Spring Boot', category: 'backend' },
      { name: 'PostgreSQL', category: 'backend' },
    ],
    github: 'https://github.com',
    live: 'https://example.com',
    status: 'done',
  },
  {
    id: 'auto01',
    title: 'Automacao Interna',
    subtitle: 'Case Study — Empresa',
    description: 'Pipeline de dados para automatizar relatorios diarios, integrando fontes internas e gerando outputs estruturados. Reducao de 4h/dia de trabalho manual.',
    stack: [
      { name: 'N8N', category: 'tools' },
      { name: 'Make', category: 'tools' },
      { name: 'PostgreSQL', category: 'backend' },
    ],
    caseStudy: true,
    status: 'done',
  },
  {
    id: 'auto02',
    title: 'Content Pipeline',
    subtitle: 'Case Study — N8N',
    description: 'Pipeline de conteudo: Notion → traducao PT/EN → revisao → Buffer → Telegram. Totalmente automatizado com N8N e inteligencia artificial para adaptacao de tom.',
    stack: [
      { name: 'N8N', category: 'tools' },
      { name: 'Notion API', category: 'tools' },
      { name: 'Buffer', category: 'tools' },
    ],
    caseStudy: true,
    status: 'done',
  },
]

const stackColors: Record<StackCategory, string> = {
  frontend: 'bg-[var(--accent-muted)] text-[var(--accent)] border-[var(--accent-border)]',
  backend: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  tools: 'bg-secondary text-muted-foreground border-border',
}

const statusConfig: Record<ProjectStatus, { label: string; key: string; className: string }> = {
  done: { label: 'done', key: 'projects.status_done', className: 'bg-green-500/10 text-green-400 border-green-500/30' },
  progress: { label: 'progress', key: 'projects.status_progress', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
  concept: { label: 'concept', key: 'projects.status_concept', className: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
}

function KanbanMockup() {
  const cols = [
    { label: 'To Do', items: 2 },
    { label: 'In Progress', items: 3, accent: true },
    { label: 'Done', items: 2 },
  ]
  return (
    <div className="grid grid-cols-3 gap-2 p-4 h-full min-h-[180px] rounded-xl bg-card/50">
      {cols.map((col) => (
        <div key={col.label} className="flex flex-col gap-2">
          <div className="text-[10px] font-mono text-muted-foreground px-2 pb-1.5 border-b border-border truncate">
            {col.label}
          </div>
          {[...Array(col.items)].map((_, j) => (
            <div
              key={j}
              className={`h-7 rounded-md border ${
                j === 0 && col.accent
                  ? 'bg-[var(--accent-muted)] border-[var(--accent-border)]'
                  : 'bg-secondary border-border'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function FeaturedCard({ project, isInView }: { project: Project; isInView: boolean }) {
  const { t } = useTranslation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-4, 4]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group rounded-2xl border border-border bg-card hover:border-[var(--accent-border)] transition-all duration-300"
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
        {/* Mockup side */}
        <div className="p-6 lg:border-r border-border">
          <KanbanMockup />
        </div>

        {/* Content side */}
        <div className="p-8 flex flex-col justify-between gap-6">
          <div>
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent-border)] text-xs font-semibold">
                <Star className="w-3 h-3 fill-current" />
                {t('projects.featured_badge')}
              </span>
              <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusConfig[project.status].className}`}>
                {t(statusConfig[project.status].key)}
              </span>
            </div>

            <p className="text-[var(--accent)] text-xs font-mono font-medium mb-1">{project.subtitle}</p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5">{project.description}</p>

            {/* Stack */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${stackColors[tech.category]}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-border/50">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[var(--accent)] transition-colors"
              >
                <Github className="w-4 h-4" />
                {t('projects.github')}
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[var(--accent)] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {t('projects.live')}
              </motion.a>
            )}
            <ArrowUpRight className="w-4 h-4 text-[var(--accent)] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const { t } = useTranslation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const isAutomation = !!project.caseStudy

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card group rounded-2xl border p-6 transition-all duration-300 hover:border-[var(--accent-border)] ${
        isAutomation
          ? 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40'
          : 'border-border bg-card'
      }`}
    >
      {/* Top badges */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {isAutomation && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-medium">
              <Zap className="w-3 h-3" />
              {t('projects.case_study_label')}
            </span>
          )}
          <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${statusConfig[project.status].className}`}>
            {t(statusConfig[project.status].key)}
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </div>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
          <span
            key={tech.name}
            className={`px-2 py-0.5 rounded-md border text-xs font-medium ${stackColors[tech.category]}`}
          >
            {tech.name}
          </span>
        ))}
      </div>

      <p className="text-[var(--accent)] text-xs font-mono mb-1">{project.subtitle}</p>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-[var(--accent)] transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[var(--accent)] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            {t('projects.github')}
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[var(--accent)] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {t('projects.live')}
          </a>
        )}
        {isAutomation && (
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            {t('projects.view_case')}
          </a>
        )}
      </div>
    </motion.article>
  )
}

export function Projects() {
  const { t } = useTranslation()
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({ threshold: 0.05 })

  const featuredProject = projects.find((p) => p.featured)!
  const gridProjects = projects.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 md:py-32 relative section-projects-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[var(--accent)] text-sm font-medium mb-3">{t('projects.label')}</p>
          <motion.h2
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground"
          >
            {t('projects.title')}
          </motion.h2>
        </motion.div>

        {/* Featured project */}
        <div className="mb-6">
          <FeaturedCard project={featuredProject} isInView={isInView} />
        </div>

        {/* Grid of remaining projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
