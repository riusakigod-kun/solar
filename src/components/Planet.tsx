import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber'; // Removed unused useLoader
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSolarSystemStore } from '../store';

// --- 1. MOON SUB-COMPONENT ---
function Moon() {
  const moonGroupRef = useRef<THREE.Group>(null);
  const { isPaused, timeSpeed, selectPlanet, selectedPlanet } = useSolarSystemStore();
  const isSelected = selectedPlanet === 'Moon';

  // Load Moon Texture
  const texture = useMemo(() => {
    return new THREE.TextureLoader().load(
      '/assets/8k_moon.jpg', 
      undefined, 
      undefined,  
      () => console.warn("Moon texture missing.") 
    );
  }, []);

  useFrame((_, delta) => { // Changed state to _
    if (!moonGroupRef.current || isPaused) return;
    moonGroupRef.current.rotation.y += delta * 0.8 * timeSpeed;
  });

  return (
    <group ref={moonGroupRef}>
      <mesh 
        position={[10, 0, 0]} 
        onClick={(e) => {
          e.stopPropagation(); 
          selectPlanet(isSelected ? null : 'Moon');
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[1.2, 32, 32]} /> 
        <meshStandardMaterial 
          map={texture} 
          color={texture ? "#ffffff" : "#aaaaaa"}
          roughness={0.8}
          emissive={isSelected ? '#444444' : '#000000'}
        />
      </mesh>
    </group>
  );
}

// --- 2. MAIN PLANET COMPONENT ---
interface PlanetProps {
  name: string;
  size: number;
  distance: number;
  speed: number;
  color: string;
  texture?: string;
  hasRings?: boolean;
}

export function Planet({ name, size, distance, speed, color, texture, hasRings }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { selectPlanet, selectedPlanet, isPaused, timeSpeed } = useSolarSystemStore();

  // Load Planet Texture
  const planetTexture = useMemo(() => {
    if (texture) {
      const loader = new THREE.TextureLoader();
      return loader.load(
        `/assets/${texture}`, 
        undefined, 
        undefined, 
        () => console.warn(`Failed to load: ${texture}`)
      );
    }
    return null;
  }, [texture]);

  // Load Saturn Ring Texture
  const ringTexture = useMemo(() => {
    if (hasRings && name === 'Saturn') {
      const loader = new THREE.TextureLoader();
      return loader.load('/assets/8k_saturn_ring_alpha.png');
    }
    return null;
  }, [hasRings, name]);

  useFrame((state, delta) => {
    if (!groupRef.current || isPaused) return;

    // Orbit around Sun
    const time = state.clock.getElapsedTime() * timeSpeed * speed;
    groupRef.current.position.x = Math.cos(time) * distance;
    groupRef.current.position.z = Math.sin(time) * distance;

    // Planet Rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5 * timeSpeed;
    }
  });

  const isSelected = selectedPlanet === name;

  return (
    <group ref={groupRef}>
      {/* Orbit Path Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.2, distance + 0.2, 128]} />
        <meshBasicMaterial color="#334466" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* The Planet Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          selectPlanet(isSelected ? null : name);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          color={planetTexture ? '#ffffff' : color}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
          roughness={0.5}
        />
      </mesh>

      {/* --- ADD MOON IF EARTH --- */}
      {name === 'Earth' && <Moon />}

      {/* Saturn Rings */}
      {hasRings && name === 'Saturn' && (
        <mesh rotation={[-Math.PI / 2 + 0.3, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2.2, 128]} />
          <meshStandardMaterial
            map={ringTexture}
            color="#d4af37"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Planet Name Label */}
      <Html distanceFactor={size * 10} position={[0, size + (size * 0.5), 0]}>
        <div style={{
          color: 'white',
          fontSize: '14px',
          fontFamily: 'Orbitron, sans-serif',
          pointerEvents: 'none',
          textShadow: '0 0 4px black',
          whiteSpace: 'nowrap',
          opacity: 0.8
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
}