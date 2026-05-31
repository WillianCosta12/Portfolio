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
          'Do mapeamento de processo ao deploy em producao. Atuo ponta a ponta em automacoes, integracoes e desenvolvimento web para empresas que precisam sair do operacional manual.',
        cta_projects: 'Ver Projetos',
        cta_contact: 'Fale Comigo',
      },
      about: {
        label: 'Sobre',
        title: 'Processo antes de codigo.',
        bio: 'Trabalho na intersecao entre desenvolvimento e automacao — construindo sistemas que resolvem problemas reais de negocio. Fui de estagiario de TI a dev full-stack em pouco mais de um ano, passando por escritorio de advocacia, contabilidade e consultoria de tecnologia. Hoje atuo na Kron Tecnologia e na DM Contabilidade mapeando processos antes de escrever qualquer linha de codigo.',
        english_level: 'Ingles B1',
        experience: 'Experiencia',
        stack: 'Stack',
        available: 'Aberto a projetos',
        location_label: 'Localizacao',
        status_label: 'Status',
        skills_all: 'Todos',
        stats_years: 'Ano de experiencia',
        stats_projects: 'Projetos entregues',
      },
      projects: {
        label: 'Projetos',
        title: 'O que estou construindo',
        filter_all: 'Todos',
        github: 'Codigo',
        live: 'Demo',
        wip: 'Em progresso',
        done: 'Concluido',
        concept: 'Planejado',
        featured_badge: 'Star Project',
        case_study_label: 'Case Study',
        view_case: 'Ver Case Study',
      },
      contact: {
        label: 'Contato',
        title: 'Bora conversar?',
        subtitle: 'Aberto para projetos, colaboracoes e trocar ideia sobre automacao e desenvolvimento.',
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        send: 'Enviar mensagem',
        sending: 'Enviando...',
        success: 'Mensagem enviada. Retorno em breve.',
        error: 'Erro ao enviar. Tente novamente.',
        alternative: 'Prefere contato direto?',
        validation: {
          name_required: 'Nome obrigatorio',
          email_required: 'Email obrigatorio',
          email_invalid: 'Email invalido',
          message_required: 'Mensagem obrigatoria',
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
          'From process mapping to production deploy. I work end-to-end on automation, integrations, and web development for businesses that need to move beyond manual operations.',
        cta_projects: 'View Projects',
        cta_contact: 'Get in Touch',
      },
      about: {
        label: 'About',
        title: 'Process before code.',
        bio: 'I work at the intersection of development and automation — building systems that solve real business problems. Went from IT intern to full-stack developer in just over a year, across law, accounting, and tech consulting. Currently at Kron Tecnologia and DM Contabilidade, mapping processes before writing any code.',
        english_level: 'English B1',
        experience: 'Experience',
        stack: 'Stack',
        available: 'Open to projects',
        location_label: 'Location',
        status_label: 'Status',
        skills_all: 'All',
        stats_years: 'Year of experience',
        stats_projects: 'Projects delivered',
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
