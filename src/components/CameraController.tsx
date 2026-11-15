import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSolarSystemStore } from '../store';
import { planetData } from '../data/planet';
import { OrbitControls } from 'three-stdlib';

export function CameraController() {
  const { selectedPlanet, timeSpeed } = useSolarSystemStore();
  const { camera, controls, clock } = useThree();

  useFrame(() => {
    const orbitControls = controls as unknown as OrbitControls;
    if (!orbitControls) return;

    if (selectedPlanet) {
      // 1. FIND THE TARGET POSITION
      let targetPos = new THREE.Vector3(0, 0, 0);
      let targetSize = 5;

      if (selectedPlanet === 'Sun') {
        targetPos.set(0, 0, 0);
        targetSize = 42;
      } 
      else if (selectedPlanet === 'Moon') {
        const earth = planetData.find((p) => p.name === 'Earth');
        if (earth) {
          const time = clock.getElapsedTime() * timeSpeed;
          
          // Earth Position
          const earthX = Math.cos(time * earth.speed) * earth.distance;
          const earthZ = Math.sin(time * earth.speed) * earth.distance;
          
          // Target position: Earth + Fixed Offset for Moon view
          targetPos.set(earthX + 10, 0, earthZ); 
          targetSize = 1.5;
        }
      }
      else {
        // Planet Calculation
        const planet = planetData.find((p) => p.name === selectedPlanet);
        if (planet) {
          const time = clock.getElapsedTime() * timeSpeed * planet.speed;
          targetPos.x = Math.cos(time) * planet.distance;
          targetPos.z = Math.sin(time) * planet.distance;
          targetSize = planet.size;
        }
      }

      // 2. MOVE CONTROLS TARGET
      orbitControls.target.lerp(targetPos, 0.1);

      // 3. MOVE CAMERA
      const currentDist = camera.position.distanceTo(targetPos);
      const desiredDist = targetSize * 5; 

      if (currentDist > desiredDist) {
        const direction = camera.position.clone().sub(targetPos).normalize();
        const desiredPos = targetPos.clone().add(direction.multiplyScalar(desiredDist));
        camera.position.lerp(desiredPos, 0.05);
      }
    }
    
    orbitControls.update();
  });

  return null;
}