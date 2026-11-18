import { useEffect, useState } from 'react';
import { RahmLogo } from './RahmLogo';

interface LoadingScreenProps {
  progress: number;
  onComplete: () => void;
}

export function LoadingScreen({ progress, onComplete }: LoadingScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const ready = progress >= 15;
    if (!ready) return;

    const fadeTimer = window.setTimeout(() => {
      setExiting(true);
    }, 500);

    const doneTimer = window.setTimeout(() => {
      onComplete();
    }, 1050);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [progress, onComplete]);

  useEffect(() => {
    const failsafe = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(onComplete, 550);
    }, 2400);
    return () => window.clearTimeout(failsafe);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#171918] text-[#F7F5F0] transition-opacity duration-500 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading RAHM LUXURY"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <RahmLogo tone="light" />
        <p className="font-serif italic text-lg text-[#DCD4C6] tracking-wide">
          Where Luxury Finds Its Home.
        </p>
        <div className="w-48 h-px bg-white/15 overflow-hidden">
          <div
            className="h-full bg-[#B69A69] transition-all duration-300 ease-out"
            style={{ width: `${Math.max(18, Math.min(100, progress * 3))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
