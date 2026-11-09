"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { invitationData } from "@/data/invitation";
import { emitParticleBurst } from "@/lib/particleBus";

interface SplashEnvelopeProps {
  isVisible: boolean;
  onPrefetch?: () => void;
  onStartOpen: () => void;
  onFinishOpen: () => void;
}

export default function SplashEnvelope({
  isVisible,
  onPrefetch,
  onStartOpen,
  onFinishOpen,
}: SplashEnvelopeProps) {
  const [opening, setOpening] = useState(false);

  if (!isVisible) return null;

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onPrefetch?.();
    onStartOpen();
    emitParticleBurst("envelope", {
      clientX: typeof window !== "undefined" ? window.innerWidth * 0.5 : undefined,
      clientY: typeof window !== "undefined" ? window.innerHeight * 0.48 : undefined,
    });

    setTimeout(() => {
      onFinishOpen();
    }, 980);
  };

  return (
    <div
      key="splash-envelope"
      className={`fixed inset-0 z-[60] min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-8 text-center bg-[#FDF8EE]/88 overflow-hidden transition-opacity duration-[580ms] ease-out ${
        opening ? "opacity-0 delay-[340ms] pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      {/* Ambient radial glow behind envelope */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(223,188,110,0.24) 0%, rgba(253,248,238,0) 68%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[440px] mx-auto flex flex-col items-center text-center">
        {/* Top Telugu Blessing Line (starts visible for immediate FCP) */}
        <p
          lang="te"
          className="font-telugu text-fluid-shloka-lead font-bold text-[#6B1A1F] tracking-wide mb-2 text-balance"
        >
          {invitationData.invocations.shlokaLines[0]}
        </p>

        <p className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mb-6 text-balance">
          {invitationData.splash.tapPrompt}
        </p>

        {/* 3D Envelope Stage */}
        <div
          className="relative w-full max-w-[350px] sm:max-w-[400px] h-[240px] sm:h-[275px] mx-auto"
          style={{ perspective: "1400px" }}
        >
          {/* Envelope Back & Inner Rising Invitation Card */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#F4E6C8] to-[#EAD5AB] border-2 border-[#B8892E] shadow-[0_24px_60px_rgba(107,26,31,0.18)] overflow-visible">
            {/* Inner Invitation Card Hidden Until Flap Opens */}
            <div
              className="absolute inset-x-4 top-3 bottom-4 rounded-xl bg-[#FDF8EE] border border-[#B8892E]/70 shadow-inner flex flex-col items-center justify-center px-4 text-center z-10 pointer-events-none transition-[transform,opacity] duration-[680ms] delay-[140ms]"
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: opening ? 1 : 0,
                transform: opening
                  ? "translate3d(0, -78px, 0) scale(1.03)"
                  : "translate3d(0, 20px, 0) scale(0.98)",
              }}
            >
              <span className="text-[#855E14] text-fluid-eyebrow tracking-[0.22em] uppercase font-heading font-bold">
                {invitationData.invocations.subhamasthu}
              </span>
              <p className="font-script text-fluid-script-md text-[#6B1A1F] mt-1 leading-none">
                {invitationData.couple.groom.name} &amp; {invitationData.couple.bride.name}
              </p>
              <p className="font-body text-fluid-meta text-[#6B1A1F]/80 italic mt-2">
                {invitationData.couple.displayDates}
              </p>
            </div>

            {/* Front Lower Pocket Flaps */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(155deg, rgba(249,240,221,0.99) 0%, rgba(235,216,178,0.99) 100%)",
                clipPath: "polygon(0 28%, 50% 62%, 100% 28%, 100% 100%, 0 100%)",
                boxShadow: "inset 0 2px 12px rgba(107,26,31,0.08)",
              }}
            />

            {/* Gold Border Highlight Along Lower Pocket */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 275"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            >
              <polyline
                points="2,77 200,170 398,77"
                fill="none"
                stroke="#B8892E"
                strokeWidth="2"
                strokeOpacity="0.7"
              />
            </svg>

            {/* Top 3D Animated Envelope Flap */}
            <div
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                transform: opening ? "rotateX(-175deg)" : "rotateX(0deg)",
                transition: "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                zIndex: opening ? 5 : 30,
              }}
              className="absolute inset-x-0 top-0 h-full pointer-events-none"
            >
              <div
                className="w-full h-full rounded-t-2xl border-t-2 border-[#B8892E]"
                style={{
                  background:
                    "linear-gradient(180deg, #FBF4E4 0%, #EFE0BE 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 58%)",
                  backfaceVisibility: "hidden",
                }}
              />
              {/* Flap inner gold trim */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 275"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <polyline
                  points="4,2 200,158 396,2"
                  fill="none"
                  stroke="#B8892E"
                  strokeWidth="2"
                  strokeOpacity="0.85"
                />
              </svg>
            </div>

            {/* Wax Seal Monogram Centered on Flap Tip */}
            <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <div
                className={`transition-[transform,opacity] duration-300 ${
                  opening ? "scale-[0.6] opacity-0 -translate-y-6" : "scale-100 opacity-100"
                }`}
              >
                <div
                  className={`${
                    opening ? "" : "splash-seal-idle"
                  } w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-[#8B242B] via-[#6B1A1F] to-[#4A0F13] border-2 border-[#DFBC6E] shadow-[0_8px_22px_rgba(107,26,31,0.45)] flex items-center justify-center`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#DFBC6E]/55 flex items-center justify-center">
                    <span className="font-heading text-xs sm:text-sm font-bold text-[#FDF8EE] tracking-widest">
                      {invitationData.splash.sealMonogram}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tap to Open CTA Button */}
        <div
          className="mt-8 flex flex-col items-center text-center"
          onMouseEnter={() => onPrefetch?.()}
          onTouchStart={() => onPrefetch?.()}
          onFocus={() => onPrefetch?.()}
        >
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Tap to open wedding invitation and start music"
            className="inline-flex items-center justify-center gap-2 sm:gap-2.5 min-h-[48px] px-5 sm:px-7 py-3 rounded-full bg-gradient-to-b from-[#7A1E24] to-[#5A1418] text-[#FDF8EE] border-[1.5px] border-[#B8892E] shadow-[0_10px_24px_rgba(107,26,31,0.28),inset_0_1px_0_rgba(255,235,180,0.28)] hover:shadow-[0_14px_30px_rgba(107,26,31,0.38)] hover:border-[#DFBC6E] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF8EE] font-heading font-semibold text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.14em] uppercase whitespace-nowrap cursor-pointer select-none transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-[#DFBC6E]" aria-hidden="true" />
            <span>{invitationData.splash.buttonLabel}</span>
          </button>
          <p className="mt-3 text-fluid-meta text-[#6B1A1F]/80 font-body italic text-balance">
            Tap to reveal the invitation &amp; start auspicious music
          </p>
        </div>
      </div>
    </div>
  );
}
