"use client";

import React, { useRef } from "react";
import ViewportDecorations from "@/components/ViewportDecorations";
import MusicPlayer, { MusicPlayerHandle } from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import WelcomeStorySection from "@/components/WelcomeStorySection";
import EventDetails from "@/components/EventDetails";
import LocationSection from "@/components/LocationSection";
import BlessingsSection from "@/components/BlessingsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);

  const handleViewDetails = () => {
    // Start music on user engagement if not already playing
    if (musicPlayerRef.current) {
      musicPlayerRef.current.playMusic();
    }
  };

  return (
    <main className="relative min-h-screen bg-[#fdfbf7] text-[#6b1e23] selection:bg-[#6b1e23]/15 selection:text-[#6b1e23] overflow-x-hidden">
      {/* 1. Global Falling Flowers Animation (Fixed z-index -1) */}
      <ViewportDecorations />

      {/* 2. Floating Circular Music Player at Bottom-Right */}
      <MusicPlayer ref={musicPlayerRef} />

      {/* 3. Main Content Flow */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section: Exact text, Invocations, Script Names, 3D Depth, CTA & Scroll to Explore */}
        <HeroSection onViewDetails={handleViewDetails} />

        {/* Welcome / Story Section: "We Are Getting Married", Couple Photo with Parallax, Countdown */}
        <WelcomeStorySection />

        {/* Event Details Section: 2 Event Cards in 3D Tilt, Parents' Details */}
        <EventDetails />

        {/* Location & Navigation Section: Map Iframe, QR Code, Direct Button */}
        <LocationSection />

        {/* Guest Blessings & Wishes Wall */}
        <BlessingsSection />

        {/* Final Auspicious Blessings & Footer */}
        <FooterSection />
      </div>
    </main>
  );
}
