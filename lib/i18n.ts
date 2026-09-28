import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  pt: {
    translation: {
      nav: {
        about: 'Sobre',
        projects: 'Projetos',
        contact: 'Contato',
      },
      hero: {
        eyebrow: 'Full-stack Developer · Natal, RN',
        greeting: '',
        subtitle:
          'Automação, IA e desenvolvimento web ponta a ponta. Integro ERPs, APIs e LLMs para empresas que precisam sair do operacional manual.',
        cta_projects: 'Ver Projetos',
        cta_contact: 'Fale Comigo',
        cta_cv: 'Download CV',
      },
      about: {
        label: 'Sobre',
        title: 'Processo antes de código.',
        bio: 'Desenvolvedor full-stack com foco em automação e IA. Fui de estagiário de TI a dev em pouco mais de um ano, atuando em escritório de advocacia e contabilidade — construindo integrações, dashboards e automações com n8n, Make e APIs REST. Atualmente disponível para vaga CLT (full-stack ou automação) e para projetos freelance.',
        english_level: 'Inglês B1',
        experience: 'Experiência',
        stack: 'Stack',
        available: 'Disponível — CLT ou freelance',
        location_label: 'Localização',
        status_label: 'Status',
        skills_all: 'Todos',
        stats_automations: '30+ automações entregues',
      },
      projects: {
        label: 'Projetos',
        title: 'O que estou construindo',
        filter_all: 'Todos',
        github: 'Código',
        live: 'Demo',
        wip: 'Em progresso',
        done: 'Concluído',
        concept: 'Planejado',
        featured_badge: 'Star Project',
        case_study_label: 'Case Study',
        view_case: 'Ver Case Study',
      },
      contact: {
        label: 'Contato',
        title: 'Bora conversar?',
        subtitle: 'Aberto para projetos, colaborações e trocar ideia sobre automação e desenvolvimento.',
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        send: 'Enviar mensagem',
        sending: 'Enviando...',
        success: 'Mensagem enviada. Retorno em breve.',
        error: 'Erro ao enviar. Tente novamente.',
        alternative: 'Prefere contato direto?',
        validation: {
          name_required: 'Nome obrigatório',
          email_required: 'Email obrigatório',
          email_invalid: 'Email inválido',
          message_required: 'Mensagem obrigatória',
        },
      },
      footer: {
        rights: 'Todos os direitos reservados.',
        made_with: 'Feito com Next.js + Tailwind',
      },
    },
  },
  en: {
    translation: {
      nav: {
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
      },
      hero: {
        eyebrow: 'Full-stack Developer · Natal, Brazil',
        greeting: '',
        subtitle:
          'Automation, AI and end-to-end web development. I connect ERPs, APIs and LLMs so businesses can stop running on manual work.',
        cta_projects: 'View Projects',
        cta_contact: 'Get in Touch',
        cta_cv: 'Download CV',
      },
      about: {
        label: 'About',
        title: 'Process before code.',
        bio: 'Full-stack developer focused on automation and AI. Went from IT intern to developer in just over a year, working at a law firm and an accounting firm — building integrations, dashboards and automations with n8n, Make and REST APIs. Currently open to full-time positions (full-stack or automation) and freelance projects.',
        english_level: 'English B1',
        experience: 'Experience',
        stack: 'Stack',
        available: 'Available — full-time or freelance',
        location_label: 'Location',
        status_label: 'Status',
        skills_all: 'All',
        stats_automations: '30+ automations delivered',
      },
      projects: {
        label: 'Projects',
        title: 'What I am building',
        filter_all: 'All',
        github: 'Code',
        live: 'Demo',
        wip: 'In progress',
        done: 'Done',
        concept: 'Planned',
        featured_badge: 'Star Project',
        case_study_label: 'Case Study',
        view_case: 'View Case Study',
      },
      contact: {
        label: 'Contact',
        title: "Let's talk?",
        subtitle: 'Open to projects, collaborations, and conversations about automation and development.',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent. I will get back to you soon.',
        error: 'Error sending. Please try again.',
        alternative: 'Prefer direct contact?',
        validation: {
          name_required: 'Name is required',
          email_required: 'Email is required',
          email_invalid: 'Invalid email',
          message_required: 'Message is required',
        },
      },
      footer: {
        rights: 'All rights reserved.',
        made_with: 'Built with Next.js + Tailwind',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
