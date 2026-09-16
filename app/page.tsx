'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Mail, MapPin, Menu, X } from 'lucide-react'
import {
  siVercel,
  siClaude,
  siPostgresql,
  siSupabase,
  siJavascript,
  siTypescript,
  siReact,
  siTailwindcss,
  siPhp,
  siMysql,
} from 'simple-icons'

const projects = [
  {
    number: '01',
    title: 'Refresh Lecture Manager',
    description: 'Your lectures, your highlights, your notes—all in one place.',
    tags: ['JavaScript', 'PostgreSQL', 'Supabase'],
    tone: 'clay',
    images: [
      { src: '/projects/refresh/01.png', caption: 'Login Page' },
      { src: '/projects/refresh/02.png', caption: 'Lecture viewer with highlights and inline notes' },
      { src: '/projects/refresh/03.png', caption: 'Note editor synced across every device' },
    ],
    url: 'https://refresh-nu-jet.vercel.app/',
  },
  {
    number: '02',
    title: 'PC Assembly Simulator',
    description: 'A playful configuration experience built to make complex hardware feel approachable.',
    tags: ['C#', 'Unity', 'Blender'],
    tone: 'sage',
    images: [
      { src: '/projects/pc-simulator/01.png', caption: 'Build bench — drag-and-drop component assembly' },
      { src: '/projects/pc-simulator/02.png', caption: 'Installation with real-time compatibility checking' },
    ],
    url: 'https://github.com/BrixterDev',
  },
  {
    number: '03',
    title: 'HelpeR Management System',
    description: 'A centralized HR solution for managing employees, recruitment, payroll, and leave requests.',
    tags: ['PostgreSQL', 'Vanilla CSS', 'JavaScript', 'Supabase'],
    tone: 'sand',
    images: [
      { src: '/projects/helper/01.png', caption: 'Admin dashboard with live headcount metrics' },
      { src: '/projects/helper/02.png', caption: 'Employee directory with role-based filters' },
      { src: '/projects/helper/03.png', caption: 'Attendance tracker and shift schedule' },
      { src: '/projects/helper/04.png', caption: 'Leave request queue with approval workflow' },
      { src: '/projects/helper/05.png', caption: 'Payroll generation with tax breakdown' },
      { src: '/projects/helper/06.png', caption: 'Recruitment pipeline — applicants by stage' },
      { src: '/projects/helper/07.png', caption: 'Audit Logs — CSV, PDF, and summary' },
    ],
    url: 'https://hr-helper-nine.vercel.app/',
  },
]

/* ✨ Helper to render an official brand SVG (uses currentColor) */
const brandIcon = (path: string) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
)

