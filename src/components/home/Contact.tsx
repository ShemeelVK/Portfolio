'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, User, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import * as yup from 'yup'
import TypewriterText from '@/components/ui/TypewriterText'

const contactSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
})

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

      toast.success('Message sent successfully!')
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
    <section id="contact" className="py-20 w-full min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center space-y-4 mb-16"
        >
          <TypewriterText
            text="Get In Touch"
            className="text-4xl font-bold tracking-tighter md:text-5xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary"
          />
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-neon-cyan"></div>
          <p className="max-w-[600px] text-gray-400 mt-4 md:text-lg">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 space-y-6 hover:border-primary/30 transition-colors"
            >
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                        placeholder="Tell me about your project..."
                    />
                </div>

                <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:scale-105 shadow-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Send Message
                  </>
                )}
              </button>
            </motion.form>
        </div>
      </div>
    </section>
  )
}
