"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/* =========================================================
   THEME HOOK
========================================================= */

function useThemeColors() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    const check = () => {
      const dark = document.documentElement.getAttribute("data-theme") !== "light";
      setIsDark(dark);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return {
    isDark,
  };
}

/* =========================================================
   FLOATING PARTICLES
========================================================= */

function ParticleField({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const colors = useMemo(
    () => ({
      dark: new THREE.Color("#39ff88"),
      light: new THREE.Color("#059669"),
    }),
    []
  );

  const particles = useMemo(() => {
    const count = 850;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.004;

    if (matRef.current) {
      matRef.current.color.lerp(
        isDark ? colors.dark : colors.light,
        0.08
      );
      matRef.current.opacity = THREE.MathUtils.lerp(
        matRef.current.opacity,
        isDark ? 0.45 : 0.7,
        0.08
      );
    }
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
        ref={matRef}
        color={isDark ? "#39ff88" : "#059669"}
        size={isDark ? 0.018 : 0.024}
        transparent
        opacity={isDark ? 0.45 : 0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   DEVELOPER CORE (ROTATING WIREFRAME CHECKS & CENTER LIGHT)
========================================================= */

function DeveloperCore({ isDark }: { isDark: boolean }) {
  const coreRef = useRef<THREE.Group>(null);
  const outerMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const colors = useMemo(
    () => ({
      darkOuter: new THREE.Color("#39ff88"),
      lightOuter: new THREE.Color("#10b981"),
      darkInner: new THREE.Color("#20c968"),
      lightInner: new THREE.Color("#059669"),
      darkCore: new THREE.Color("#07140d"),
      lightCore: new THREE.Color("#34d399"),
      darkLight: new THREE.Color("#39ff88"),
      lightLight: new THREE.Color("#10b981"),
    }),
    []
  );

  useFrame((_, delta) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += delta * 0.22;
    coreRef.current.rotation.x += delta * 0.08;

    const lerpSpeed = 0.08;

    if (outerMatRef.current) {
      outerMatRef.current.color.lerp(
        isDark ? colors.darkOuter : colors.lightOuter,
        lerpSpeed
      );
      outerMatRef.current.opacity = THREE.MathUtils.lerp(
        outerMatRef.current.opacity,
        isDark ? 0.25 : 0.75,
        lerpSpeed
      );
    }

    if (innerMatRef.current) {
      innerMatRef.current.color.lerp(
        isDark ? colors.darkInner : colors.lightInner,
        lerpSpeed
      );
      innerMatRef.current.opacity = THREE.MathUtils.lerp(
        innerMatRef.current.opacity,
        isDark ? 0.38 : 0.85,
        lerpSpeed
      );
    }

    if (coreMatRef.current) {
      coreMatRef.current.color.lerp(
        isDark ? colors.darkCore : colors.lightCore,
        lerpSpeed
      );
      coreMatRef.current.opacity = THREE.MathUtils.lerp(
        coreMatRef.current.opacity,
        isDark ? 0.95 : 0.75,
        lerpSpeed
      );
    }

    if (lightRef.current) {
      lightRef.current.color.lerp(
        isDark ? colors.darkLight : colors.lightLight,
        lerpSpeed
      );
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        isDark ? 6 : 8,
        lerpSpeed
      );
    }
  });

  return (
    <group ref={coreRef}>
      {/* Outer wireframe (checkered geometric facet lattice) */}
      <mesh>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial
          ref={outerMatRef}
          color={isDark ? "#39ff88" : "#10b981"}
          wireframe
          transparent
          opacity={isDark ? 0.25 : 0.75}
        />
      </mesh>

      {/* Inner wireframe */}
      <mesh rotation={[0.5, 0.2, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          ref={innerMatRef}
          color={isDark ? "#20c968" : "#059669"}
          wireframe
          transparent
          opacity={isDark ? 0.38 : 0.85}
        />
      </mesh>

      {/* Glowing core sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          ref={coreMatRef}
          color={isDark ? "#07140d" : "#34d399"}
          transparent
          opacity={isDark ? 0.95 : 0.75}
        />
      </mesh>

      {/* Center light */}
      <pointLight
        ref={lightRef}
        color={isDark ? "#39ff88" : "#10b981"}
        intensity={isDark ? 6 : 8}
        distance={6}
      />
    </group>
  );
}

/* =========================================================
   ORBIT RINGS
========================================================= */

function DeveloperOrbits({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.MeshBasicMaterial>(null);
  const ring2Ref = useRef<THREE.MeshBasicMaterial>(null);
  const ring3Ref = useRef<THREE.MeshBasicMaterial>(null);

  const colors = useMemo(
    () => ({
      darkGreen: new THREE.Color("#39ff88"),
      lightGreen: new THREE.Color("#10b981"),
      darkGreen2: new THREE.Color("#20c968"),
      lightGreen2: new THREE.Color("#059669"),
    }),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.08;
    groupRef.current.rotation.y += delta * 0.025;

    const lerpSpeed = 0.08;
    if (ring1Ref.current) {
      ring1Ref.current.color.lerp(
        isDark ? colors.darkGreen : colors.lightGreen,
        lerpSpeed
      );
      ring1Ref.current.opacity = THREE.MathUtils.lerp(
        ring1Ref.current.opacity,
        isDark ? 0.55 : 0.75,
        lerpSpeed
      );
    }
    if (ring2Ref.current) {
      ring2Ref.current.color.lerp(
        isDark ? colors.darkGreen2 : colors.lightGreen2,
        lerpSpeed
      );
      ring2Ref.current.opacity = THREE.MathUtils.lerp(
        ring2Ref.current.opacity,
        isDark ? 0.3 : 0.6,
        lerpSpeed
      );
    }
    if (ring3Ref.current) {
      ring3Ref.current.color.lerp(
        isDark ? colors.darkGreen : colors.lightGreen,
        lerpSpeed
      );
      ring3Ref.current.opacity = THREE.MathUtils.lerp(
        ring3Ref.current.opacity,
        isDark ? 0.18 : 0.45,
        lerpSpeed
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ring 1 */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.15, 0.012, 12, 160]} />
        <meshBasicMaterial
          ref={ring1Ref}
          color={isDark ? "#39ff88" : "#10b981"}
          transparent
          opacity={isDark ? 0.55 : 0.75}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh rotation={[0.8, 0.3, 0.5]}>
        <torusGeometry args={[2.65, 0.008, 12, 160]} />
        <meshBasicMaterial
          ref={ring2Ref}
          color={isDark ? "#20c968" : "#059669"}
          transparent
          opacity={isDark ? 0.3 : 0.6}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh rotation={[1.2, 0.7, 0]}>
        <torusGeometry args={[3.1, 0.006, 10, 160]} />
        <meshBasicMaterial
          ref={ring3Ref}
          color={isDark ? "#39ff88" : "#10b981"}
          transparent
          opacity={isDark ? 0.18 : 0.45}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   FLOATING NODES
========================================================= */

function FloatingNodes({ isDark }: { isDark: boolean }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  const colors = useMemo(
    () => ({
      dark: new THREE.Color("#39ff88"),
      light: new THREE.Color("#10b981"),
    }),
    []
  );

  useFrame(() => {
    if (matRef.current) {
      matRef.current.color.lerp(
        isDark ? colors.dark : colors.light,
        0.08
      );
      matRef.current.opacity = THREE.MathUtils.lerp(
        matRef.current.opacity,
        isDark ? 0.8 : 0.9,
        0.08
      );
    }
  });

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
              ref={matRef}
              color={isDark ? "#39ff88" : "#10b981"}
              transparent
              opacity={isDark ? 0.8 : 0.9}
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

function ConnectionLines({ isDark }: { isDark: boolean }) {
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
          color={isDark ? "#39ff88" : "#10b981"}
          transparent
          opacity={isDark ? 0.12 : 0.35}
          lineWidth={0.8}
        />
      ))}
    </>
  );
}

/* =========================================================
   SCENE
========================================================= */

function DeveloperScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.25 : 0.65} />

      <ParticleField isDark={isDark} />

      <Float
        speed={0.6}
        rotationIntensity={0.15}
        floatIntensity={0.3}
      >
        <DeveloperCore isDark={isDark} />
      </Float>

      <DeveloperOrbits isDark={isDark} />

      <FloatingNodes isDark={isDark} />

      <ConnectionLines isDark={isDark} />
    </>
  );
}

/* =========================================================
   MAIN BACKGROUND
========================================================= */

export default function DeveloperBackground() {
  const { isDark } = useThemeColors();

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
      style={{ backgroundColor: isDark ? "#050505" : "#f2f7f4" }}
    >
      {/* Green atmospheric glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[750px]
          w-[750px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-[140px]
          transition-all
          duration-500
        "
        style={{
          backgroundColor: isDark
            ? "rgba(57, 255, 136, 0.05)"
            : "rgba(16, 185, 129, 0.16)",
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
          transition-colors
          duration-500
          lg:block
        "
        style={{
          color: isDark
            ? "rgba(57, 255, 136, 0.12)"
            : "rgba(16, 185, 129, 0.35)",
        }}
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
          transition-colors
          duration-500
          lg:block
        "
        style={{
          color: isDark
            ? "rgba(57, 255, 136, 0.12)"
            : "rgba(16, 185, 129, 0.35)",
        }}
      >
        <div>function buildProject() {"{"}</div>
        <div className="pl-4">return {"{"}</div>
        <div className="pl-8">clean: true,</div>
        <div className="pl-8">fast: true,</div>
        <div className="pl-8">scalable: true</div>
        <div className="pl-4">{"}"}</div>
        <div>{"}"}</div>
      </div>

      {/* Canvas (keeps mounted across theme changes for seamless fluid rotation) */}
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
        <DeveloperScene isDark={isDark} />

        {/* Very subtle camera movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>

      {/* Dark / Light readability overlays */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, transparent 0%, #050505 75%)"
            : "radial-gradient(circle at center, transparent 25%, rgba(242,247,244,0.45) 65%, #f2f7f4 88%)",
        }}
      />

      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(5,5,5,0.2), transparent, #050505)"
            : "linear-gradient(to bottom, rgba(242,247,244,0.15), transparent 30%, transparent 70%, #f2f7f4)",
        }}
      />

      {/* Developer checkered grid ("kallikal" / small boxes) */}
      <div
        className="
          absolute
          inset-0
          transition-all
          duration-500
          [background-size:60px_60px]
          sm:[background-size:80px_80px]
        "
        style={{
          opacity: isDark ? 0.09 : 0.28,
          backgroundImage: isDark
            ? "linear-gradient(rgba(57,255,136,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,136,0.7) 1px,transparent 1px)"
            : "linear-gradient(rgba(16,185,129,0.75) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.75) 1px,transparent 1px)",
        }}
      />
    </div>
  );
}