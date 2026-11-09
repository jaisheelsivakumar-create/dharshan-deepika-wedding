"use client";

import React, { useEffect, useState } from "react";

export default function ViewportDecorations() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const petals = [
    { left: "4%", duration: "11s", delay: "0s", char: "✿" },
    { left: "10%", duration: "14s", delay: "2.5s", char: "❀" },
    { left: "18%", duration: "10s", delay: "5s", char: "🌸" },
    { left: "26%", duration: "15s", delay: "1.2s", char: "✿" },
    { left: "34%", duration: "12s", delay: "4s", char: "❀" },
    { left: "42%", duration: "16s", delay: "3s", char: "🌸" },
    { left: "50%", duration: "11s", delay: "7s", char: "✿" },
    { left: "58%", duration: "14s", delay: "2s", char: "❀" },
    { left: "66%", duration: "10s", delay: "5.5s", char: "🌸" },
    { left: "74%", duration: "15s", delay: "0.5s", char: "✿" },
    { left: "82%", duration: "12s", delay: "6.2s", char: "❀" },
    { left: "90%", duration: "16s", delay: "2.8s", char: "🌸" },
    { left: "96%", duration: "13s", delay: "8s", char: "✿" },
    { left: "48%", duration: "13s", delay: "9.5s", char: "❀" },
  ];

  return (
    <>
      {/* Pinned Ornamental Double Border Frame */}
      <div className="ornamental-border" aria-hidden="true" suppressHydrationWarning>
        <span className="border-corner top-left">❧</span>
        <span className="border-corner top-right">❧</span>
        <span className="border-corner bottom-left">❧</span>
        <span className="border-corner bottom-right">❧</span>
      </div>

      {/* Falling Flower Petals */}
      <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden" aria-hidden="true">
        {mounted &&
          petals.map((p, idx) => (
            <span
              key={idx}
              className="petal"
              style={{
                left: p.left,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            >
              {p.char}
            </span>
          ))}
      </div>

      {/* Interactive Sparkle Pointer Trailer */}
      {mousePos && (
        <div
          className="sparkle-pointer-dot hidden md:block"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) translate(-50%, -50%)`,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
