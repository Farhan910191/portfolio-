"use client";

export default function SceneLights() {
  return (
    <>
      {/* Base lighting */}
      <ambientLight
        intensity={0.45}
        color="#fefae0"
      />

      {/* Main warm light */}
      <directionalLight
        position={[4, 5, 6]}
        intensity={2}
        color="#dda15e"
      />

      {/* Green atmospheric light */}
      <pointLight
        position={[-4, 2, 3]}
        intensity={25}
        distance={12}
        decay={2}
        color="#606c38"
      />

      {/* Orange accent */}
      <pointLight
        position={[4, -2, 2]}
        intensity={20}
        distance={10}
        decay={2}
        color="#bc6c25"
      />

      {/* Soft top light */}
      <spotLight
        position={[0, 6, 4]}
        intensity={20}
        angle={0.5}
        penumbra={1}
        distance={15}
        color="#fefae0"
      />
    </>
  );
}