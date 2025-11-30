import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';

const Blob = ({ position, color, scale = 1, speed = 1, distort = 0.4 }) => {
  const ref = useRef(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Gentle rotation
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = t * 0.1 * speed;
      ref.current.rotation.z = t * 0.15 * speed;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.1}
        roughness={0.2}
        distort={distort}
        speed={speed}
      />
    </Sphere>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#C5A059" />
        
        {/* Main Floating Group */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
            
            {/* Center large blob - Soft Cream */}
            <Blob position={[-4, 2, -2]} color="#EBE9E1" scale={2.2} speed={1.2} distort={0.5} />
            
            {/* Accent - Gold */}
            <Blob position={[-0.5, 3, 0]} color="#C5A059" scale={0.9} speed={1.8} distort={0.3} />
            
            {/* Accent - Soft White */}
            <Blob position={[-6.5, 1, 1]} color="#FFFFFF" scale={1} speed={1.5} distort={0.4} />
            
            {/* Distant small accent - Darker Stone */}
            <Blob position={[-5, 2, 2]} color="#A8A29E" scale={0.8} speed={2} distort={0.6} />

             {/* Top left accent */}
             <Blob position={[0, 0, 4]} color="#D6D3CD" scale={0.9} speed={1} distort={0.3} />

        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
