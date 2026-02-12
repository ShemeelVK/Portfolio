'use client'

import { useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p'
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*'

export default function GlitchText({ text, className = '', as: Component = 'span' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)

  const handleHover = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)
  }

  return (
    <Component 
      className={`relative inline-block hover:text-neon-cyan transition-colors cursor-default ${className}`}
      onMouseEnter={handleHover}
    >
      {displayText}
    </Component>
  )
}
