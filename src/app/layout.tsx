import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter, Outfit, Orbitron } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import clsx from 'clsx'
import SmoothScroll from '@/components/shared/SmoothScroll'
import InteractiveBackground from '@/components/3d/InteractiveBackground'
import Preloader from '@/components/shared/Preloader'
import CustomCursor from '@/components/ui/CustomCursor'
import ThemeToggle from '@/components/shared/ThemeToggle'
import HudLayout from '@/components/sci-fi/HudLayout'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'Shemeel Sakeer | Full Stack .NET Engineer',
  description: 'Portfolio of Shemeel Sakeer, a Full Stack Developer specializing in .NET Core, C#, React, and modern web architecture. Building scalable Web APIs and high-performance web applications.',
  keywords: ['Full Stack Developer', '.NET Core', 'C#', 'ASP.NET', 'Web API', 'React', 'Next.js', 'TypeScript', 'SQL Server', 'Microservices', 'Clean Architecture', 'Kerala', 'India'],
  authors: [{ name: 'Shemeel Sakeer' }],
  creator: 'Shemeel Sakeer',
  publisher: 'Shemeel Sakeer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shemeel-portfolio.vercel.app', 
    title: 'Shemeel Sakeer | Full Stack .NET Engineer',
    description: 'Specializing in .NET Core, React, and building scalable enterprise-grade web applications.',
    siteName: 'Shemeel Sakeer Portfolio',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Shemeel Sakeer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shemeel Sakeer | Full Stack .NET Engineer',
    description: 'Building scalable web solutions with .NET Core and React.',
    creator: '@ShemeelVK', 
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import JsonLd from '@/components/seo/JsonLd'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.variable, outfit.variable, orbitron.variable, "antialiased selection:bg-cyan-500/30 selection:text-cyan-100 bg-background text-foreground overflow-x-hidden")}>
        <JsonLd />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <HudLayout>
            <Preloader />
            <CustomCursor />
            <SmoothScroll />
            <InteractiveBackground />
            
            {/* ThemeToggle hidden but kept if logic needed later, mostly strict dark now */}
            <div className="hidden">
              <ThemeToggle />
            </div>

            <Toaster position="bottom-right" theme="dark" toastOptions={{
              style: {
                background: 'rgba(5, 5, 10, 0.9)',
                border: '1px solid rgba(0, 243, 255, 0.3)',
                color: '#00f3ff',
                fontFamily: 'var(--font-orbitron)',
              }
            }} />
            
            <div className="relative z-10 min-h-screen flex flex-col">
                {children}
            </div>
            <Analytics />
            <SpeedInsights />
          </HudLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
