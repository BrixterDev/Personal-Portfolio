'use client'

import { useState, type FormEvent } from 'react'
import { Check, Mail, Send } from 'lucide-react'
import { mailtoHref, site } from '@/lib/content'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('botcheck')) {
      setStatus('success')
      return
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      setStatus('error')
      setErrorMessage('The contact form is not configured yet.')
      return
    }

    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const topic = String(formData.get('topic') ?? 'General inquiry')
    const message = String(formData.get('message') ?? '').trim()

    setStatus('submitting')
    setErrorMessage('')

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: `Portfolio inquiry — ${topic}`,
          message,
          botcheck: false,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'The message could not be sent.')
      }

      form.reset()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error && error.name === 'AbortError'
          ? 'The request timed out. Please try again or'
          : 'Something went wrong while sending your message. Please try again or',
      )
    } finally {
      window.clearTimeout(timeout)
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <span className="form-success-icon" aria-hidden="true">
          <Check size={22} />
        </span>
        <h4>Message sent</h4>
        <p>Thanks for reaching out. I&apos;ll get back to you as soon as I can.</p>
        <button
          type="button"
          className="text-link"
          onClick={() => setStatus('idle')}
        >
          Send another message <span aria-hidden="true">↗</span>
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
            maxLength={80}
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={120}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact-topic">What is this about?</label>
        <select id="contact-topic" name="topic" defaultValue="Freelance project">
          <option value="Freelance project">Freelance project</option>
          <option value="Job opportunity">Job opportunity</option>
          <option value="General inquiry">General inquiry</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me a little about what you have in mind."
          required
          minLength={10}
          maxLength={4000}
        />
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="contact-botcheck">Leave this field blank</label>
        <input
          id="contact-botcheck"
          name="botcheck"
          type="checkbox"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button className="button button-dark form-submit" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <span className="spinner" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send message <Send size={15} aria-hidden="true" />
          </>
        )}
      </button>

      <p className="form-note">
        Prefer email? <a href={mailtoHref()}>{site.email}</a>
      </p>

      {status === 'error' && (
        <p className="form-status is-error" role="alert">
          <Mail size={15} aria-hidden="true" />
          {errorMessage}{' '}
          <a href={mailtoHref()}>Email me instead</a>.
        </p>
      )}
    </form>
  )
}
