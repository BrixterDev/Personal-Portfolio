'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { site } from '@/lib/content'

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current)
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = site.email
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    setCopied(true)
    if (resetTimer.current) window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button type="button" className="contact-method" onClick={copyEmail}>
      <span className="contact-method-icon" aria-hidden="true">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </span>
      <span className="contact-method-text">
        <span className="contact-method-label">Email</span>
        <span className="contact-method-value">{copied ? 'Copied to clipboard' : site.email}</span>
      </span>
      <span className="contact-method-action" aria-hidden="true">
        {copied ? 'Done' : 'Copy'}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard.' : ''}
      </span>
    </button>
  )
}
