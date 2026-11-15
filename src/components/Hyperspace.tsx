import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_COUNT = 900;
const NEAR_DISTANCE = 5;
const FAR_DISTANCE = 180;
const GALAXY_STAR_COUNT = 16000;

function createGalaxyGeometry() {
  const positions = new Float32Array(GALAXY_STAR_COUNT * 3);
  const colors = new Float32Array(GALAXY_STAR_COUNT * 3);
  const armColors = [
    new THREE.Color('#62cfff'),
    new THREE.Color('#9c8cff'),
    new THREE.Color('#ff84bd'),
    new THREE.Color('#ffc18b'),
  ];

  for (let i = 0; i < GALAXY_STAR_COUNT; i += 1) {
    const isCore = i < 2200;
    const isArmStar = i >= 2200 && i < 14200;
    const radius = isCore
      ? Math.pow(Math.random(), 1.8) * 5
      : Math.sqrt(Math.random()) * 25;
    let angle = Math.random() * Math.PI * 2;

    if (isArmStar) {
      const arm = Math.floor(Math.random() * 4);
      const armAngle = (arm / 4) * Math.PI * 2;
      const armSpread = (0.08 + radius * 0.008) * (Math.random() - 0.5);
      angle = armAngle + radius * 0.24 + armSpread;
    }

    const scatter = isArmStar && Math.random() < 0.35 ? 1.4 : 1;
    const index = i * 3;
    positions[index] = Math.cos(angle) * radius * scatter;
    positions[index + 1] = Math.sin(angle) * radius * 0.62 * scatter;
    positions[index + 2] = (Math.random() - 0.5) * (isCore ? 1.3 : 2.2);

    let color: THREE.Color;
    if (isCore) {
      color = new THREE.Color('#fff0c2').lerp(
        new THREE.Color('#ff9d67'),
        Math.min(radius / 7, 0.65),
      );
    } else if (isArmStar) {
      const arm = Math.floor(Math.random() * armColors.length);
      color = armColors[arm].clone().lerp(
        new THREE.Color('#ffffff'),
        Math.random() * 0.48,
      );
    } else {
      color = armColors[Math.floor(Math.random() * armColors.length)].clone();
    }

    const brightness = isCore ? 0.75 + Math.random() * 0.65 : 0.32 + Math.random() * 0.68;
    colors[index] = color.r * brightness;
    colors[index + 1] = color.g * brightness;
    colors[index + 2] = color.b * brightness;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function Galaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const glowMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(createGalaxyGeometry, []);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current || !materialRef.current) return;

    elapsed.current += delta;
    const progress = Math.min(elapsed.current / 6.4, 1);
    const approach = THREE.MathUtils.smoothstep(progress, 0.28, 0.92);
    const fade = THREE.MathUtils.smoothstep(progress, 0.76, 0.98);

    groupRef.current.position.z = -58 + approach * 46;
    groupRef.current.scale.setScalar(0.9 + approach * 0.45);
    groupRef.current.rotation.z += delta * (0.045 + approach * 0.12);
    materialRef.current.opacity = 1 - fade;
    if (glowMaterialRef.current) {
      glowMaterialRef.current.uniforms.uOpacity.value = 1 - fade;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -58]} rotation={[0.18, -0.12, 0]}>
      <points geometry={geometry} frustumCulled={false}>
        <pointsMaterial
          ref={materialRef}
          vertexColors
          size={0.34}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh position={[0, 0, 0.5]}>
        <planeGeometry args={[26, 26]} />
        <shaderMaterial
          ref={glowMaterialRef}
          uniforms={{ uOpacity: { value: 1 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
          fragmentShader="uniform float uOpacity; varying vec2 vUv; void main() { float d = length((vUv - 0.5) * 2.0); float glow = exp(-d * 5.0) * (1.0 - smoothstep(0.25, 1.0, d)); vec3 color = mix(vec3(0.25, 0.52, 1.0), vec3(1.0, 0.68, 0.42), exp(-d * 12.0)); gl_FragColor = vec4(color, glow * 0.62 * uOpacity); }"
        />
      </mesh>
    </group>
  );
}

function StarTunnel() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const { camera, size } = useThree();
  const stars = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 6);
    const colors = new Float32Array(STAR_COUNT * 6);
    const slopes = new Float32Array(STAR_COUNT * 2);
    const distances = new Float32Array(STAR_COUNT);
    const speeds = new Float32Array(STAR_COUNT);
    const tints = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#9dd8ff'),
      new THREE.Color('#c6a9ff'),
      new THREE.Color('#e3f4ff'),
    ];

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random());
      slopes[i * 2] = Math.cos(angle) * radius;
      slopes[i * 2 + 1] = Math.sin(angle) * radius;
      distances[i] = NEAR_DISTANCE + Math.random() * (FAR_DISTANCE - NEAR_DISTANCE);
      speeds[i] = 0.75 + Math.random() * 0.75;

      const tint = tints[Math.floor(Math.random() * tints.length)];
      const brightness = 0.55 + Math.random() * 0.45;
      for (let vertex = 0; vertex < 2; vertex += 1) {
        const colorIndex = (i * 2 + vertex) * 3;
        colors[colorIndex] = tint.r * brightness;
        colors[colorIndex + 1] = tint.g * brightness;
        colors[colorIndex + 2] = tint.b * brightness;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { geometry, slopes, distances, speeds };
  }, []);

  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!linesRef.current) return;

    elapsed.current += delta;
    const progress = Math.min(elapsed.current / 6.4, 1);
    const acceleration = 1 + progress * progress * 18;
    const trailLength = 1.5 + progress * 13;
    const halfFov = THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov / 2);
    const verticalSpread = Math.tan(halfFov);
    const horizontalSpread = verticalSpread * (size.width / Math.max(size.height, 1));
    const positions = stars.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < STAR_COUNT; i += 1) {
      let distance = stars.distances[i] - delta * acceleration * stars.speeds[i];
      if (distance <= NEAR_DISTANCE) {
        distance = FAR_DISTANCE - Math.random() * 8;
      }
      stars.distances[i] = distance;

      const slopeX = stars.slopes[i * 2] * horizontalSpread;
      const slopeY = stars.slopes[i * 2 + 1] * verticalSpread;
      const positionIndex = i * 6;

      positions[positionIndex] = slopeX * distance;
      positions[positionIndex + 1] = slopeY * distance;
      positions[positionIndex + 2] = -distance;
      positions[positionIndex + 3] = slopeX * (distance + trailLength);
      positions[positionIndex + 4] = slopeY * (distance + trailLength);
      positions[positionIndex + 5] = -(distance + trailLength);
    }

    stars.geometry.attributes.position.needsUpdate = true;
    if (materialRef.current) {
      materialRef.current.opacity = 0.45 + progress * 0.55;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={stars.geometry} frustumCulled={false}>
      <lineBasicMaterial ref={materialRef} vertexColors transparent opacity={0.75} depthWrite={false} />
    </lineSegments>
  );
}

export function Hyperspace() {
  return (
    <div className="hyperspace-scene" aria-hidden="true">
      <Canvas
        className="hyperspace-canvas"
        camera={{ position: [0, 0, 0], fov: 58, near: 0.1, far: 500 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor('#02030d', 0)}
      >
        <Galaxy />
        <StarTunnel />
      </Canvas>
    </div>
  );
}
