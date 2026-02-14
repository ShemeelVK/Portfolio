'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'clicking'>('default')
  const { theme } = useTheme()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Check for text selection
      const target = e.target as HTMLElement
      const computedStyle = window.getComputedStyle(target)
      if (computedStyle.cursor === 'text' || target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3') {
        if (cursorVariant !== 'hover' && cursorVariant !== 'clicking') {
            // setCursorVariant('text') // Optional: separate text variant
        }
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorVariant('hover')
      } else {
        setCursorVariant('default')
      }
    }

    const handleMouseDown = () => setCursorVariant('clicking')
    const handleMouseUp = () => setCursorVariant('default')

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorVariant])

  const variants = {
    default: {
      height: 16,
      width: 16,
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: theme === 'dark' ? '#00ffff' : '#000000',
      mixBlendMode: 'difference' as any
    },
    hover: {
      height: 64,
      width: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: theme === 'dark' ? '#00ffff' : '#000000',
      mixBlendMode: 'difference' as any,
      opacity: 0.5
    },
    text: {
      height: 32,
      width: 4,
      x: mousePosition.x - 2,
      y: mousePosition.y - 16,
      backgroundColor: theme === 'dark' ? '#00ffff' : '#000000',
      mixBlendMode: 'difference' as any
    },
    clicking: {
      height: 12,
      width: 12,
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      scale: 0.8,
      backgroundColor: '#ff00ff', // Click feedback color
      mixBlendMode: 'normal' as any
    }
  }

  // Ring animation
  const ringVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      opacity: 0.5,
      scale: 1,
      borderColor: '#00ffff'
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      opacity: 1,
      scale: 1.1,
      borderColor: '#00ffff',
      transition: {
        type: "spring" as const,
        mass: 0.6
      }
    },
    text: {
      opacity: 0
    },
    clicking: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      opacity: 0.8,
      scale: 0.5,
      borderColor: '#ff00ff'
    }
  }

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-500 pointer-events-none z-[9998]"
        variants={ringVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  )
}
