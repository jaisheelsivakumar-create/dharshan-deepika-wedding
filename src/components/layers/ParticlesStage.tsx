"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { particleConfig, type SectionParticlePreset } from "@/config/particles";
import {
  consumePendingBursts,
  type ParticleBurstDetail,
  type WeddingSectionId,
} from "@/lib/particleBus";
import {
  computeFlameWorldPositions,
  computeWindGust,
  noise2D,
} from "@/lib/particleNoise";
import {
  createAtlasParticleMaterial,
  createBokehShaderMaterial,
  createCurvedPetalGeometry,
  createEmberShaderMaterial,
  createSparkleShaderMaterial,
} from "@/components/layers/particleShaders";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __PARTICLE_PERF__?: {
      fps: number;
      avgFps: number;
      dpr: number;
      qualityScale: number;
      activeSection: string;
      particleCounts: Record<string, number>;
    };
  }
}

interface LiveFlowState {
  vx: number;
  vy: number;
  sparkleVy: number;
  windStrength: number;
  swayScale: number;
  petalDensity: number;
  jasmineDensity: number;
  marigoldDensity: number;
  sparkleDensity: number;
  bokehDensity: number;
  emberDensity: number;
  warmth: number;
}

function presetToLiveState(p: SectionParticlePreset): LiveFlowState {
  return {
    vx: p.vx,
    vy: p.vy,
    sparkleVy: p.sparkleVy,
    windStrength: p.windStrength,
    swayScale: p.swayScale,
    petalDensity: p.densities.petals,
    jasmineDensity: p.densities.jasmine,
    marigoldDensity: p.densities.marigold,
    sparkleDensity: p.densities.sparkles,
    bokehDensity: p.densities.bokeh,
    emberDensity: p.densities.embers,
    warmth: p.warmth,
  };
}

function hexColorsToRGBList(hexList: readonly string[]): Float32Array {
  const out = new Float32Array(hexList.length * 3);
  const c = new THREE.Color();
  for (let i = 0; i < hexList.length; i++) {
    c.set(hexList[i]);
    out[i * 3] = c.r;
    out[i * 3 + 1] = c.g;
    out[i * 3 + 2] = c.b;
  }
  return out;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

interface AmbientGroupBuffers {
  count: number;
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  ox: Float32Array;
  oy: Float32Array;
  rx: Float32Array;
  ry: Float32Array;
  rz: Float32Array;
  vrx: Float32Array;
  vry: Float32Array;
  vrz: Float32Array;
  scale: Float32Array;
  swayPhase: Float32Array;
  swaySpeed: Float32Array;
  swayAmp: Float32Array;
  speedMul: Float32Array;
  rank01: Float32Array;
  baseOpacity: Float32Array;
  dofBlur: Float32Array;
  flutterAmp: Float32Array;
  flutterPhase: Float32Array;
}

function allocateAmbientGroup(
  count: number,
  worldW: number,
  worldH: number,
  opts: {
    baseScale: number;
    zMin: number;
    zMax: number;
    focalZ: number;
    nearDofThreshold: number;
    nearDofFraction: number;
    farSpeedMul: number;
    nearSpeedMul: number;
    spinYDominant?: boolean;
    swayBase?: number;
    flutterBase?: number;
    minOpacity?: number;
    maxOpacity?: number;
    biasOuterEdgesForDof?: boolean;
  }
): AmbientGroupBuffers {
  const px = new Float32Array(count);
  const py = new Float32Array(count);
  const pz = new Float32Array(count);
  const ox = new Float32Array(count);
  const oy = new Float32Array(count);
  const rx = new Float32Array(count);
  const ry = new Float32Array(count);
  const rz = new Float32Array(count);
  const vrx = new Float32Array(count);
  const vry = new Float32Array(count);
  const vrz = new Float32Array(count);
  const scale = new Float32Array(count);
  const swayPhase = new Float32Array(count);
  const swaySpeed = new Float32Array(count);
  const swayAmp = new Float32Array(count);
  const speedMul = new Float32Array(count);
  const rank01 = new Float32Array(count);
  const baseOpacity = new Float32Array(count);
  const dofBlur = new Float32Array(count);
  const flutterAmp = new Float32Array(count);
  const flutterPhase = new Float32Array(count);

  const halfW = worldW * 0.66;
  const halfH = worldH * 0.64;

  for (let i = 0; i < count; i++) {
    rank01[i] = i / Math.max(1, count - 1);

    const isNearDof = opts.nearDofFraction > 0 && Math.random() < opts.nearDofFraction;
    const z = isNearDof
      ? opts.nearDofThreshold + Math.random() * (opts.zMax - opts.nearDofThreshold)
      : opts.zMin + Math.random() * (opts.nearDofThreshold - opts.zMin);

    pz[i] = z;
    const depth01 = smoothstep(opts.zMin, opts.zMax, z);

    let x = (Math.random() - 0.5) * 2 * halfW;
    if (isNearDof && opts.biasOuterEdgesForDof) {
      const side = Math.random() < 0.5 ? -1 : 1;
      x = side * (halfW * (0.48 + Math.random() * 0.48));
    } else if (Math.random() < 0.44) {
      const side = Math.random() < 0.5 ? -1 : 1;
      x = side * (halfW * (0.36 + Math.random() * 0.62));
    }

    px[i] = x;
    py[i] = (Math.random() - 0.5) * 2 * halfH;

    const perspectiveComp = (7 - z) / 7;
    const randSize = 0.68 + Math.random() * 0.66;
    const dofScaleBoost = isNearDof ? 1.3 : 0.72 + depth01 * 0.5;
    scale[i] =
      opts.baseScale *
      randSize *
      dofScaleBoost *
      Math.min(1.14, Math.max(0.55, perspectiveComp * 0.92));

    speedMul[i] =
      (opts.farSpeedMul + depth01 * (opts.nearSpeedMul - opts.farSpeedMul)) *
      (0.78 + Math.random() * 0.44);

    const farBlur = z < -1.3 ? smoothstep(-1.3, opts.zMin, z) * 0.72 : 0;
    const nearBlur = isNearDof ? 0.55 + Math.random() * 0.45 : 0;
    dofBlur[i] = Math.max(farBlur, nearBlur);

    const minOp = opts.minOpacity ?? 0.36;
    const maxOp = opts.maxOpacity ?? 0.94;
    baseOpacity[i] = isNearDof
      ? 0.34 + Math.random() * 0.2
      : minOp + depth01 * (maxOp - minOp);

    rx[i] = Math.random() * Math.PI * 2;
    ry[i] = Math.random() * Math.PI * 2;
    rz[i] = Math.random() * Math.PI * 2;

    if (opts.spinYDominant) {
      vrx[i] = (Math.random() - 0.5) * 0.42;
      vry[i] = (Math.random() - 0.5) * 0.48;
      vrz[i] = (Math.random() < 0.5 ? -1 : 1) * (0.85 + Math.random() * 1.15);
    } else {
      const sign = () => (Math.random() < 0.5 ? -1 : 1);
      vrx[i] = sign() * (0.45 + Math.random() * 1.15);
      vry[i] = sign() * (0.55 + Math.random() * 1.35);
      vrz[i] = sign() * (0.35 + Math.random() * 0.9);
    }

    swayPhase[i] = Math.random() * Math.PI * 2;
    swaySpeed[i] = 0.65 + Math.random() * 1.15;
    swayAmp[i] =
      (opts.swayBase ?? 0.36) *
      (0.55 + depth01 * 0.75) *
      (0.65 + Math.random() * 0.7);

    flutterAmp[i] = (opts.flutterBase ?? 0.042) * (0.5 + Math.random() * 0.9);
    flutterPhase[i] = Math.random() * Math.PI * 2;
  }

  return {
    count,
    px,
    py,
    pz,
    ox,
    oy,
    rx,
    ry,
    rz,
    vrx,
    vry,
    vrz,
    scale,
    swayPhase,
    swaySpeed,
    swayAmp,
    speedMul,
    rank01,
    baseOpacity,
    dofBlur,
    flutterAmp,
    flutterPhase,
  };
}

interface BurstPool {
  capacity: number;
  active: Uint8Array;
  isSparkle: Uint8Array;
  tileIndex: Float32Array;
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  rx: Float32Array;
  ry: Float32Array;
  rz: Float32Array;
  vrx: Float32Array;
  vry: Float32Array;
  vrz: Float32Array;
  scale: Float32Array;
  life: Float32Array;
  maxLife: Float32Array;
  r: Float32Array;
  g: Float32Array;
  b: Float32Array;
  cursor: number;
}

function createBurstPool(capacity: number): BurstPool {
  return {
    capacity,
    active: new Uint8Array(capacity),
    isSparkle: new Uint8Array(capacity),
    tileIndex: new Float32Array(capacity),
    px: new Float32Array(capacity),
    py: new Float32Array(capacity),
    pz: new Float32Array(capacity),
    vx: new Float32Array(capacity),
    vy: new Float32Array(capacity),
    rx: new Float32Array(capacity),
    ry: new Float32Array(capacity),
    rz: new Float32Array(capacity),
    vrx: new Float32Array(capacity),
    vry: new Float32Array(capacity),
    vrz: new Float32Array(capacity),
    scale: new Float32Array(capacity),
    life: new Float32Array(capacity),
    maxLife: new Float32Array(capacity),
    r: new Float32Array(capacity),
    g: new Float32Array(capacity),
    b: new Float32Array(capacity),
    cursor: 0,
  };
}

interface EmberPool {
  count: number;
  px: Float32Array;
  py: Float32Array;
  pz: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  life: Float32Array;
  maxLife: Float32Array;
  scale: Float32Array;
  flameIdx: Uint8Array;
  r: Float32Array;
  g: Float32Array;
  b: Float32Array;
}

function createEmberPool(count: number, colorsRGB: Float32Array): EmberPool {
  const numCols = colorsRGB.length / 3;
  const numFlames = particleConfig.foregroundFlames.length;

  const px = new Float32Array(count);
  const py = new Float32Array(count);
  const pz = new Float32Array(count);
  const vx = new Float32Array(count);
  const vy = new Float32Array(count);
  const life = new Float32Array(count);
  const maxLife = new Float32Array(count);
  const scale = new Float32Array(count);
  const flameIdx = new Uint8Array(count);
  const r = new Float32Array(count);
  const g = new Float32Array(count);
  const b = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    maxLife[i] = 1.8 + Math.random() * 1.9;
    life[i] = Math.random() * maxLife[i];
    flameIdx[i] = i % numFlames;
    pz[i] = 0.25 + Math.random() * 0.55;
    vx[i] = (Math.random() - 0.5) * 0.16;
    vy[i] = particleConfig.speeds.emberRiseBase * (0.65 + Math.random() * 0.8);
    scale[i] = particleConfig.sizes.emberBase * (0.65 + Math.random() * 0.9);
    const cIdx = (i % numCols) * 3;
    r[i] = colorsRGB[cIdx];
    g[i] = colorsRGB[cIdx + 1];
    b[i] = colorsRGB[cIdx + 2];
  }

  return { count, px, py, pz, vx, vy, life, maxLife, scale, flameIdx, r, g, b };
}

