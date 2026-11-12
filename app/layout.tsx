import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aeron Brixter Aure — Full Stack Web Developer',
    template: '%s — Aeron Brixter Aure',
  },
  description:
    'Portfolio of Aeron Brixter Aure, a full stack web developer from Manila building thoughtful interfaces, useful tools, and reliable web applications.',
  applicationName: 'Aeron Brixter Aure Portfolio',
  authors: [{ name: 'Aeron Brixter Aure' }],
  creator: 'Aeron Brixter Aure',
  keywords: [
    'Aeron Brixter Aure',
    'Full Stack Web Developer',
    'Web Developer',
    'React Developer',
    'Next.js',
    'Portfolio',
    'Manila',
    'Philippines',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: 'Aeron Brixter Aure — Full Stack Web Developer',
    description:
      'Full stack web developer from Manila building thoughtful interfaces, useful tools, and reliable web applications.',
    siteName: 'Aeron Brixter Aure',
    images: [
      {
        url: '/profile.jpg',
        width: 1086,
        height: 1448,
        alt: 'Aeron Brixter Aure',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Aeron Brixter Aure — Full Stack Web Developer',
    description:
      'Full stack web developer from Manila building thoughtful interfaces, useful tools, and reliable web applications.',
    images: ['/profile.jpg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f2ea',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
