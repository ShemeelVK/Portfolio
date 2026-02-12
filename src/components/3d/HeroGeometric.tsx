'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function HeroGeometric() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#00FFFF" // Neon Cyan
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  )
}
