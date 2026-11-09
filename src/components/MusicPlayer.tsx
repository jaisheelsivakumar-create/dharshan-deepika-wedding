"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import { invitationData } from "@/data/invitation";

export interface MusicPlayerHandle {
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
  toggleMusic: () => Promise<void>;
  isPlaying: boolean;
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio API ambient chime fallback
  const playGentleAmbientHarp = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Traditional Indian auspicious notes (Mohanam / Bhupali raga)
      const freqs = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 659.25];

      const playTone = () => {
        if (!ctx) return;
        const note = freqs[Math.floor(Math.random() * freqs.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.3);
      };

      playTone();
      synthIntervalRef.current = setInterval(playTone, 1400);
    } catch {
      // AudioContext not supported
    }
  };

  const stopGentleAmbientHarp = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  };

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      playGentleAmbientHarp();
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    stopGentleAmbientHarp();
    setIsPlaying(false);
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      await playMusic();
    }
  };

  useImperativeHandle(ref, () => ({
    playMusic,
    pauseMusic,
    toggleMusic,
    isPlaying,
  }));

  return (
    <>
      <audio
        ref={audioRef}
        src={invitationData.assets.audioSrc}
        preload="auto"
        loop
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          if (isPlaying) playGentleAmbientHarp();
        }}
      />

      {/* Floating Circular Music Button at Bottom-Right Corner */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#c59b4e]/70 flex items-center justify-center cursor-pointer backdrop-blur-md transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#c59b4e]/50 ${
            isPlaying
              ? "bg-[#6b1e23] text-[#ffd700] scale-105 shadow-[#6b1e23]/35"
              : "bg-[#fffcf7]/95 text-[#6b1e23] hover:bg-[#fffcf7] hover:scale-105"
          }`}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full bg-[#c59b4e] opacity-40 blur-sm animate-ping pointer-events-none" />
          )}

          {isPlaying ? (
            <div className="flex items-end gap-1 h-5">
              <span className="w-1 bg-[#ffd700] rounded-full animate-bounce [animation-delay:0ms] h-3.5" />
              <span className="w-1 bg-[#ffd700] rounded-full animate-bounce [animation-delay:150ms] h-5" />
              <span className="w-1 bg-[#ffd700] rounded-full animate-bounce [animation-delay:300ms] h-4" />
              <span className="w-1 bg-[#ffd700] rounded-full animate-bounce [animation-delay:450ms] h-2.5" />
            </div>
          ) : (
            <Music className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
