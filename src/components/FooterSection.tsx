"use client";

import React from "react";
import { ArrowUp, Heart } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative border-t border-[#9d7434]/25 py-24 sm:py-32 px-6 sm:px-10 bg-[radial-gradient(ellipse_at_center,_rgba(255,250,240,0.7)_0%,_rgba(248,238,229,0.95)_70%)] z-10 text-center"
      suppressHydrationWarning
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Sacred Final Ornament */}
        <span className="text-[#a57835] text-3xl">❦</span>

        {/* Closing Message */}
        <h2 className="text-4xl sm:text-6xl font-script text-[#701e2a] font-normal my-4">
          We Await Your Gracious Presence
        </h2>

        {/* Couple Names */}
        <p className="text-3xl sm:text-5xl font-script text-[#701e2a] my-2">
          {weddingData.couple.groom.firstName} <span className="font-serif text-2xl text-[#a67835]">&amp;</span> {weddingData.couple.bride.firstName}
        </p>

        {/* Dates */}
        <p className="text-xs sm:text-sm text-[#92703e] font-heading tracking-[3px] uppercase mt-2 mb-6">
          {weddingData.couple.displayDate}
        </p>

        {/* Sacred Lotus Symbol */}
        <div className="text-[#a17437] text-4xl my-2">🪷</div>

        {/* Family Blessings */}
        <p className="text-xs sm:text-sm text-[#735d51] font-serif italic max-w-lg mx-auto my-6 leading-relaxed">
          {weddingData.footer.blessingsText}
        </p>

        {/* Return to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Return to top"
          className="mt-4 flex items-center gap-2 px-6 py-2.5 rounded-sm border border-[#a67835]/50 bg-[#fff9ee] hover:bg-white text-[#701e2a] text-xs font-heading tracking-[2px] uppercase transition-all shadow-sm"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#a87831]" />
        </button>

        {/* Bottom Credits */}
        <div className="mt-12 text-[11px] text-[#927767] flex items-center justify-center gap-1 font-sans">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-[#741e2b] fill-[#741e2b] inline" />
          <span>for Dharshan &amp; Deepika</span>
        </div>
      </div>
    </footer>
  );
}
