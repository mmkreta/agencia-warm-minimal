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
      // Section progress: 0 when section bottom enters viewport, 1 when section top hits ~30% from top
      const total = rect.height + vh * 0.5;
      const passed = vh - rect.top;
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
        span.style.opacity = String(0.2 + local * 0.8);
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
          {TEXT.split(" ").map((word, i) => (
            <span
              key={i}
              data-word
              className="inline-block transition-opacity duration-150 mr-[0.25em]"
              style={{ opacity: 0.2, color: "hsl(0 0% 100%)" }}
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
