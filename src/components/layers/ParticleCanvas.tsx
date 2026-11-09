"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { particleConfig } from "@/config/particles";
import type { WeddingSectionId } from "@/lib/particleBus";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMediaQuery";

export function prefetchParticlesStage() {
  void import("./ParticlesStage");
}

const ParticlesStage = dynamic(() => import("./ParticlesStage"), {
  ssr: false,
  loading: () => null,
});

interface ParticleCanvasProps {
  activeSection: WeddingSectionId;
  enabled: boolean;
}

export default function ParticleCanvas({
  activeSection,
  enabled,
}: ParticleCanvasProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = usePrefersReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [heroPainted, setHeroPainted] = useState(false);

  // Pause WebGL loop automatically whenever tab loses visibility
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Lazy-load the 3D WebGL particle canvas only after Hero text has painted
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        timer = setTimeout(() => {
          if (!cancelled) setHeroPainted(true);
        }, particleConfig.performance.heroPaintDelayMs);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (timer) clearTimeout(timer);
    };
  }, [enabled]);

  if (!enabled || !heroPainted) return null;

  return (
    <ParticlesStage
      activeSection={activeSection}
      isDesktop={isDesktop}
      reducedMotion={reducedMotion}
      isPaused={isPaused}
    />
  );
}
