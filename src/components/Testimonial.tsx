import { useEffect, useRef, useState } from "react";

const whitePart = "Profesionálny prístup, rýchle dodanie a kvalitný výsledok.";
const greyPart = "Odporúčam každému, kto hľadá spoľahlivého partnera pre digitálne riešenia.";

const Testimonial = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const words = (whitePart + " " + greyPart).split(" ");
  const whiteCount = whitePart.split(" ").length;

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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[hsl(0_0%_4%)]">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <p className="uppercase text-xs tracking-[0.2em] text-foreground/50 mb-12">Referencie</p>
        <p
          className="font-semibold leading-[1.3] tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {words.map((w, i) => {
            const isWhite = i < whiteCount;
            const visible = active;
            return (
              <span
                key={i}
                className="inline-block transition-colors duration-500"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  color: visible
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
      </div>
    </section>
  );
};

export default Testimonial;