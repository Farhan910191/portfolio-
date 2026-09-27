"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* =========================================================
   COLORS
========================================================= */

const GREEN = "#39ff88";
const GREEN_DARK = "#20c968";

/* =========================================================
   FLOATING PARTICLES
========================================================= */

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 850;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] =
        radius * Math.sin(phi) * Math.cos(theta);

      positions[i * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3 + 2] =
        radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={GREEN}
        size={0.018}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   DEVELOPER CORE
========================================================= */

function DeveloperCore() {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!coreRef.current) return;

    coreRef.current.rotation.y += delta * 0.22;
    coreRef.current.rotation.x += delta * 0.08;
  });

  return (
    <group ref={coreRef}>
      {/* Outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.65, 2]} />

        <meshBasicMaterial
          color={GREEN}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Inner wireframe */}
      <mesh rotation={[0.5, 0.2, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />

        <meshBasicMaterial
          color={GREEN_DARK}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />

        <meshBasicMaterial
          color="#07140d"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Center light */}
      <pointLight
        color={GREEN}
        intensity={5}
        distance={5}
      />
    </group>
  );
}

/* =========================================================
   ORBIT RINGS
========================================================= */

function DeveloperOrbits() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.z += delta * 0.08;
    groupRef.current.rotation.y += delta * 0.025;
  });

  return (
    <group ref={groupRef}>
      {/* Ring 1 */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.15, 0.012, 12, 160]} />

        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh rotation={[0.8, 0.3, 0.5]}>
        <torusGeometry args={[2.65, 0.008, 12, 160]} />

        <meshBasicMaterial
          color={GREEN_DARK}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh rotation={[1.2, 0.7, 0]}>
        <torusGeometry args={[3.1, 0.006, 10, 160]} />

        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   FLOATING NODES
========================================================= */

function FloatingNodes() {
  const nodes = useMemo(
    () => [
      [-2.8, 1.7, 0],
      [2.7, 1.2, -1],
      [-2.5, -1.8, -0.5],
      [2.6, -1.5, 0],
      [0.5, 2.8, -1],
      [-0.8, -2.8, 0],
    ],
    []
  );

  return (
    <>
      {nodes.map((position, index) => (
        <Float
          key={index}
          speed={1 + index * 0.12}
          rotationIntensity={0.4}
          floatIntensity={0.7}
        >
          <mesh position={position as [number, number, number]}>
            <sphereGeometry args={[0.045, 16, 16]} />

            <meshBasicMaterial
              color={GREEN}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* =========================================================
   CONNECTION LINES
========================================================= */

function ConnectionLines() {
  const lines = [
    [
      [-2.8, 1.7, 0],
      [-1.1, 0.7, 0],
      [0, 0, 0],
    ],

    [
      [2.7, 1.2, -1],
      [1.2, 0.6, -0.4],
      [0, 0, 0],
    ],

    [
      [-2.5, -1.8, -0.5],
      [-1.2, -0.7, -0.2],
      [0, 0, 0],
    ],

    [
      [2.6, -1.5, 0],
      [1.2, -0.6, 0],
      [0, 0, 0],
    ],
  ];

  return (
    <>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points as [number, number, number][]}
          color={GREEN}
          transparent
          opacity={0.12}
          lineWidth={0.6}
        />
      ))}
    </>
  );
}

/* =========================================================
   SCENE
========================================================= */

function DeveloperScene() {
  return (
    <>
      <ambientLight intensity={0.25} />

      <ParticleField />

      <Float
        speed={0.6}
        rotationIntensity={0.15}
        floatIntensity={0.3}
      >
        <DeveloperCore />
      </Float>

      <DeveloperOrbits />

      <FloatingNodes />

      <ConnectionLines />
    </>
  );
}

/* =========================================================
   MAIN BACKGROUND
========================================================= */

export default function DeveloperBackground() {
  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
        bg-[#050505]
      "
    >
      {/* Green atmospheric glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#39ff88]/[0.035]
          blur-[140px]
        "
      />

      {/* Top developer code */}
      <div
        className="
          absolute
          left-[6%]
          top-[18%]
          hidden
          font-mono
          text-[11px]
          leading-6
          text-[#39ff88]/10
          lg:block
        "
      >
        <div>const developer = {"{"}</div>
        <div className="pl-4">name: "Farhan",</div>
        <div className="pl-4">role: "Full Stack",</div>
        <div className="pl-4">stack: ["Python", "React"],</div>
        <div>{"}"}</div>
      </div>

      {/* Right code */}
      <div
        className="
          absolute
          right-[6%]
          top-[26%]
          hidden
          font-mono
          text-[11px]
          leading-6
          text-[#39ff88]/10
          lg:block
        "
      >
        <div>function buildProject() {"{"}</div>
        <div className="pl-4">return {"{"}</div>
        <div className="pl-8">clean: true,</div>
        <div className="pl-8">fast: true,</div>
        <div className="pl-8">scalable: true</div>
        <div className="pl-4">{"}"}</div>
        <div>{"}"}</div>
      </div>

      {/* Canvas */}
      <Canvas
        camera={{
          position: [0, 0, 9],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <DeveloperScene />

        {/* Very subtle camera movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>

      {/* Dark readability overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_75%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505]" />

      {/* Developer grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(57,255,136,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,136,0.5)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />
    </div>
  );
}