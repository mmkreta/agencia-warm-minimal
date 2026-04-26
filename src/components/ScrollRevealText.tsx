import { useEffect, useRef } from "react";

const LINES = [
  "Staviame prémiové weby a softvér,",
  "do ktorých sa zákazníci zamilujú.",
];

const ScrollRevealText = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const spans = wrap.querySelectorAll<HTMLSpanElement>("[data-line]");
      const vh = window.innerHeight;
      spans.forEach((span) => {
        const r = span.getBoundingClientRect();
        const center = r.top + r.height / 2;
        // 0 when line is at bottom of viewport, 1 when at ~40% from top
        const progress = Math.min(
          1,
          Math.max(0, (vh - center) / (vh * 0.6))
        );
        // grey -> white
        const lightness = 25 + progress * 75; // 25% -> 100%
        span.style.color = `hsl(0 0% ${lightness}%)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      className="px-6 md:px-10 py-20 md:py-28"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div ref={wrapRef} className="max-w-[1600px] mx-auto">
        <p
          className="uppercase text-[10px] tracking-[0.25em] mb-8 text-[hsl(0_0%_45%)]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          O nás
        </p>
        <h2
          className="font-bold leading-[1.1] tracking-[-0.02em]"
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3.6rem)",
          }}
        >
          {LINES.map((line, i) => (
            <span
              key={i}
              data-line
              className="block transition-colors duration-300"
              style={{ color: "hsl(0 0% 25%)" }}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default ScrollRevealText;
