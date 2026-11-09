"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { invitationData } from "@/data/invitation";
import { GoldDivider, GoldOrnament } from "@/components/ui/GoldOrnament";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  isOpened: boolean;
}

export default function GallerySection({ isOpened }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const items = invitationData.gallery.items;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const colLeftY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const colRightY = useTransform(scrollYProgress, [0, 1], [-14, 22]);

  useEffect(() => {
    if (!isOpened || !sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-gallery-reveal]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isOpened]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + items.length) % items.length
    );
  }, [items.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % items.length
    );
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      data-section="gallery"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-[720px] mx-auto flex flex-col items-center text-center">
        <div data-gallery-reveal className="flex justify-center">
          <GoldOrnament />
        </div>
        <p
          data-gallery-reveal
          className="font-heading text-fluid-eyebrow uppercase text-[#855E14] font-bold mt-2"
        >
          {invitationData.gallery.subheading}
        </p>
        <h2
          data-gallery-reveal
          className="font-heading text-fluid-h2 font-bold text-[#6B1A1F] mt-2 text-balance"
        >
          {invitationData.gallery.heading}
        </h2>
        <div data-gallery-reveal className="my-3 w-full flex justify-center">
          <GoldDivider maxWidth="max-w-[160px]" />
        </div>
        <p
          data-gallery-reveal
          className="text-fluid-body text-[#6B1A1F]/85 italic max-w-lg mx-auto text-balance"
        >
          {invitationData.gallery.description}
        </p>

        {/* Responsive 2-Column Masonry Grid with Layered Scroll Parallax */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 items-start">
          {items.map((item, idx) => {
            const isOddCol = idx % 2 === 1;
            return (
              <motion.div
                key={item.id}
                data-gallery-reveal
                style={
                  reducedMotion
                    ? undefined
                    : { y: isOddCol ? colRightY : colLeftY }
                }
                className="w-full"
              >
                <motion.button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full rounded-3xl parchment-card p-3.5 sm:p-4 flex flex-col items-center text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892E]"
                  aria-label={`Open gallery photo: ${item.title}`}
                >
                  <div
                    className={`relative w-full overflow-hidden rounded-2xl border border-[#B8892E]/45 ${
                      item.isCutout
                        ? "bg-[radial-gradient(circle_at_center,#FFFBF2_0%,#F3E4C6_100%)]"
                        : "bg-[#F5E9D0]"
                    }`}
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 92vw, 330px"
                      className={`transition-transform duration-500 group-hover:scale-105 ${
                        item.isCutout
                          ? "object-contain object-bottom pt-2"
                          : "object-cover"
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#6B1A1F]/90 border border-[#B8892E] text-[#FDF8EE] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <Expand className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="font-heading text-fluid-lead font-bold text-[#6B1A1F] mt-4 text-balance">
                    {item.title}
                  </h3>
                  <p className="font-body text-fluid-meta italic text-[#6B1A1F]/80 mt-1 px-2 pb-1 text-balance">
                    {item.caption}
                  </p>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Layer 7: Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[70] bg-[#2D090C]/92 flex flex-col items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-[#FDF8EE] border-2 border-[#B8892E] p-4 sm:p-6 flex flex-col items-center text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close gallery lightbox"
                className="self-end inline-flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-[#6B1A1F] text-[#FDF8EE] border border-[#B8892E] hover:bg-[#4F1115] cursor-pointer transition-colors mb-2"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[52dvh] sm:h-[60dvh] rounded-2xl overflow-hidden border border-[#B8892E]/45 bg-[#F8EED8]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 640px"
                  className="object-contain"
                />
              </div>

              <h3 className="font-heading text-fluid-h3 font-bold text-[#6B1A1F] mt-4 text-balance">
                {activeItem.title}
              </h3>
              <p className="font-body text-fluid-meta text-[#6B1A1F]/80 italic mt-1 text-balance">
                {activeItem.caption}
              </p>

              <div className="flex items-center justify-center gap-4 mt-5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] px-5 rounded-full bg-[#6B1A1F] text-[#FDF8EE] border border-[#B8892E] hover:bg-[#4F1115] cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-heading text-xs uppercase tracking-widest text-[#6B1A1F] font-semibold">
                  {(selectedIndex ?? 0) + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] px-5 rounded-full bg-[#6B1A1F] text-[#FDF8EE] border border-[#B8892E] hover:bg-[#4F1115] cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
