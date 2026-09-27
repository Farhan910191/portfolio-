"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({
  count = 1000,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 8;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(
        2 * Math.random() - 1
      );

      array[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      array[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      array[i * 3 + 2] =
        radius * Math.cos(phi);
    }

    return array;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.004;

    const material =
      pointsRef.current.material as THREE.PointsMaterial;

    material.size =
      0.018 +
      Math.sin(state.clock.elapsedTime * 1.5) *
        0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#fefae0"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}