'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2, Briefcase } from 'lucide-react'
import type { Experience } from '@prisma/client'
import GlitchText from '@/components/sci-fi/GlitchText'
import { format } from 'date-fns'

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const formatDate = (date: Date) => format(new Date(date), 'MMM yyyy')

  return (
    <section id="experience" className="py-28 w-full relative overflow-hidden min-h-screen">
       
       {/* Circuit Board Background Pattern */}
       <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%2300f3ff' stroke-width='1'/%3E%3Cpath d='M30 30h40v40h-40z' fill='none' stroke='%23bc13fe' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
       ></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center text-center mb-20 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SYSTEM LOGS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron drop-shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            <GlitchText text="Experience Timeline" className="text-white" />
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Circuit Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 md:-translate-x-1/2 opacity-30"></div>
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Connector Node */}
                <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full border-2 border-cyan-500 bg-black z-20 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center shadow-[0_0_15px_cyan]">
                   <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>

                {/* Content Side */}
                <div className="flex-1 ml-12 md:ml-0 pt-2 md:pt-0">
                  <div className="group relative holo-glass p-6 rounded-lg hover:border-cyan-400/50 transition-all duration-300">
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                        <h3 className="text-xl font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">
                          {experience.role}
                        </h3>
                        <span className="px-3 py-1 text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded">
                           {formatDate(experience.startDate)} - {experience.current ? 'Present' : (experience.endDate ? formatDate(experience.endDate) : '')}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-300">{experience.company}</span>
                        </div>
                        {experience.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{experience.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-300 leading-relaxed font-rajdhani">
                        {experience.description}
                      </p>
                    </div>

                    {/* Corner Decors */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
                  </div>
                </div>

                {/* Empty Spacer Side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
