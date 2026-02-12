'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Orbs configuration
    const orbs = [
      { x: 0.2, y: 0.3, radius: 300, speed: 0.0005, angle: 0 },
      { x: 0.7, y: 0.6, radius: 250, speed: 0.0007, angle: Math.PI },
      { x: 0.5, y: 0.8, radius: 200, speed: 0.0006, angle: Math.PI / 2 },
    ]

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Theme-aware colors
      const isDark = theme === 'dark'
      const colors = isDark
        ? ['rgba(0, 255, 255, 0.15)', 'rgba(255, 0, 255, 0.15)', 'rgba(138, 43, 226, 0.15)']
        : ['rgba(59, 130, 246, 0.12)', 'rgba(168, 85, 247, 0.12)', 'rgba(236, 72, 153, 0.12)']

      orbs.forEach((orb, index) => {
        // Update orb position with slow circular motion
        orb.angle += orb.speed
        const baseX = canvas.width * orb.x + Math.cos(orb.angle) * 100
        const baseY = canvas.height * orb.y + Math.sin(orb.angle) * 100

        // Subtle attraction to mouse (very gentle)
        const dx = mouseX - baseX
        const dy = mouseY - baseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const pull = Math.min(distance / 10, 50)

        const finalX = baseX + (dx / distance) * pull * 0.3
        const finalY = baseY + (dy / distance) * pull * 0.3

        // Create gradient
        const gradient = ctx.createRadialGradient(
          finalX, finalY, 0,
          finalX, finalY, orb.radius
        )
        gradient.addColorStop(0, colors[index])
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
