"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* =========================================================
   THEME HOOK (Synchronizes with Dark & Light Mode)
========================================================= */

function useThemeColors() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => {
      const dark =
        document.documentElement.getAttribute("data-theme") !== "light";
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

  return { isDark };
}

/* =========================================================
   TYPES
========================================================= */

interface GlowingCheckSquare {
  col: number;
  row: number;
  life: number;
  maxLife: number;
  alpha: number;
}

interface TwinkleStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isAccent: boolean;
}

interface PassingShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
  opacity: number;
  width: number;
  origin: "left" | "right" | "top-corner-left" | "top-corner-right";
}

/* =========================================================
   FULL-SCREEN ANIMATED CHECKERED GRID & PASSING STARS CANVAS
========================================================= */

function ChecksAndStarsCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  const themeProgressRef = useRef(isDark ? 1 : 0);
  const glowingSquaresRef = useRef<GlowingCheckSquare[]>([]);
  const fewStarsRef = useRef<TwinkleStar[]>([]);
  const shootingStarsRef = useRef<PassingShootingStar[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const timeRef = useRef(0);

  const checkSize = 64; // Checkered grid box size (64px)

  // Initialize stars across screen
  const initScene = useCallback((w: number, h: number) => {
    const fewStarCount = Math.min(Math.floor((w * h) / 28000), 36);
    const stars: TwinkleStar[] = [];
    for (let i = 0; i < fewStarCount; i++) {
      const isAccent = Math.random() < 0.5;
      const baseR = 0.8 + Math.random() * 1.6;
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.18 - Math.random() * 0.25,
        baseRadius: baseR,
        radius: baseR,
        baseAlpha: 0.25 + Math.random() * 0.55,
        twinkleSpeed: 0.8 + Math.random() * 1.6,
        twinklePhase: Math.random() * Math.PI * 2,
        isAccent,
      });
    }
    fewStarsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initScene(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };

      // Occasionally light up a check box under mouse hover
      const col = Math.floor(e.clientX / checkSize);
      const row = Math.floor(e.clientY / checkSize);
      if (Math.random() < 0.35 && glowingSquaresRef.current.length < 18) {
        const exists = glowingSquaresRef.current.some(
          (sq) => sq.col === col && sq.row === row
        );
        if (!exists) {
          glowingSquaresRef.current.push({
            col,
            row,
            life: 0,
            maxLife: 60 + Math.random() * 40,
            alpha: 0.18 + Math.random() * 0.2,
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Spontaneously light up random check boxes across full screen
    const squareTimer = setInterval(() => {
      if (glowingSquaresRef.current.length >= 12) return;
      const totalCols = Math.ceil(width / checkSize);
      const totalRows = Math.ceil(height / checkSize);
      const col = Math.floor(Math.random() * totalCols);
      const row = Math.floor(Math.random() * totalRows);

      // Exclude area where the hero model stands on desktop screens to avoid any square frame flicker
      const sqX = col * checkSize;
      const sqY = row * checkSize;
      const inHeroModelArea =
        width >= 1024 &&
        sqX > width * 0.52 &&
        sqX < width * 0.92 &&
        sqY > height * 0.08 &&
        sqY < height * 0.85;

      if (inHeroModelArea) return;

      glowingSquaresRef.current.push({
        col,
        row,
        life: 0,
        maxLife: 70 + Math.random() * 50,
        alpha: 0.12 + Math.random() * 0.16,
      });
    }, 900);

    // Passing Shooting Star Spawner (2 Sides & Corners)
    let passCounter = 0;
    const spawnPassingStar = () => {
      if (shootingStarsRef.current.length >= 3) return;
      passCounter++;

      const sideMargin = Math.max(160, width * 0.22);
      const mode = passCounter % 4;

      let startX: number;
      let startY: number;
      let angle: number;
      let origin: "left" | "right" | "top-corner-left" | "top-corner-right";

      if (mode === 0) {
        startX = Math.random() * (sideMargin * 0.85);
        startY = Math.random() * (height * 0.4);
        angle = (32 + Math.random() * 16) * (Math.PI / 180);
        origin = "left";
      } else if (mode === 1) {
        startX = width - Math.random() * (sideMargin * 0.85);
        startY = Math.random() * (height * 0.4);
        angle = (28 + Math.random() * 16) * (Math.PI / 180);
        origin = "right";
      } else if (mode === 2) {
        startX = Math.random() * (width * 0.18);
        startY = Math.random() * (height * 0.15);
        angle = (36 + Math.random() * 18) * (Math.PI / 180);
        origin = "top-corner-left";
      } else {
        startX = width - Math.random() * (width * 0.18);
        startY = Math.random() * (height * 0.15);
        angle = (144 - Math.random() * 18) * (Math.PI / 180);
        origin = "top-corner-right";
      }

      // Faster speed: 15 to 22 px per frame
      const speed = 15 + Math.random() * 7;

      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 110 + Math.random() * 90,
        life: 0,
        maxLife: 28 + Math.random() * 14,
        opacity: 0.8 + Math.random() * 0.2,
        width: 1.6 + Math.random() * 0.8,
        origin,
      });
    };

    // Fast shooting star passing every 1.8 seconds
    const shootingTimer = setInterval(spawnPassingStar, 1800);
    const initialShootingTimer = setTimeout(spawnPassingStar, 500);

    // --------------------------------------------------------
    // RENDER LOOP
    // --------------------------------------------------------
    const render = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Theme interpolation
      const targetTheme = isDarkRef.current ? 1 : 0;
      themeProgressRef.current +=
        (targetTheme - themeProgressRef.current) * 0.08;
      const f = themeProgressRef.current; // 0 = Light, 1 = Dark

      ctx.clearRect(0, 0, width, height);

      // Colors for canvas elements (Adaptive for both Dark & Light modes)
      const accentR = Math.round(16 + f * (57 - 16));
      const accentG = Math.round(185 + f * (255 - 185));
      const accentB = Math.round(129 + f * (136 - 129));

      // In dark mode: white-tinted base. In light mode: deep emerald-slate for strong contrast.
      const baseR = Math.round(15 + f * (255 - 15));
      const baseG = Math.round(118 + f * (255 - 118));
      const baseB = Math.round(110 + f * (255 - 110));

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      // 1. Interactive Cursor Soft Glow over Checks
      if (mouseActive && mx > 0 && my > 0) {
        const spotRadius = 180;
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, spotRadius);
        grad.addColorStop(
          0,
          `rgba(${accentR}, ${accentG}, ${accentB}, ${f === 1 ? 0.16 : 0.12})`
        );
        grad.addColorStop(
          0.6,
          `rgba(${accentR}, ${accentG}, ${accentB}, ${f === 1 ? 0.035 : 0.025})`
        );
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Animated Glowing Checks Squares (Illuminating Check boxes)
      const squares = glowingSquaresRef.current;
      for (let i = squares.length - 1; i >= 0; i--) {
        const sq = squares[i];
        sq.life++;
        const progress = sq.life / sq.maxLife;
        if (progress >= 1) {
          squares.splice(i, 1);
          continue;
        }

        // Bell curve alpha pulse
        const pulse = Math.sin(progress * Math.PI);
        // Ensure strong contrast in both dark and light modes
        const alpha = sq.alpha * pulse * (f === 1 ? 1.0 : 1.35);

        const x = sq.col * checkSize;
        const y = sq.row * checkSize;

        // Fill check square with soft neon/emerald glow
        ctx.fillStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${alpha * (f === 1 ? 0.45 : 0.35)})`;
        ctx.fillRect(x + 1, y + 1, checkSize - 2, checkSize - 2);

        // Highlight check box border
        ctx.strokeStyle = `rgba(${accentR}, ${accentG}, ${accentB}, ${alpha * (f === 1 ? 0.95 : 0.85)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, checkSize - 1, checkSize - 1);
      }

      // 3. Render Few Twinkling Stars
      const fewStars = fewStarsRef.current;
      for (const s of fewStars) {
        s.x += s.vx;
        s.y += s.vy;

        if (s.y < -15) {
          s.y = height + 15;
          s.x = Math.random() * width;
        }
        if (s.x < -15) s.x = width + 15;
        if (s.x > width + 15) s.x = -15;

        // Mouse reaction
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = ((130 - dist) / 130) * 0.6;
          s.x += (dx / dist) * force;
          s.y += (dy / dist) * force;
        }

        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.5 + 0.5;
        const currentAlpha =
          s.baseAlpha * (0.35 + twinkle * 0.65) * (0.75 + f * 0.25);
        s.radius = s.baseRadius * (0.85 + twinkle * 0.3);

        const r = s.isAccent ? accentR : baseR;
        const g = s.isAccent ? accentG : baseG;
        const b = s.isAccent ? accentB : baseB;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        if (s.baseRadius > 1.8 && twinkle > 0.6) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.22})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Render Passing Stars on 2 Sides & Corners
      const shootingStars = shootingStarsRef.current;
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += ss.vx;
        ss.y += ss.vy;

        const progress = ss.life / ss.maxLife;
        if (
          progress >= 1 ||
          ss.x > width + 120 ||
          ss.x < -120 ||
          ss.y > height + 120
        ) {
          shootingStars.splice(i, 1);
          continue;
        }

        const alpha =
          progress < 0.2
            ? (progress / 0.2) * ss.opacity
            : (1 - progress) * ss.opacity;

        const dirMag = Math.hypot(ss.vx, ss.vy);
        const tailX = ss.x - (ss.vx / dirMag) * ss.length;
        const tailY = ss.y - (ss.vy / dirMag) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(
          0.6,
          `rgba(${accentR}, ${accentG}, ${accentB}, ${alpha * 0.55})`
        );
        grad.addColorStop(
          1,
          `rgba(${baseR}, ${baseG}, ${baseB}, ${alpha * 0.95})`
        );

        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(shootingTimer);
      clearInterval(squareTimer);
      clearTimeout(initialShootingTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initScene]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        willChange: "transform",
      }}
    />
  );
}

