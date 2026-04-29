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
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);

      const v = videoRef.current;
      if (v && duration > 0) {
        // skip first 0.4s of source video
        const start = 0.4;
        const end = duration;
        const t = start + p * (end - start);
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

  const wordsIn = win(0.28, 0.5); // 3 words fade/slide in
  const wordsOut = win(0.62, 0.78); // 3 words fade out
  const wordsOpacity = wordsIn * (1 - wordsOut);

  const sigStart = 0.55;
  const sigEnd = 0.92;
  const sigProgress = win(sigStart, sigEnd); // 0..1 stroke draw

  const hintOpacity = 1 - win(0.0, 0.12);

  const words = ["Softvér", "AI", "Marketing"];

  // signature path length (approx) — large enough; we'll use pathLength=1
  return (
    <div ref={sectionRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* subtle vignette for legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* center stack: three words */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: wordsOpacity }}
        >
          {words.map((w, i) => {
            const local = Math.min(1, Math.max(0, wordsIn * 3 - i));
            return (
              <span
                key={w}
                className="block font-black tracking-[-0.04em] text-white"
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "clamp(2.4rem, 8vw, 7rem)",
                  lineHeight: 1.02,
                  transform: `translateY(${(1 - local) * 24}px)`,
                  opacity: local,
                  textShadow: "0 4px 30px rgba(0,0,0,0.4)",
                }}
              >
                {w}
              </span>
            );
          })}

          {/* handwritten signature under the words */}
          <div
            className="mt-6 md:mt-10"
            style={{
              opacity: Math.min(1, sigProgress * 2),
            }}
          >
            <svg
              viewBox="0 0 600 160"
              className="w-[280px] md:w-[460px] h-auto"
              fill="none"
            >
              <path
                d="M30 110 C 60 30, 110 30, 120 100 C 130 150, 90 150, 95 110 C 100 60, 150 50, 175 95 L 185 60 L 200 110 C 210 70, 245 70, 245 110 C 245 140, 215 140, 220 110 C 225 75, 265 75, 280 110 C 285 130, 270 140, 265 120 L 295 60 L 295 115 C 295 80, 325 70, 345 100 L 355 60 L 365 110 C 375 70, 410 70, 410 110 C 410 140, 380 140, 385 110 C 390 75, 430 75, 445 115 C 455 140, 425 140, 430 110 L 460 60 C 470 110, 510 110, 525 75"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - sigProgress}
                style={{
                  filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.5))",
                }}
              />
            </svg>
          </div>
        </div>

        {/* bottom hint: potiahnite + arrow */}
        <div
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: hintOpacity }}
        >
          <span
            className="uppercase text-[10px] tracking-[0.35em] text-white/85"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Potiahnite
          </span>
          <svg
            width="22"
            height="34"
            viewBox="0 0 22 34"
            fill="none"
            className="animate-[heroBounce_1.6s_ease-in-out_infinite]"
          >
            <path
              d="M11 2 L11 28 M2 19 L11 30 L20 19"
              stroke="white"
              strokeWidth="2"
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