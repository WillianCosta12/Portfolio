'use client'

// Formulário de contato do site. Envia de verdade pelo EmailJS; "enviado" só depois do envio.
// O idioma não troca aqui: cada idioma é uma página (/ e /en), ver lang-provider.tsx.

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT } from '@/lib/content'
import { track } from './track'

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export type Field = 'name' | 'email' | 'message'
export type FormStatus = 'idle' | 'sending' | 'sent' | 'failed' | 'unavailable'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// the longest each field may be: enough for any real message, too short to be abused as a relay
export const FIELD_MAX: Record<Field, number> = { name: 120, email: 254, message: 4000 }
/** The name of the field people never see: only a bot fills it in (see the form in chapters.tsx). */
export const TRAP_FIELD = 'website'

export function useContactForm() {
  const { t } = useTranslation()
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [showSending, setShowSending] = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  // what the message is about (index into site.topics: a project or a role); set in the form or by a CTA
  const [topic, setTopic] = useState<number | null>(null)
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  }

  const validate = () => {
    const e: Partial<Record<Field, string>> = {}
    if (!values.name.trim()) e.name = t('contact.errors.name')
    if (!values.email.trim()) e.email = t('contact.errors.email_required')
    else if (!EMAIL_RE.test(values.email.trim())) e.email = t('contact.errors.email_invalid')
    if (!values.message.trim()) e.message = t('contact.errors.message')
    for (const field of ['name', 'email', 'message'] as const) {
      if (values[field].length > FIELD_MAX[field]) e[field] = t('contact.errors.too_long', { max: FIELD_MAX[field] })
    }
    return e
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    const failed = Object.keys(e) as Field[]
    setErrorCount(failed.length)
    if (failed.length) {
      setStatus('idle')
      refs[failed[0]].current?.focus()
      return
    }
    // a bot filled the field people never see: nothing is sent, and it is told so (never a fake success)
    const trap = (ev.currentTarget as HTMLFormElement).elements.namedItem(TRAP_FIELD) as HTMLInputElement | null
    if (trap?.value) {
      setStatus('failed')
      return
    }
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    // no form service configured here: say so plainly, never pretend it was sent
    if (!serviceId || !templateId || !publicKey) {
      setStatus('unavailable')
      return
    }
    setStatus('sending')
    const slow = window.setTimeout(() => setShowSending(true), 300)
    // the subject goes at the top of the message, so it reaches the inbox whatever the email template shows
    const topics = t('site.topics', { returnObjects: true }) as string[]
    const subject = topic !== null ? topics[topic] : ''
    const message = subject ? `${t('site.topic_prefix')}: ${subject}\n\n${values.message.trim()}` : values.message.trim()
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: values.name.trim(),
            from_email: values.email.trim(),
            message,
            topic: subject,
            to_email: CONTACT.email,
          },
        }),
      })
      if (!res.ok) throw new Error(`EmailJS ${res.status}`)
      setStatus('sent')
      track('contact_sent', { topic: topic === null ? 'none' : topic === 0 ? 'project' : 'role' })
      setValues({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('contato: envio falhou', err)
      setStatus('failed') // everything typed stays in the fields
    } finally {
      window.clearTimeout(slow)
      setShowSending(false)
    }
  }

  const onChange = (field: Field) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: ev.target.value }))
    if (status === 'sent' || status === 'failed' || status === 'unavailable') setStatus('idle')
  }

  const statusText =
    errorCount > 0 && status === 'idle'
      ? t('contact.errors_count', { count: errorCount })
      : status === 'sending'
        ? showSending
          ? t('contact.sending')
          : ''
        : status === 'sent'
          ? t('contact.sent')
          : status === 'failed'
            ? t('contact.failed')
            : status === 'unavailable'
              ? t('contact.unavailable')
              : ''

  const fieldProps = (field: Field, prefix: string) => ({
    id: `${prefix}-${field}`,
    name: field,
    value: values[field],
    maxLength: FIELD_MAX[field],
    onChange: onChange(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${prefix}-${field}-error` : undefined,
  })

  return { values, errors, status, statusText, refs, onSubmit, fieldProps, topic, setTopic }
}
