'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TypewriterProps {
  text: string
  className?: string
  delay?: number
}

export default function TypewriterText({ text, className = '', delay = 0 }: TypewriterProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <h2 ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{
            duration: 0.05,
            delay: delay + index * 0.03,
            ease: 'easeOut'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h2>
  )
}