interface AllParticleBuffers {
  petals: AmbientGroupBuffers;
  jasmine: AmbientGroupBuffers;
  marigold: AmbientGroupBuffers;
  sparkles: AmbientGroupBuffers;
  bokeh: AmbientGroupBuffers;
  embers: EmberPool;
  burst: BurstPool;
}

interface AllMetaArrays {
  petalMeta: Float32Array;
  jasmineMeta: Float32Array;
  marigoldMeta: Float32Array;
  sparkleMeta: Float32Array;
  bokehMeta: Float32Array;
  emberOpacity: Float32Array;
  burstAtlasMeta: Float32Array;
  burstAtlasTile: Float32Array;
  burstAtlasTint: Float32Array;
  burstSparkleMeta: Float32Array;
  burstSparkleScale: Float32Array;
  burstSparkleColor: Float32Array;
}

interface MaterialCollection {
  petal: THREE.ShaderMaterial;
  jasmine: THREE.ShaderMaterial;
  marigold: THREE.ShaderMaterial;
  burst: THREE.ShaderMaterial;
  sparkle: THREE.ShaderMaterial;
  burstSparkle: THREE.ShaderMaterial;
  bokeh: THREE.ShaderMaterial;
  ember: THREE.ShaderMaterial;
}

interface SceneProps {
  activeSection: WeddingSectionId;
  isDesktop: boolean;
  reducedMotion: boolean;
  isPaused: boolean;
  onReduceQuality: () => void;
  dprRef: React.MutableRefObject<number>;
}

