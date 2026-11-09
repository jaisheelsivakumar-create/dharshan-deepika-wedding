"use client";

import React, { useState, useRef } from "react";
import ViewportDecorations from "@/components/ViewportDecorations";
import MusicPlayer, { MusicPlayerHandle } from "@/components/MusicPlayer";
import RoyalCoverHero from "@/components/RoyalCoverHero";
import EventDetails from "@/components/EventDetails";
import FamilySection from "@/components/FamilySection";
import LocationSection from "@/components/LocationSection";
import BlessingsSection from "@/components/BlessingsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Start music on user gesture
    if (musicPlayerRef.current) {
      musicPlayerRef.current.playMusic();
    }
    // Smooth scroll down to the revealed portrait section
    setTimeout(() => {
      const el = document.getElementById("portrait-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  return (
    <main className="relative min-h-screen bg-[#f8eee5] text-[#651c29] selection:bg-[#741e2b]/20 selection:text-[#741e2b] overflow-x-hidden">
      {/* 1. Viewport Double Ornamental Border, Falling Petals & Cursor Sparkles */}
      <ViewportDecorations />

      {/* 2. Floating Music Player Controller (Top-Right) */}
      <MusicPlayer ref={musicPlayerRef} />

      {/* 3. Main Content Flow */}
      <div className="relative z-10 flex flex-col">
        {/* Royal Cover & Hero Screen */}
        <RoyalCoverHero onOpenInvitation={handleOpenInvitation} isOpen={isOpen} />

        {/* The revealed sections */}
        {isOpen && (
          <>
            {/* Event Celebrations with 3D Parallax Tilt Cards */}
            <EventDetails />

            {/* Traditional Family & Parents Section */}
            <FamilySection />

            {/* Location & Navigation Section (Google Map & Authentic QR Code) */}
            <LocationSection />

            {/* Guest Blessings & Wishes Wall */}
            <BlessingsSection />

            {/* Final Blessings & Footer */}
            <FooterSection />
          </>
        )}
      </div>
    </main>
  );
}
