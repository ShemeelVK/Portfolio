'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { ExtendedUser } from '@/types'
import GlitchText from '@/components/sci-fi/GlitchText'

import SpaceBackground from '@/components/3d/SpaceBackground'

export default function Hero({ user }: { user: ExtendedUser | null }) {
  return (
    <section id="hero" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      
      {/* 3D Space Background */}
      <SpaceBackground />

      {/* Grid Floor Effect (Optional overlay) */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(200px) scale(3)',
          transformOrigin: 'bottom center',
        }}
      />

      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          
          {/* Avatar Hologram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group z-20 -mt-16 mb-10 h-64 w-64 flex items-center justify-center"
          >
             <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,243,255,0.3)] bg-black/80 flex items-center justify-center overflow-hidden">
                <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden">
                  <Image 
                    src="/profile.png"
                    alt="Shemeel Sakeer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Scanline Overlay on Avatar */}
                <div className="absolute inset-0 bg-[url('/scanline.png')] bg-cover opacity-30 pointer-events-none mix-blend-overlay"></div>
                
                {/* Rotating Ring */}
                <div className="absolute inset-0 border border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent rounded-full animate-spin [animation-duration:3s]"></div>
            </div>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/80 border border-cyan-500/50 text-cyan-400 text-xs font-mono tracking-widest uppercase rounded whitespace-nowrap">
                Full Stack Engineer
            </div>
          </motion.div>
          
          <div className="space-y-4 max-w-4xl relative z-10 min-h-[120px]">
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-orbitron leading-tight pb-2 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              <GlitchText text="SHEMEEL SAKEER" as="span" className="text-white" />
            </h1>
 
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl font-rajdhani tracking-wide border-l-2 border-cyan-500/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
               Engineering robust <span className="text-cyan-400">scalable solutions</span> with .NET Core and React. 
               Specializing in clean architecture, secure APIs, and high-performance web applications.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-2"
          >
            <Link
              href="#projects"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-none border border-cyan-500 bg-transparent px-8 font-medium text-cyan-500 transition-all duration-300 hover:bg-cyan-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
            >
              <span className="mr-2">INITIALIZE PROJECTS</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-10 bg-cyan-500/20 translate-y-full transition-transform group-hover:translate-y-0"></div>
            </Link>

            <Link
              href="/Shemeel%20Resume%20(.NET%20Full%20Stack%20Developer).pdf"
              target="_blank"
              download
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-none border border-cyan-500/50 bg-cyan-900/10 px-8 font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>ACCESS DATA LOGS (CV)</span>
              <div className="absolute inset-0 -z-10 bg-cyan-400/10 translate-y-full transition-transform group-hover:translate-y-0"></div>
            </Link>

            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-none border border-gray-700 bg-black/50 px-8 text-sm font-medium text-gray-300 backdrop-blur-sm transition-colors hover:border-purple-500 hover:text-purple-400"
            >
              ESTABLISH UPLINK
            </Link>
          </motion.div>

          <div className="w-full flex justify-center gap-8 mt-6">
            <a href="https://github.com/ShemeelVK" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:scale-110 flex items-center justify-center">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/shemeel-sakeer" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:scale-110 flex items-center justify-center">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:shameelvk95@gmail.com" className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:scale-110 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </a>
             <a href="https://wa.me/919605621681" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors transform hover:scale-110 flex items-center justify-center">
                <FaWhatsapp className="w-6 h-6" />
             </a>
          </div>
        </div>
      </div>
    </section>
  )
}
