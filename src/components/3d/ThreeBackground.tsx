'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

function Stars(props: any) {
  const ref = useRef<any>(null)
  
  const sphere = useMemo(() => {
    const count = 5000;
    const radius = 1.5;
    const points = new Float32Array(count * 3);
    for(let i=0; i<count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        points[i*3] = r * Math.sin(phi) * Math.cos(theta);
        points[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        points[i*3+2] = r * Math.cos(phi);
    }
    return points;
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15
        
        // Mouse interaction
        const x = state.pointer.x
        const y = state.pointer.y
        ref.current.rotation.x += y * 0.01
        ref.current.rotation.y += x * 0.01
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#4f46e5" 
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-transparent pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  )
}
