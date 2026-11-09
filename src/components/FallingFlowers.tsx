"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number; // percentage (0 - 100)
  size: number; // px (14 - 32)
  duration: number; // seconds (7 - 18)
  delay: number; // seconds (0 - 8)
  driftX: number; // px (-120 to 120)
  rotZ: number; // deg (180 to 720)
  rotY: number; // deg (180 to 540)
  petalType: number; // 0: soft rose, 1: blush gold, 2: jasmine white, 3: golden blossom
  opacity: number;
}

export default function FallingFlowers() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate petals only on client to avoid SSR hydration mismatch
    const count = 28;
    const items: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 98,
      size: Math.floor(Math.random() * 16) + 16,
      duration: Math.random() * 9 + 8,
      delay: Math.random() * 8,
      driftX: Math.floor(Math.random() * 160) - 80,
      rotZ: Math.floor(Math.random() * 360) + 180,
      rotY: Math.floor(Math.random() * 360) + 180,
      petalType: Math.floor(Math.random() * 4),
      opacity: Math.random() * 0.4 + 0.5,
    }));
    setPetals(items);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ zIndex: 0 }}
    >
      {petals.map((petal) => {
        // SVG paths for varied floral petals
        const colors = [
          { fill: "#f472b6", stroke: "#fb7185", glow: "rgba(244,114,182,0.4)" }, // rose
          { fill: "#fbbf24", stroke: "#f59e0b", glow: "rgba(251,191,36,0.3)" }, // gold
          { fill: "#fce7f3", stroke: "#f472b6", glow: "rgba(253,230,240,0.3)" }, // blush
          { fill: "#fed7aa", stroke: "#fb923c", glow: "rgba(254,215,170,0.3)" }, // marigold
        ];
        const style = colors[petal.petalType];

        return (
          <div
            key={petal.id}
            className="absolute top-0 animate-petal will-change-transform"
            style={
              {
                left: `${petal.left}%`,
                width: `${petal.size}px`,
                height: `${petal.size * 1.3}px`,
                animationDuration: `${petal.duration}s`,
                animationDelay: `${petal.delay}s`,
                "--drift-x": `${petal.driftX}px`,
                "--rot-z": `${petal.rotZ}deg`,
                "--rot-y": `${petal.rotY}deg`,
                opacity: petal.opacity,
              } as React.CSSProperties
            }
          >
            <div className="w-full h-full petal-flutter filter drop-shadow-sm">
              <svg
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M12 0C7 6 0 14 0 22C0 27.5 5.4 32 12 32C18.6 32 24 27.5 24 22C24 14 17 6 12 0Z"
                  fill={style.fill}
                  fillOpacity="0.8"
                />
                <path
                  d="M12 4C10 9 6 15 6 22"
                  stroke={style.stroke}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeOpacity="0.6"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
