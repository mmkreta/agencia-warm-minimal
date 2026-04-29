import { useEffect, useRef, useState } from "react";

const products = [
  {
    eyebrow: "P/01",
    title: "Webové stránky & aplikácie",
    desc: "Rýchle, pixel-perfect weby postavené na modernom stacku. Od landing page po komplexné platformy.",
    bullets: ["Next-gen performance", "SEO ready", "CMS na mieru", "Animácie & 3D"],
    accent: "from-zinc-100 to-zinc-300",
  },
  {
    eyebrow: "P/02",
    title: "E-shop riešenia",
    desc: "Konverzne optimalizované obchody. Shopify, vlastné riešenia, integrácie s ERP a platobnými bránami.",
    bullets: ["Shopify / Custom", "Stripe & GoPay", "Sklady & ERP", "Analytika"],
    accent: "from-amber-100 to-orange-200",
  },
  {
    eyebrow: "P/03",
    title: "Softvér na mieru",
    desc: "CRM, interné nástroje, dashboardy. Riešenia, ktoré presne kopírujú vaše procesy.",
    bullets: ["CRM & ERP", "Dashboardy", "API & integrácie", "Cloud-first"],
    accent: "from-sky-100 to-indigo-200",
  },
  {
    eyebrow: "P/04",
    title: "AI riešenia",
    desc: "Chatboty, automatizácia, content generation. Vlastné AI agenti napojení na vaše dáta.",
    bullets: ["Custom GPT agenti", "Automatizácia", "Voice & Vision", "RAG na vaše dáta"],
    accent: "from-emerald-100 to-teal-200",
  },
];

export default function ProductShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const idx = Math.min(products.length - 1, Math.floor(progress * products.length));
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="produkty"
      ref={wrapRef}
      className="relative bg-black text-white"
      style={{ height: `${products.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ambient gradient */}
        <div
          className="absolute inset-0 opacity-[0.18] transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(60% 50% at 70% 40%, rgba(255,255,255,0.35), transparent 70%)",
          }}
        />

        <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT — text */}
          <div className="relative">
            <p className="uppercase text-[10px] tracking-[0.28em] text-white/50 mb-8">
              Produkty / Služby
            </p>

            <div className="relative h-[360px] md:h-[420px]">
              {products.map((p, i) => (
                <div
                  key={p.eyebrow}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${i === active ? 0 : i < active ? -24 : 24}px)`,
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                >
                  <span className="inline-block text-[10px] tracking-[0.28em] text-white/60 mb-5 border border-white/20 px-2.5 py-1 rounded-full">
                    {p.eyebrow}
                  </span>
                  <h3
                    className="font-semibold leading-[1.02] tracking-[-0.03em] mb-6"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-white/65 max-w-[48ch] mb-8"
                    style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
                  >
                    {p.desc}
                  </p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-white/80">
                        <span className="w-1 h-1 rounded-full bg-white/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* nav dots */}
            <div className="mt-12 flex items-center gap-3">
              {products.map((p, i) => (
                <button
                  key={p.eyebrow}
                  onClick={() => {
                    const el = wrapRef.current;
                    if (!el) return;
                    const target =
                      el.offsetTop +
                      ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / products.length;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                  className="group flex items-center gap-2"
                  aria-label={p.title}
                >
                  <span
                    className="h-[2px] transition-all duration-500"
                    style={{
                      width: i === active ? 36 : 18,
                      background: i === active ? "#fff" : "rgba(255,255,255,0.3)",
                    }}
                  />
                </button>
              ))}
              <span className="ml-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
                {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="relative h-[60vh] md:h-[72vh] hidden md:block">
            {products.map((p, i) => {
              const offset = i - active;
              return (
                <div
                  key={p.eyebrow}
                  className="absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)]"
                  style={{
                    opacity: offset === 0 ? 1 : 0,
                    transform: `scale(${offset === 0 ? 1 : 0.92}) translateY(${offset * 40}px)`,
                    pointerEvents: offset === 0 ? "auto" : "none",
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-[32px] overflow-hidden bg-gradient-to-br ${p.accent}`}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8), transparent 60%)",
                      }}
                    />
                    {/* device mock */}
                    <div className="absolute inset-0 flex items-center justify-center p-10">
                      <div className="w-full max-w-[460px] aspect-[4/3] bg-zinc-950 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                        <div className="h-7 bg-zinc-900 flex items-center gap-1.5 px-3 border-b border-white/5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                        </div>
                        <div className="p-5 space-y-3">
                          <div className="h-2 w-1/3 bg-white/15 rounded" />
                          <div className="h-6 w-2/3 bg-white/25 rounded" />
                          <div className="grid grid-cols-3 gap-2 pt-3">
                            <div className="h-16 bg-white/10 rounded-lg" />
                            <div className="h-16 bg-white/15 rounded-lg" />
                            <div className="h-16 bg-white/10 rounded-lg" />
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded" />
                          <div className="h-2 w-4/5 bg-white/10 rounded" />
                        </div>
                      </div>
                    </div>
                    <span className="absolute top-6 left-7 text-[10px] uppercase tracking-[0.28em] text-zinc-900/60">
                      {p.eyebrow}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
