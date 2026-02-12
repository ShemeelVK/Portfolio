'use client'

import { motion } from 'framer-motion'
import { ExtendedUser } from '@/types'
import GlitchText from '@/components/sci-fi/GlitchText'

export default function AboutSection({ user }: { user: ExtendedUser | null }) {
  const stats = [
    { label: 'YEARS EXPERIENCE', value: '5+' },
    { label: 'PROJECTS COMPLETED', value: '42' },
    { label: 'HAPPY CLIENTS', value: '30+' },
    { label: 'TECHNOLOGIES', value: '15+' },
  ]

  return (
    <section id="about" className="py-28 w-full relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[2px] bg-cyan-500"></div>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron drop-shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            <GlitchText text="Target Analysis // ABOUT" className="text-white" />
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-12 gap-12 items-start"
        >
          {/* Main Content Card - Holo Glass Style */}
          <div className="md:col-span-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative holo-glass p-8 md:p-12 rounded-lg overflow-hidden">
              
              {/* Decorative Scanning Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/50 animate-[scan_4s_linear_infinite]"></div>

              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/70 mb-2">
                    <span className="animate-pulse">●</span> DECRYPTING BIOMETRIC DATA...
                 </div>

                {user?.bio ? (
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-rajdhani whitespace-pre-wrap">
                    {user.bio}
                  </p>
                ) : (
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-rajdhani">
                    I'm a visionary developer bridging the gap between data and design. 
                    Specializing in creating immersive digital experiences that push the boundaries of the web.
                  </p>
                )}

                <div className="mt-8 pt-8 border-t border-cyan-500/20">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1">
                           <span className="text-3xl font-bold font-orbitron text-white">{stat.value}</span>
                           <span className="text-[10px] tracking-widest text-cyan-500/70 font-mono uppercase">{stat.label}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Angle Clips */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>
            </div>
          </div>

          {/* Side Data Panel */}
          <div className="md:col-span-4 space-y-6">
             <div className="holo-glass p-6 rounded-lg border-l-4 border-l-purple-500">
                <h3 className="text-lg font-bold font-orbitron text-white mb-4">Core Directives</h3>
                <ul className="space-y-3 font-mono text-sm text-gray-400">
                   <li className="flex items-center gap-2">
                      <span className="text-purple-500">{'>'}</span> Innovation First
                   </li>
                   <li className="flex items-center gap-2">
                      <span className="text-purple-500">{'>'}</span> Clean Architecture
                   </li>
                   <li className="flex items-center gap-2">
                      <span className="text-purple-500">{'>'}</span> User-Centric Design
                   </li>
                </ul>
             </div>

             <div className="holo-glass p-6 rounded-lg border-l-4 border-l-cyan-500">
                <h3 className="text-lg font-bold font-orbitron text-white mb-4">Current Status</h3>
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_lime]"></div>
                   <span className="text-sm font-mono text-cyan-300">OPEN TO WORK</span>
                </div>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
