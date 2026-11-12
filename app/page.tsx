'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowUp,
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/portfolio/brand-icons'
import { ContactSection } from '@/components/portfolio/contact-section'
import { ProjectCard } from '@/components/portfolio/project-card'
import { ProjectModal } from '@/components/portfolio/project-modal'
import { Reveal } from '@/components/portfolio/reveal'
import { SiteHeader } from '@/components/portfolio/site-header'
import { SkillIcon } from '@/components/portfolio/skill-icon'
import {
  experience,
  featuredProjects,
  mailtoHref,
  otherProjects,
  site,
  skills,
  type Project,
} from '@/lib/content'

export default function Page() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <SiteHeader />

      <main id="main-content">
        <div id="top" className="hero shell">
          <Reveal className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" aria-hidden="true" />
              Full Stack Web Developer · Manila, PH
            </p>
            <h1>Making digital things feel <em>human.</em></h1>
            <p className="hero-intro">
              I&apos;m Aeron, a full stack web developer based in Manila. I build thoughtful
              interfaces, useful tools, and reliable web applications.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                See selected work <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="button button-outline" href={mailtoHref()}>
                Contact me <Mail size={15} aria-hidden="true" />
              </a>
              <a
                className="text-link hero-resume"
                href={site.resumeHref}
                download={site.resumeFileName}
              >
                Download resume <Download size={14} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-availability">
              <span className="status-dot" aria-hidden="true" />
              Open for freelance collaborations and full-time opportunities
            </p>
          </Reveal>

          <Reveal className="hero-mark" delay={120}>
            <div className="profile-frame">
              <Image
                src="/profile.jpg"
                alt="Portrait of Aeron Brixter Aure"
                width={320}
                height={320}
                priority
                sizes="(max-width: 767px) 240px, 320px"
                className="profile-img"
              />
            </div>
            <p>Curious by nature.<br />Precise by practice.</p>
          </Reveal>
        </div>

        <section id="work" className="section shell" aria-labelledby="work-heading">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2 id="work-heading" className="section-title">Featured projects</h2>
            </div>
            <div className="section-heading-right">
              <p className="section-note">A few things I&apos;ve designed and built.</p>
              <a
                className="button button-outline"
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 90}>
                <ProjectCard
                  project={project}
                  onDetails={setActiveProject}
                />
              </Reveal>
            ))}
          </div>

          {otherProjects.length > 0 && (
            <div className="more-projects">
              <Reveal className="more-projects-heading">
                <h3>More projects</h3>
                <p>Additional work outside the featured selection.</p>
              </Reveal>
              <div className="more-projects-grid">
                {otherProjects.map((project) => (
                  <Reveal key={project.slug}>
                    <ProjectCard project={project} onDetails={setActiveProject} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="about" className="about-section shell section" aria-labelledby="about-heading">
          <Reveal className="section-heading">
            <p className="eyebrow">02 / A little about me</p>
          </Reveal>
          <div className="about-grid">
            <Reveal>
              <h2 id="about-heading">
                Good work lives somewhere between a clear idea and a <em>careful detail.</em>
              </h2>
            </Reveal>
            <Reveal className="about-copy" delay={110}>
              <p>
                I enjoy turning rough ideas into digital experiences that are easy to understand
                and genuinely nice to use. My toolkit spans interface design, front-end and
                back-end development, animation, and AI-assisted workflows.
              </p>
              <p>
                When I&apos;m away from the screen, you&apos;ll probably find me exploring a new
                creative tool or thinking about how to make the next thing a little better.
              </p>
              <a className="text-link" href={mailtoHref('Let’s work together')}>
                More about me <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>
        </section>

        <section id="experience" className="section shell experience-section" aria-labelledby="experience-heading">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">03 / Experience</p>
              <h2 id="experience-heading" className="section-title">Where I&apos;ve worked</h2>
            </div>
            <p className="section-note">Freelance and professional experience.</p>
          </Reveal>

          <ol className="timeline">
            {experience.map((item, index) => (
              <li className="timeline-item" key={`${item.role}-${item.organization}`}>
                <Reveal delay={index * 80}>
                  <p className="timeline-period">{item.period}</p>
                  <div className="timeline-content">
                    <h3>{item.role}</h3>
                    <p className="timeline-organization">{item.organization}</p>
                    <ul>
                      {item.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="skills-section section shell" aria-labelledby="skills-heading">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">04 / Skills &amp; tools</p>
              <h2 id="skills-heading" className="section-title">What I work with</h2>
            </div>
            <p className="section-note">The tools and technologies I reach for most.</p>
          </Reveal>

          <Reveal className="skills-marquee" delay={80}>
            <div className="skills-track">
              {[...skills, ...skills].map((skill, index) => (
                <div
                  className="skill-tile"
                  key={`${skill.name}-${index}`}
                  aria-hidden={index >= skills.length ? 'true' : undefined}
                >
                  <div className="skill-tile-icon">
                    <SkillIcon name={skill.icon} />
                  </div>
                  <div className="skill-tile-info">
                    <span className="skill-tile-name">{skill.name}</span>
                    <span className="skill-tile-category">{skill.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <ContactSection />
      </main>

      <footer className="site-footer shell">
        <div className="footer-brand">
          <span className="footer-mark" aria-hidden="true">{site.shortName}</span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>

        <div className="footer-links">
          <a href={mailtoHref()}>
            <Mail size={14} aria-hidden="true" /> {site.email}
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon size={14} /> GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={14} /> LinkedIn
          </a>
          <span>
            <MapPin size={14} aria-hidden="true" /> {site.location}
          </span>
        </div>

        <a className="footer-top" href="#top">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </footer>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  )
}
