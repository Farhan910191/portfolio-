"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const target = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      target.current.x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      target.current.y =
        (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      target.current.x,
      0.04
    );

    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      target.current.y,
      0.04
    );

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.current.x * 0.8,
      0.03
    );

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      -mouse.current.y * 0.5,
      0.03
    );

    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      7,
      0.03
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}