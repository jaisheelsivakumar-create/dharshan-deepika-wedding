"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { invitationData } from "@/data/invitation";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface ForegroundLayerProps {
  isOpened: boolean;
}

const FLAME_POINTS = [
  // Left kuthuvilakku lamp flames
  { x: 2.67, y: 42.5, delay: "0s", size: "4.6%" },
  { x: 5.06, y: 43.9, delay: "0.35s", size: "4.4%" },
  { x: 8.41, y: 40.5, delay: "0.7s", size: "5.2%" },
  { x: 13.12, y: 41.9, delay: "0.2s", size: "4.6%" },
  // Right kuthuvilakku lamp flames
  { x: 86.82, y: 42.1, delay: "0.5s", size: "4.6%" },
  { x: 89.31, y: 43.9, delay: "0.15s", size: "4.4%" },
  { x: 92.92, y: 40.7, delay: "0.85s", size: "5.2%" },
  { x: 97.33, y: 42.3, delay: "0.4s", size: "4.6%" },
];

export default function ForegroundLayer({ isOpened }: ForegroundLayerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [hasGyro, setHasGyro] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const parallaxX = useSpring(rawX, { stiffness: 90, damping: 20, mass: 0.8 });
  const parallaxY = useSpring(rawY, { stiffness: 90, damping: 20, mass: 0.8 });

  const { scrollYProgress } = useScroll();
  // Scroll depth & soft fade through mid-sections so content stays unobstructed while Hero & Footer frame majestically
  const scrollShiftY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 14, 0]);
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.24, 0.82, 0.94, 1],
    [1, 0.45, 0.28, 0.28, 0.65, 0.94]
  );

  useEffect(() => {
    if (reducedMotion || !isOpened) return;

    // Desktop mouse parallax (opposite to cursor, ~10-16px)
    const onMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      rawX.set(-nx * 24);
      rawY.set(-ny * 14);
    };

    // Mobile gyroscope parallax (if available / permitted)
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      setHasGyro(true);
      const clampedGamma = Math.max(-25, Math.min(25, e.gamma));
      const clampedBeta = Math.max(-25, Math.min(25, e.beta - 45));
      rawX.set((-clampedGamma / 25) * 16);
      rawY.set((-clampedBeta / 25) * 10);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [rawX, rawY, isOpened, reducedMotion]);

  // Mount foreground DOM cleanly once invitation starts opening so initial splash LCP is blazing fast
  if (!isOpened) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 inset-x-0 z-40 pointer-events-none flex justify-center items-end overflow-hidden select-none"
    >
      <motion.div
        initial={{ y: 160, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 65,
          damping: 16,
          mass: 1.05,
          delay: 0.12,
        }}
        style={{
          opacity: reducedMotion ? 0.92 : scrollOpacity,
        }}
        className="w-full flex justify-center items-end"
      >
        <motion.div
          style={{
            x: reducedMotion ? 0 : parallaxX,
            y: reducedMotion ? 0 : hasGyro ? parallaxY : scrollShiftY,
          }}
          className="relative w-full md:w-[min(94vw,76vh)] lg:w-[min(94vw,80vh)] md:max-h-[38vh] lg:max-h-[40vh] aspect-[2/1] shrink-0 md:[mask-image:linear-gradient(to_right,transparent_0%,black_4%,black_96%,transparent_100%)]"
        >
          <Image
            src={invitationData.assets.foregroundImage}
            alt="Auspicious South Indian brass kuthuvilakku lamps, sacred kalash with coconut, and lotus blossoms"
            fill
            sizes="(max-width: 768px) 100vw, 80vh"
            className="object-contain object-bottom drop-shadow-[0_-6px_18px_rgba(107,26,31,0.16)]"
          />

          {/* Synchronized flickering golden flame glows positioned on each brass lamp wick */}
          {!reducedMotion &&
            FLAME_POINTS.map((flame, idx) => (
              <span
                key={idx}
                className="lamp-flame-glow absolute rounded-full pointer-events-none"
                style={{
                  left: `${flame.x}%`,
                  top: `${flame.y}%`,
                  width: flame.size,
                  aspectRatio: "1 / 1.35",
                  animationDelay: flame.delay,
                  background:
                    "radial-gradient(circle, rgba(255,248,200,0.88) 0%, rgba(255,193,65,0.52) 45%, rgba(255,140,0,0) 75%)",
                  mixBlendMode: "screen",
                }}
              />
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
