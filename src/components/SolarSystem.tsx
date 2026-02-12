import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { CameraController } from './CameraController'; // <--- IMPORT THIS
import { useSolarSystemStore } from '../store';
import { planetData } from '../data/planet'; // <--- IMPORT THIS

export function SolarSystem() {
  const { resetCamera } = useSolarSystemStore();

  return (
    <Canvas
      style={{ width: '100%', height: '100%', background: '#000010' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetCamera();
        }
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 400, 500]} fov={60} far={20000} />
      
      {/* makeDefault is CRITICAL for CameraController to access controls */}
      <OrbitControls
        makeDefault 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={5000} 
      />

      {/* --- LOGIC COMPONENTS --- */}
      <CameraController />

      {/* --- SCENE COMPONENTS --- */}
      <Starfield />
      <Sun />
      
      {planetData.map((planet) => (
        <Planet key={planet.name} {...planet} />
      ))}

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={2.5} decay={0} distance={10000} />
    </Canvas>
  );
}