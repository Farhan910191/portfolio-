"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface FloatingObjectProps {
  position?: [number, number, number];
  scale?: number;
}

export default function FloatingObject({
  position = [0, 0, 0],
  scale = 1,
}: FloatingObjectProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.x += delta * 0.12;
    group.current.rotation.y += delta * 0.2;

    group.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.35}
      floatIntensity={0.8}
      floatingRange={[-0.15, 0.15]}
    >
      <group
        ref={group}
        position={position}
        scale={scale}
      >
        {/* Main Crystal */}
        <mesh>
          <icosahedronGeometry args={[1.25, 2]} />

          <meshPhysicalMaterial
            color="#606c38"
            metalness={0.65}
            roughness={0.18}
            transmission={0.25}
            thickness={1.2}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>

        {/* Inner Core */}
        <mesh scale={0.55}>
          <icosahedronGeometry args={[1.2, 1]} />

          <meshPhysicalMaterial
            color="#dda15e"
            metalness={0.8}
            roughness={0.12}
            emissive="#bc6c25"
            emissiveIntensity={0.18}
            clearcoat={1}
          />
        </mesh>

        {/* Orbit Ring 1 */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.025, 16, 100]} />

          <meshStandardMaterial
            color="#dda15e"
            emissive="#bc6c25"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Orbit Ring 2 */}
        <mesh rotation={[0.6, 0.8, 0.2]}>
          <torusGeometry args={[2, 0.018, 16, 100]} />

          <meshStandardMaterial
            color="#fefae0"
            emissive="#fefae0"
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Small Satellite */}
        <mesh position={[1.8, 0.4, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />

          <meshStandardMaterial
            color="#bc6c25"
            emissive="#bc6c25"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Small Satellite */}
        <mesh position={[-1.5, -0.8, 0.4]}>
          <sphereGeometry args={[0.08, 24, 24]} />

          <meshStandardMaterial
            color="#dda15e"
            emissive="#dda15e"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}