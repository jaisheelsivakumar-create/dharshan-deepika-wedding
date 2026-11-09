"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import BackgroundLayer from "@/components/layers/BackgroundLayer";
import MusicPlayer, { MusicPlayerHandle } from "@/components/ui/MusicPlayer";
import Toast from "@/components/ui/Toast";
import SplashEnvelope from "@/components/sections/SplashEnvelope";
import { invitationData } from "@/data/invitation";
import type { WeddingSectionId } from "@/lib/particleBus";

const InvitationContent = dynamic(
  () => import("@/components/sections/InvitationContent"),
  { ssr: false }
);

let prefetched = false;
function prefetchInvitationModules() {
  if (prefetched) return;
  prefetched = true;
  void import("@/components/sections/InvitationContent");
}

export default function Home() {
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [activeSection, setActiveSection] = useState<WeddingSectionId>("splash");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 2800);
  };

  const handleStartEnvelopeOpen = () => {
    prefetchInvitationModules();
    setIsOpened(true);
    setActiveSection("hero");
    if (musicPlayerRef.current) {
      void musicPlayerRef.current.startAfterEnvelope();
    }
  };

  const handleFinishEnvelopeOpen = () => {
    setShowSplash(false);
  };

  return (
    <div className="relative min-h-[100dvh] w-full text-[#6B1A1F]">
      {/* Layers 1 & 2: Fixed Background Paper, Swinging Garlands/Bells (md+) & Soft Vignette */}
      <BackgroundLayer isOpened={isOpened} />

      {/* Accessible main & h1 landmark before InvitationContent mounts on open */}
      {!isOpened && (
        <main className="sr-only">
          <h1>
            {invitationData.couple.groom.name} &amp; {invitationData.couple.bride.name}{" "}
            Wedding Invitation
          </h1>
        </main>
      )}

      {/* Layers 3-6: Deferred Invitation Content, 3D Particles, & Foreground Lamps (mounted cleanly on open) */}
      {isOpened && (
        <InvitationContent
          activeSection={activeSection}
          isOpened={isOpened}
          onShowToast={showToast}
          onActiveSectionChange={setActiveSection}
        />
      )}

      {/* Layer 7: Floating UI Controls (Music Button, Toast, Splash Envelope) */}
      <MusicPlayer ref={musicPlayerRef} />
      <Toast message={toastMessage} />

      <SplashEnvelope
        isVisible={showSplash}
        onPrefetch={prefetchInvitationModules}
        onStartOpen={handleStartEnvelopeOpen}
        onFinishOpen={handleFinishEnvelopeOpen}
      />
    </div>
  );
}
