'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // TWEAK HERE for "Smoothness" vs "Snappiness"
      // duration: 1.2 - 1.5 is "Luxurious/Heavy" (Awwwards style)
      // duration: 0.8 - 1.0 is "Standard/Responsive"
      duration: 1.7, 

      // Easing controls the curve of the stop.
      // Current: Exponential ease-out (starts fast, stops gently)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle anchor links with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
           lenis.scrollTo(href, { offset: -80 }) // Offset for fixed header
        }
      })
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
