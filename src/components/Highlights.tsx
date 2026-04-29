import { useEffect, useRef, useState } from "react";
import weby from "@/assets/highlight-weby.jpg";
import softver from "@/assets/highlight-softver.jpg";
import ai from "@/assets/highlight-ai.jpg";
import marketing from "@/assets/highlight-marketing.jpg";
import branding from "@/assets/highlight-branding.jpg";

const slides = [
  { img: weby, eyebrow: "01 — Weby", title: "Weby, ktoré predávajú.", desc: "Moderný web ladený na konverziu — od prvého dojmu po klik." },
  { img: softver, eyebrow: "02 — Softvér", title: "Softvér na mieru.", desc: "CRM, dashboardy a interné nástroje, ktoré šetria hodiny denne." },
  { img: ai, eyebrow: "03 — AI", title: "AI, ktorá pracuje za vás.", desc: "Automatizácie, agenti a chatboty napojené priamo na váš biznis." },
  { img: marketing, eyebrow: "04 — Marketing", title: "Kampane s výsledkom.", desc: "Meta, Google, SEO. Transparentne, merateľne, bez výhovoriek." },
  { img: branding, eyebrow: "05 — Branding", title: "Značka, ktorú si pamätajú.", desc: "Identita, ktorá otvára dvere ešte predtým než poviete slovo." },
];

const AUTOPLAY_MS = 5000;

const Highlights = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number>(performance.now());

  // autoplay loop with progress for the play button ring
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / AUTOPLAY_MS);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => (i + 1) % slides.length);
        startRef.current = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, index]);

  // pause when tab hidden
  useEffect(() => {
    const onVis = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const goto = (i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
    startRef.current = performance.now();
    setProgress(0);
  };

  return (
    <section
      id="highlights"
      className="relative px-4 md:px-12 py-24 md:py-32"
      style={{ backgroundColor: "var(--page-bg, #0a0a0a)", color: "var(--page-fg, #fff)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14 px-2">
          <h2
            className="font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Pozrite si highlights.
          </h2>
        </div>

        {/* Stage */}
        <div className="relative">
          <div
            ref={trackRef}
            className="relative aspect-[16/10] md:aspect-[21/10] overflow-hidden rounded-2xl bg-black"
          >
            {slides.map((s, i) => (
              <div
                key={s.title}
                className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
                style={{ opacity: i === index ? 1 : 0 }}
                aria-hidden={i !== index}
              >
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out"
                  style={{ transform: i === index ? "scale(1.06)" : "scale(1)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)",
                  }}
                />
                <div className="absolute top-6 md:top-10 left-6 md:left-12 right-6 md:right-12">
                  <p
                    className="uppercase text-[10px] md:text-[11px] tracking-[0.3em] text-white/70 mb-3 transition-all duration-700"
                    style={{
                      transform: i === index ? "translateY(0)" : "translateY(8px)",
                      opacity: i === index ? 1 : 0,
                    }}
                  >
                    {s.eyebrow}
                  </p>
                  <h3
                    className="text-white font-semibold leading-[1.05] tracking-[-0.02em] max-w-[18ch] transition-all duration-700"
                    style={{
                      fontSize: "clamp(1.6rem, 4vw, 3.25rem)",
                      transform: i === index ? "translateY(0)" : "translateY(14px)",
                      opacity: i === index ? 1 : 0,
                      transitionDelay: i === index ? "120ms" : "0ms",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-4 text-white/80 max-w-[42ch] text-sm md:text-base leading-relaxed transition-all duration-700"
                    style={{
                      transform: i === index ? "translateY(0)" : "translateY(14px)",
                      opacity: i === index ? 1 : 0,
                      transitionDelay: i === index ? "220ms" : "0ms",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Arrows */}
            <button
              onClick={() => goto(index - 1)}
              aria-label="Predchádzajúce"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => goto(index + 1)}
              aria-label="Ďalšie"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 size-10 md:size-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Bottom bar: dots + play/pause */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => goto(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                  style={{
                    width: i === index ? 32 : 8,
                    backgroundColor: i === index ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {i === index && (
                    <span
                      className="absolute inset-y-0 left-0 bg-white"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pozastaviť" : "Spustiť"}
                className="ml-2 size-7 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                {playing ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7V5z"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
