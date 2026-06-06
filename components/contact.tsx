'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Github, Linkedin } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'willacosta873@gmail.com',
    href: 'mailto:willacosta873@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/WillianCosta12',
    href: 'https://github.com/WillianCosta12',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/williancosta-dev',
    href: 'https://www.linkedin.com/in/williancosta-dev/',
  },
]

export function Contact() {
  const { t } = useTranslation()
  const { ref, isInView } = useIntersectionObserver<HTMLElement>()
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = t('contact.validation.name_required')
    if (!formData.email.trim()) newErrors.email = t('contact.validation.email_required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.validation.email_invalid')
    if (!formData.message.trim()) newErrors.message = t('contact.validation.message_required')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      // Se as variáveis de ambiente não estiverem configuradas, simular sucesso em dev
      if (!serviceId || !templateId || !publicKey) {
        await new Promise((r) => setTimeout(r, 800))
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        return
      }

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  serviceId,
          template_id: templateId,
          user_id:     publicKey,
          template_params: {
            from_name:  formData.name,
            from_email: formData.email,
            message:    formData.message,
            to_email:   'willacosta873@gmail.com',
          },
        }),
      })

      if (!response.ok) throw new Error(`EmailJS error: ${response.status}`)

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const inputClass = (hasError?: string) =>
    `w-full px-4 py-3 rounded-xl bg-background border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all ${
      hasError ? 'border-destructive ring-1 ring-destructive' : 'border-border hover:border-[var(--accent-border)]'
    }`

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[var(--accent)]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-[var(--accent)] text-sm font-medium mb-3">{t('contact.label')}</p>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6"
            >
              {t('contact.title')}
            </motion.h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {t('contact.subtitle')}
            </p>

            {/* Contact links */}
            <div className="space-y-3">
              {contactLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:border-[var(--accent-border)] hover:bg-[var(--accent-muted)] transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)] flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-[var(--accent)] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-5 p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass(errors.name)}
                placeholder="Seu nome"
              />
              {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass(errors.email)}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass(errors.message)} resize-none`}
                placeholder="Sua mensagem..."
              />
              {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { scale: 1.02, y: -1 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-primary-foreground font-semibold text-sm transition-all hover:bg-[var(--accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed glow"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('contact.sending')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t('contact.send')}
                </>
              )}
            </motion.button>

            {/* Status feedback */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl ${
                    submitStatus === 'success'
                      ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                      : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <><CheckCircle className="w-5 h-5" />{t('contact.success')}</>
                  ) : (
                    <><AlertCircle className="w-5 h-5" />{t('contact.error')}</>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
