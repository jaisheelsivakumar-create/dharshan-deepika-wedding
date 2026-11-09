/**
 * Lightweight zero-allocation 2D gradient noise & wind field utilities
 * for deterministic, organic wedding particle motion.
 */

const PERM = new Uint8Array(512);
const GRAD2 = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Seeded Fisher-Yates shuffle for consistent wind field across devices
  let s = 14112026;
  for (let i = 255; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
  }
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

/**
 * Smooth 2D gradient noise in [-1, 1]
 */
export function noise2D(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const X = xi & 255;
  const Y = yi & 255;

  const u = fade(xf);
  const v = fade(yf);

  const aa = PERM[PERM[X] + Y] & 7;
  const ab = PERM[PERM[X] + Y + 1] & 7;
  const ba = PERM[PERM[X + 1] + Y] & 7;
  const bb = PERM[PERM[X + 1] + Y + 1] & 7;

  const gAA = GRAD2[aa][0] * xf + GRAD2[aa][1] * yf;
  const gBA = GRAD2[ba][0] * (xf - 1) + GRAD2[ba][1] * yf;
  const gAB = GRAD2[ab][0] * xf + GRAD2[ab][1] * (yf - 1);
  const gBB = GRAD2[bb][0] * (xf - 1) + GRAD2[bb][1] * (yf - 1);

  return lerp(lerp(gAA, gBA, u), lerp(gAB, gBB, u), v) * 1.35;
}

/**
 * Smooth temporal gust factor in [0, 1] peaking organically every gustPeriodSec.
 */
export function computeWindGust(timeSec: number, gustPeriodSec: number): number {
  const phase = (timeSec / Math.max(1, gustPeriodSec)) * Math.PI * 2;
  const primary = Math.pow(Math.max(0, Math.sin(phase) * 0.5 + 0.5), 3.0);
  const secondary = Math.pow(Math.max(0, Math.cos(phase * 0.61 + 1.4) * 0.5 + 0.5), 2.0);
  return Math.min(1, primary * 0.72 + secondary * 0.36);
}

/**
 * Computes exact Three.js world-space flame anchor coordinates aligned with ForegroundLayer's
 * responsive CSS sizing rules:
 *   mobile (<768px): w = 100vw, aspect 2/1, anchored bottom
 *   desktop (>=768px): w = min(94vw, 80vh) capped by max-h 40vh -> aspect 2/1, anchored bottom
 */
export function computeFlameWorldPositions(
  viewportW: number,
  viewportH: number,
  windowW: number,
  windowH: number,
  flames: readonly { xPct: number; yPctInFg: number }[]
): Array<{ x: number; y: number }> {
  const isMd = windowW >= 768;
  const isLg = windowW >= 1024;

  let fgWidthPx = windowW;
  let fgHeightPx = fgWidthPx / 2;

  if (isMd) {
    const vhFactor = isLg ? 0.8 : 0.76;
    const maxHFact = isLg ? 0.4 : 0.38;
    const targetW = Math.min(windowW * 0.94, windowH * vhFactor);
    const maxH = windowH * maxHFact;
    fgWidthPx = Math.min(targetW, maxH * 2);
    fgHeightPx = fgWidthPx / 2;
  }

  const fgLeftPx = (windowW - fgWidthPx) * 0.5;
  const fgTopPx = windowH - fgHeightPx;

  return flames.map((f) => {
    const px = fgLeftPx + (f.xPct / 100) * fgWidthPx;
    const py = fgTopPx + (f.yPctInFg / 100) * fgHeightPx;
    const wx = (px / Math.max(1, windowW) - 0.5) * viewportW;
    const wy = (0.5 - py / Math.max(1, windowH)) * viewportH;
    return { x: wx, y: wy };
  });
}
