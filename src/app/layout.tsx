import type { Metadata } from 'next'
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
  title: 'Alex Sterling | Full-Stack Engineer & 3D Web Specialist',
  description: 'Visionary Full-Stack Engineer specializing in immersive 3D web experiences and next-gen interfaces. Expert in React, Next.js, Three.js, and modern web technologies.',
  keywords: ['Full-Stack Developer', 'Web Developer', '3D Web', 'Three.js', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Alex Sterling' }],
  creator: 'Alex Sterling',
  publisher: 'Alex Sterling',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourportfolio.com',
    title: 'Alex Sterling | Full-Stack Engineer & 3D Web Specialist',
    description: 'Visionary Full-Stack Engineer specializing in immersive 3D web experiences and next-gen interfaces.',
    siteName: 'Alex Sterling Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Sterling | Full-Stack Engineer',
    description: 'Visionary Full-Stack Engineer specializing in immersive 3D web experiences.',
    creator: '@alexsterling',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.variable, outfit.variable, orbitron.variable, "antialiased selection:bg-cyan-500/30 selection:text-cyan-100 bg-background text-foreground overflow-x-hidden")}>
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
          </HudLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
