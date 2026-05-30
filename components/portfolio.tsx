'use client'

import { useEffect, useState } from 'react'
import '@/lib/i18n'
import { ThemeProvider } from '@/contexts/theme-context'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { BackToTop } from '@/components/back-to-top'
import { PageLoader } from '@/components/page-loader'
import { ScrollProgress } from '@/components/scroll-progress'

export function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0B]" />
    )
  }

  return (
    <ThemeProvider>
      <PageLoader />
      <div className="min-h-screen bg-background">
        <ScrollProgress />

        {/* Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent)] focus:text-primary-foreground focus:font-medium"
        >
          Pular para conteudo principal
        </a>

        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  )
}
