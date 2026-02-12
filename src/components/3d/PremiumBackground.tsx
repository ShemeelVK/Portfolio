'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, Box } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry() {
  return (
    <>
      {/* Main centerpiece - DNA-like helix */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Torus args={[2, 0.3, 16, 100]} position={[-3, 2, -5]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshDistortMaterial
            color="#00FFFF"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0}
            metalness={0.8}
            emissive="#00FFFF"
            emissiveIntensity={0.5}
          />
        </Torus>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
        <Torus args={[2, 0.3, 16, 100]} position={[-3, -2, -5]} rotation={[Math.PI / 2, 0, Math.PI]}>
          <MeshDistortMaterial
            color="#FF00FF"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0}
            metalness={0.8}
            emissive="#FF00FF"
            emissiveIntensity={0.5}
          />
        </Torus>
      </Float>

      {/* Floating geometric shapes */}
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
        <Octahedron args={[0.8]} position={[4, 3, -3]}>
          <MeshDistortMaterial
            color="#00FFFF"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={1}
            emissive="#00FFFF"
            emissiveIntensity={0.3}
          />
        </Octahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1}>
        <Box args={[1, 1, 1]} position={[3, -3, -4]}>
          <MeshDistortMaterial
            color="#FF00FF"
            attach="material"
            distort={0.2}
            speed={1.8}
            roughness={0.1}
            metalness={1}
            emissive="#FF00FF"
            emissiveIntensity={0.3}
          />
        </Box>
      </Float>

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <Sphere args={[0.6, 32, 32]} position={[-4, -1, -3]}>
          <MeshDistortMaterial
            color="#00FFFF"
            attach="material"
            distort={0.5}
            speed={2.5}
            roughness={0}
            metalness={1}
            emissive="#00FFFF"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={1.5} floatIntensity={0.8}>
        <Octahedron args={[0.5]} position={[5, 0, -6]}>
          <MeshDistortMaterial
            color="#FF00FF"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={1}
            emissive="#FF00FF"
            emissiveIntensity={0.3}
          />
        </Octahedron>
      </Float>

      {/* Ambient shapes in background */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <Torus args={[1.5, 0.2, 16, 100]} position={[0, 4, -8]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#00FFFF"
            roughness={0.2}
            metalness={0.8}
            emissive="#00FFFF"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>

      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <Box args={[1.2, 1.2, 1.2]} position={[-5, 1, -7]}>
          <meshStandardMaterial
            color="#FF00FF"
            roughness={0.2}
            metalness={0.8}
            emissive="#FF00FF"
            emissiveIntensity={0.2}
            transparent
            opacity={0.5}
          />
        </Box>
      </Float>
    </>
  )
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    state.camera.position.x = Math.sin(t * 0.1) * 0.5
    state.camera.position.y = Math.cos(t * 0.15) * 0.3
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00FF" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#FFFFFF" />
        
        <FloatingGeometry />
        <CameraRig />
      </Canvas>
    </div>
  )
}
