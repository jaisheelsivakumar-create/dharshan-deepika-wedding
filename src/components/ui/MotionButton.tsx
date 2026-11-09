"use client";

import React from "react";
import { motion } from "framer-motion";

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 sm:gap-2.5 min-h-[48px] px-4 sm:px-7 py-3 rounded-full bg-gradient-to-b from-[#7A1E24] to-[#5A1418] text-[#FDF8EE] border-[1.5px] border-[#B8892E] shadow-[0_10px_24px_rgba(107,26,31,0.28),inset_0_1px_0_rgba(255,235,180,0.28)] hover:shadow-[0_14px_30px_rgba(107,26,31,0.38)] hover:border-[#DFBC6E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF8EE] font-heading font-semibold text-[11px] sm:text-sm tracking-[0.09em] sm:tracking-[0.14em] uppercase whitespace-nowrap cursor-pointer select-none transition-colors";

export function MotionButton({
  children,
  className = "",
  ariaLabel,
  type = "button",
  onClick,
}: BaseButtonProps) {
  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
}

interface MotionLinkButtonProps {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  ariaLabel?: string;
}

export function MotionLinkButton({
  children,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  ariaLabel,
}: MotionLinkButtonProps) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.a>
  );
}
