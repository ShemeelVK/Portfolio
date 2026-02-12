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

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C#', icon: SiDotnet, color: '#239120' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    ]
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Three.js', icon: TbBrandThreejs, color: '#FFFFFF' },
      { name: 'Framer Motion', icon: null, color: '#FFFFFF' }, // Icon placeholder
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: '.NET Core', icon: SiDotnet, color: '#512BD4' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Web API', icon: TbApi, color: '#FFFFFF' },
    ]
  },
  {
    title: 'Database',
    skills: [
      { name: 'SQL Server', icon: SiPostgresql, color: '#CC2927' }, // Using PG icon as placeholder or find MSSQL
      { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    ]
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'VS Code', icon: VscCode, color: '#007ACC' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    ]
  }
]

export default function SkillsSection() {
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
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="holo-glass p-6 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors group"
            >
              <h3 className="text-xl font-bold font-orbitron text-cyan-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-sm"></span>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="relative group/skill">
                    <div className="flex items-center gap-2 px-3 py-2 bg-black/40 rounded border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all cursor-default">
                      {skill.icon && (
                        <skill.icon className="w-4 h-4" style={{ color: skill.color }} />
                      )}
                      <span className="text-sm font-mono text-gray-300 group-hover/skill:text-white">{skill.name}</span>
                    </div>
                  </div>
                ))}
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
