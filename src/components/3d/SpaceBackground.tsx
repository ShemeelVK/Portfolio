'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Cloud } from '@react-three/drei'
import { useRef } from 'react'

function RotatingStars() {
  const ref = useRef<any>(null)
  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15
    }
  })
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#00f3ff" />
      <Sparkles count={100} scale={15} size={3} speed={0.3} opacity={0.3} color="#bc13fe" />
    </group>
  )
}

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
        <ambientLight intensity={0.1} />
      </Canvas>
      {/* Gradient Overlay to blend with site theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none opacity-80" />
    </div>
  )
}
