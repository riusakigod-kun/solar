// src/components/SolarSystem.tsx
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { CameraController } from './CameraController';

import { planetData } from '../data/planet';

export function SolarSystem() {
  

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 185, 340]} fov={60} far={20000} />
      
      <OrbitControls
        makeDefault 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={5000} 
      />

      <CameraController />

      <Starfield />
      <Sun />
      
      {planetData.map((planet) => (
        <Planet key={planet.name} {...planet} />
      ))}

      <ambientLight intensity={0.15} />
    </>
  );
}