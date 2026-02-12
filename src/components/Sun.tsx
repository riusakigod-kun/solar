import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useSolarSystemStore } from '../store';

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { selectPlanet, selectedPlanet } = useSolarSystemStore();
  const isSelected = selectedPlanet === 'Sun';
  
  const sunTexture = useLoader(THREE.TextureLoader, '/assets/8k_sun.jpg');

  useFrame((_, delta) => { // Changed state to _
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Sun sphere */}
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          selectPlanet(isSelected ? null : 'Sun');
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[30, 64, 64]} /> 
        <meshBasicMaterial
          map={sunTexture}
          color="#ffffff"
          toneMapped={false} 
        />
      </mesh>

      {/* Glow Effect */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2.5}
        distance={10000}
        decay={0} 
        color="#FDB813"
      />
      
      {/* Outer Glow Sprite */}
      <mesh>
        <sphereGeometry args={[32, 32, 32]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}