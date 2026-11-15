import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useSolarSystemStore } from '../store';

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const { selectPlanet, selectedPlanet } = useSolarSystemStore();
  const isSelected = selectedPlanet === 'Sun';
  const sunTexture = useLoader(THREE.TextureLoader, '/assets/8k_sun.jpg');
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to create the Sun glow texture.');
    }

    const gradient = context.createRadialGradient(128, 128, 4, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255, 246, 210, 0.9)');
    gradient.addColorStop(0.13, 'rgba(255, 177, 69, 0.62)');
    gradient.addColorStop(0.38, 'rgba(255, 102, 24, 0.22)');
    gradient.addColorStop(1, 'rgba(255, 65, 12, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (glowRef.current) {
      const pulse = 170 + Math.sin(state.clock.elapsedTime * 0.8) * 7;
      glowRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group>
      <sprite ref={glowRef} scale={[170, 170, 1]} renderOrder={1}>
        <spriteMaterial
          map={glowTexture}
          color="#ffad52"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </sprite>

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
        <sphereGeometry args={[42, 64, 64]} />
        <meshBasicMaterial
          map={sunTexture}
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={4}
        distance={10000}
        decay={0}
        color="#FDB813"
      />

      <mesh>
        <sphereGeometry args={[44, 32, 32]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}