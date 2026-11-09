"use client";

import React from "react";
import { ArrowUp, Heart } from "lucide-react";
import { invitationData } from "@/data/invitation";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative border-t border-[#c59b4e]/30 py-16 sm:py-24 px-5 sm:px-8 bg-[radial-gradient(ellipse_at_center,_rgba(255,250,240,0.7)_0%,_rgba(253,251,247,0.95)_70%)] z-10 text-center w-full"
      suppressHydrationWarning
    >
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Sacred Final Ornament */}
        <span className="text-[#c59b4e] text-2xl sm:text-3xl">❦</span>

        {/* Closing Message */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-script text-[#6b1e23] font-normal my-3 sm:my-4 leading-tight">
          We Await Your Gracious Presence
        </h2>

        {/* Couple Names */}
        <p className="text-2xl sm:text-4xl md:text-5xl font-script text-[#6b1e23] my-1 sm:my-2">
          {invitationData.couple.groom.name} <span className="font-serif text-xl sm:text-2xl text-[#a87831]">&amp;</span> {invitationData.couple.bride.name}
        </p>

        {/* Dates */}
        <p className="text-[11px] sm:text-xs text-[#92703e] font-serif tracking-[2.5px] uppercase mt-2 mb-5 font-semibold">
          {invitationData.couple.displayDates}
        </p>

        {/* Sacred Lotus Symbol */}
        <div className="text-[#a17437] text-3xl sm:text-4xl my-2">🪷</div>

        {/* Family Blessings */}
        <p className="text-xs sm:text-sm text-[#735d51] font-serif italic max-w-md mx-auto my-5 leading-relaxed px-2">
          {invitationData.footer.blessingsText}
        </p>

        {/* Return to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Return to top"
          className="mt-3 flex items-center gap-2 px-6 py-2.5 rounded-sm border border-[#c59b4e]/50 bg-[#fff9ee] hover:bg-white text-[#6b1e23] text-[11px] sm:text-xs font-serif font-semibold tracking-[2px] uppercase transition-all shadow-sm cursor-pointer"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#c59b4e]" />
        </button>

        {/* Bottom Credits */}
        <div className="mt-10 sm:mt-12 text-[10px] sm:text-[11px] text-[#927767] flex items-center justify-center gap-1 font-sans">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-[#6b1e23] fill-[#6b1e23] inline" />
          <span>for Dharshan &amp; Deepika</span>
        </div>
      </div>
    </footer>
  );
}
