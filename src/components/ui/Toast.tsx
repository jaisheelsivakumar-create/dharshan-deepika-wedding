"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-24 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      {message && (
        <div
          role="status"
          className="toast-enter pointer-events-auto inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#6B1A1F] text-[#FDF8EE] border border-[#B8892E] shadow-[0_14px_34px_rgba(107,26,31,0.38)] text-xs sm:text-sm font-heading tracking-wide text-center"
        >
          <CheckCircle2 className="w-4 h-4 text-[#DFBC6E] shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
