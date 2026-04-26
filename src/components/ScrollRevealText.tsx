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
      // Symmetric scroll reveal driven purely by scroll position.
      // progress goes 0 -> 1 as section enters from bottom and reaches center,
      // then 1 -> 0 as it leaves toward the top. Words react both ways.
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);
      const range = vh / 2 + rect.height / 2;
      const sectionProgress = Math.min(1, Math.max(0, 1 - distance / range));
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
