'use client'

import { useEffect, useRef, useState } from 'react'

export default function LightPillar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0.5
    let mouseY = 0.5
    let time = 0

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dark background
      ctx.fillStyle = 'rgba(6, 0, 16, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw multiple vertical light beams
      const numBeams = 5
      for (let i = 0; i < numBeams; i++) {
        const offset = (i - numBeams / 2) * 150
        const xPos = canvas.width / 2 + offset + Math.sin(time + i) * 50
        const influenced = xPos + (mouseX - 0.5) * 200

        // Create vertical gradient for lightning beam
        const gradient = ctx.createLinearGradient(influenced, 0, influenced, canvas.height)
        
        // Top color (cyan/purple)
        gradient.addColorStop(0, `rgba(138, 43, 226, ${0.8 - i * 0.1})`)
        gradient.addColorStop(0.3, `rgba(200, 100, 255, ${0.9 - i * 0.1})`)
        gradient.addColorStop(0.5, `rgba(255, 100, 255, ${1 - i * 0.1})`)
        gradient.addColorStop(0.7, `rgba(200, 100, 255, ${0.9 - i * 0.1})`)
        gradient.addColorStop(1, `rgba(138, 43, 226, ${0.6 - i * 0.1})`)

        // Draw main beam with glow
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        
        // Outer glow
        ctx.filter = 'blur(60px)'
        ctx.fillStyle = gradient
        ctx.fillRect(influenced - 80, 0, 160, canvas.height)

        // Middle glow
        ctx.filter = 'blur(30px)'
        ctx.fillRect(influenced - 40, 0, 80, canvas.height)

        // Sharp center beam
        ctx.filter = 'blur(5px)'
        ctx.fillRect(influenced - 10, 0, 20, canvas.height)

        // Add lightning-like distortions
        ctx.filter = 'none'
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(influenced, 0)
        
        let y = 0
        while (y < canvas.height) {
          const zigzag = Math.sin(time * 3 + y * 0.01 + i) * 15
          ctx.lineTo(influenced + zigzag, y)
          y += 50 + Math.random() * 50
        }
        ctx.stroke()

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', background: '#060010' }}
    />
  )
}
