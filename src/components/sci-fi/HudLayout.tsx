'use client'

import { useEffect, useState } from 'react'

export default function HudLayout({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    const timer = setInterval(updateTime, 1000)
    updateTime()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden scanlines vignette font-orbitron text-cyan-500">
      
      {/* Top Left Status */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-1 pointer-events-none mix-blend-difference opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-[10px] tracking-[0.2em] opacity-80">SYS.ONLINE</div>
        <div className="text-sm font-bold">{time}</div>
      </div>

      {/* Top Right Coordinates */}
      <div className="fixed top-4 right-4 z-50 text-right pointer-events-none mix-blend-difference opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-[10px] tracking-[0.2em] opacity-80">COORDINATES</div>
        <div className="text-xs font-mono">
          X: {mousePos.x.toString().padStart(4, '0')} <br/> 
          Y: {mousePos.y.toString().padStart(4, '0')}
        </div>
      </div>

      {/* Bottom Left System Data */}
      <div className="fixed bottom-4 left-4 z-50 pointer-events-none mix-blend-difference">
        <div className="flex gap-2 text-[10px] tracking-widest opacity-60">
          <span>CPU: 34%</span>
          <span>MEM: 12GB</span>
          <span>NET: SECURE</span>
        </div>
      </div>

      {/* Bottom Right Version */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none mix-blend-difference">
        <div className="text-xs tracking-[0.2em]">VER 2.5.0</div>
      </div>

      {/* Decorative Lines */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent z-50 opacity-50"></div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent z-50 opacity-50"></div>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 h-24 w-[1px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent z-50 opacity-30"></div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 h-24 w-[1px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent z-50 opacity-30"></div>

      {/* Main Content Area */}
      <div className="relative z-0 h-full w-full">
        {children}
      </div>

    </div>
  )
}
