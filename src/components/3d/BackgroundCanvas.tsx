'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CursorParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        
        // Calculate distance from mouse
        const dx = x - mouseRef.current.x * 5
        const dy = y - mouseRef.current.y * 5
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Push particles away from cursor
        if (dist < 2) {
          positions[i] += dx * 0.01
          positions[i + 1] += dy * 0.01
        }
        
        // Gentle floating animation
        positions[i + 2] = Math.sin(state.clock.elapsedTime + i) * 0.5
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Generate particle positions (fewer on mobile)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 300 : 1000
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3
  }

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00FFFF"
        size={isMobile ? 0.03 : 0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <CursorParticles />
      </Canvas>
    </div>
  )
}