function CinematicParticleScene({
  activeSection,
  isDesktop,
  reducedMotion,
  isPaused,
  onReduceQuality,
  dprRef,
}: SceneProps) {
  const { viewport, gl } = useThree();

  const counts = useMemo(() => {
    const ratio = reducedMotion
      ? particleConfig.counts.reducedMotionRatio
      : isDesktop
      ? 1
      : particleConfig.counts.mobileRatio;

    const desktop = particleConfig.counts.desktop;
    return {
      petals: Math.max(4, Math.round(desktop.petals * ratio)),
      jasmine: Math.max(2, Math.round(desktop.jasmine * ratio)),
      marigold: Math.max(2, Math.round(desktop.marigold * ratio)),
      sparkles: Math.max(6, Math.round(desktop.sparkles * ratio)),
      bokeh: reducedMotion ? 2 : Math.max(3, Math.round(desktop.bokeh * (isDesktop ? 1 : 0.65))),
      embers: reducedMotion ? 0 : Math.max(8, Math.round(desktop.embers * ratio)),
      burstAtlas: reducedMotion ? 12 : desktop.burstPool,
      burstSparkles: reducedMotion ? 8 : Math.round(desktop.burstPool * 0.65),
    };
  }, [isDesktop, reducedMotion]);

  const geometries = useMemo(() => {
    return {
      petal: createCurvedPetalGeometry(6, 6, 0.09, 0.075),
      jasmine: createCurvedPetalGeometry(4, 4, 0.035, 0.045),
      marigold: createCurvedPetalGeometry(5, 5, 0.08, 0.06),
      burst: createCurvedPetalGeometry(4, 4, 0.06, 0.05),
      bokehGeo: new THREE.PlaneGeometry(1, 1),
      sparkleGeo: new THREE.PlaneGeometry(1, 1),
      emberGeo: new THREE.PlaneGeometry(1, 1),
      burstSparkleGeo: new THREE.PlaneGeometry(1, 1),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
    };
  }, [geometries]);

  const parallaxGroupRef = useRef<THREE.Group>(null);
  const petalMesh = useRef<THREE.InstancedMesh>(null);
  const jasmineMesh = useRef<THREE.InstancedMesh>(null);
  const marigoldMesh = useRef<THREE.InstancedMesh>(null);
  const sparkleMesh = useRef<THREE.InstancedMesh>(null);
  const bokehMesh = useRef<THREE.InstancedMesh>(null);
  const emberMesh = useRef<THREE.InstancedMesh>(null);
  const burstAtlasMesh = useRef<THREE.InstancedMesh>(null);
  const burstSparkleMesh = useRef<THREE.InstancedMesh>(null);

  // Store ALL mutable WebGL resources, typed buffers, palettes & scratch objects in refs (React Compiler friendly)
  const matsRef = useRef<MaterialCollection | null>(null);
  const buffersRef = useRef<AllParticleBuffers | null>(null);
  const metasRef = useRef<AllMetaArrays | null>(null);
  const palettesRef = useRef<{
    petal: Float32Array;
    jasmine: Float32Array;
    marigold: Float32Array;
    sparkle: Float32Array;
    bokeh: Float32Array;
    ember: Float32Array;
    heart: Float32Array;
    confetti: Float32Array;
  } | null>(null);

  const viewportRef = useRef({ width: viewport.width, height: viewport.height });
  useEffect(() => {
    viewportRef.current.width = viewport.width;
    viewportRef.current.height = viewport.height;
  }, [viewport.height, viewport.width]);

  const viewportScaleFactor = useMemo(() => {
    return isDesktop ? 1.0 : Math.max(0.68, Math.min(0.9, viewport.width / 3.4));
  }, [isDesktop, viewport.width]);

  // Allocate & bind textures, shaders, typed arrays & InstancedBufferAttributes once per capacity/device change
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const atlasTexture = loader.load(particleConfig.atlas.url);
    atlasTexture.colorSpace = THREE.SRGBColorSpace;
    atlasTexture.minFilter = THREE.LinearMipmapLinearFilter;
    atlasTexture.magFilter = THREE.LinearFilter;
    atlasTexture.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
    atlasTexture.generateMipmaps = true;
    atlasTexture.wrapS = THREE.ClampToEdgeWrapping;
    atlasTexture.wrapT = THREE.ClampToEdgeWrapping;

    const safeHalf = isDesktop ? 0.25 : 0.42;

    const setupAtlasMat = (rimScale: number, centerFade: number, dofFade: number) => {
      const m = createAtlasParticleMaterial(
        atlasTexture,
        particleConfig.atlas.cols,
        particleConfig.atlas.rows
      );
      m.uniforms.uWarmColor.value.set(particleConfig.lighting.warmLightHex);
      m.uniforms.uRimStrength.value = particleConfig.lighting.rimLightStrength * rimScale;
      m.uniforms.uSafeHalfWidth.value = safeHalf;
      m.uniforms.uCenterFadeMin.value = centerFade;
      m.uniforms.uDofCenterFadeMin.value = dofFade;
      return m;
    };

    const mats: MaterialCollection = {
      petal: setupAtlasMat(
        1.0,
        particleConfig.readability.centerFadeMinAlpha,
        particleConfig.readability.dofCenterFadeMinAlpha
      ),
      jasmine: setupAtlasMat(
        0.38,
        particleConfig.readability.centerFadeMinAlpha,
        particleConfig.readability.dofCenterFadeMinAlpha
      ),
      marigold: setupAtlasMat(
        0.9,
        particleConfig.readability.centerFadeMinAlpha,
        particleConfig.readability.dofCenterFadeMinAlpha
      ),
      burst: setupAtlasMat(1.05, 0.88, 0.68),
      sparkle: createSparkleShaderMaterial(),
      burstSparkle: createSparkleShaderMaterial(),
      bokeh: createBokehShaderMaterial(),
      ember: createEmberShaderMaterial(),
    };
    mats.sparkle.uniforms.uSafeHalfWidth.value = safeHalf;
    mats.burstSparkle.uniforms.uSafeHalfWidth.value = safeHalf;
    mats.bokeh.uniforms.uSafeHalfWidth.value = safeHalf;
    matsRef.current = mats;

    const palettes = {
      petal: hexColorsToRGBList(particleConfig.colors.petalTints),
      jasmine: hexColorsToRGBList(particleConfig.colors.jasmineTints),
      marigold: hexColorsToRGBList(particleConfig.colors.marigoldTints),
      sparkle: hexColorsToRGBList(particleConfig.colors.sparkleColors),
      bokeh: hexColorsToRGBList(particleConfig.colors.bokehColors),
      ember: hexColorsToRGBList(particleConfig.colors.emberColors),
      heart: hexColorsToRGBList(particleConfig.colors.heartColors),
      confetti: hexColorsToRGBList(particleConfig.colors.confettiColors),
    };
    palettesRef.current = palettes;

    const w = Math.max(viewportRef.current.width, 3);
    const h = Math.max(viewportRef.current.height, 6);
    const { depth, sizes, speeds } = particleConfig;

    const buffers: AllParticleBuffers = {
      petals: allocateAmbientGroup(counts.petals, w, h, {
        baseScale: sizes.petalBase * viewportScaleFactor,
        zMin: depth.zMin,
        zMax: depth.zMax,
        focalZ: depth.focalZ,
        nearDofThreshold: depth.nearDofThreshold,
        nearDofFraction: reducedMotion ? 0 : depth.nearDofFraction,
        farSpeedMul: speeds.farSpeedMultiplier,
        nearSpeedMul: speeds.nearSpeedMultiplier,
        swayBase: 0.36,
        flutterBase: 0.048,
        minOpacity: 0.36,
        maxOpacity: 0.94,
        biasOuterEdgesForDof: true,
      }),
      jasmine: allocateAmbientGroup(counts.jasmine, w, h, {
        baseScale: sizes.jasmineBase * viewportScaleFactor,
        zMin: depth.zMin * 0.75,
        zMax: 1.8,
        focalZ: depth.focalZ,
        nearDofThreshold: 99,
        nearDofFraction: 0,
        farSpeedMul: speeds.farSpeedMultiplier * 0.9,
        nearSpeedMul: speeds.nearSpeedMultiplier * 0.82,
        spinYDominant: true,
        swayBase: 0.24,
        flutterBase: 0.018,
        minOpacity: 0.56,
        maxOpacity: 0.96,
      }),
      marigold: allocateAmbientGroup(counts.marigold, w, h, {
        baseScale: sizes.marigoldBase * viewportScaleFactor,
        zMin: depth.zMin * 0.65,
        zMax: 1.9,
        focalZ: depth.focalZ,
        nearDofThreshold: 99,
        nearDofFraction: 0,
        farSpeedMul: speeds.farSpeedMultiplier,
        nearSpeedMul: speeds.nearSpeedMultiplier * 0.95,
        swayBase: 0.32,
        flutterBase: 0.036,
        minOpacity: 0.42,
        maxOpacity: 0.92,
      }),
      sparkles: allocateAmbientGroup(counts.sparkles, w, h, {
        baseScale: sizes.sparkleBase * (isDesktop ? 1 : 0.85),
        zMin: depth.zMin * 0.6,
        zMax: 2.0,
        focalZ: 0.2,
        nearDofThreshold: 99,
        nearDofFraction: 0,
        farSpeedMul: 0.45,
        nearSpeedMul: 1.15,
        swayBase: 0.16,
        flutterBase: 0,
        minOpacity: 0.3,
        maxOpacity: 0.88,
      }),
      bokeh: allocateAmbientGroup(counts.bokeh, w, h, {
        baseScale: sizes.bokehBase * (isDesktop ? 1.0 : 0.72),
        zMin: depth.bokehZMin,
        zMax: depth.bokehZMax,
        focalZ: -3.2,
        nearDofThreshold: 99,
        nearDofFraction: 0,
        farSpeedMul: 0.28,
        nearSpeedMul: 0.48,
        swayBase: 0.2,
        flutterBase: 0,
        minOpacity: 0.16,
        maxOpacity: 0.28,
      }),
      embers: createEmberPool(counts.embers, palettes.ember),
      burst: createBurstPool(counts.burstAtlas + counts.burstSparkles),
    };
    buffersRef.current = buffers;

    // Seed initial ember world positions right on foreground lamp flames (never origin 0,0)
    if (buffers.embers.count > 0) {
      const initialFlames = computeFlameWorldPositions(
        w,
        h,
        window.innerWidth,
        window.innerHeight,
        particleConfig.foregroundFlames
      );
      const em = buffers.embers;
      for (let i = 0; i < em.count; i++) {
        const anchor = initialFlames[em.flameIdx[i] % initialFlames.length];
        const ageRatio = em.life[i] / em.maxLife[i];
        em.px[i] = anchor.x + (Math.random() - 0.5) * 0.08 + em.vx[i] * em.life[i];
        em.py[i] = anchor.y + 0.04 + ageRatio * em.vy[i] * em.maxLife[i];
      }
    }

    const metas: AllMetaArrays = {
      petalMeta: new Float32Array(counts.petals * 4),
      jasmineMeta: new Float32Array(counts.jasmine * 4),
      marigoldMeta: new Float32Array(counts.marigold * 4),
      sparkleMeta: new Float32Array(counts.sparkles * 4),
      bokehMeta: new Float32Array(counts.bokeh * 4),
      emberOpacity: new Float32Array(counts.embers),
      burstAtlasMeta: new Float32Array(counts.burstAtlas * 4),
      burstAtlasTile: new Float32Array(counts.burstAtlas),
      burstAtlasTint: new Float32Array(counts.burstAtlas * 3),
      burstSparkleMeta: new Float32Array(counts.burstSparkles * 4),
      burstSparkleScale: new Float32Array(counts.burstSparkles),
      burstSparkleColor: new Float32Array(counts.burstSparkles * 3),
    };
    metasRef.current = metas;

    const bindAtlasGroup = (
      mesh: THREE.InstancedMesh | null,
      mat: THREE.ShaderMaterial,
      buf: AmbientGroupBuffers,
      tiles: readonly number[],
      palette: Float32Array,
      metaArr: Float32Array
    ) => {
      if (!mesh) return;
      mesh.material = mat;
      const numColors = palette.length / 3;
      const tileAttr = new Float32Array(buf.count);
      const tintAttr = new Float32Array(buf.count * 3);

      for (let i = 0; i < buf.count; i++) {
        tileAttr[i] = tiles[Math.floor(Math.random() * tiles.length)];
        const ci = (i % numColors) * 3;
        const jitter = 0.94 + Math.random() * 0.12;
        tintAttr[i * 3] = Math.min(1, palette[ci] * jitter);
        tintAttr[i * 3 + 1] = Math.min(1, palette[ci + 1] * jitter);
        tintAttr[i * 3 + 2] = Math.min(1, palette[ci + 2] * jitter);

        metaArr[i * 4] = buf.baseOpacity[i];
        metaArr[i * 4 + 1] = buf.dofBlur[i];
        metaArr[i * 4 + 2] = buf.flutterAmp[i];
        metaArr[i * 4 + 3] = buf.flutterPhase[i];
      }

      mesh.geometry.setAttribute("aTileIndex", new THREE.InstancedBufferAttribute(tileAttr, 1));
      mesh.geometry.setAttribute("aTint", new THREE.InstancedBufferAttribute(tintAttr, 3));
      mesh.geometry.setAttribute("aMeta", new THREE.InstancedBufferAttribute(metaArr, 4));
    };

    bindAtlasGroup(petalMesh.current, mats.petal, buffers.petals, particleConfig.atlas.petalTiles, palettes.petal, metas.petalMeta);
    bindAtlasGroup(jasmineMesh.current, mats.jasmine, buffers.jasmine, particleConfig.atlas.jasmineTiles, palettes.jasmine, metas.jasmineMeta);
    bindAtlasGroup(marigoldMesh.current, mats.marigold, buffers.marigold, particleConfig.atlas.marigoldTiles, palettes.marigold, metas.marigoldMeta);

    if (burstAtlasMesh.current) {
      burstAtlasMesh.current.material = mats.burst;
      const zeroMat = new THREE.Matrix4().makeScale(0, 0, 0);
      for (let i = 0; i < counts.burstAtlas; i++) {
        burstAtlasMesh.current.setMatrixAt(i, zeroMat);
      }
      burstAtlasMesh.current.instanceMatrix.needsUpdate = true;
      burstAtlasMesh.current.geometry.setAttribute("aTileIndex", new THREE.InstancedBufferAttribute(metas.burstAtlasTile, 1));
      burstAtlasMesh.current.geometry.setAttribute("aTint", new THREE.InstancedBufferAttribute(metas.burstAtlasTint, 3));
      burstAtlasMesh.current.geometry.setAttribute("aMeta", new THREE.InstancedBufferAttribute(metas.burstAtlasMeta, 4));
    }

    if (sparkleMesh.current) {
      sparkleMesh.current.material = mats.sparkle;
      const sScale = new Float32Array(counts.sparkles);
      const sColor = new Float32Array(counts.sparkles * 3);
      const numColors = palettes.sparkle.length / 3;
      for (let i = 0; i < counts.sparkles; i++) {
        sScale[i] = buffers.sparkles.scale[i];
        const ci = (i % numColors) * 3;
        sColor[i * 3] = palettes.sparkle[ci];
        sColor[i * 3 + 1] = palettes.sparkle[ci + 1];
        sColor[i * 3 + 2] = palettes.sparkle[ci + 2];

        metas.sparkleMeta[i * 4] = buffers.sparkles.baseOpacity[i];
        metas.sparkleMeta[i * 4 + 1] = 2.0 + Math.random() * 3.8;
        metas.sparkleMeta[i * 4 + 2] = Math.random() * Math.PI * 2;
        metas.sparkleMeta[i * 4 + 3] = 0;
      }
      sparkleMesh.current.geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(sScale, 1));
      sparkleMesh.current.geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(sColor, 3));
      sparkleMesh.current.geometry.setAttribute("aMeta", new THREE.InstancedBufferAttribute(metas.sparkleMeta, 4));
    }

    if (burstSparkleMesh.current) {
      burstSparkleMesh.current.material = mats.burstSparkle;
      const zeroMat = new THREE.Matrix4().makeScale(0, 0, 0);
      for (let i = 0; i < counts.burstSparkles; i++) {
        burstSparkleMesh.current.setMatrixAt(i, zeroMat);
      }
      burstSparkleMesh.current.instanceMatrix.needsUpdate = true;
      burstSparkleMesh.current.geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(metas.burstSparkleScale, 1));
      burstSparkleMesh.current.geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(metas.burstSparkleColor, 3));
      burstSparkleMesh.current.geometry.setAttribute("aMeta", new THREE.InstancedBufferAttribute(metas.burstSparkleMeta, 4));
    }

    if (bokehMesh.current) {
      bokehMesh.current.material = mats.bokeh;
      const bScale = new Float32Array(counts.bokeh);
      const bColor = new Float32Array(counts.bokeh * 3);
      const numColors = palettes.bokeh.length / 3;
      for (let i = 0; i < counts.bokeh; i++) {
        bScale[i] = buffers.bokeh.scale[i];
        const ci = (i % numColors) * 3;
        bColor[i * 3] = palettes.bokeh[ci];
        bColor[i * 3 + 1] = palettes.bokeh[ci + 1];
        bColor[i * 3 + 2] = palettes.bokeh[ci + 2];

        metas.bokehMeta[i * 4] = buffers.bokeh.baseOpacity[i];
        metas.bokehMeta[i * 4 + 1] = 0.55 + Math.random() * 0.55;
        metas.bokehMeta[i * 4 + 2] = Math.random() * Math.PI * 2;
        metas.bokehMeta[i * 4 + 3] = 1.0;
      }
      bokehMesh.current.geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(bScale, 1));
      bokehMesh.current.geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(bColor, 3));
      bokehMesh.current.geometry.setAttribute("aMeta", new THREE.InstancedBufferAttribute(metas.bokehMeta, 4));
    }

    if (emberMesh.current && counts.embers > 0) {
      emberMesh.current.material = mats.ember;
      const eScale = new Float32Array(counts.embers);
      const eColor = new Float32Array(counts.embers * 3);
      for (let i = 0; i < counts.embers; i++) {
        eScale[i] = buffers.embers.scale[i];
        eColor[i * 3] = buffers.embers.r[i];
        eColor[i * 3 + 1] = buffers.embers.g[i];
        eColor[i * 3 + 2] = buffers.embers.b[i];
        metas.emberOpacity[i] = 0;
      }
      emberMesh.current.geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(eScale, 1));
      emberMesh.current.geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(eColor, 3));
      emberMesh.current.geometry.setAttribute("aOpacity", new THREE.InstancedBufferAttribute(metas.emberOpacity, 1));
    }

    return () => {
      atlasTexture.dispose();
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [counts, gl, isDesktop, reducedMotion, viewportScaleFactor]);

  // Smooth GSAP ScrollTrigger transitions across sections (1.5s morph, never reset particles)
  const liveFlow = useRef<LiveFlowState>(
    presetToLiveState(particleConfig.sectionPresets.hero)
  );
  const currentScrollSection = useRef<WeddingSectionId>(activeSection);

  useEffect(() => {
    currentScrollSection.current = activeSection;
    const preset = particleConfig.sectionPresets[activeSection] ?? particleConfig.sectionPresets.hero;
    gsap.to(liveFlow.current, {
      vx: preset.vx,
      vy: preset.vy,
      sparkleVy: preset.sparkleVy,
      windStrength: preset.windStrength,
      swayScale: preset.swayScale,
      petalDensity: preset.densities.petals,
      jasmineDensity: preset.densities.jasmine,
      marigoldDensity: preset.densities.marigold,
      sparkleDensity: preset.densities.sparkles,
      bokehDensity: preset.densities.bokeh,
      emberDensity: preset.densities.embers,
      warmth: preset.warmth,
      duration: particleConfig.readability.transitionDurationSec,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [activeSection]);

  useEffect(() => {
    const morphPreset = (id: WeddingSectionId) => {
      currentScrollSection.current = id;
      const preset = particleConfig.sectionPresets[id] ?? particleConfig.sectionPresets.hero;
      gsap.to(liveFlow.current, {
        vx: preset.vx,
        vy: preset.vy,
        sparkleVy: preset.sparkleVy,
        windStrength: preset.windStrength,
        swayScale: preset.swayScale,
        petalDensity: preset.densities.petals,
        jasmineDensity: preset.densities.jasmine,
        marigoldDensity: preset.densities.marigold,
        sparkleDensity: preset.densities.sparkles,
        bokehDensity: preset.densities.bokeh,
        emberDensity: preset.densities.embers,
        warmth: preset.warmth,
        duration: particleConfig.readability.transitionDurationSec,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const ctx = gsap.context(() => {
      const sectionEls = document.querySelectorAll<HTMLElement>("[data-section]");
      sectionEls.forEach((el) => {
        const id = el.getAttribute("data-section") as WeddingSectionId | null;
        if (!id || !(id in particleConfig.sectionPresets)) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => morphPreset(id),
          onEnterBack: () => morphPreset(id),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Desktop pointer & Mobile gyro interaction
  const pointerNdc = useRef({ x: 0, y: 0, active: false });
  const smoothedPointer = useRef({ x: 0, y: 0 });
  const gyroTilt = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (reducedMotion) return;

    const onPointerMove = (e: PointerEvent) => {
      pointerNdc.current.x = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      pointerNdc.current.y = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
      pointerNdc.current.active = true;
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      gyroTilt.current.x = Math.max(-1, Math.min(1, e.gamma / 28));
      gyroTilt.current.y = Math.max(-1, Math.min(1, (e.beta - 42) / 28));
      gyroTilt.current.active = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [reducedMotion]);

  // Burst Listener & Spawner (self-contained in useEffect so zero render-time ref access)
  useEffect(() => {
    const spawnBurst = (detail: ParticleBurstDetail) => {
      if (reducedMotion) return;
      const bufs = buffersRef.current;
      const pals = palettesRef.current;
      if (!bufs || !pals) return;

      const { burst } = bufs;
      const w = viewportRef.current.width;
      const h = viewportRef.current.height;

      const hasClient =
        typeof detail.clientX === "number" && typeof detail.clientY === "number";
      const originX = hasClient
        ? (detail.clientX! / Math.max(1, window.innerWidth) - 0.5) * w
        : 0;
      const originY = hasClient
        ? (0.5 - detail.clientY! / Math.max(1, window.innerHeight)) * h
        : detail.type === "blessing"
        ? -h * 0.14
        : 0;

      const spawnItem = (opts: {
        isSparkle: boolean;
        tile: number;
        rgb: [number, number, number];
        vx: number;
        vy: number;
        z: number;
        scale: number;
        maxLife: number;
        jitterX?: number;
        jitterY?: number;
      }) => {
        const idx = burst.cursor;
        burst.cursor = (burst.cursor + 1) % burst.capacity;

        burst.active[idx] = 1;
        burst.isSparkle[idx] = opts.isSparkle ? 1 : 0;
        burst.tileIndex[idx] = opts.tile;
        burst.px[idx] = originX + (Math.random() - 0.5) * (opts.jitterX ?? 0.35);
        burst.py[idx] = originY + (Math.random() - 0.5) * (opts.jitterY ?? 0.25);
        burst.pz[idx] = opts.z;
        burst.vx[idx] = opts.vx;
        burst.vy[idx] = opts.vy;
        burst.rx[idx] = Math.random() * Math.PI * 2;
        burst.ry[idx] = Math.random() * Math.PI * 2;
        burst.rz[idx] = Math.random() * Math.PI * 2;
        burst.vrx[idx] = (Math.random() - 0.5) * 5.2;
        burst.vry[idx] = (Math.random() - 0.5) * 5.8;
        burst.vrz[idx] = (Math.random() - 0.5) * 4.2;
        burst.scale[idx] = opts.scale;
        burst.life[idx] = 0;
        burst.maxLife[idx] = opts.maxLife;
        burst.r[idx] = opts.rgb[0];
        burst.g[idx] = opts.rgb[1];
        burst.b[idx] = opts.rgb[2];
      };

      const pickColor = (palette: Float32Array): [number, number, number] => {
        const n = palette.length / 3;
        const idx = Math.floor(Math.random() * n) * 3;
        return [palette[idx], palette[idx + 1], palette[idx + 2]];
      };

      if (detail.type === "envelope") {
        const nAtlas = isDesktop ? 34 : 20;
        const nSpark = isDesktop ? 22 : 12;

        for (let i = 0; i < nAtlas; i++) {
          const angle = (i / nAtlas) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
          const speed = 2.0 + Math.random() * 3.8;
          const isConfetti = i % 3 === 0;
          const tile = isConfetti
            ? particleConfig.atlas.confettiTile
            : particleConfig.atlas.petalTiles[i % particleConfig.atlas.petalTiles.length];
          spawnItem({
            isSparkle: false,
            tile,
            rgb: isConfetti ? pickColor(pals.confetti) : pickColor(pals.petal),
            vx: Math.cos(angle) * speed * (isDesktop ? 1.15 : 0.75),
            vy: Math.sin(angle) * speed + 1.45,
            z: 0.3 + Math.random() * 1.4,
            scale:
              particleConfig.sizes.burstBase *
              viewportScaleFactor *
              (isConfetti ? 0.84 : 0.96) *
              (0.82 + Math.random() * 0.48),
            maxLife: 2.7 + Math.random() * 1.2,
            jitterX: 0.65,
            jitterY: 0.45,
          });
        }

        for (let i = 0; i < nSpark; i++) {
          const angle = (i / nSpark) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
          const speed = 1.9 + Math.random() * 4.0;
          spawnItem({
            isSparkle: true,
            tile: 0,
            rgb: pickColor(pals.sparkle),
            vx: Math.cos(angle) * speed * (isDesktop ? 1.1 : 0.75),
            vy: Math.sin(angle) * speed + 1.25,
            z: 0.4 + Math.random() * 1.1,
            scale: particleConfig.sizes.sparkleBase * (1.2 + Math.random() * 0.85),
            maxLife: 2.0 + Math.random() * 1.0,
            jitterX: 0.55,
            jitterY: 0.4,
          });
        }
      } else {
        const nAtlas = isDesktop ? 20 : 12;
        const nSpark = isDesktop ? 12 : 8;

        for (let i = 0; i < nAtlas; i++) {
          const spreadAngle = (Math.random() - 0.5) * 1.45;
          const speed = 1.8 + Math.random() * 2.8;
          const isHeart = i % 2 === 0;
          const tile = isHeart
            ? particleConfig.atlas.heartTile
            : particleConfig.atlas.petalTiles[i % particleConfig.atlas.petalTiles.length];
          spawnItem({
            isSparkle: false,
            tile,
            rgb: isHeart ? pickColor(pals.heart) : pickColor(pals.petal),
            vx: Math.sin(spreadAngle) * speed * (isDesktop ? 0.85 : 0.65),
            vy: Math.cos(spreadAngle) * speed + 1.25,
            z: 0.4 + Math.random() * 1.1,
            scale:
              particleConfig.sizes.burstBase *
              viewportScaleFactor *
              (isHeart ? 0.94 : 0.88) *
              (0.75 + Math.random() * 0.5),
            maxLife: 2.0 + Math.random() * 0.9,
            jitterX: 0.25,
            jitterY: 0.15,
          });
        }

        for (let i = 0; i < nSpark; i++) {
          const spreadAngle = (Math.random() - 0.5) * 1.7;
          const speed = 1.6 + Math.random() * 2.6;
          spawnItem({
            isSparkle: true,
            tile: 0,
            rgb: pickColor(pals.sparkle),
            vx: Math.sin(spreadAngle) * speed,
            vy: Math.cos(spreadAngle) * speed + 1.1,
            z: 0.5 + Math.random() * 1.0,
            scale: particleConfig.sizes.sparkleBase * (1.1 + Math.random() * 0.7),
            maxLife: 1.4 + Math.random() * 0.7,
          });
        }
      }
    };

    const queued = consumePendingBursts();
    queued.forEach(spawnBurst);

    const onBurst = (ev: Event) => {
      const custom = ev as CustomEvent<ParticleBurstDetail>;
      if (custom.detail) {
        consumePendingBursts();
        spawnBurst(custom.detail);
      }
    };

    window.addEventListener("wedding:particle-burst", onBurst);
    return () => window.removeEventListener("wedding:particle-burst", onBurst);
  }, [isDesktop, reducedMotion, viewportScaleFactor]);

  // Adaptive FPS monitor & Quality Scaler (drops counts + dpr if < 45fps for 2s)
  const qualityScale = useRef(1.0);
  const lowFpsAccum = useRef(0);
  const didReduceQuality = useRef(false);
  const fpsWindow = useRef({ frames: 0, elapsed: 0, fps: 60, avgFps: 60 });

  // Mutable Three.js scratch helpers stored strictly in ref
  const scratchRef = useRef<{
    quat: THREE.Quaternion;
    euler: THREE.Euler;
    pos: THREE.Vector3;
    scale: THREE.Vector3;
    mat: THREE.Matrix4;
  } | null>(null);

  useEffect(() => {
    scratchRef.current = {
      quat: new THREE.Quaternion(),
      euler: new THREE.Euler(),
      pos: new THREE.Vector3(),
      scale: new THREE.Vector3(),
      mat: new THREE.Matrix4(),
    };
  }, []);

  useFrame((state, delta) => {
    if (isPaused) return;
    const mats = matsRef.current;
    const bufs = buffersRef.current;
    const metas = metasRef.current;
    const sc = scratchRef.current;
    if (!mats || !bufs || !metas || !sc) return;

    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // 1. FPS Monitoring + Adaptive Quality Reduction
    if (delta > 0 && delta < 0.25) {
      fpsWindow.current.frames += 1;
      fpsWindow.current.elapsed += delta;
      if (fpsWindow.current.elapsed >= 0.45) {
        const instFps = fpsWindow.current.frames / fpsWindow.current.elapsed;
        fpsWindow.current.fps = Math.round(instFps);
        fpsWindow.current.avgFps = Math.round(fpsWindow.current.avgFps * 0.6 + instFps * 0.4);
        fpsWindow.current.frames = 0;
        fpsWindow.current.elapsed = 0;

        if (!didReduceQuality.current) {
          if (instFps < particleConfig.performance.reducedFpsThreshold) {
            lowFpsAccum.current += 0.45;
            if (lowFpsAccum.current >= particleConfig.performance.reducedFpsHoldSec) {
              didReduceQuality.current = true;
              qualityScale.current = particleConfig.performance.reducedQualityScale;
              onReduceQuality();
            }
          } else {
            lowFpsAccum.current = Math.max(0, lowFpsAccum.current - 0.3);
          }
        }
      }
    }

    const flow = liveFlow.current;
    const dynamicSafeHalf = Math.min(0.42, 345 / Math.max(320, window.innerWidth));

    const atlasMats = [mats.petal, mats.jasmine, mats.marigold, mats.burst];
    for (let m = 0; m < atlasMats.length; m++) {
      atlasMats[m].uniforms.uTime.value = t;
      atlasMats[m].uniforms.uWarmth.value = flow.warmth;
      atlasMats[m].uniforms.uSafeHalfWidth.value = dynamicSafeHalf;
    }
    mats.sparkle.uniforms.uTime.value = t;
    mats.sparkle.uniforms.uWarmth.value = flow.warmth;
    mats.sparkle.uniforms.uSafeHalfWidth.value = dynamicSafeHalf;
    mats.burstSparkle.uniforms.uTime.value = t;
    mats.burstSparkle.uniforms.uWarmth.value = flow.warmth;
    mats.burstSparkle.uniforms.uSafeHalfWidth.value = dynamicSafeHalf;
    mats.bokeh.uniforms.uTime.value = t;
    mats.bokeh.uniforms.uWarmth.value = flow.warmth;
    mats.bokeh.uniforms.uSafeHalfWidth.value = dynamicSafeHalf;
    mats.ember.uniforms.uWarmth.value = flow.warmth;

    // 2. Smooth Pointer / Device Tilt Parallax across whole particle group
    const targetInputX = gyroTilt.current.active
      ? gyroTilt.current.x * particleConfig.interaction.gyroStrength
      : pointerNdc.current.x;
    const targetInputY = gyroTilt.current.active
      ? gyroTilt.current.y * particleConfig.interaction.gyroStrength
      : pointerNdc.current.y;

    const ptrLerp = 1 - Math.exp(-dt * 6.0);
    smoothedPointer.current.x += (targetInputX - smoothedPointer.current.x) * ptrLerp;
    smoothedPointer.current.y += (targetInputY - smoothedPointer.current.y) * ptrLerp;

    if (!reducedMotion && parallaxGroupRef.current) {
      const pStr = particleConfig.interaction.parallaxStrength;
      parallaxGroupRef.current.position.set(
        smoothedPointer.current.x * pStr * 0.45,
        smoothedPointer.current.y * pStr * 0.35,
        0
      );
      parallaxGroupRef.current.rotation.set(
        -smoothedPointer.current.y * 0.038,
        smoothedPointer.current.x * 0.048,
        0
      );
    }

    const pointerWorldX = pointerNdc.current.x * viewport.width * 0.5;
    const pointerWorldY = pointerNdc.current.y * viewport.height * 0.5;
    const ptrRadius = particleConfig.interaction.pointerRadius;
    const ptrRadiusSq = ptrRadius * ptrRadius;
    const ptrStrength = particleConfig.interaction.pointerStrength;

    // 3. Global Wind Field & Gusts
    const gust = computeWindGust(t, particleConfig.wind.gustPeriodSec);
    const windNoiseScale = particleConfig.wind.noiseScale;
    const windNoiseSpeed = particleConfig.wind.noiseSpeed;
    const windStr =
      flow.windStrength *
      particleConfig.wind.baseStrength *
      (1.0 + gust * particleConfig.wind.gustStrength);

    const halfW = viewport.width * 0.66;
    const halfH = viewport.height * 0.64;
    const qScale = qualityScale.current;

    const updateAmbientGroup = (
      mesh: THREE.InstancedMesh | null,
      buf: AmbientGroupBuffers,
      metaArr: Float32Array,
      baseVx: number,
      baseVy: number,
      density: number,
      spinYDominant = false
    ) => {
      if (!mesh) return;
      const effDensity = reducedMotion ? 1.0 : Math.min(1, density * qScale);
      const { count } = buf;

      for (let i = 0; i < count; i++) {
        const vis = smoothstep(buf.rank01[i] - 0.14, buf.rank01[i] + 0.14, effDensity);

        if (vis <= 0.008) {
          sc.mat.makeScale(0, 0, 0);
          sc.mat.toArray(mesh.instanceMatrix.array, i * 16);
          metaArr[i * 4] = 0;
          continue;
        }

        let x = buf.px[i];
        let y = buf.py[i];
        const z = buf.pz[i];
        const spd = buf.speedMul[i];

        if (!reducedMotion) {
          const nVal = noise2D(
            x * windNoiseScale + t * windNoiseSpeed,
            y * windNoiseScale - t * windNoiseSpeed * 0.65
          );
          const sway =
            Math.sin(t * buf.swaySpeed[i] + buf.swayPhase[i]) *
            buf.swayAmp[i] *
            flow.swayScale;

          const windVx = baseVx + nVal * 0.42 * windStr + gust * 0.24 * flow.windStrength;
          const windVy = baseVy + Math.abs(nVal) * 0.08 * windStr;

          if (pointerNdc.current.active) {
            const dx = x - pointerWorldX;
            const dy = y - pointerWorldY;
            const dSq = dx * dx + dy * dy;
            if (dSq < ptrRadiusSq && dSq > 0.0001) {
              const d = Math.sqrt(dSq);
              const force = (1 - d / ptrRadius) * ptrStrength * dt * (z > 0 ? 1.15 : 0.65);
              buf.ox[i] += (dx / d) * force;
              buf.oy[i] += (dy / d) * force;
            }
          }

          const ox = buf.ox[i];
          const oy = buf.oy[i];
          buf.ox[i] *= Math.exp(-dt * 3.2);
          buf.oy[i] *= Math.exp(-dt * 3.2);

          x += (windVx * spd + sway + ox) * dt;
          y += (windVy * spd + oy) * dt;

          if (spinYDominant) {
            buf.rx[i] += Math.sin(t * 1.4 + buf.swayPhase[i]) * 0.25 * dt;
            buf.ry[i] += buf.vry[i] * dt;
            buf.rz[i] += buf.vrz[i] * (1 + Math.abs(nVal) * 0.4) * dt;
          } else {
            buf.rx[i] += buf.vrx[i] * (0.85 + Math.abs(nVal) * 0.45) * dt;
            buf.ry[i] += buf.vry[i] * dt;
            buf.rz[i] += buf.vrz[i] * dt;
          }

          if (y < -halfH) {
            y = halfH - 0.02;
            x = (Math.random() - 0.5) * 2 * halfW;
          } else if (y > halfH) {
            y = -halfH + 0.02;
            x = (Math.random() - 0.5) * 2 * halfW;
          }
          if (x < -halfW) x = halfW - 0.02;
          else if (x > halfW) x = -halfW + 0.02;

          buf.px[i] = x;
          buf.py[i] = y;
        }

        const yFade = Math.min(
          smoothstep(-halfH, -halfH + 0.65, y),
          smoothstep(halfH, halfH - 0.65, y)
        );
        metaArr[i * 4] = buf.baseOpacity[i] * vis * yFade;

        sc.pos.set(x, y, z);
        sc.euler.set(buf.rx[i], buf.ry[i], buf.rz[i]);
        sc.quat.setFromEuler(sc.euler);
        const s = buf.scale[i];
        sc.scale.set(s, s, s);
        sc.mat.compose(sc.pos, sc.quat, sc.scale);
        sc.mat.toArray(mesh.instanceMatrix.array, i * 16);
      }

      mesh.instanceMatrix.needsUpdate = true;
      const metaAttr = mesh.geometry.getAttribute("aMeta") as THREE.InstancedBufferAttribute | undefined;
      if (metaAttr) metaAttr.needsUpdate = true;
    };

    updateAmbientGroup(
      petalMesh.current,
      bufs.petals,
      metas.petalMeta,
      flow.vx,
      flow.vy * (particleConfig.speeds.petalFallBase / 0.56),
      flow.petalDensity
    );
    updateAmbientGroup(
      jasmineMesh.current,
      bufs.jasmine,
      metas.jasmineMeta,
      flow.vx * 0.45,
      flow.vy * (particleConfig.speeds.jasmineFallBase / 0.56),
      flow.jasmineDensity,
      true
    );
    updateAmbientGroup(
      marigoldMesh.current,
      bufs.marigold,
      metas.marigoldMeta,
      flow.vx * 0.75,
      flow.vy * (particleConfig.speeds.marigoldFallBase / 0.56),
      flow.marigoldDensity
    );
    updateAmbientGroup(
      sparkleMesh.current,
      bufs.sparkles,
      metas.sparkleMeta,
      flow.vx * 0.35,
      flow.sparkleVy,
      flow.sparkleDensity
    );
    updateAmbientGroup(
      bokehMesh.current,
      bufs.bokeh,
      metas.bokehMeta,
      flow.vx * 0.25,
      -particleConfig.speeds.bokehDriftBase,
      flow.bokehDensity
    );

    // 4. Update Lamp Embers anchored above foreground diya wick coordinates
    if (emberMesh.current && counts.embers > 0) {
      const flamesWorld = computeFlameWorldPositions(
        viewport.width,
        viewport.height,
        window.innerWidth,
        window.innerHeight,
        particleConfig.foregroundFlames
      );
      const em = bufs.embers;
      const effEmberDensity = reducedMotion ? 0 : Math.min(1, flow.emberDensity * qScale);

      for (let i = 0; i < em.count; i++) {
        em.life[i] += dt;
        if (em.life[i] >= em.maxLife[i]) {
          em.life[i] = 0;
          em.maxLife[i] = 1.6 + Math.random() * 1.9;
          const anchor = flamesWorld[em.flameIdx[i] % flamesWorld.length];
          em.px[i] = anchor.x + (Math.random() - 0.5) * 0.08;
          em.py[i] = anchor.y + 0.04 + Math.random() * 0.08;
          em.vx[i] = (Math.random() - 0.5) * 0.14;
          em.vy[i] = particleConfig.speeds.emberRiseBase * (0.65 + Math.random() * 0.75);
        }

        const p = em.life[i] / em.maxLife[i];
        const turb = noise2D(em.px[i] * 2.2 + t * 0.9, em.py[i] * 1.8 - t) * 0.32;
        em.px[i] += (em.vx[i] + turb * 0.45 + flow.vx * 0.2) * dt;
        em.py[i] += em.vy[i] * dt;

        const lifeFade = Math.sin(p * Math.PI);
        metas.emberOpacity[i] = lifeFade * 0.88 * effEmberDensity;

        sc.pos.set(em.px[i], em.py[i], em.pz[i]);
        sc.quat.identity();
        const s = 1.0 - p * 0.45;
        sc.scale.set(s, s, s);
        sc.mat.compose(sc.pos, sc.quat, sc.scale);
        sc.mat.toArray(emberMesh.current.instanceMatrix.array, i * 16);
      }

      emberMesh.current.instanceMatrix.needsUpdate = true;
      const eOp = emberMesh.current.geometry.getAttribute("aOpacity") as THREE.InstancedBufferAttribute | undefined;
      if (eOp) eOp.needsUpdate = true;
    }

    // 5. Update Dynamic Celebration Bursts
    if (burstAtlasMesh.current && burstSparkleMesh.current) {
      const bPool = bufs.burst;
      let atlasIdx = 0;
      let sparkIdx = 0;

      for (let i = 0; i < bPool.capacity; i++) {
        if (bPool.active[i] === 0) continue;

        bPool.life[i] += dt;
        if (bPool.life[i] >= bPool.maxLife[i]) {
          bPool.active[i] = 0;
          continue;
        }

        bPool.vy[i] -= particleConfig.physics.gravityBurst * dt;
        const drag = Math.exp(-dt * 1.35);
        bPool.vx[i] *= drag;
        bPool.vx[i] += Math.sin(t * 4.5 + i) * 0.35 * dt;
        bPool.px[i] += bPool.vx[i] * dt;
        bPool.py[i] += bPool.vy[i] * dt;
        bPool.rx[i] += bPool.vrx[i] * dt;
        bPool.ry[i] += bPool.vry[i] * dt;
        bPool.rz[i] += bPool.vrz[i] * dt;

        const prog = bPool.life[i] / bPool.maxLife[i];
        const popScale = prog < 0.12 ? prog / 0.12 : 1.0;
        const fadeOp = prog < 0.12 ? prog / 0.12 : Math.max(0, 1 - (prog - 0.12) / 0.88);

        if (bPool.isSparkle[i] === 1 && sparkIdx < counts.burstSparkles) {
          sc.pos.set(bPool.px[i], bPool.py[i], bPool.pz[i]);
          sc.quat.identity();
          sc.scale.setScalar(popScale);
          sc.mat.compose(sc.pos, sc.quat, sc.scale);
          sc.mat.toArray(burstSparkleMesh.current.instanceMatrix.array, sparkIdx * 16);

          metas.burstSparkleScale[sparkIdx] = bPool.scale[i] * popScale;
          metas.burstSparkleColor[sparkIdx * 3] = bPool.r[i];
          metas.burstSparkleColor[sparkIdx * 3 + 1] = bPool.g[i];
          metas.burstSparkleColor[sparkIdx * 3 + 2] = bPool.b[i];
          metas.burstSparkleMeta[sparkIdx * 4] = fadeOp * 0.95;
          metas.burstSparkleMeta[sparkIdx * 4 + 1] = 6.0;
          metas.burstSparkleMeta[sparkIdx * 4 + 2] = i * 1.3;
          metas.burstSparkleMeta[sparkIdx * 4 + 3] = 0;
          sparkIdx++;
        } else if (bPool.isSparkle[i] === 0 && atlasIdx < counts.burstAtlas) {
          sc.pos.set(bPool.px[i], bPool.py[i], bPool.pz[i]);
          sc.euler.set(bPool.rx[i], bPool.ry[i], bPool.rz[i]);
          sc.quat.setFromEuler(sc.euler);
          sc.scale.setScalar(bPool.scale[i] * popScale);
          sc.mat.compose(sc.pos, sc.quat, sc.scale);
          sc.mat.toArray(burstAtlasMesh.current.instanceMatrix.array, atlasIdx * 16);

          metas.burstAtlasTile[atlasIdx] = bPool.tileIndex[i];
          metas.burstAtlasTint[atlasIdx * 3] = bPool.r[i];
          metas.burstAtlasTint[atlasIdx * 3 + 1] = bPool.g[i];
          metas.burstAtlasTint[atlasIdx * 3 + 2] = bPool.b[i];
          metas.burstAtlasMeta[atlasIdx * 4] = fadeOp * 0.96;
          metas.burstAtlasMeta[atlasIdx * 4 + 1] = 0;
          metas.burstAtlasMeta[atlasIdx * 4 + 2] = 0.04;
          metas.burstAtlasMeta[atlasIdx * 4 + 3] = i * 0.7;
          atlasIdx++;
        }
      }

      sc.mat.makeScale(0, 0, 0);
      while (atlasIdx < counts.burstAtlas) {
        sc.mat.toArray(burstAtlasMesh.current.instanceMatrix.array, atlasIdx * 16);
        metas.burstAtlasMeta[atlasIdx * 4] = 0;
        atlasIdx++;
      }
      while (sparkIdx < counts.burstSparkles) {
        sc.mat.toArray(burstSparkleMesh.current.instanceMatrix.array, sparkIdx * 16);
        metas.burstSparkleScale[sparkIdx] = 0;
        metas.burstSparkleMeta[sparkIdx * 4] = 0;
        sparkIdx++;
      }

      burstAtlasMesh.current.instanceMatrix.needsUpdate = true;
      (burstAtlasMesh.current.geometry.getAttribute("aTileIndex") as THREE.InstancedBufferAttribute).needsUpdate = true;
      (burstAtlasMesh.current.geometry.getAttribute("aTint") as THREE.InstancedBufferAttribute).needsUpdate = true;
      (burstAtlasMesh.current.geometry.getAttribute("aMeta") as THREE.InstancedBufferAttribute).needsUpdate = true;

      burstSparkleMesh.current.instanceMatrix.needsUpdate = true;
      (burstSparkleMesh.current.geometry.getAttribute("aScale") as THREE.InstancedBufferAttribute).needsUpdate = true;
      (burstSparkleMesh.current.geometry.getAttribute("aColor") as THREE.InstancedBufferAttribute).needsUpdate = true;
      (burstSparkleMesh.current.geometry.getAttribute("aMeta") as THREE.InstancedBufferAttribute).needsUpdate = true;
    }

    if (typeof window !== "undefined") {
      window.__PARTICLE_PERF__ = {
        fps: fpsWindow.current.fps,
        avgFps: fpsWindow.current.avgFps,
        dpr: dprRef.current,
        qualityScale: qualityScale.current,
        activeSection: currentScrollSection.current,
        particleCounts: counts,
      };
    }
  });

  return (
    <group ref={parallaxGroupRef}>
      <instancedMesh
        ref={bokehMesh}
        args={[geometries.bokehGeo, undefined, counts.bokeh]}
        frustumCulled={false}
        renderOrder={1}
      />

      <instancedMesh
        ref={petalMesh}
        args={[geometries.petal, undefined, counts.petals]}
        frustumCulled={false}
        renderOrder={2}
      />

      <instancedMesh
        ref={jasmineMesh}
        args={[geometries.jasmine, undefined, counts.jasmine]}
        frustumCulled={false}
        renderOrder={3}
      />

      <instancedMesh
        ref={marigoldMesh}
        args={[geometries.marigold, undefined, counts.marigold]}
        frustumCulled={false}
        renderOrder={4}
      />

      <instancedMesh
        ref={sparkleMesh}
        args={[geometries.sparkleGeo, undefined, counts.sparkles]}
        frustumCulled={false}
        renderOrder={5}
      />

      {counts.embers > 0 && (
        <instancedMesh
          ref={emberMesh}
          args={[geometries.emberGeo, undefined, counts.embers]}
          frustumCulled={false}
          renderOrder={6}
        />
      )}

      <instancedMesh
        ref={burstAtlasMesh}
        args={[geometries.burst, undefined, counts.burstAtlas]}
        frustumCulled={false}
        renderOrder={7}
      />

      <instancedMesh
        ref={burstSparkleMesh}
        args={[geometries.burstSparkleGeo, undefined, counts.burstSparkles]}
        frustumCulled={false}
        renderOrder={8}
      />
    </group>
  );
}

export interface ParticlesStageProps {
  activeSection: WeddingSectionId;
  isDesktop: boolean;
  reducedMotion: boolean;
  isPaused: boolean;
}

export default function ParticlesStage({
  activeSection,
  isDesktop,
  reducedMotion,
  isPaused,
}: ParticlesStageProps) {
  const [capDpr, setCapDpr] = useState<[number, number]>(
    particleConfig.performance.dpr
  );
  const currentDprRef = useRef<number>(1);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none select-none"
    >
      <Canvas
        dpr={capDpr}
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 40 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          currentDprRef.current = gl.getPixelRatio();
        }}
        frameloop={isPaused ? "demand" : "always"}
        style={{ pointerEvents: "none" }}
      >
        <CinematicParticleScene
          activeSection={activeSection}
          isDesktop={isDesktop}
          reducedMotion={reducedMotion}
          isPaused={isPaused}
          onReduceQuality={() => {
            setCapDpr([1, 1]);
            currentDprRef.current = 1;
          }}
          dprRef={currentDprRef}
        />
      </Canvas>
    </div>
  );
}
