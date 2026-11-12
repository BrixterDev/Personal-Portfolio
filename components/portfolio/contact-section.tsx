'use client'

import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/portfolio/brand-icons'
import { ContactForm } from '@/components/portfolio/contact-form'
import { CopyEmailButton } from '@/components/portfolio/copy-email'
import { Reveal } from '@/components/portfolio/reveal'
import { mailtoHref, site } from '@/lib/content'

export function ContactSection() {
  return (
    <section id="contact" className="section shell contact-section" aria-labelledby="contact-heading">
      <Reveal className="contact-panel">
        <div className="contact-copy">
          <p className="eyebrow">05 / Start a conversation</p>
          <h2 id="contact-heading">
            Have a good idea?<br />
            <em>Let&apos;s make it real.</em>
          </h2>
          <p className="contact-intro">
            Open for freelance collaborations and full-time opportunities. Whether it&apos;s a
            role, a project, or a quick question, I&apos;d love to hear from you.
          </p>

          <div className="contact-methods">
            <a className="contact-method is-primary" href={mailtoHref()}>
              <span className="contact-method-icon" aria-hidden="true">
                <Mail size={16} />
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">Email</span>
                <span className="contact-method-value">{site.email}</span>
              </span>
              <span className="contact-method-action" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </a>

            <CopyEmailButton />

            <a
              className="contact-method"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-method-icon" aria-hidden="true">
                <LinkedinIcon size={16} />
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">LinkedIn</span>
                <span className="contact-method-value">Aeron Brixter Aure</span>
              </span>
              <span className="contact-method-action" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </a>

            <a
              className="contact-method"
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-method-icon" aria-hidden="true">
                <GithubIcon size={16} />
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">GitHub</span>
                <span className="contact-method-value">{site.github.replace(/^https?:\/\//, '')}</span>
              </span>
              <span className="contact-method-action" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>

          <p className="contact-location">
            <MapPin size={14} aria-hidden="true" />
            {site.locationFull}
          </p>
        </div>

        <div className="contact-form-panel">
          <h3>Send a message</h3>
          <p>Share a few details and I&apos;ll get back to you as soon as I can.</p>
          <ContactForm />
        </div>
      </Reveal>
    </section>
  )
}