const skills = [
  {
    name: 'AI Prompting',
    category: 'Workflow',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4L12 3z" />
        <path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" />
      </svg>
    ),
  },
  {
    name: 'UI/UX Design',
    category: 'Design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    name: 'Animation / Motion',
    category: 'Design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 6.36 15.36" />
        <path d="M12 3v9l6 3" />
      </svg>
    ),
  },
  { name: 'JavaScript',   category: 'Language',     icon: brandIcon(siJavascript.path) },
  { name: 'TypeScript',   category: 'Language',     icon: brandIcon(siTypescript.path) },
  { name: 'React',        category: 'Framework',    icon: brandIcon(siReact.path) },
  { name: 'Tailwind CSS', category: 'Styling',      icon: brandIcon(siTailwindcss.path) },
  { name: 'PostgreSQL',   category: 'Database',     icon: brandIcon(siPostgresql.path) },
  { name: 'Supabase',     category: 'Backend',      icon: brandIcon(siSupabase.path) },
  { name: 'PHP',          category: 'Backend',      icon: brandIcon(siPhp.path) },
  { name: 'MySQL',        category: 'Database',     icon: brandIcon(siMysql.path) },
  { name: 'Vercel',       category: 'Deployment',   icon: brandIcon(siVercel.path) },
  { name: 'Claude',       category: 'AI Assistant', icon: brandIcon(siClaude.path) },
  {
    name: 'VS Code',
    category: 'Editor',
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
        alt=""
        width={22}
        height={22}
        loading="lazy"
      />
    ),
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [helloSent, setHelloSent] = useState(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeImage, setActiveImage] = useState(0)

  // Swipe gesture refs
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const closeMenu = () => setMenuOpen(false)

  const openModal = (projectIndex: number) => {
    setActiveProject(projectIndex)
    setActiveImage(0)
    setModalOpen(true)
  }

  const closeModal = useCallback(() => setModalOpen(false), [])

  const nextImage = useCallback(() => {
    setActiveImage((current) => {
      const total = projects[activeProject]?.images.length ?? 1
      return (current + 1) % total
    })
  }, [activeProject])

  const prevImage = useCallback(() => {
    setActiveImage((current) => {
      const total = projects[activeProject]?.images.length ?? 1
      return (current - 1 + total) % total
    })
  }, [activeProject])

  // Keyboard + scroll lock
  useEffect(() => {
    if (!modalOpen) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
      if (event.key === 'ArrowRight') nextImage()
      if (event.key === 'ArrowLeft') prevImage()
    }

    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [modalOpen, closeModal, nextImage, prevImage])

  // ✨ Swipe gestures for the modal stage
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current

    // Ignore if the gesture is more vertical than horizontal (user is scrolling)
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) {
      touchStartX.current = null
      touchStartY.current = null
      return
    }

    if (dx < 0) nextImage()
    else prevImage()

    touchStartX.current = null
    touchStartY.current = null
  }

  const project = projects[activeProject]
  const totalImages = project?.images.length ?? 0
  const activeCaption = project?.images[activeImage]?.caption

  return (
    <main>
      <header className="site-header shell">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Aeron Brixter Aure home">
          <span>Aeron Brixter Aure </span>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <div id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Designer / Developer <span className="eyebrow-dot" aria-hidden="true" /></p>
          <h1>Making digital things feel <em>human.</em></h1>
          <p className="hero-intro">I&apos;m Aeron, a creative developer based in Manila. I build thoughtful interfaces, useful tools, and little moments of delight.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">See selected work <ArrowUpRight size={16} /></a>
            <a className="text-link" href="mailto:aureaeronbrixter@gmail.com">Let&apos;s talk <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="hero-mark">
          <div className="profile-frame">
            <Image
              src="/profile.jpg"
              alt="Portrait of Aeron Brixter Aure"
              width={305}
              height={305}
              priority
              className="profile-img"
            />
          </div>
          <p>Curious by nature.<br />Precise by practice.</p>
        </div>
      </div>

      <section id="work" className="section shell">
        <div className="section-heading">
          <p className="eyebrow">01 / Selected work</p>
          <div className="section-heading-right">
            <p className="section-note">A few things I&apos;ve made along the way.</p>
            <a className="button button-outline" href="https://github.com/BrixterDev" target="_blank" rel="noreferrer">View live projects <ArrowUpRight size={15} /></a>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((p, index) => (
            <article className="project-card" key={p.number}>
              <button
                type="button"
                className={`project-art ${p.tone}`}
                onClick={() => openModal(index)}
                aria-label={`Open ${p.title} image gallery`}
              >
                <Image
                  src={p.images[0].src}
                  alt={`${p.title} screenshot`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="project-img"
                />
                <span className="project-number">{p.number}</span>
              </button>

              <div className="project-meta">
                <p className="project-type">Featured project</p>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className="project-link" href={p.url} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section shell section">
        <div className="section-heading"><p className="eyebrow">02 / A little about me</p></div>
        <div className="about-grid">
          <h2>Good work lives somewhere between a clear idea and a <em>careful detail.</em></h2>
          <div className="about-copy">
            <p>I enjoy turning rough ideas into digital experiences that are easy to understand and genuinely nice to use. My toolkit spans interface design, front-end development, animation, and AI-assisted workflows.</p>
            <p>When I&apos;m away from the screen, you&apos;ll probably find me exploring a new creative tool or thinking about how to make the next thing a little better.</p>
            <a className="text-link" href="mailto:aureaeronbrixter@gmail.com">More about me <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section section shell">
        <div className="section-heading">
          <p className="eyebrow">03 / Skills &amp; tools</p>
          <p className="section-note">The things I reach for most.</p>
        </div>

        <div className="skills-marquee" aria-label="Skills and tools">
          <div className="skills-track">
            {[...skills, ...skills].map((skill, i) => (
              <div className="skill-tile" key={`${skill.name}-${i}`}>
                <div className="skill-tile-icon">{skill.icon}</div>
                <div className="skill-tile-info">
                  <span className="skill-tile-name">{skill.name}</span>
                  <span className="skill-tile-category">{skill.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section shell section">
        <div className="contact-panel">
          <p className="eyebrow">04 / Start a conversation</p>
          <h2>Have a good idea?<br /><em>Let&apos;s make it real.</em></h2>
          <div className="contact-bottom">
            <p>Open for freelance collaborations and full-time opportunities.</p>
            <button className="button button-dark" type="button" onClick={() => setHelloSent(true)}>Say hello <Mail size={15} /></button>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <div><span className="footer-mark">AB</span><span>© 2026 Aeron Brixter Aure</span></div>
        <div className="footer-links">
          <a href="mailto:aureaeronbrixter@gmail.com"><Mail size={14} /> aureaeronbrixter@gmail.com</a>
          <a href="https://github.com/BrixterDev" target="_blank" rel="noreferrer"><ArrowUpRight size={14} /> GitHub</a>
          <a href="https://www.linkedin.com/in/aeron-brixter-aure-ab73823a8/" target="_blank" rel="noreferrer"><ArrowUpRight size={14} /> LinkedIn</a>
          <span><MapPin size={14} /> Manila, PH</span>
        </div>
      </footer>

      {helloSent && (
        <div className="toast" role="status">
          <span className="toast-icon"><Check size={15} /></span>
          Thanks — I&apos;ll be in touch.
          <button type="button" onClick={() => setHelloSent(false)} aria-label="Dismiss message"><X size={15} /></button>
        </div>
      )}

      {/* ✨ Professional Project Gallery Modal */}
      {modalOpen && project && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} image gallery`}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            {/* Header */}
            <header className="modal-header">
              <div className="modal-title-group">
                <div className="modal-eyebrow-row">
                  <span className="modal-eyebrow">Project {project.number}</span>
                  <span className="modal-eyebrow-divider" aria-hidden="true">·</span>
                  <span className="modal-eyebrow-muted">
                    {totalImages} {totalImages === 1 ? 'image' : 'images'}
                  </span>
                </div>
                <h3 className="modal-title">{project.title}</h3>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
                aria-label="Close gallery"
              >
                <X size={18} />
              </button>
            </header>

            {/* Stage */}
            <div
              className="modal-stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {totalImages > 1 && (
                <button
                  type="button"
                  className="modal-nav modal-nav-prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

            <div className="modal-image-wrap">
              {project.images.map((img, i) => (
                <div
                  key={img.src}
                  className={`modal-slide ${i === activeImage ? 'is-active' : ''}`}
                  aria-hidden={i !== activeImage}
                >
                  <Image
                    src={img.src}
                    alt={img.caption || `${project.title} — image ${i + 1} of ${totalImages}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 90vw"
                    className="modal-img"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>

              {totalImages > 1 && (
                <button
                  type="button"
                  className="modal-nav modal-nav-next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              )}

              {totalImages > 1 && (
                <div className="modal-counter-pill" aria-hidden="true">
                  <span className="modal-counter-current">{String(activeImage + 1).padStart(2, '0')}</span>
                  <span className="modal-counter-sep">/</span>
                  <span className="modal-counter-total">{String(totalImages).padStart(2, '0')}</span>
                </div>
              )}
            </div>

            {/* ✨ Caption bar */}
            {activeCaption && (
              <div className="modal-caption" aria-live="polite">
                <span className="modal-caption-index">
                  {String(activeImage + 1).padStart(2, '0')}
                </span>
                <span className="modal-caption-text">{activeCaption}</span>
              </div>
            )}

            {/* Thumbnail strip */}
            {totalImages > 1 && (
              <div className="modal-thumbs" role="tablist" aria-label="Gallery thumbnails">
                {project.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    role="tab"
                    aria-selected={i === activeImage}
                    aria-label={`Go to image ${i + 1}`}
                    className={`modal-thumb ${i === activeImage ? 'is-active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="modal-thumb-img"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Footer */}
            <footer className="modal-footer">
              <div className="modal-tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>

              <div className="modal-meta">
                <span className="modal-kbd-hint" aria-hidden="true">
                  <kbd>←</kbd><kbd>→</kbd> to navigate · <kbd>Esc</kbd> to close
                </span>
                <a
                  className="modal-link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View live project <ArrowUpRight size={13} />
                </a>
              </div>
            </footer>
          </div>
        </div>
      )}
    </main>
  )
}