/* =========================================================
   MAIN DEVELOPER BACKGROUND COMPONENT
   (Full-screen Checks Grid + Passing Stars)
========================================================= */

export default function DeveloperBackground() {
  const { isDark } = useThemeColors();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. Base Background Theme Tone (Instantly matches active theme, zero black flash) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--background-deep)",
        }}
      />

      {/* 2. Soft Atmospheric Ambient Green Glows */}
      <div
        className="absolute rounded-full transition-all duration-700 ease-in-out pointer-events-none"
        style={{
          width: "750px",
          height: "750px",
          top: "5%",
          left: "25%",
          transform: "translateX(-50%)",
          filter: "blur(150px)",
          backgroundColor: "var(--bg-ambient-1)",
          animation: "ambientFloat 24s ease-in-out infinite",
        }}
      />

      <div
        className="absolute rounded-full transition-all duration-700 ease-in-out pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          bottom: "5%",
          right: "5%",
          filter: "blur(130px)",
          backgroundColor: "var(--bg-ambient-2)",
          animation: "ambientFloat 28s ease-in-out infinite reverse 4s",
        }}
      />

      {/* 3. FULL-SCREEN DEVELOPER CHECKERED GRID ("CHECKS" TYPE) */}
      <div
        className="
          absolute
          inset-0
          transition-all
          duration-500
          pointer-events-none
        "
        style={{
          opacity: "var(--bg-grid-opacity)",
          backgroundSize: "64px 64px",
          backgroundImage:
            "linear-gradient(var(--bg-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--bg-grid-line) 1px, transparent 1px)",
        }}
      />

      {/* 4. Canvas with Animated Glowing Checks & Passing Stars */}
      <ChecksAndStarsCanvas isDark={isDark} />

      {/* 5. Vignette depth overlay ensuring center content is 100% crisp (Dark mode only via CSS) */}
      <div
        className="absolute inset-0 pointer-events-none dark-mode-vignette"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(6, 8, 9, 0.35) 80%, #060809 100%)",
        }}
      />

      {/* 6. Soft vertical edge gradients (Dark mode only via CSS) */}
      <div
        className="absolute inset-0 pointer-events-none dark-mode-vignette"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6, 8, 9, 0.4) 0%, transparent 12%, transparent 88%, #060809 100%)",
        }}
      />
    </div>
  );
}