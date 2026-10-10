"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/* =========================================================
   COLORS
========================================================= */

let currentIsDark = true;
const themeListeners = new Set<() => void>();

if (typeof window !== "undefined") {
  const check = () => {
    const dark = document.documentElement.getAttribute("data-theme") !== "light";
    if (dark !== currentIsDark) {
      currentIsDark = dark;
      themeListeners.forEach((fn) => fn());
    }
  };
  const observer = new MutationObserver(check);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

function useThemeColors() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    const listener = () => setIsDark(currentIsDark);
    themeListeners.add(listener);
    return () => {
      themeListeners.delete(listener);
    };
  }, []);

  return {
    green: isDark ? "#39ff88" : "#10b981",
    greenDark: isDark ? "#20c968" : "#059669",
    coreBg: isDark ? "#07140d" : "#e8f5ee",
    isDark,
  };
}

/* =========================================================
   FLOATING PARTICLES
========================================================= */

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { green } = useThemeColors();

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
          args={[particles, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color={green}
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
  const { green, greenDark, coreBg } = useThemeColors();

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
          color={green}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Inner wireframe */}
      <mesh rotation={[0.5, 0.2, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />

        <meshBasicMaterial
          color={greenDark}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />

        <meshBasicMaterial
          color={coreBg}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Center light */}
      <pointLight
        color={green}
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
  const { green, greenDark } = useThemeColors();

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
          color={green}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh rotation={[0.8, 0.3, 0.5]}>
        <torusGeometry args={[2.65, 0.008, 12, 160]} />

        <meshBasicMaterial
          color={greenDark}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh rotation={[1.2, 0.7, 0]}>
        <torusGeometry args={[3.1, 0.006, 10, 160]} />

        <meshBasicMaterial
          color={green}
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
  const { green } = useThemeColors();

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
              color={green}
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
  const { green } = useThemeColors();

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
          color={green}
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
  const { green, isDark } = useThemeColors();

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
        transition-colors
        duration-500
      "
      style={{ backgroundColor: isDark ? "#050505" : "#f0f1f3" }}
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
          blur-[140px]
        "
        style={{
          backgroundColor: isDark ? `${green}09` : `${green}08`,
        }}
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
          lg:block
        "
        style={{ color: isDark ? `${green}1a` : `${green}15` }}
      >
        <div>const developer = {"{"}</div>
        <div className="pl-4">name: &quot;Farhan&quot;,</div>
        <div className="pl-4">role: &quot;Full Stack&quot;,</div>
        <div className="pl-4">stack: [&quot;Python&quot;, &quot;React&quot;],</div>
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
          lg:block
        "
        style={{ color: isDark ? `${green}1a` : `${green}15` }}
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
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, transparent 0%, #050505 75%)"
            : "radial-gradient(circle at center, transparent 0%, #f0f1f3 75%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(5,5,5,0.2), transparent, #050505)"
            : "linear-gradient(to bottom, rgba(240,241,243,0.2), transparent, #f0f1f3)",
        }}
      />

      {/* Developer grid */}
      <div
        className="
          absolute
          inset-0
          [background-size:80px_80px]
        "
        style={{
          opacity: isDark ? 0.035 : 0.025,
          backgroundImage: isDark
            ? "linear-gradient(rgba(57,255,136,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,136,0.5) 1px,transparent 1px)"
            : "linear-gradient(rgba(16,185,129,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.15) 1px,transparent 1px)",
        }}
      />
    </div>
  );
}