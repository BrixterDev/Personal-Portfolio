export const site = {
  name: 'Aeron Brixter Aure',
  shortName: 'AB',
  title: 'Full Stack Web Developer',
  email: 'aureaeronbrixter@gmail.com',
  location: 'Manila, PH',
  locationFull: 'Manila, Philippines',
  github: 'https://github.com/BrixterDev',
  linkedin: 'https://www.linkedin.com/in/aeron-brixter-aure-ab73823a8/',
  resumeHref: '/Aeron%20Brixter%20Aure.pdf',
  resumeFileName: 'Aeron Brixter Aure.pdf',
}

export const mailtoHref = (subject = 'Portfolio Inquiry') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`

export type NavItem = {
  id: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
]

export type ProjectImage = {
  src: string
  caption: string
}

export type Project = {
  number: string
  slug: string
  title: string
  description: string
  role: string
  contributions: string[]
  tags: string[]
  images: ProjectImage[]
  liveUrl?: string
  repoUrl?: string
  featured: boolean
  tone: 'clay' | 'sage' | 'sand'
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'hrhelper',
    title: 'HRHelper',
    description:
      'An HR management system for tracking employee records, payroll, attendance, and applicants.',
    role: 'Full Stack Developer',
    contributions: ['Lead developer', 'Front-end development', 'Back-end development'],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Supabase'],
    images: [
      { src: '/projects/helper/01.png', caption: 'Admin dashboard with live headcount metrics' },
      { src: '/projects/helper/02.png', caption: 'Employee directory with role-based filters' },
      { src: '/projects/helper/03.png', caption: 'Attendance tracker and shift schedule' },
      { src: '/projects/helper/04.png', caption: 'Leave request queue with approval workflow' },
      { src: '/projects/helper/05.png', caption: 'Payroll generation with tax breakdown' },
      { src: '/projects/helper/06.png', caption: 'Recruitment pipeline — applicants by stage' },
      { src: '/projects/helper/07.png', caption: 'Audit logs — CSV, PDF, and summary' },
    ],
    liveUrl: 'https://hr-helper-nine.vercel.app/',
    repoUrl: 'https://github.com/BrixterDev/HR-Helper',
    featured: true,
    tone: 'clay',
  },
  {
    number: '02',
    slug: 'kick-box-barber-studio',
    title: 'Kick Box Barber Studio',
    description: 'A reservation management website for Kick Box Barber Studio.',
    role: 'Full Stack Developer',
    contributions: ['Lead developer', 'Front-end development', 'Back-end development'],
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    images: [
      { src: '/projects/kick-box-barber-studio/1.png', caption: 'Homepage with the “Look sharp. Feel good.” hero' },
      { src: '/projects/kick-box-barber-studio/2.png', caption: 'About and services sections' },
      { src: '/projects/kick-box-barber-studio/3.png', caption: 'Selected work gallery' },
      { src: '/projects/kick-box-barber-studio/4.png', caption: 'Four-step reservation flow' },
    ],
    liveUrl: 'https://kick-box-studio.vercel.app/',
    repoUrl: 'https://github.com/BrixterDev/Kick-Box-Barber-Studio',
    featured: true,
    tone: 'sand',
  },
  {
    number: '03',
    slug: 'pc-simulator',
    title: 'PC Simulator',
    description:
      'A playful configuration experience built to make complex hardware feel approachable.',
    role: 'Full Stack Developer',
    contributions: ['Lead developer', 'Front-end development', 'Back-end development'],
    tags: ['C#', 'Unity 3D', 'Blender'],
    images: [
      { src: '/projects/pc-simulator/01.png', caption: 'Workshop scene with the pickup task prompt' },
      { src: '/projects/pc-simulator/02.png', caption: 'Installation checklist and component controls' },
    ],
    featured: false,
    tone: 'sage',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const otherProjects = projects.filter((project) => !project.featured)

export type ExperienceItem = {
  role: string
  organization: string
  period: string
  responsibilities: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Freelance Full Stack Developer',
    organization: 'Freelance',
    period: 'January 2025 – Present',
    responsibilities: ['Design and build custom websites and web applications for clients.'],
  },
  {
    role: 'IT Support Intern',
    organization: 'Bellah Beatrix Cosmetic Products Trading',
    period: 'March – June 2026',
    responsibilities: [
      'Provide hardware and software technical support for company computers.',
      'Manage social media accounts to promote and sell products.',
      'Assist customers with inquiries and concerns.',
    ],
  },
]

export type SkillIcon =
  | 'ai'
  | 'design'
  | 'fullstack'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'tailwind'
  | 'postgresql'
  | 'supabase'
  | 'php'
  | 'mysql'
  | 'vercel'
  | 'claude'
  | 'vscode'

export type Skill = {
  name: string
  category: string
  icon: SkillIcon
}

export const skills: Skill[] = [
  { name: 'AI Prompting', category: 'Workflow', icon: 'ai' },
  { name: 'UI/UX Design', category: 'Design', icon: 'design' },
  { name: 'Full Stack Development', category: 'Development', icon: 'fullstack' },
  { name: 'JavaScript', category: 'Language', icon: 'javascript' },
  { name: 'TypeScript', category: 'Language', icon: 'typescript' },
  { name: 'React', category: 'Framework', icon: 'react' },
  { name: 'Tailwind CSS', category: 'Styling', icon: 'tailwind' },
  { name: 'PostgreSQL', category: 'Database', icon: 'postgresql' },
  { name: 'Supabase', category: 'Backend', icon: 'supabase' },
  { name: 'PHP', category: 'Backend', icon: 'php' },
  { name: 'MySQL', category: 'Database', icon: 'mysql' },
  { name: 'Vercel', category: 'Deployment', icon: 'vercel' },
  { name: 'Claude', category: 'AI Assistant', icon: 'claude' },
  { name: 'VS Code', category: 'Editor', icon: 'vscode' },
]
