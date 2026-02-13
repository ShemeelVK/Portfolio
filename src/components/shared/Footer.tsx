'use client'

import Link from 'next/link'
import { SiGithub, SiLinkedin, SiX, SiInstagram, SiWhatsapp } from 'react-icons/si'
import { motion } from 'framer-motion'
import GlitchText from '@/components/sci-fi/GlitchText'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/ShemeelVK', icon: SiGithub },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shemeel-sakeer', icon: SiLinkedin },
    { name: 'WhatsApp', href: 'https://wa.me/919605621681', icon: SiWhatsapp },
    { name: 'Instagram', href: 'https://instagram.com/shemeel_vk', icon: SiInstagram },
  ]

  return (
    <footer className="relative w-full border-t border-cyan-500/20 bg-black/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold font-orbitron text-cyan-400 tracking-wider hover:text-cyan-300 transition-colors">
              SHEMEEL SAKEER
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Building immersive digital experiences at the intersection of design and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-orbitron text-lg text-white">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#hero" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-cyan-400 transition-colors">About</Link></li>
              <li><Link href="#projects" className="hover:text-cyan-400 transition-colors">Projects</Link></li>
              <li><Link href="#experience" className="hover:text-cyan-400 transition-colors">Experience</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="font-orbitron text-lg text-white">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/10 hover:border-cyan-500/50"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Shemeel Sakeer. All rights reserved.</p>
          <p className="font-mono">
            System Status: <span className="text-green-500">ONLINE</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
