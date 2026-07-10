import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Career OS',
  title: {
    default: 'Career OS · Career decisions made clearer',
    template: '%s · Career OS',
  },
  description:
    'Turn your priorities, skills, work samples, and market signals into realistic career paths and a practical action plan.',
  openGraph: {
    title: 'Career OS · Career decisions made clearer',
    description: 'Turn career uncertainty into a clear next move.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1728,
        height: 910,
        alt: 'Career OS career navigation dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career OS · Career decisions made clearer',
    description: 'Turn career uncertainty into a clear next move.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#111826' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
