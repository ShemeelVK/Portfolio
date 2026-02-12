'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import type { Project, Tag } from '@prisma/client'
import TypewriterText from '@/components/ui/TypewriterText'
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'
import { motion } from 'framer-motion'

type ProjectWithTags = Project & { tags: Tag[] }

export default function ProjectsSection({ projects }: { projects: ProjectWithTags[] }) {
  return (
    <section id="projects" className="py-20 w-full relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 mb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center space-y-4"
        >
          <TypewriterText
            text="Featured Projects"
            className="text-4xl font-bold tracking-tighter md:text-5xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary font-orbitron"
          />
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-neon-cyan"></div>
          <p className="max-w-[600px] text-gray-400 mt-4 md:text-lg">
            Cutting-edge applications pushing the boundaries of web technology
          </p>
        </motion.div>
      </div>

      {/* Scroll Stack Container - Standard Document Flow */}
      <div className="max-w-5xl mx-auto px-4 pb-40">
        <ScrollStack>
          {projects.map((project, index) => (
            <ScrollStackItem key={project.id} index={index}>
              <div className="group relative bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden clip-angle transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                <div className="grid md:grid-cols-2 gap-0 h-full">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-96 overflow-hidden bg-black/50">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                        <Code2 className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60" />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between p-8 bg-gray-900/50">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-3xl font-bold font-orbitron text-white group-hover:text-primary transition-colors text-glow">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="px-3 py-1 text-xs font-bold rounded-none bg-primary/20 text-primary border border-primary/50 tracking-wider">
                            FEATURED
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-base leading-relaxed font-light tracking-wide">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span
                            key={tag.id}
                            className="px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-950/30 group-hover:bg-cyan-900/50 transition-colors"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:scale-[1.02] transition-all clip-angle group/btn"
                        >
                          <Github className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
                          <span>CODE</span>
                        </Link>
                      )}
                      {project.demoUrl && (
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 border border-primary/50 text-primary font-bold hover:bg-primary/20 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all clip-angle"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>LIVE DEMO</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
