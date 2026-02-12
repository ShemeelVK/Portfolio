'use client'

import { motion } from 'framer-motion'
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPostgresql, SiPrisma, SiGraphql, SiDocker, SiGit, SiFigma, 
  SiPython, SiMongodb, SiRedis, SiDotnet, SiJavascript, SiHtml5, SiCss3
} from 'react-icons/si'
import { TbBrandThreejs, TbApi } from 'react-icons/tb'
import { VscCode } from 'react-icons/vsc'
import GlitchText from '@/components/sci-fi/GlitchText'
import { Skill } from '@prisma/client'

// Mapping for specific styling of known skills
const skillMetadata: Record<string, { icon: any, color: string }> = {
  'C#': { icon: SiDotnet, color: '#239120' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'HTML5': { icon: SiHtml5, color: '#E34F26' },
  'CSS3': { icon: SiCss3, color: '#1572B6' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Three.js': { icon: TbBrandThreejs, color: '#FFFFFF' },
  '.NET Core': { icon: SiDotnet, color: '#512BD4' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Web API': { icon: TbApi, color: '#FFFFFF' },
  'SQL Server': { icon: SiPostgresql, color: '#CC2927' },
  'Prisma': { icon: SiPrisma, color: '#2D3748' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Git': { icon: SiGit, color: '#F05032' },
  'VS Code': { icon: VscCode, color: '#007ACC' },
  'Figma': { icon: SiFigma, color: '#F24E1E' },
}

export default function SkillsSection({ skills = [] }: { skills?: Skill[] }) {
  
  // Group skills by category
  const groupedSkills = (skills || []).reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  // Define category order (optional, to keep layout consistent)
  const categoryOrder = ['Languages', 'Frontend', 'Backend', 'Database', 'DevOps & Tools', 'Other']
  
  // Sort categories based on predefined order, then others
  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a)
    const idxB = categoryOrder.indexOf(b)
    if (idxA !== -1 && idxB !== -1) return idxA - idxB
    if (idxA !== -1) return -1
    if (idxB !== -1) return 1
    return a.localeCompare(b)
  })

  return (
    <section id="skills" className="py-28 w-full relative overflow-hidden min-h-screen">
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron drop-shadow-[0_0_10px_rgba(0,243,255,0.2)] mb-4">
              <GlitchText text="TECHNICAL ARSENAL" className="text-white" />
            </h2>
            <div className="h-1 w-24 bg-cyan-500 mx-auto shadow-[0_0_10px_cyan]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCategories.map((category, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="holo-glass p-6 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors group"
            >
              <h3 className="text-xl font-bold font-orbitron text-cyan-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-sm"></span>
                {category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {groupedSkills[category].map((skill, sIdx) => {
                    const meta = skillMetadata[skill.name]
                    const Icon = meta?.icon
                    
                    return (
                        <div key={skill.id} className="relative group/skill">
                            <div className="flex items-center gap-2 px-3 py-2 bg-black/40 rounded border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all cursor-default">
                            {Icon ? (
                                <Icon className="w-4 h-4" style={{ color: meta.color }} />
                            ) : (
                                <span className="text-lg leading-none">{skill.icon || '🔹'}</span>
                            )}
                            <span className="text-sm font-mono text-gray-300 group-hover/skill:text-white">{skill.name}</span>
                            </div>
                        </div>
                    )
                })}
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 border-t border-r border-cyan-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

