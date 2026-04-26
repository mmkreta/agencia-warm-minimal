import { useEffect, useRef } from "react";

const TEXT =
  "Staviame prémiové weby a softvér, do ktorých sa zákazníci zamilujú.";

const ScrollRevealText = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const spans = wrap.querySelectorAll<HTMLSpanElement>("[data-word]");
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      // Reveal aggressively: start before the section enters, and be fully done
      // by the time the section center reaches the viewport center.
      // progress = 0 when section top is at bottom of viewport (+ pre-trigger)
      // progress = 1 when section center reaches viewport center
      const startOffset = vh * 0.4; // pre-trigger before section enters
      const total = vh * 0.5 + rect.height * 0.5; // distance until centered
      const passed = vh - rect.top + startOffset;
      const sectionProgress = Math.min(1, Math.max(0, passed / total));
      const count = spans.length;
        spans.forEach((span, i) => {
          // each word has its own slice of the progress
          const wordStart = i / count;
          const wordEnd = (i + 1) / count;
          const local = Math.min(
            1,
            Math.max(0, (sectionProgress - wordStart) / (wordEnd - wordStart))
          );
          // interpolate from light gray (hsl 0 0% 70%) to black (hsl 0 0% 4%)
          const lightness = 70 - local * 66;
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
      className="px-6 md:px-10 py-10 md:py-14"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--page-fg)" }}
    >
      <div ref={wrapRef} className="max-w-[1600px] mx-auto">
        <p
          className="uppercase text-[10px] tracking-[0.25em] mb-8 text-[hsl(0_0%_45%)]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          O nás
        </p>
        <h2
          className="font-black leading-[1.05] tracking-[-0.03em]"
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3.6rem)",
          }}
        >
          {TEXT.split(" ").map((word, i) => (
            <span
              key={i}
              data-word
              className="inline-block transition-colors duration-150 mr-[0.25em]"
              style={{ color: "hsl(0 0% 70%)" }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default ScrollRevealText;
