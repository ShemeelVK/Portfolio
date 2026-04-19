'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Terminal, Mail, Github, Linkedin, Network } from 'lucide-react'
import { toast } from 'sonner'
import * as yup from 'yup'
import GlitchText from '@/components/sci-fi/GlitchText'
import { ExtendedUser } from '@/types'

const contactSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
})

export default function ContactSection({ user }: { user?: ExtendedUser | null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      await contactSchema.validate(formData, { abortEarly: false })
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to send message')

      toast.success('Transmission successful.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach(err => {
          if (err.path) validationErrors[err.path] = err.message
        })
        setErrors(validationErrors)
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-28 w-full min-h-screen relative overflow-hidden flex items-center justify-center bg-[#030508]/50">
      {/* Deep Space / Cyber Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px]" />
        {/* Holographic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-20">
        
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="flex flex-col items-center justify-center text-center space-y-4 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest mb-2">
            <Network className="w-4 h-4" />
            COMM-LINK ESTABLISHED
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron drop-shadow-[0_0_10px_rgba(0,243,255,0.2)]">
             <GlitchText text="Initialize Contact" className="text-white" />
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_8px_cyan]"></div>
        </motion.div>

        {/* 2-Column Interface */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Status & Uplink */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="holo-glass p-8 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(0,243,255,0.05)] relative group overflow-hidden">
               {/* Hover scanner beam */}
               <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 -translate-y-full group-hover:animate-scanner shadow-[0_0_10px_cyan]"></div>

               <h3 className="text-xl font-orbitron text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                 <Terminal className="w-5 h-5 text-cyan-400" />
                 System Node Details
               </h3>
               
               {/* Global Status indicator */}
               <div className="flex items-center gap-4 mb-8 bg-black/40 p-4 rounded-lg border border-white/5">
                 <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-green-400 font-mono text-sm tracking-widest">STATUS: ONLINE</span>
                   <span className="text-gray-500 text-xs font-mono">Receiving Transmissions</span>
                 </div>
               </div>

               {/* Comms links */}
               <div className="space-y-3">
                  <a href="mailto:shameelvk95@gmail.com" className="flex items-center gap-4 group/link p-3 rounded-lg transition-colors bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-900/10">
                    <div className="w-10 h-10 rounded bg-black/50 flex items-center justify-center border border-white/10 group-hover/link:border-cyan-500/50 group-hover/link:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                      <Mail className="w-4 h-4 text-gray-400 group-hover/link:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Direct Email</div>
                      <div className="text-gray-300 font-rajdhani text-lg group-hover/link:text-white transition-colors">shameelvk95@gmail.com</div>
                    </div>
                  </a>

                  <a href="https://linkedin.com/in/shemeel-sakeer" target="_blank" rel="noreferrer" className="flex items-center gap-4 group/link p-3 rounded-lg transition-colors bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-900/10">
                    <div className="w-10 h-10 rounded bg-black/50 flex items-center justify-center border border-white/10 group-hover/link:border-cyan-500/50 group-hover/link:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                      <Linkedin className="w-4 h-4 text-gray-400 group-hover/link:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Professional Network</div>
                      <div className="text-gray-300 font-rajdhani text-lg group-hover/link:text-white transition-colors">LinkedIn Profile</div>
                    </div>
                  </a>

                  <a href="https://github.com/ShemeelVK" target="_blank" rel="noreferrer" className="flex items-center gap-4 group/link p-3 rounded-lg transition-colors bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-900/10">
                    <div className="w-10 h-10 rounded bg-black/50 flex items-center justify-center border border-white/10 group-hover/link:border-cyan-500/50 group-hover/link:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                      <Github className="w-4 h-4 text-gray-400 group-hover/link:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Code Repository</div>
                      <div className="text-gray-300 font-rajdhani text-lg group-hover/link:text-white transition-colors">GitHub Overview</div>
                    </div>
                  </a>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Transmission Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="relative holo-glass p-8 md:p-10 rounded-xl border border-white/10 shadow-2xl clip-angle bg-black/40 group/form transition-colors duration-500 hover:border-cyan-500/30">
               
               {/* Sci-fi Decorative Corners */}
               <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40 opacity-50 group-hover/form:opacity-100 transition-opacity"></div>
               <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40 opacity-50 group-hover/form:opacity-100 transition-opacity"></div>
               
               <div className="space-y-8">
                  {/* Name Input */}
                  <div className="space-y-2 relative">
                      <label htmlFor="name" className="block text-xs font-mono tracking-widest text-cyan-400 uppercase">Identification String</label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-transparent border-0 border-b-2 border-white/10 px-0 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-400 transition-colors font-rajdhani text-xl"
                          placeholder="Enter your name..."
                      />
                      {errors.name && <p className="text-red-400 text-xs font-mono mt-1 absolute -bottom-5">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 relative">
                      <label htmlFor="email" className="block text-xs font-mono tracking-widest text-cyan-400 uppercase">Return Address</label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent border-0 border-b-2 border-white/10 px-0 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-400 transition-colors font-rajdhani text-xl"
                          placeholder="your.email@domain.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs font-mono mt-1 absolute -bottom-5">{errors.email}</p>}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2 relative">
                      <label htmlFor="message" className="block text-xs font-mono tracking-widest text-cyan-400 uppercase">Encrypted Payload</label>
                      <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-md p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-400 transition-colors resize-none font-rajdhani text-lg mt-2"
                          placeholder="Type your message here..."
                      />
                      {errors.message && <p className="text-red-400 text-xs font-mono mt-1 absolute -bottom-5">{errors.message}</p>}
                  </div>
               </div>

                {/* Submit Button */}
                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative inline-flex items-center justify-center px-8 py-3 font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors clip-angle disabled:opacity-50 disabled:cursor-wait group/btn shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Terminal className="mr-2 h-4 w-4 animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
