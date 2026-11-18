import { useEffect, useRef, type ReactNode, type RefObject } from 'react';

interface PinnedNarrativeTrackProps {
  trackRef: RefObject<HTMLDivElement | null>;
  progressRef: RefObject<number>;
  onExploreProperties: () => void;
  onDiscoverWorld: () => void;
}

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

// Strict non-overlapping sequential windows with 4% breathing gaps:
// Hero:    [0.00 -> 0.14] (Bottom-Left)
// Gap:     [0.14 -> 0.18]
// Stage 1: [0.18 -> 0.34] (Top-Left)
// Gap:     [0.34 -> 0.38]
// Stage 2: [0.38 -> 0.54] (Bottom-Right)
// Gap:     [0.54 -> 0.58]
// Stage 3: [0.58 -> 0.74] (Top-Right)
// Gap:     [0.74 -> 0.78]
// Stage 4: [0.78 -> 0.93] (Bottom-Left)
// Gap:     [0.93 -> 1.00]
function evalWindow(
  p: number,
  start: number,
  peakStart: number,
  peakEnd: number,
  end: number,
  fromStartZero = false
): { opacity: number; translateY: number } {
  if (p < start || p > end) {
    return { opacity: 0, translateY: 16 };
  }
  if (!fromStartZero && p < peakStart) {
    const t = smoothstep((p - start) / (peakStart - start));
    return { opacity: t, translateY: (1 - t) * 16 };
  }
  if (p <= peakEnd) {
    return { opacity: 1, translateY: 0 };
  }
  const t = smoothstep((p - peakEnd) / (end - peakEnd));
  return { opacity: 1 - t, translateY: -t * 10 };
}

function FeatheredBlurTextBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-4 md:p-6">
      {/* Soft feathered radial blur cloud directly behind text — no rectangular box or border */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 md:-inset-12 -z-10 pointer-events-none bg-[#171918]/50 backdrop-blur-xl"
        style={{
          maskImage:
            'radial-gradient(ellipse 72% 68% at 50% 50%, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 74%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 72% 68% at 50% 50%, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 74%)',
        }}
      />
      {children}
    </div>
  );
}

