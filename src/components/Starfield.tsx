import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export function Starfield() {
  // Load background from public/assets/
  const texture = useLoader(THREE.TextureLoader, '/assets/8k_stars_milky_way.jpg');

  return (
    <mesh>
      {/* Increased size to 5000 to encompass the larger solar system */}
      <sphereGeometry args={[5000, 64, 64]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.BackSide} 
        transparent={false}
        opacity={1}
      />
    </mesh>
  );
}