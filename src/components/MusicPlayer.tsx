"use client";

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";
import { weddingData } from "@/data/weddingData";

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
        src={weddingData.audio.src}
        preload="auto"
        loop
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          if (isPlaying) playGentleAmbientHarp();
        }}
      />

      {/* Floating Music Button (Fixed Top-Right like Reference) */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[10002]">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#ae7e32]/60 flex items-center justify-center cursor-pointer backdrop-blur-md transition-all duration-300 shadow-md ${
            isPlaying
              ? "bg-[#741e2b] text-[#ffd700] scale-105 shadow-[#5e202a]/30"
              : "bg-[#fff9f0]/90 text-[#741d2b] hover:bg-[#fff9f0] hover:scale-105"
          }`}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-[#ffd700] rounded-full animate-bounce [animation-delay:0ms] h-3" />
              <span className="w-1 bg-[#ffd700] rounded-full animate-bounce [animation-delay:150ms] h-4" />
              <span className="w-1 bg-[#ffd700] rounded-full animate-bounce [animation-delay:300ms] h-2.5" />
            </div>
          ) : (
            <Music className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
