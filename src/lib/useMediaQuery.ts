"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
