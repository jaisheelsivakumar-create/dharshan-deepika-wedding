import type { WeddingSectionId } from "@/lib/particleBus";

export interface SectionParticlePreset {
  /** Base horizontal velocity (world units/sec). Positive = rightward, negative = leftward */
  vx: number;
  /** Base vertical velocity for petals/flowers (world units/sec). Negative = falling down, positive = rising */
  vy: number;
  /** Vertical drift speed for golden dust sparkles (world units/sec) */
  sparkleVy: number;
  /** Relative noise wind amplitude multiplier */
  windStrength: number;
  /** Horizontal sinusoidal flutter / sway multiplier */
  swayScale: number;
  /** Density multipliers in [0, 1] smoothly transitioned over 1.5s via ScrollTrigger */
  densities: {
    petals: number;
    jasmine: number;
    marigold: number;
    sparkles: number;
    bokeh: number;
    embers: number;
  };
  /** Ambient warm lamp brightness boost [0.6 - 1.4] */
  warmth: number;
}

export interface ParticleSystemConfig {
  atlas: {
    /** Single compressed WebP texture atlas URL containing 256px sprites with alpha */
    url: string;
    cols: number;
    rows: number;
    /** 0..5 = lotus & rose petals (6 variants), 6..7 = jasmine flowers, 8..9 = marigold petals, 10 = heart, 11 = confetti */
    petalTiles: readonly number[];
    jasmineTiles: readonly number[];
    marigoldTiles: readonly number[];
    heartTile: number;
    confettiTile: number;
  };
  counts: {
    desktop: {
      petals: number;
      jasmine: number;
      marigold: number;
      sparkles: number;
      bokeh: number;
      embers: number;
      burstPool: number;
    };
    /** Mobile fraction (~35% of desktop counts) */
    mobileRatio: number;
    /** Minimal calm ambient ratio when prefers-reduced-motion is enabled */
    reducedMotionRatio: number;
  };
  depth: {
    /** Far background Z bound */
    zMin: number;
    /** Very near foreground camera-DOF Z bound */
    zMax: number;
    /** Sharp focal depth plane */
    focalZ: number;
    /** Petals closer than this get strong camera Depth-of-Field softness */
    nearDofThreshold: number;
    /** Fraction of petals placed in the near-camera DOF pass */
    nearDofFraction: number;
    /** Bokeh orb background Z range */
    bokehZMin: number;
    bokehZMax: number;
  };
  speeds: {
    petalFallBase: number;
    jasmineFallBase: number;
    marigoldFallBase: number;
    sparkleRiseBase: number;
    bokehDriftBase: number;
    emberRiseBase: number;
    tumbleMin: number;
    tumbleMax: number;
    /** Speed multiplier scaling with depth (far = slower, near = faster) */
    farSpeedMultiplier: number;
    nearSpeedMultiplier: number;
  };
  physics: {
    /** Downward acceleration applied to celebratory bursts after initial upward pop */
    gravityBurst: number;
  };
  sizes: {
    petalBase: number;
    jasmineBase: number;
    marigoldBase: number;
    sparkleBase: number;
    bokehBase: number;
    emberBase: number;
    burstBase: number;
  };
  wind: {
    /** Global noise frequency across space/time */
    noiseScale: number;
    noiseSpeed: number;
    /** Strength of continuous noise-driven wind gusts */
    gustStrength: number;
    gustPeriodSec: number;
    baseStrength: number;
  };
  interaction: {
    /** Pointer / touch repulsion radius in world units */
    pointerRadius: number;
    /** Strength of gentle swirl/push away from pointer */
    pointerStrength: number;
    /** Subtle scene-wide parallax shift factor responding to mouse / mobile tilt */
    parallaxStrength: number;
    /** Mobile DeviceOrientation tilt influence */
    gyroStrength: number;
  };
  readability: {
    /** Normalized transition duration (seconds) when scrolling between sections */
    transitionDurationSec: number;
    /** Keep central text reading corridor crisp by attenuating overlaps smoothly */
    centerFadeMinAlpha: number;
    dofCenterFadeMinAlpha: number;
  };
  lighting: {
    /** Normalized screen-space warm lamp positions matching foreground diyas & top bells */
    warmLightHex: string;
    rimLightStrength: number;
  };
  colors: {
    petalTints: readonly string[];
    jasmineTints: readonly string[];
    marigoldTints: readonly string[];
    sparkleColors: readonly string[];
    bokehColors: readonly string[];
    emberColors: readonly string[];
    heartColors: readonly string[];
    confettiColors: readonly string[];
  };
  performance: {
    dpr: [number, number];
    reducedFpsThreshold: number;
    reducedFpsHoldSec: number;
    reducedQualityScale: number;
    heroPaintDelayMs: number;
  };
  /** Normalized flame coordinates aligned with ForegroundLayer diya wicks */
  foregroundFlames: readonly {
    xPct: number;
    yPctInFg: number;
  }[];
  sectionPresets: Record<WeddingSectionId, SectionParticlePreset>;
}

