"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Music, VolumeX } from "lucide-react";
import { invitationData } from "@/data/invitation";
import { useIsHydrated } from "@/lib/useMediaQuery";

const MUTED_STORAGE_KEY = "wedding_music_muted";

export interface MusicPlayerHandle {
  startAfterEnvelope: () => Promise<void>;
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
  toggleMusic: () => Promise<void>;
  isPlaying: boolean;
}

function readStoredMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(MUTED_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hydrated = useIsHydrated();
  const [isPlaying, setIsPlaying] = useState(false);
  const [mutedOverride, setMutedOverride] = useState<boolean | null>(null);

  const isMuted = mutedOverride ?? (hydrated ? readStoredMuted() : false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      setMutedOverride(false);
      localStorage.setItem(MUTED_STORAGE_KEY, "false");
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const startAfterEnvelope = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const savedMuted = readStoredMuted();

    if (savedMuted) {
      setMutedOverride(true);
      setIsPlaying(false);
      return;
    }

    try {
      audio.muted = false;
      await audio.play();
      setIsPlaying(true);
      setMutedOverride(false);
    } catch {
      setIsPlaying(false);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setMutedOverride(true);
    try {
      localStorage.setItem(MUTED_STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  const toggleMusic = async () => {
    if (isPlaying && !isMuted) {
      pauseMusic();
    } else {
      await playMusic();
    }
  };

  useImperativeHandle(ref, () => ({
    startAfterEnvelope,
    playMusic,
    pauseMusic,
    toggleMusic,
    isPlaying,
  }));

  const active = isPlaying && !isMuted;

  return (
    <>
      <audio
        ref={audioRef}
        src={invitationData.assets.audioSrc}
        preload="none"
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Layer 7: Floating Music Control above the foreground layer */}
      <div className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-50">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={active ? "Pause wedding music" : "Play wedding music"}
          title={active ? "Pause music" : "Play music"}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[1.5px] flex items-center justify-center cursor-pointer shadow-[0_10px_28px_rgba(107,26,31,0.32)] hover:scale-[1.07] active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892E] transition-[transform,colors] duration-150 ${
            active
              ? "bg-[#6B1A1F] text-[#DFBC6E] border-[#B8892E]"
              : "bg-[#FDF8EE]/95 text-[#6B1A1F] border-[#B8892E]"
          }`}
        >
          {active && (
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full border border-[#B8892E]/60 animate-ping pointer-events-none"
            />
          )}

          {active ? (
            <span className="flex items-end gap-1 h-4" aria-hidden="true">
              <span className="w-1 bg-[#DFBC6E] rounded-full animate-bounce [animation-delay:0ms] h-2.5" />
              <span className="w-1 bg-[#DFBC6E] rounded-full animate-bounce [animation-delay:160ms] h-4" />
              <span className="w-1 bg-[#DFBC6E] rounded-full animate-bounce [animation-delay:320ms] h-3" />
            </span>
          ) : isMuted ? (
            <VolumeX className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Music className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
