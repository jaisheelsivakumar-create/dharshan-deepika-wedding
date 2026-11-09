"use client";

import React, { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import ParticleCanvas, { prefetchParticlesStage } from "@/components/layers/ParticleCanvas";
import ForegroundLayer from "@/components/layers/ForegroundLayer";
import HeroSection from "@/components/sections/HeroSection";
import CoupleFamiliesSection from "@/components/sections/CoupleFamiliesSection";
import EventScheduleSection from "@/components/sections/EventScheduleSection";
import VenueSection from "@/components/sections/VenueSection";
import GallerySection from "@/components/sections/GallerySection";
import BlessingsSection from "@/components/sections/BlessingsSection";
import FooterSection from "@/components/sections/FooterSection";
import type { WeddingSectionId } from "@/lib/particleBus";

export function prefetchInvitationStage() {
  prefetchParticlesStage();
}

interface InvitationContentProps {
  activeSection: WeddingSectionId;
  isOpened: boolean;
  onShowToast: (msg: string) => void;
  onActiveSectionChange: (section: WeddingSectionId) => void;
}

export default function InvitationContent({
  activeSection,
  isOpened,
  onShowToast,
  onActiveSectionChange,
}: InvitationContentProps) {
  useEffect(() => {
    if (!isOpened) return;

    const sectionEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) {
          const id = bestEntry.target.getAttribute("data-section") as WeddingSectionId | null;
          if (id) onActiveSectionChange(id);
        }
      },
      { threshold: [0.2, 0.45, 0.7] }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isOpened, onActiveSectionChange]);

  return (
    <MotionConfig reducedMotion="user">
      {/* Layers 3 & 5: Back (blurred/slow) & Front (sharp/fast) 3D Instanced Particles */}
      <ParticleCanvas activeSection={activeSection} enabled={isOpened} />

      {/* Layer 4: Main Content Flow (All Centered, max-w-[720px]) */}
      <main className="relative z-20 w-full flex flex-col items-center">
        <HeroSection isOpened={isOpened} />
        <CoupleFamiliesSection isOpened={isOpened} />
        <VenueSection isOpened={isOpened} onShowToast={onShowToast} />
        <EventScheduleSection isOpened={isOpened} />
        <GallerySection isOpened={isOpened} />
        <BlessingsSection isOpened={isOpened} />
        <FooterSection />
      </main>

      {/* Layer 6: Separate Bottom-Anchored Foreground Layer (Lamps, Kalash & Lotuses) */}
      <ForegroundLayer isOpened={isOpened} />
    </MotionConfig>
  );
}
