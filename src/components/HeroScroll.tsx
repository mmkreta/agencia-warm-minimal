import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero with scroll-scrubbed video.
 * - Section is tall (300vh) so user must scroll through it.
 * - Inner wrapper is sticky and pinned to viewport — video stays edge-to-edge.
 * - Video currentTime is driven by scroll progress (skipped first 0.4s).
 * - In the middle of the scroll, three words appear stacked, followed by a
 *   handwritten "Agencia" signature that strokes itself in.
 * - Bottom: down-arrow + "potiahnite" hint, visible at the start.
 */
const HeroScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(4);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => setDuration(v.duration || 4);
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      // scroll progress through the pinned section (0..1)
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);

      const v = videoRef.current;
      if (v && duration > 0) {
        // immediately scrub from frame 0 — no skipped intro
        const t = p * duration;
        if (Math.abs(v.currentTime - t) > 0.03) {
          try {
            v.currentTime = t;
          } catch {}
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [duration]);

  // helpers — local progress windows
  const win = (a: number, b: number) =>
    Math.min(1, Math.max(0, (progress - a) / (b - a)));

  const hintOpacity = 1 - win(0.0, 0.12);

  // signature path length (approx) — large enough; we'll use pathLength=1
  return (
    <div ref={sectionRef} style={{ height: "175vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* bottom hint: potiahnite + arrow inline */}
        <div
          className="absolute bottom-4 left-0 right-0 flex flex-row items-center justify-center gap-2 pointer-events-none"
          style={{ opacity: hintOpacity }}
        >
          <span
            className="uppercase text-[8px] tracking-[0.3em] text-white/85 leading-none"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Potiahnite
          </span>
          <svg
            width="10"
            height="14"
            viewBox="0 0 22 34"
            fill="none"
            className="animate-[heroBounce_1.6s_ease-in-out_infinite]"
          >
            <path
              d="M11 2 L11 28 M2 19 L11 30 L20 19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <style>{`@keyframes heroBounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }`}</style>
      </div>
    </div>
  );
};

export default HeroScroll;