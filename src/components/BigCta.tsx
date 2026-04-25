const BigCta = () => (
  <section
    className="px-6 md:px-12 py-32 md:py-48 text-[hsl(0_0%_4%)]"
    style={{ backgroundColor: "hsl(var(--brand-accent))" }}
  >
    <div className="max-w-[1600px] mx-auto">
      <h2
        className="reveal font-black uppercase leading-[0.95] tracking-[-0.02em]"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900 }}
      >
        Posúvame <span style={{ color: "#1a1a1a" }}>→</span> vaše podnikanie dopredu.
      </h2>
      <p
        className="reveal mt-8 max-w-[40ch] font-medium"
        style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
      >
        Prvá konzultácia je vždy zadarmo.
      </p>
      <a
        href="#kontakt"
        className="reveal mt-12 inline-flex items-center gap-3 bg-[hsl(0_0%_4%)] text-[hsl(0_0%_96%)] px-8 py-5 text-xs md:text-sm uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity"
      >
        Začnime spoluprácu →
      </a>
      <div className="reveal mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.25em] font-medium">
        <span>AGNC®</span>
        <span className="opacity-70">/2024</span>
        <span className="opacity-70">Bratislava</span>
        <span className="opacity-70">Stratégia × Softvér × Rast</span>
      </div>
    </div>
  </section>
);

export default BigCta;