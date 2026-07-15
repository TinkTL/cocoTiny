import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000',
  ),
  title: 'CocoTiny — Independent Game Art Assets',
  description:
    'CocoTiny selects independent game art assets full of emotions, creativity, and bold ideas.',
  applicationName: 'CocoTiny',
  icons: {
    icon: '/cocotiny-logo.png',
    apple: '/cocotiny-logo.png',
  },
  openGraph: {
    title: 'CocoTiny — Independent Game Art Assets',
    description:
      'Explore expressive independent game art assets selected for their creativity and bold ideas.',
    type: 'website',
    images: [{ url: '/hero-title.png', alt: 'CocoTiny game assets' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CocoTiny — Independent Game Art Assets',
    description:
      'Explore expressive independent game art assets selected for their creativity and bold ideas.',
    images: ['/hero-title.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf6f0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
