"use client";

import React from "react";

interface GoldOrnamentProps {
  className?: string;
}

export function GoldOrnament({ className = "w-7 h-7" }: GoldOrnamentProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={`text-[#B8892E] ${className}`}
    >
      {/* Center Lotus Crown */}
      <path
        d="M24 6C26.8 11.5 29.5 16.5 29.5 21C29.5 24.8 27 28 24 28C21 28 18.5 24.8 18.5 21C18.5 16.5 21.2 11.5 24 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="currentColor"
        fillOpacity="0.16"
      />
      {/* Side Petals */}
      <path
        d="M18.5 22C13 20.5 9.5 17 8 12.5C12.5 13 16.2 15.5 18.5 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 22C35 20.5 38.5 17 40 12.5C35.5 13 31.8 15.5 29.5 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lower Filigree Stem & Side Curls */}
      <path
        d="M24 28V39M24 32C18.5 32 14.5 35.5 10 35M24 32C29.5 32 33.5 35.5 38 35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="41.5" r="2" fill="currentColor" />
      <circle cx="8" cy="35" r="1.4" fill="currentColor" />
      <circle cx="40" cy="35" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function GoldDivider({
  maxWidth = "max-w-[200px]",
  className = "",
}: {
  maxWidth?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 w-full ${maxWidth} ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B8892E]/70 to-[#B8892E]" />
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#B8892E] shrink-0" fill="currentColor">
        <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B8892E]/70 to-[#B8892E]" />
    </div>
  );
}
