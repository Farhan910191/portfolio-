"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload, Sparkles } from "@react-three/drei";

import CameraController from "./CameraController";
import FloatingObject from "./FloatingObject";
import ParticleField from "./ParticleField";
import SceneLights from "./SceneLights";

export default function HeroScene() {
  return (
    <div
      className="
        fixed
        inset-0
        z-0
        h-screen
        w-screen
        pointer-events-none
        overflow-hidden
      "
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <CameraController />

        <SceneLights />

        <ParticleField count={900} />

        <FloatingObject
          position={[2.4, 0.3, 0]}
          scale={1}
        />

        <FloatingObject
          position={[-4, 1.8, -3]}
          scale={0.28}
        />

        <FloatingObject
          position={[4.5, -2, -4]}
          scale={0.2}
        />

        <Sparkles
          count={100}
          scale={[12, 8, 10]}
          size={1}
          speed={0.2}
          noise={1}
          color="#dda15e"
        />

        <Sparkles
          count={70}
          scale={[10, 7, 8]}
          size={0.7}
          speed={0.12}
          noise={1}
          color="#606c38"
        />

        <Environment preset="night" />

        <Preload all />
      </Canvas>
    </div>
  );
}