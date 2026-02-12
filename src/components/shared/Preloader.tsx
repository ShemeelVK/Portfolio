'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState('INITIALIZING SYSTEM...')

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 800)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 150)

    const textTimer = setInterval(() => {
      const texts = [
        'LOADING ASSETS...',
        'CALIBRATING SENSORS...',
        'ESTABLISHING CONNECTION...',
        'DECRYPTING DATA...',
        'SYSTEM READY'
      ]
      setText(texts[Math.floor(Math.random() * texts.length)])
    }, 800)

    return () => {
      clearInterval(timer)
      clearInterval(textTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -1000 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-cyan-500 font-mono"
        >
          <div className="w-64 space-y-4">
            <div className="flex justify-between text-xs tracking-widest">
              <span>{text}</span>
              <span>{Math.min(100, Math.floor(progress))}%</span>
            </div>
            
            <div className="h-1 w-full bg-cyan-900/30 overflow-hidden relative">
              <motion.div
                className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-4 gap-1 opacity-50">
               {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: Math.random() > 0.5 ? 1 : 0.2 }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="h-1 w-1 bg-cyan-500 rounded-full"
                  />
               ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
