'use client'

import { createContext, useContext } from 'react'
import i18next, { type i18n as I18n } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { COPY, type Lang } from '@/lib/i18n'

/**
 * Each language has its own page (/ and /en), so each gets its own i18next instance, created once and
 * never switched. The server renders the page already in its language: no swap after mount, nothing for
 * a crawler with an English browser to see differently.
 */

const instances: Partial<Record<Lang, I18n>> = {}

function instanceFor(lang: Lang): I18n {
  let inst = instances[lang]
  if (!inst) {
    inst = i18next.createInstance()
    inst.use(initReactI18next).init({
      resources: { pt: { translation: COPY.pt }, en: { translation: COPY.en } },
      lng: lang,
      fallbackLng: 'pt',
      initAsync: false,
      interpolation: { escapeValue: false },
      returnObjects: true,
    })
    instances[lang] = inst
  }
  return inst
}

const LangContext = createContext<Lang>('pt')

/** The page's language, for links and labels that depend on it. */
export const usePageLang = () => useContext(LangContext)

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <LangContext.Provider value={lang}>
      <I18nextProvider i18n={instanceFor(lang)}>{children}</I18nextProvider>
    </LangContext.Provider>
  )
}
