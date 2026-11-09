"use client";

import React, { useEffect, useState } from "react";

export default function ViewportDecorations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const petals = [
    { left: "4%", duration: "11s", delay: "0s", char: "✿" },
    { left: "12%", duration: "14s", delay: "2.5s", char: "❀" },
    { left: "20%", duration: "10s", delay: "5s", char: "🌸" },
    { left: "28%", duration: "15s", delay: "1.2s", char: "✿" },
    { left: "36%", duration: "12s", delay: "4s", char: "❀" },
    { left: "44%", duration: "16s", delay: "3s", char: "🌸" },
    { left: "52%", duration: "11s", delay: "7s", char: "✿" },
    { left: "60%", duration: "14s", delay: "2s", char: "❀" },
    { left: "68%", duration: "10s", delay: "5.5s", char: "🌸" },
    { left: "76%", duration: "15s", delay: "0.5s", char: "✿" },
    { left: "84%", duration: "12s", delay: "6.2s", char: "❀" },
    { left: "92%", duration: "16s", delay: "2.8s", char: "🌸" },
  ];

  return (
    <>
      {/* Falling Light Pink / Translucent Petals (Fixed Behind Content: z-index -1) */}
      <div
        className="fixed inset-0 pointer-events-none -z-1 overflow-hidden"
        style={{ zIndex: -1 }}
        aria-hidden="true"
        suppressHydrationWarning
      >
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
    </>
  );
}
