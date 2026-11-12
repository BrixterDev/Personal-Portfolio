'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { GithubIcon } from '@/components/portfolio/brand-icons'
import type { Project } from '@/lib/content'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const totalImages = project?.images.length ?? 0
  const activeCaption = project?.images[activeImage]?.caption

  useEffect(() => {
    setActiveImage(0)
  }, [project?.slug])

  const nextImage = useCallback(() => {
    if (totalImages < 2) return
    setActiveImage((current) => (current + 1) % totalImages)
  }, [totalImages])

  const prevImage = useCallback(() => {
    if (totalImages < 2) return
    setActiveImage((current) => (current - 1 + totalImages) % totalImages)
  }, [totalImages])

  useEffect(() => {
    if (!project) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextImage()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        prevImage()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )

      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [project, onClose, nextImage, prevImage])

  if (!project) return null

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
    touchStartY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return

    const dx = event.changedTouches[0].clientX - touchStartX.current
    const dy = event.changedTouches[0].clientY - touchStartY.current

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

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        <header className="modal-header">
          <div className="modal-title-group">
            <p className="modal-eyebrow">
              Project {project.number}
              <span aria-hidden="true"> · </span>
              {project.featured ? 'Featured' : 'Project'}
            </p>
            <h2 id="project-modal-title" className="modal-title">{project.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        <div className="modal-body">
          <div className="modal-gallery">
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
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
              )}

              <div className="modal-image-wrap">
                {project.images.map((image, index) => (
                  <div
                    key={image.src}
                    className={`modal-slide ${index === activeImage ? 'is-active' : ''}`}
                    aria-hidden={index !== activeImage}
                  >
                    <Image
                      src={image.src}
                      alt={image.caption || `${project.title} — image ${index + 1} of ${totalImages}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 70vw"
                      className="modal-img"
                      priority={index === 0}
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
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              )}

              {totalImages > 1 && (
                <span className="modal-counter-pill" aria-hidden="true">
                  {String(activeImage + 1).padStart(2, '0')}
                  <span>/</span>
                  {String(totalImages).padStart(2, '0')}
                </span>
              )}
            </div>

            <div className="modal-caption" aria-live="polite">
              <span className="modal-caption-index" aria-hidden="true">
                {String(activeImage + 1).padStart(2, '0')}
              </span>
              <span className="modal-caption-text">{activeCaption}</span>
            </div>

            {totalImages > 1 && (
              <div className="modal-thumbs" aria-label="Project images">
                {project.images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={`modal-thumb ${index === activeImage ? 'is-active' : ''}`}
                    aria-label={`Show image ${index + 1}: ${image.caption}`}
                    aria-current={index === activeImage ? 'true' : undefined}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="82px"
                      className="modal-thumb-img"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="modal-details">
            <p className="modal-details-label">About this project</p>
            <p id="project-modal-description" className="modal-description">
              {project.description}
            </p>

            <dl className="modal-facts">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Contribution</dt>
                <dd>
                  <ul>
                    {project.contributions.map((contribution) => (
                      <li key={contribution}>{contribution}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="modal-details-block">
              <p className="modal-details-label">Technologies</p>
              <div className="tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="modal-actions">
              {project.liveUrl && (
                <a
                  className="button button-dark"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  className="button button-outline"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={15} /> Source code
                </a>
              )}
            </div>

            <p className="modal-kbd-hint" aria-hidden="true">
              Use <kbd>←</kbd><kbd>→</kbd> to browse images · <kbd>Esc</kbd> to close
            </p>

            <span className="sr-only">
              External project links open in a new tab.
            </span>
          </aside>
        </div>
      </div>
    </div>
  )
}
