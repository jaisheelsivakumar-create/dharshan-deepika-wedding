"use client";

import React from "react";
import { Heart, ArrowUp, Sparkles } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-amber-500/20 py-16 px-4 sm:px-6 bg-[#0a070c] z-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full glass-luxury border-2 border-amber-400/40 flex items-center justify-center text-amber-200 text-xl font-serif font-bold shadow-2xl">
            {weddingData.couple.monogram}
          </div>
          <div className="absolute -inset-1 rounded-full border border-amber-400/20 pointer-events-none" />
        </div>

        {/* Names */}
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient tracking-wide mb-2">
          {weddingData.couple.groom.firstName} &amp; {weddingData.couple.bride.firstName}
        </h3>

        {/* Date and Hashtag */}
        <p className="text-xs sm:text-sm text-amber-300/80 font-serif mb-6">
          {weddingData.couple.displayDate} • {weddingData.couple.hashtag}
        </p>

        {/* Blessings acknowledgment */}
        <p className="text-xs sm:text-sm text-neutral-400 font-serif italic max-w-lg mb-8 leading-relaxed">
          {weddingData.footer.blessingsText}
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-luxury border border-amber-400/30 text-amber-200 hover:text-white text-xs font-serif uppercase tracking-widest transition-all duration-300 hover:border-amber-400 hover:scale-105"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
        </button>

        {/* Bottom small print */}
        <div className="mt-12 text-[11px] text-neutral-500 flex items-center justify-center gap-1 font-sans">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>for Dharashan &amp; Priyadharshini</span>
        </div>
      </div>
    </footer>
  );
}
