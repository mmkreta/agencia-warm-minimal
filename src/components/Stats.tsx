const stats = [
  { v: "47+", l: "dodaných projektov" },
  { v: "3 000+", l: "spokojných užívateľov" },
  { v: "14 dní", l: "priemerné dodanie" },
  { v: "0 €", l: "záloha" },
];

const Stats = () => (
  <section
    className="px-6 md:px-12 py-20 md:py-28 border-t border-[hsl(0_0%_4%/0.08)]"
    style={{ backgroundColor: "#F5F5F0", color: "hsl(0 0% 4%)" }}
  >
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="reveal flex flex-col gap-3"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <span
            className="font-semibold leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {s.v}
          </span>
          <span className="uppercase text-[10px] tracking-[0.2em] text-[hsl(0_0%_4%/0.55)]">
            {s.l}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
