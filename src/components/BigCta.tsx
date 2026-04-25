const BigCta = () => (
  <section
    className="px-6 md:px-12 py-32 md:py-48 text-[hsl(0_0%_4%)]"
    style={{ backgroundColor: "#E8654A" }}
  >
    <div className="max-w-[1600px] mx-auto">
      <h2
        className="reveal font-black uppercase leading-[0.95] tracking-[-0.02em]"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900 }}
      >
        Posúvame{" "}
        <span style={{ color: "#1a1a1a" }}>→</span>{" "}
        vašu štruktúru dopredu.
      </h2>
      <div className="reveal mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.25em] font-medium">
        <span>AGNC®</span>
        <span className="opacity-70">/2024</span>
        <span className="opacity-70">Bratislava</span>
        <span className="opacity-70">Softvér × Marketing × AI</span>
      </div>
    </div>
  </section>
);

export default BigCta;