"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { invitationData } from "@/data/invitation";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface BackgroundLayerProps {
  isOpened?: boolean;
}

export default function BackgroundLayer({ isOpened = false }: BackgroundLayerProps) {
  const leftGarlandRef = useRef<HTMLDivElement | null>(null);
  const rightGarlandRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isOpened || !isDesktop || reducedMotion) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (leftGarlandRef.current) {
          gsap.to(leftGarlandRef.current, {
            y: 36,
            rotation: 2,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          });
        }
        if (rightGarlandRef.current) {
          gsap.to(rightGarlandRef.current, {
            y: 36,
            rotation: -2,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          });
        }
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [isOpened, isDesktop, reducedMotion]);

  return (
    <>
      {/* Layer 1: Fixed Cream Paper Texture Background (position: fixed, cover, center via next/image AVIF/WebP) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none bg-[#FDF8EE]"
      >
        <Image
          src={invitationData.assets.backgroundImage}
          alt=""
          fill
          loading="eager"
          fetchPriority="low"
          sizes="100vw"
          className="object-cover object-center select-none"
          draggable={false}
        />
      </div>

      {/* Desktop/Tablet Corner Garlands & Brass Bells + Gold Frame (mounted on md+ only so mobile downloads zero extra bytes) */}
      {isDesktop && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
        >
          <div className="absolute inset-4 lg:inset-6 border border-[#B8892E]/45 rounded-sm">
            <div className="absolute inset-1.5 border border-[#B8892E]/25 rounded-sm" />
          </div>

          <div
            ref={leftGarlandRef}
            className="absolute -top-2 -left-1 w-[150px] lg:w-[205px] xl:w-[235px] will-change-transform"
          >
            <Image
              src={invitationData.assets.garlandLeftImage}
              alt=""
              width={195}
              height={360}
              loading="eager"
              className="w-full h-auto garland-swing-left select-none"
              draggable={false}
            />
          </div>

          <div
            ref={rightGarlandRef}
            className="absolute -top-2 -right-1 w-[150px] lg:w-[205px] xl:w-[235px] will-change-transform"
          >
            <Image
              src={invitationData.assets.garlandRightImage}
              alt=""
              width={195}
              height={360}
              loading="eager"
              className="w-full h-auto garland-swing-right select-none"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Layer 2: Soft Vignette & Warm Center Light Glow */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(255, 251, 242, 0.52) 0%, rgba(253, 248, 238, 0.2) 60%, rgba(107, 26, 31, 0.08) 100%)",
        }}
      />
    </>
  );
}
