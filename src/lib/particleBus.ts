export type WeddingSectionId =
  | "splash"
  | "hero"
  | "families"
  | "schedule"
  | "venue"
  | "gallery"
  | "blessings"
  | "footer";

export type ParticleBurstType = "envelope" | "blessing";

export interface ParticleBurstDetail {
  type: ParticleBurstType;
  /** Optional normalized/client coordinates where the user tapped */
  clientX?: number;
  clientY?: number;
}

const pendingBursts: ParticleBurstDetail[] = [];

export function emitParticleBurst(
  type: ParticleBurstType,
  origin?: { clientX?: number; clientY?: number }
) {
  if (typeof window === "undefined") return;
  const detail: ParticleBurstDetail = {
    type,
    clientX: origin?.clientX,
    clientY: origin?.clientY,
  };
  pendingBursts.push(detail);
  window.dispatchEvent(new CustomEvent<ParticleBurstDetail>("wedding:particle-burst", { detail }));
}

export function consumePendingBursts(): ParticleBurstDetail[] {
  if (pendingBursts.length === 0) return [];
  return pendingBursts.splice(0, pendingBursts.length);
}

export function clearPendingBursts() {
  pendingBursts.length = 0;
}
