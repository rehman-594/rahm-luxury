import { useEffect, useRef, type RefObject } from 'react';
import { VIDEO_FRAMES } from '../data/frames';
import { drawCoverFrame, getBestLoadedFrame } from '../utils/frameSequenceCache';

interface ScrollBackgroundCanvasProps {
  trackRef: RefObject<HTMLDivElement | null>;
  onSmoothedProgress?: (progress: number) => void;
}

export function ScrollBackgroundCanvas({
  trackRef,
  onSmoothedProgress,
}: ScrollBackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const onProgressRef = useRef(onSmoothedProgress);
  onProgressRef.current = onSmoothedProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const updateTargetFromScroll = () => {
      const rect = track.getBoundingClientRect();
      const totalScrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const scrolled = Math.max(0, Math.min(totalScrollable, -rect.top));
      targetProgressRef.current = scrolled / totalScrollable;
    };

    updateTargetFromScroll();
    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    window.addEventListener('resize', updateTargetFromScroll);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const renderLoop = () => {
      if (prefersReducedMotion) {
        currentProgressRef.current = targetProgressRef.current;
      } else {
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.00015) {
          currentProgressRef.current += diff * 0.14;
        } else {
          currentProgressRef.current = targetProgressRef.current;
        }
      }

      const p = Math.max(0, Math.min(1, currentProgressRef.current));
      onProgressRef.current?.(p);

      const frameFloat = p * (VIDEO_FRAMES.length - 1);
      const img = getBestLoadedFrame(frameFloat);
      if (img) {
        drawCoverFrame(ctx, img, canvas.width, canvas.height);
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateTargetFromScroll);
      window.removeEventListener('resize', updateTargetFromScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [trackRef]);

  return (
    <div
      className="sticky top-0 left-0 w-full h-screen -mb-[100vh] overflow-hidden pointer-events-none z-0 bg-[#171918]"
      aria-hidden="true"
    >
      <img
        src={VIDEO_FRAMES[0]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <canvas ref={canvasRef} className="relative w-full h-full block" />
    </div>
  );
}