export const particleConfig: ParticleSystemConfig = {
  atlas: {
    url: "/particles/particles-atlas.webp",
    cols: 4,
    rows: 3,
    petalTiles: [0, 1, 2, 3, 4, 5],
    jasmineTiles: [6, 7],
    marigoldTiles: [8, 9],
    heartTile: 10,
    confettiTile: 11,
  },
  counts: {
    desktop: {
      petals: 95,
      jasmine: 32,
      marigold: 22,
      sparkles: 85,
      bokeh: 6,
      embers: 22,
      burstPool: 64,
    },
    mobileRatio: 0.38,
    reducedMotionRatio: 0.08,
  },
  depth: {
    zMin: -4.2,
    zMax: 3.1,
    focalZ: 0.15,
    nearDofThreshold: 2.15,
    nearDofFraction: 0.055,
    bokehZMin: -4.5,
    bokehZMax: -2.4,
  },
  speeds: {
    petalFallBase: 0.56,
    jasmineFallBase: 0.44,
    marigoldFallBase: 0.52,
    sparkleRiseBase: 0.38,
    bokehDriftBase: 0.14,
    emberRiseBase: 0.72,
    tumbleMin: 0.45,
    tumbleMax: 1.55,
    farSpeedMultiplier: 0.46,
    nearSpeedMultiplier: 1.38,
  },
  physics: {
    gravityBurst: 2.15,
  },
  sizes: {
    petalBase: 0.24,
    jasmineBase: 0.235,
    marigoldBase: 0.195,
    sparkleBase: 0.11,
    bokehBase: 1.4,
    emberBase: 0.115,
    burstBase: 0.28,
  },
  wind: {
    noiseScale: 0.34,
    noiseSpeed: 0.24,
    gustStrength: 0.42,
    gustPeriodSec: 7.2,
    baseStrength: 1.0,
  },
  interaction: {
    pointerRadius: 1.65,
    pointerStrength: 1.75,
    parallaxStrength: 0.28,
    gyroStrength: 0.42,
  },
  readability: {
    transitionDurationSec: 1.5,
    centerFadeMinAlpha: 0.26,
    dofCenterFadeMinAlpha: 0.12,
  },
  lighting: {
    warmLightHex: "#FFD27D",
    rimLightStrength: 0.9,
  },
  colors: {
    petalTints: [
      "#FFFFFF",
      "#FFE5EE",
      "#FFD1DF",
      "#F9B4CB",
      "#F693B7",
      "#F7C2D4",
    ],
    jasmineTints: ["#FFFFFF", "#FFF9E6", "#FAF1D6"],
    marigoldTints: ["#FF9E1B", "#FF7E00", "#FFBF2E", "#F06A00"],
    sparkleColors: ["#F2B229", "#FFC94A", "#E59D18", "#FFD966"],
    bokehColors: ["#F0BA4A", "#F7CE6E", "#E3A639", "#F5C4A0"],
    emberColors: ["#FF921C", "#FFB338", "#FF6E0A", "#FFD15C"],
    heartColors: ["#E6537A", "#C82D54", "#F48CA8", "#9D1E3B"],
    confettiColors: ["#DFBC6E", "#F5D78A", "#B8892E", "#8A1F29", "#F29AB6"],
  },
  performance: {
    dpr: [1, 2],
    reducedFpsThreshold: 45,
    reducedFpsHoldSec: 2.0,
    reducedQualityScale: 0.58,
    heroPaintDelayMs: 90,
  },
  foregroundFlames: [
    // Left brass kuthuvilakku wicks
    { xPct: 2.67, yPctInFg: 42.5 },
    { xPct: 5.06, yPctInFg: 43.9 },
    { xPct: 8.41, yPctInFg: 40.5 },
    { xPct: 13.12, yPctInFg: 41.9 },
    // Right brass kuthuvilakku wicks
    { xPct: 86.82, yPctInFg: 42.1 },
    { xPct: 89.31, yPctInFg: 43.9 },
    { xPct: 92.92, yPctInFg: 40.7 },
    { xPct: 97.33, yPctInFg: 42.3 },
  ],
  sectionPresets: {
    splash: {
      vx: 0.16,
      vy: -0.42,
      sparkleVy: 0.28,
      windStrength: 0.75,
      swayScale: 0.85,
      densities: {
        petals: 0.62,
        jasmine: 0.3,
        marigold: 0.18,
        sparkles: 0.45,
        bokeh: 0.65,
        embers: 0.55,
      },
      warmth: 1.0,
    },
    hero: {
      // Slow diagonal lotus/rose petal fall with golden bokeh orbs
      vx: 0.32,
      vy: -0.48,
      sparkleVy: 0.3,
      windStrength: 0.9,
      swayScale: 0.95,
      densities: {
        petals: 0.78,
        jasmine: 0.28,
        marigold: 0.2,
        sparkles: 0.48,
        bokeh: 0.85,
        embers: 0.8,
      },
      warmth: 1.15,
    },
    families: {
      // Vertical gentle jasmine & petal rain
      vx: 0.03,
      vy: -0.52,
      sparkleVy: 0.22,
      windStrength: 0.44,
      swayScale: 0.75,
      densities: {
        petals: 0.55,
        jasmine: 0.82,
        marigold: 0.2,
        sparkles: 0.32,
        bokeh: 0.35,
        embers: 0.35,
      },
      warmth: 0.95,
    },
    venue: {
      // Calm, sparse petals only
      vx: -0.05,
      vy: -0.32,
      sparkleVy: 0.14,
      windStrength: 0.25,
      swayScale: 0.58,
      densities: {
        petals: 0.25,
        jasmine: 0.06,
        marigold: 0.04,
        sparkles: 0.12,
        bokeh: 0.18,
        embers: 0.25,
      },
      warmth: 0.8,
    },
    schedule: {
      // Rising gold sparkles and fewer petals
      vx: 0.08,
      vy: -0.34,
      sparkleVy: 0.68,
      windStrength: 0.48,
      swayScale: 0.68,
      densities: {
        petals: 0.24,
        jasmine: 0.15,
        marigold: 0.28,
        sparkles: 0.75,
        bokeh: 0.52,
        embers: 0.62,
      },
      warmth: 1.18,
    },
    gallery: {
      // Graceful diagonal gallery drift
      vx: 0.14,
      vy: -0.4,
      sparkleVy: 0.25,
      windStrength: 0.65,
      swayScale: 0.88,
      densities: {
        petals: 0.45,
        jasmine: 0.35,
        marigold: 0.18,
        sparkles: 0.35,
        bokeh: 0.32,
        embers: 0.35,
      },
      warmth: 0.92,
    },
    blessings: {
      // Uplifting warm celebration
      vx: 0.05,
      vy: 0.24,
      sparkleVy: 0.6,
      windStrength: 0.55,
      swayScale: 0.95,
      densities: {
        petals: 0.55,
        jasmine: 0.42,
        marigold: 0.25,
        sparkles: 0.68,
        bokeh: 0.62,
        embers: 0.55,
      },
      warmth: 1.15,
    },
    footer: {
      // Serene glowing closing frame
      vx: 0.06,
      vy: -0.34,
      sparkleVy: 0.38,
      windStrength: 0.38,
      swayScale: 0.72,
      densities: {
        petals: 0.42,
        jasmine: 0.32,
        marigold: 0.18,
        sparkles: 0.55,
        bokeh: 0.7,
        embers: 0.8,
      },
      warmth: 1.25,
    },
  },
};
