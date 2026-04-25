import { useEffect, useRef, useState } from "react";

type Quote = { white: string; grey: string; author: string };

const quotes: Quote[] = [
  {
    white: "Konečne máme systém, ktorý nám dáva prehľad a šetrí čas.",
    grey: "Spolupráca bola rýchla, transparentná a výsledok prekonal očakávania.",
    author: "— J. Novák, konateľ",
  },
];

const QuoteBlock = ({ q, delay = 0 }: { q: Quote; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const words = (q.white + " " + q.grey).split(" ");
  const whiteCount = q.white.split(" ").length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <p
        className="font-semibold leading-[1.3] tracking-[-0.01em]"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
      >
        {words.map((w, i) => {
          const isWhite = i < whiteCount;
          return (
            <span
              key={i}
              className="inline-block transition-colors duration-500"
              style={{
                transitionDelay: `${delay + i * 60}ms`,
                color: active
                  ? isWhite
                    ? "hsl(0 0% 96%)"
                    : "hsl(0 0% 100% / 0.4)"
                  : "hsl(0 0% 100% / 0.1)",
              }}
            >
              {w}&nbsp;
            </span>
          );
        })}
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-foreground/50">{q.author}</p>
    </div>
  );
};

const Testimonial = () => (
  <section className="px-6 md:px-12 py-32 md:py-48 bg-[hsl(0_0%_4%)]">
    <div className="max-w-[1400px] mx-auto">
      <p className="uppercase text-xs tracking-[0.2em] text-foreground/50 mb-12">Referencie</p>
      <div className="space-y-20 md:space-y-28">
        {quotes.map((q, i) => (
          <QuoteBlock key={i} q={q} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonial;