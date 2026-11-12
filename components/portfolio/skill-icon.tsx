import {
  siClaude,
  siJavascript,
  siMysql,
  siPhp,
  siPostgresql,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from 'simple-icons'
import { Code2 } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SkillIcon as SkillIconName } from '@/lib/content'

const brandIcon = (path: string) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
)

const icons: Record<SkillIconName, ReactNode> = {
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4L12 3z" />
      <path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  fullstack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 6.36 15.36" />
      <path d="M12 3v9l6 3" />
    </svg>
  ),
  javascript: brandIcon(siJavascript.path),
  typescript: brandIcon(siTypescript.path),
  react: brandIcon(siReact.path),
  tailwind: brandIcon(siTailwindcss.path),
  postgresql: brandIcon(siPostgresql.path),
  supabase: brandIcon(siSupabase.path),
  php: brandIcon(siPhp.path),
  mysql: brandIcon(siMysql.path),
  vercel: brandIcon(siVercel.path),
  claude: brandIcon(siClaude.path),
  vscode: <Code2 aria-hidden="true" />,
}

export function SkillIcon({ name }: { name: SkillIconName }) {
  return <>{icons[name]}</>
}
