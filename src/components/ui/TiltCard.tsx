"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 22 });

  useEffect(() => {
    if (reducedMotion) return;

    // Gentle mobile device tilt
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (window.innerWidth >= 768) return;
      if (e.gamma === null || e.beta === null) return;
      const g = Math.max(-20, Math.min(20, e.gamma));
      const b = Math.max(-20, Math.min(20, e.beta - 45));
      rotateYRaw.set((g / 20) * (maxTilt * 0.75));
      rotateXRaw.set((-b / 20) * (maxTilt * 0.75));
    };

    window.addEventListener("deviceorientation", onOrientation, { passive: true });
    return () => {
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [maxTilt, reducedMotion, rotateXRaw, rotateYRaw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * maxTilt * 2);
    rotateXRaw.set(-py * maxTilt * 2);
  };

  const handleMouseLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          reducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={reducedMotion ? undefined : { scale: 1.015 }}
        transition={{ duration: 0.25 }}
        className={`w-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