export function PinnedNarrativeTrack({
  trackRef,
  progressRef,
  onExploreProperties,
  onDiscoverWorld,
}: PinnedNarrativeTrackProps) {
  const heroElRef = useRef<HTMLDivElement | null>(null);
  const heroLabelRef = useRef<HTMLDivElement | null>(null);
  const s1ElRef = useRef<HTMLDivElement | null>(null);
  const s2ElRef = useRef<HTMLDivElement | null>(null);
  const s3ElRef = useRef<HTMLDivElement | null>(null);
  const s4ElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const applyStageStyle = (
      el: HTMLDivElement | null,
      state: { opacity: number; translateY: number },
      interactive = false
    ) => {
      if (!el) return;
      if (state.opacity <= 0.004) {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      } else {
        el.style.visibility = 'visible';
        el.style.opacity = state.opacity.toFixed(3);
        el.style.transform = `translate3d(0, ${state.translateY.toFixed(2)}px, 0)`;
        el.style.pointerEvents = interactive && state.opacity > 0.25 ? 'auto' : 'none';
      }
    };

    const tick = () => {
      const p = progressRef.current ?? 0;

      const heroState = evalWindow(p, 0.0, 0.0, 0.09, 0.14, true);
      applyStageStyle(heroElRef.current, heroState, true);
      applyStageStyle(heroLabelRef.current, heroState, false);

      applyStageStyle(s1ElRef.current, evalWindow(p, 0.18, 0.22, 0.30, 0.34));
      applyStageStyle(s2ElRef.current, evalWindow(p, 0.38, 0.42, 0.50, 0.54));
      applyStageStyle(s3ElRef.current, evalWindow(p, 0.58, 0.62, 0.70, 0.74));
      applyStageStyle(s4ElRef.current, evalWindow(p, 0.78, 0.82, 0.89, 0.93));

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [progressRef]);

  return (
    <div ref={trackRef} className="relative h-[520vh]">
      {/* Exact anchor targets matching chapter peak scroll positions (totalScrollable = 420vh) */}
      <div id="hero" className="absolute top-0 left-0 w-px h-px" aria-hidden="true" />
      <div id="journey" className="absolute left-0 w-px h-px" style={{ top: '109vh' }} aria-hidden="true" />
      <div id="about" className="absolute left-0 w-px h-px" style={{ top: '277vh' }} aria-hidden="true" />

      {/* Pinned viewport stage: only one chapter visible at a time, fading cleanly in place */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-10">
        <div className="relative h-full max-w-[1440px] mx-auto px-6 md:px-12">
          {/* HERO — Bottom-Left, feathered blur only behind text */}
          <div
            ref={heroElRef}
            className="absolute bottom-10 md:bottom-14 left-4 md:left-10 right-4 md:right-auto max-w-md will-change-[opacity,transform]"
          >
            <FeatheredBlurTextBackdrop>
              <div className="text-[#FFFFFF] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#F7F5F0]/90 font-medium mb-2.5">
                  Exclusive Luxury Real Estate
                </p>
                <h1 className="font-serif text-[clamp(2.35rem,4.2vw,3.9rem)] leading-[1.02] font-normal tracking-[-0.015em] text-[#FFFFFF] mb-3">
                  <span className="italic font-medium text-[#F7F5F0] text-[1.12em]">Luxury</span>{' '}
                  Beyond
                  <br />
                  Expectation.
                </h1>
                <p className="text-[15px] text-[#F7F5F0]/92 leading-relaxed mb-6 font-light">
                  Extraordinary residences designed for exceptional living.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={onExploreProperties}
                    className="px-5 py-3 bg-[#B69A69] text-[#171918] text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap shrink-0 hover:bg-[#F7F5F0] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFFFF]"
                  >
                    Explore Properties
                  </button>
                  <button
                    type="button"
                    onClick={onDiscoverWorld}
                    className="px-5 py-3 border border-[#FFFFFF]/70 bg-[#171918]/25 text-[#FFFFFF] text-xs font-medium uppercase tracking-[0.15em] whitespace-nowrap shrink-0 hover:bg-[#FFFFFF]/15 hover:border-[#FFFFFF] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69A69]"
                  >
                    Discover Our World
                  </button>
                </div>
              </div>
            </FeatheredBlurTextBackdrop>
          </div>

          <div
            ref={heroLabelRef}
            className="hidden md:block absolute bottom-16 right-12 will-change-[opacity,transform]"
          >
            <div className="relative px-3 py-1">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 pointer-events-none bg-[#171918]/45 backdrop-blur-md"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)',
                }}
              />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#F7F5F0]/95 tabular-nums whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                01 / Extraordinary Living
              </span>
            </div>
          </div>

          {/* STAGE 01 — Top-Left */}
          <div
            ref={s1ElRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="absolute top-24 md:top-28 left-4 md:left-10 w-[calc(100%-2rem)] max-w-[380px] will-change-[opacity,transform]"
          >
            <FeatheredBlurTextBackdrop>
              <div className="text-[#F7F5F0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#E6CFA3] font-medium mb-2">
                  01 · A Different Perspective
                </p>
                <h2 className="font-serif text-[clamp(2rem,3.2vw,2.85rem)] leading-[1.06] font-normal text-[#FFFFFF] mb-2.5">
                  A world of its own.
                </h2>
                <p className="text-sm text-[#F7F5F0]/92 leading-relaxed font-light">
                  A remarkable residence. An extraordinary first impression.
                </p>
              </div>
            </FeatheredBlurTextBackdrop>
          </div>

          {/* STAGE 02 — Bottom-Right */}
          <div
            ref={s2ElRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="absolute bottom-14 md:bottom-20 right-4 md:right-10 w-[calc(100%-2rem)] max-w-[380px] will-change-[opacity,transform]"
          >
            <FeatheredBlurTextBackdrop>
              <div className="text-[#F7F5F0] md:text-right drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#E6CFA3] font-medium mb-2">
                  02 · Architecture
                </p>
                <h2 className="font-serif text-[clamp(2rem,3.2vw,2.85rem)] leading-[1.06] font-normal text-[#FFFFFF] mb-2.5">
                  Designed to inspire.
                </h2>
                <p className="text-sm text-[#F7F5F0]/92 leading-relaxed font-light">
                  Honed stone, expansive glass, and quiet horizon lines.
                </p>
              </div>
            </FeatheredBlurTextBackdrop>
          </div>

          {/* STAGE 03 — Top-Right (Philosophy) */}
          <div
            ref={s3ElRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="absolute top-24 md:top-28 right-4 md:right-10 w-[calc(100%-2rem)] max-w-[400px] will-change-[opacity,transform]"
          >
            <FeatheredBlurTextBackdrop>
              <div className="text-[#F7F5F0] md:text-right drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#E6CFA3] font-medium mb-2">
                  03 · The RAHM Philosophy
                </p>
                <h2 className="font-serif text-[clamp(2rem,3.2vw,2.85rem)] leading-[1.06] font-normal text-[#FFFFFF] mb-2.5">
                  Quiet permanence.
                </h2>
                <p className="text-sm text-[#F7F5F0]/92 leading-relaxed font-light mb-5">
                  Private architectural sanctuaries represented with complete discretion.
                </p>
                <div className="flex items-center md:justify-end gap-8 pt-4 border-t border-white/20 tabular-nums">
                  <div>
                    <p className="font-serif text-2xl text-[#FFFFFF]">$4.8B+</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#F7F5F0]/80">
                      Private Volume
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-[#FFFFFF]">18</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#F7F5F0]/80">
                      Global Enclaves
                    </p>
                  </div>
                </div>
              </div>
            </FeatheredBlurTextBackdrop>
          </div>

          {/* STAGE 04 — Bottom-Left */}
          <div
            ref={s4ElRef}
            style={{ opacity: 0, visibility: 'hidden' }}
            className="absolute bottom-14 md:bottom-20 left-4 md:left-10 w-[calc(100%-2rem)] max-w-[380px] will-change-[opacity,transform]"
          >
            <FeatheredBlurTextBackdrop>
              <div className="text-[#F7F5F0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#E6CFA3] font-medium mb-2">
                  04 · Exceptional Living
                </p>
                <h2 className="font-serif text-[clamp(2rem,3.2vw,2.85rem)] leading-[1.06] font-normal text-[#FFFFFF] mb-2.5">
                  Beyond the ordinary.
                </h2>
                <p className="text-sm text-[#F7F5F0]/92 leading-relaxed font-light">
                  Spaces crafted to make every moment memorable.
                </p>
              </div>
            </FeatheredBlurTextBackdrop>
          </div>
        </div>
      </div>
    </div>
  );
}
