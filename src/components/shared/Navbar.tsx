'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: '/ HOME', path: '/' },
  { name: '/ ABOUT', path: '#about' },
  { name: '/ DATA', path: '#projects' }, /* Projects renamed to DATA for sci-fi feel */
  { name: '/ LOGS', path: '#experience' }, /* Experience renamed to LOGS */
  { name: '/ UPLINK', path: '#contact' }, /* Contact renamed to UPLINK */
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 z-40 w-full transition-all duration-300 border-b',
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-cyan-900/50'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <Link 
            href="/" 
            className="text-xl font-bold tracking-widest hover:opacity-80 transition-opacity z-10 font-orbitron"
          >
            <span className="text-cyan-500">DEV</span>
            <span className="text-white">PORTFOLIO</span>
            <span className="text-purple-500 animate-pulse">_</span>
          </Link>

          {/* Desktop Nav - Centered (absolute positioning) */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-xs font-mono font-bold text-gray-400 hover:text-cyan-400 transition-colors relative group tracking-widest"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_cyan]"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            href="#contact"
            className="hidden md:inline-flex h-9 items-center justify-center border border-cyan-500/30 bg-cyan-500/10 px-6 text-xs font-mono font-bold text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] clip-angle"
          >
            INITIATE
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 absolute right-4 text-cyan-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-lg border-b border-cyan-900/50 p-6 z-50"
        >
          <nav className="flex flex-col gap-4 font-mono">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors py-2 border-b border-gray-800"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex h-10 items-center justify-center border border-cyan-500/50 bg-cyan-500/10 px-6 text-sm font-bold text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all mt-4"
            >
              INITIATE UPLINK
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
