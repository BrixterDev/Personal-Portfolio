'use client'

import Image from 'next/image'
import { ArrowUpRight, ExternalLink, Images } from 'lucide-react'
import { GithubIcon } from '@/components/portfolio/brand-icons'
import type { Project } from '@/lib/content'

type ProjectCardProps = {
  project: Project
  onDetails: (project: Project) => void
  priority?: boolean
}

export function ProjectCard({ project, onDetails, priority = false }: ProjectCardProps) {
  const compact = !project.featured

  return (
    <article className={`project-card ${compact ? 'is-compact' : 'is-featured'}`}>
      <button
        type="button"
        className={`project-art ${project.tone}`}
        onClick={(event) => {
          event.currentTarget.focus()
          onDetails(project)
        }}
        aria-label={`Open ${project.title} project details and image gallery`}
      >
        <Image
          src={project.images[0].src}
          alt={`${project.title} screenshot — ${project.images[0].caption}`}
          fill
          priority={priority}
          sizes={
            compact
              ? '(max-width: 767px) 100vw, 480px'
              : '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 600px'
          }
          className="project-img"
        />
        <span className="project-badge">{project.featured ? 'Featured' : 'Project'}</span>
        <span className="project-number" aria-hidden="true">{project.number}</span>
        <span className="project-art-hint" aria-hidden="true">
          <Images size={15} /> View gallery
        </span>
      </button>

      <div className="project-meta">
        <p className="project-role">{project.role}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <p className="project-contributions">
          <span>Contribution</span>
          {project.contributions.join(' · ')}
        </p>

        <div className="tags" aria-label="Technologies used">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="project-actions">
          <button
            type="button"
            className="project-action project-action-details"
            onClick={(event) => {
              event.currentTarget.focus()
              onDetails(project)
            }}
          >
            <Images size={14} aria-hidden="true" />
            Details
          </button>

          {project.liveUrl && (
            <a
              className="project-action"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live site
            </a>
          )}

          {project.repoUrl && (
            <a
              className="project-action"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={14} />
              Source code
            </a>
          )}

          {!compact && (
            <span className="project-arrow" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
