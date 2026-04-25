import { useEffect, useRef, useState } from "react";

const projects = [
  { id: "A001", name: "Webové stránky & aplikácie", category: "Web / Vývoj", gradient: "from-zinc-800 via-zinc-900 to-black" },
  { id: "A002", name: "Softvér na mieru", category: "CRM / Systémy", gradient: "from-neutral-800 via-neutral-900 to-black" },
  { id: "A003", name: "Digitálny marketing", category: "Kampane / Rast", gradient: "from-stone-800 via-stone-900 to-black" },
  { id: "A004", name: "AI riešenia", category: "Automatizácia / AI", gradient: "from-zinc-700 via-zinc-900 to-black" },
  { id: "A005", name: "Branding & dizajn", category: "Identita / Vizuál", gradient: "from-neutral-700 via-neutral-900 to-black" },
];

const services = [
  "Webové stránky & aplikácie",
  "Softvér na mieru (CRM, dashboardy, interné nástroje)",
  "Digitálny marketing (Meta Ads, Google Ads, SEO)",
  "AI & automatizácia (chatboty, workflow, generovanie obsahu)",
  "Branding & dizajn (logo, vizuálna identita)",
  "Tvorba obsahu (video, foto, copywriting)",
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Nav = () => (
  <header className="absolute top-0 left-0 right-0 z-50">
    <nav className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
      <a href="#top" className="font-medium">Agencia</a>
      <ul className="hidden md:flex items-center gap-8 text-foreground/80">
        <li><a href="#sluzby" className="hover:text-foreground transition-colors">Služby</a></li>
        <li><a href="#projekty" className="hover:text-foreground transition-colors">Projekty</a></li>
      </ul>
      <ul className="hidden md:flex items-center gap-8 text-foreground/80">
        <li><a href="#o-nas" className="hover:text-foreground transition-colors">O nás</a></li>
        <li><a href="#kontakt" className="hover:text-foreground transition-colors">Kontakt</a></li>
      </ul>
    </nav>
  </header>
);

const Hero = () => (
  <section id="top" className="relative min-h-screen flex flex-col px-6 md:px-10 pt-28 pb-10" style={{ backgroundColor: "#0a0a0a" }}>
    <Nav />
    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-4">
      {/* Left — taller */}
      <div className="md:col-span-5 relative aspect-[3/4] md:aspect-auto overflow-hidden animate-[fadeIn_1s_ease-out]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #2a2a2a 0%, #161616 45%, #0a0a0a 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px)" }} />
      </div>
      {/* Right — wider */}
      <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto overflow-hidden animate-[fadeIn_1.3s_ease-out]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1f1f1f 0%, #141414 50%, #0a0a0a 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 70% 60%, #fff 0%, transparent 60%)" }} />
      </div>
    </div>
    {/* Badge */}
    <div className="absolute left-6 md:left-10 bottom-8 flex items-center gap-3 animate-[fadeIn_1.6s_ease-out]">
      <span
        className="inline-flex items-center px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-background"
        style={{ backgroundColor: "hsl(var(--brand-accent))" }}
      >
        AGNC® 2024
      </span>
    </div>
    <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }`}</style>
  </section>
);

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => (
  <article className="reveal group cursor-pointer">
    <div
      className={`relative aspect-[16/9] overflow-hidden transition-transform duration-[600ms] ease-out group-hover:scale-[1.02] bg-gradient-to-br ${p.gradient}`}
    >
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #fff 0%, transparent 55%)" }} />
      <span className="absolute top-6 left-6 label-eyebrow">{p.id}</span>
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{p.name}</h3>
        <span className="text-xs text-foreground/60 hidden sm:block">{p.category}</span>
      </div>
    </div>
    <div className="mt-3 flex items-center justify-between sm:hidden">
      <span className="text-xs text-foreground/60">{p.category}</span>
    </div>
  </article>
);

const Projects = () => (
  <section id="projekty" className="px-6 md:px-12 py-32 md:py-48">
    <div className="max-w-[1400px] mx-auto">
      <p className="label-eyebrow reveal mb-16">Vybrané projekty</p>
      <div className="space-y-6 md:space-y-8">
        <ProjectCard p={projects[0]} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ProjectCard p={projects[1]} />
          <ProjectCard p={projects[2]} />
        </div>
        <ProjectCard p={projects[3]} />
        <ProjectCard p={projects[4]} />
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="sluzby" className="px-6 md:px-12 py-32 md:py-48 bg-secondary/40">
    <div className="max-w-[1400px] mx-auto">
      <p className="label-eyebrow reveal mb-16">Služby</p>
      <ul>
        {services.map((s, i) => (
          <li
            key={s}
            className="reveal group border-t border-border last:border-b py-8 md:py-10 flex items-baseline gap-8 cursor-pointer transition-transform duration-[600ms] ease-out hover:translate-x-2"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
          >
            <span className="label-eyebrow w-12 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-normal">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const About = () => (
  <section id="o-nas" className="px-6 md:px-12 py-32 md:py-48">
    <div className="max-w-[1400px] mx-auto">
      <p className="label-eyebrow reveal mb-16">O nás</p>
      <p
        className="reveal font-light leading-[1.2] tracking-[-0.01em] max-w-[22ch]"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)" }}
      >
        Slovenský tím špecialistov. Staviame softvér, spúšťame kampane a automatizujeme procesy.
      </p>
      <div className="reveal mt-20 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="label-eyebrow mb-3">Adresa</p>
          <p>Bratislava, Slovensko</p>
        </div>
        <div>
          <p className="label-eyebrow mb-3">Email</p>
          <p>info@agencia.sk</p>
        </div>
        <div>
          <p className="label-eyebrow mb-3">Telefón</p>
          <p>+421 902 177 653</p>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <section id="kontakt" className="px-6 md:px-12 py-32 md:py-48 bg-secondary/40">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        <div className="reveal">
          <p className="label-eyebrow mb-10">Kontakt</p>
          <h2 className="font-light leading-[1.1] tracking-[-0.02em]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Nový projekt?
          </h2>
          <a
            href="mailto:info@agencia.sk"
            className="block mt-12 font-light underline-offset-8 hover:underline transition-all"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            info@agencia.sk
          </a>
          <p className="mt-4 text-foreground/70" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
            +421 902 177 653
          </p>
        </div>
        <form onSubmit={submit} className="reveal flex flex-col gap-6 self-end w-full">
          <div>
            <label className="label-eyebrow block mb-2">Meno</label>
            <input
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <label className="label-eyebrow block mb-2">Email</label>
            <input
              required
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <label className="label-eyebrow block mb-2">Správa</label>
            <textarea
              required
              maxLength={2000}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start mt-4 label-eyebrow border-b border-foreground pb-1 hover:opacity-60 transition-opacity disabled:opacity-40"
          >
            {status === "sending" ? "Odosielam…" : status === "ok" ? "Odoslané ✓" : "Odoslať"}
          </button>
          {status === "err" && <p className="text-xs text-destructive">Nepodarilo sa odoslať. Skúste to znova.</p>}
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-border px-6 md:px-12 py-10">
    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm">
      <div className="flex items-center gap-6">
        <span className="font-medium tracking-[0.15em] uppercase">Agencia</span>
        <span className="text-foreground/60">Bratislava</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:opacity-60 transition-opacity">LinkedIn</a>
        <a href="#" className="hover:opacity-60 transition-opacity">Instagram</a>
      </div>
      <p className="text-xs text-foreground/50">© 2026 Michalka Summit s.r.o.</p>
    </div>
  </footer>
);

const Index = () => {
  useReveal();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="bg-background text-foreground min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
