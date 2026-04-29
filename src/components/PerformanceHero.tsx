import { useEffect, useRef, useState } from "react";

export default function PerformanceHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section enters from bottom, 1 when fully scrolled past
      const total = rect.height + vh;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / total));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtitle reveals word-by-word as you scroll
  const subtitle =
    "Naša najpokročilejšia generácia riešení. Každý projekt prináša výnimočný výkon, premyslený dizajn a rýchlosť, ktorá posúva váš biznis vpred — dáva vám taký druh tempa, aký ste predtým nepovažovali za možný. A s AI nástrojmi prelietate úlohami rýchlosťou, akú ste si nevedeli predstaviť.";
  const words = subtitle.split(" ");
  const visibleCount = Math.floor(progress * 1.6 * words.length);

  return (
    <section
      id="performance"
      ref={ref}
      className="relative bg-black text-white px-6 md:px-12 py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <p className="uppercase text-base md:text-lg tracking-[0.04em] font-medium mb-12 md:mb-20 text-white">
          Performance
        </p>

        <h2
          className="font-semibold leading-[1.02] tracking-[-0.035em] mb-16 md:mb-24"
          style={{
            fontSize: "clamp(2.8rem, 9vw, 8rem)",
            background:
              "linear-gradient(180deg, #cfe6e6 0%, #9ec3c3 45%, #6a9a9a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Stratégia. Dizajn. Kód.
          <br />
          Vyberte si svoj rast.
        </h2>

        <p
          className="max-w-[58ch] mx-auto leading-[1.35] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)" }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="transition-colors duration-300"
              style={{
                color: i < visibleCount ? "#ffffff" : "rgba(255,255,255,0.28)",
              }}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
