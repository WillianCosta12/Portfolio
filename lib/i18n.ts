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
        eyebrow: 'Full-stack Developer',
        greeting: 'Ola, eu sou',
        subtitle:
          'Construo produtos web completos — do design no Figma ao deploy em producao. Especializado em React, Spring Boot e automacao com N8N.',
        cta_projects: 'Ver Projetos',
        cta_contact: 'Fale Comigo',
      },
      about: {
        label: 'Sobre',
        title: 'Construindo experiencias digitais',
        bio: 'Desenvolvedor full-stack junior apaixonado por construir produtos que funcionam de ponta a ponta. Trabalho com React e TypeScript no frontend, Spring Boot e Node.js no backend. Automatizo processos com N8N e Make, e prototipo interfaces no Figma antes de codar.',
        english_level: 'Ingles B1',
        experience: 'Experiencia',
        stack: 'Stack',
        location_label: 'Localizacao',
        status_label: 'Status',
        available: 'Disponivel',
        skills_all: 'Todos',
        stats_years: 'Anos de exp.',
        stats_projects: 'Projetos',
      },
      projects: {
        label: 'Trabalhos',
        title: 'Projetos selecionados',
        filter_all: 'Todos',
        github: 'Codigo',
        live: 'Demo',
        featured_badge: 'Star Project',
        case_study_label: 'Case Study',
        view_case: 'Ver Case Study',
        status_done: 'Concluido',
        status_progress: 'Em Progresso',
        status_concept: 'Conceito',
      },
      contact: {
        label: 'Contato',
        title: 'Vamos conversar?',
        subtitle: 'Aberto para colaboracoes, feedbacks e trocar ideia sobre tecnologia.',
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        send: 'Enviar mensagem',
        sending: 'Enviando...',
        success: 'Mensagem enviada com sucesso!',
        error: 'Erro ao enviar. Tente novamente.',
        alternative: 'Ou entre em contato diretamente:',
        validation: {
          name_required: 'Nome e obrigatorio',
          email_required: 'Email e obrigatorio',
          email_invalid: 'Email invalido',
          message_required: 'Mensagem e obrigatoria',
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
        eyebrow: 'Full-stack Developer',
        greeting: "Hi, I'm",
        subtitle:
          'I build complete web products — from Figma design to production deploy. Specialized in React, Spring Boot and automation with N8N.',
        cta_projects: 'View Projects',
        cta_contact: 'Get in Touch',
      },
      about: {
        label: 'About',
        title: 'Building digital experiences',
        bio: 'Junior full-stack developer passionate about building products that work end-to-end. I work with React and TypeScript on the frontend, Spring Boot and Node.js on the backend. I automate workflows with N8N and Make, and prototype interfaces in Figma before coding.',
        english_level: 'English B1',
        experience: 'Experience',
        stack: 'Stack',
        location_label: 'Location',
        status_label: 'Status',
        available: 'Available',
        skills_all: 'All',
        stats_years: 'Years of exp.',
        stats_projects: 'Projects',
      },
      projects: {
        label: 'Work',
        title: 'Selected projects',
        filter_all: 'All',
        github: 'Code',
        live: 'Demo',
        featured_badge: 'Star Project',
        case_study_label: 'Case Study',
        view_case: 'View Case Study',
        status_done: 'Completed',
        status_progress: 'In Progress',
        status_concept: 'Concept',
      },
      contact: {
        label: 'Contact',
        title: "Let's talk?",
        subtitle: 'Open for collaborations, feedback and chatting about technology.',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending. Please try again.',
        alternative: 'Or reach out directly:',
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
